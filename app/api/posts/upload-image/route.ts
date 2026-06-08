import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export const runtime = "nodejs";

const MAX_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Login wajib dilakukan." }, { status: 401 });
    }
    if (!can(session.role, "managePosts")) {
      return NextResponse.json({ error: "Akses ditolak." }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    }
    const ext = ALLOWED_TYPES[file.type];
    if (!ext) {
      return NextResponse.json({ error: "Hanya JPEG, PNG, atau WebP yang diizinkan." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json({ error: "Ukuran file maksimal 4 MB." }, { status: 400 });
    }

    const fileName = `${randomUUID()}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads", "posts");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, fileName), buffer, { flag: "wx" });

    return NextResponse.json({ url: `/uploads/posts/${fileName}` });
  } catch (error) {
    console.error("Gagal upload gambar post:", error);
    return NextResponse.json({ error: "Gagal menyimpan gambar." }, { status: 500 });
  }
}
