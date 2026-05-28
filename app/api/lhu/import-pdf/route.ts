import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { mkdir, rm, writeFile } from "fs/promises";
import path from "path";
import { promisify } from "util";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";
import { extractPdfDctImages, extractPdfText, parseLhuPdfText } from "@/lib/lhu/pdf-import";

export const runtime = "nodejs";

const execFileAsync = promisify(execFile);

async function runWindowsOcr(imagePath: string) {
  const script = `
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$path = $args[0]
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime]
function Await($AsyncOp, [Type]$ResultType) {
  $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and
    $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation\`1'
  })[0]
  $task = $asTask.MakeGenericMethod($ResultType).Invoke($null, @($AsyncOp))
  $task.Wait()
  $task.Result
}
$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
$stream = Await ($file.OpenReadAsync()) ([Windows.Storage.Streams.IRandomAccessStreamWithContentType])
$decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
$bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) { throw "OCR engine unavailable" }
$result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
$result.Text
`;
  const scriptPath = path.join(path.dirname(imagePath), "ocr.ps1");
  await writeFile(scriptPath, script);
  const { stdout } = await execFileAsync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    scriptPath,
    imagePath,
  ], {
    maxBuffer: 1024 * 1024 * 10,
    windowsHide: true,
  });
  return stdout.trim();
}

async function extractPdfTextWithOcr(buffer: Buffer) {
  const digitalText = extractPdfText(buffer);
  if (digitalText.trim()) return digitalText;

  const images = extractPdfDctImages(buffer);
  if (images.length === 0) return "";

  const tempDir = path.join(process.cwd(), "tmp", `lhu-ocr-${randomUUID()}`);
  await mkdir(tempDir, { recursive: true });

  try {
    const texts: string[] = [];
    for (const [index, image] of images.entries()) {
      const imagePath = path.join(tempDir, `page-${index + 1}.jpg`);
      await writeFile(imagePath, image);
      const pageText = await runWindowsOcr(imagePath);
      if (pageText) texts.push(pageText);
    }
    return texts.join("\n");
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Login wajib dilakukan." }, { status: 401 });
    }

    if (!can(session.role, "createDraft")) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File PDF belum dipilih." }, { status: 400 });
    }

    if (file.type && file.type !== "application/pdf") {
      return NextResponse.json({ error: "File harus berupa PDF." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractPdfTextWithOcr(buffer);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "PDF tidak memiliki teks yang bisa dibaca otomatis. Pastikan file berisi teks atau hasil scan yang jelas." },
        { status: 422 }
      );
    }

    return NextResponse.json({ data: parseLhuPdfText(text) });
  } catch (error) {
    console.error("Gagal membaca PDF LHU:", error);
    return NextResponse.json(
      {
        error: "Gagal membaca file PDF LHU.",
        detail: process.env.NODE_ENV === "development" && error instanceof Error ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
