"use client";

import { DragEvent, useRef, useState } from "react";
import { FileText, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ImportedLhuPdfData } from "@/lib/lhu/pdf-import";

interface PdfImportDropzoneProps {
  onImported: (data: ImportedLhuPdfData) => void;
}

export function PdfImportDropzone({ onImported }: PdfImportDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "warning" | "error"; text: string } | null>(null);

  const hasImportedValue = (data: ImportedLhuPdfData) =>
    Boolean(
      data.customer ||
        data.projectAddress ||
        data.projectName ||
        data.referenceNumber ||
        data.concreteType ||
        data.testType ||
        data.sampleCount ||
        data.receivedDate ||
        data.testingDate ||
        data.analystName ||
        data.rows.some((row) =>
          Object.entries(row).some(([key, value]) => key !== "id" && String(value || "").trim())
        )
    );

  const importFile = async (file?: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setMessage({ type: "error", text: "File harus berupa PDF." });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsReading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/lhu/import-pdf", {
        method: "POST",
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        setMessage({ type: "error", text: payload.error || "Gagal membaca PDF." });
        return;
      }

      setFileName(file.name);
      if (hasImportedValue(payload.data)) {
        setMessage({ type: "success", text: "Data PDF berhasil dibaca dan form sudah diisi." });
        onImported(payload.data);
      } else {
        setMessage({
          type: "warning",
          text: "PDF terbaca, tetapi tidak ada data yang bisa diisi. File ini terlihat masih template kosong.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Gagal mengupload dan membaca PDF." });
    } finally {
      setIsReading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void importFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "mb-6 rounded-2xl border border-dashed bg-slate-50/80 p-4 transition-colors dark:bg-slate-950/40",
        isDragging
          ? "border-indigo-500 bg-indigo-50 text-indigo-900 dark:bg-indigo-950/30"
          : "border-slate-300 dark:border-slate-700"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="hidden"
        onChange={(event) => void importFile(event.target.files?.[0])}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900">
            {isReading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-slate-800 dark:text-slate-100">
              Upload PDF LHU
            </div>
            <div className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
              {fileName || "Klik atau tarik file PDF ke area ini"}
            </div>
            {message && (
              <div
                className={cn(
                  "mt-1 text-xs font-medium",
                  message.type === "success" && "text-emerald-700 dark:text-emerald-300",
                  message.type === "warning" && "text-amber-700 dark:text-amber-300",
                  message.type === "error" && "text-rose-700 dark:text-rose-300"
                )}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="shrink-0"
          disabled={isReading}
          onClick={() => inputRef.current?.click()}
        >
          <FileText className="mr-2 h-4 w-4" />
          Pilih PDF
        </Button>
      </div>
    </div>
  );
}
