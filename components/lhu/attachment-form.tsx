"use client";

import { useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MAX_FILES_PER_CATEGORY = 10;
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);

type AttachmentPreview = {
  url: string;
  name: string;
};

interface AttachmentFormProps {
  existingProduk?: AttachmentPreview[];
  existingPengujian?: AttachmentPreview[];
}

function PreviewGrid({
  title,
  items,
}: {
  title: string;
  items: AttachmentPreview[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((preview, idx) => (
          <div
            key={`${preview.url}-${idx}`}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
              <img
                src={preview.url}
                alt={preview.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="truncate border-t border-slate-100 px-2 py-1.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {preview.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadCard({
  name,
  title,
  accentClass,
  existingItems,
  selectedItems,
  error,
  onChange,
}: {
  name: string;
  title: string;
  accentClass: string;
  existingItems: AttachmentPreview[];
  selectedItems: AttachmentPreview[];
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const hasExistingItems = existingItems.length > 0;
  const hasSelectedItems = selectedItems.length > 0;

  return (
    <Card className="border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
        <UploadCloud className={`h-5 w-5 ${accentClass}`} />
        {title}
      </h3>

      <div className="relative mb-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:bg-slate-800">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900">
          <UploadCloud className={`h-6 w-6 ${accentClass}`} />
        </div>
        <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Klik untuk unggah atau seret gambar ke sini
        </p>
        <p className="text-xs text-slate-500">
          PNG/JPG/JPEG, maksimal 10 file dan 4 MB per gambar
        </p>
        <Input
          name={name}
          type="file"
          accept="image/png,image/jpeg"
          multiple
          onChange={onChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">
          {error}
        </div>
      )}

      {hasExistingItems && (
        <PreviewGrid
          title={
            hasSelectedItems
              ? "Lampiran tersimpan saat ini (akan diganti setelah disimpan)"
              : "Lampiran tersimpan saat ini"
          }
          items={existingItems}
        />
      )}

      {hasSelectedItems && (
        <PreviewGrid title="Preview lampiran baru" items={selectedItems} />
      )}
    </Card>
  );
}

export function AttachmentForm({
  existingProduk = [],
  existingPengujian = [],
}: AttachmentFormProps) {
  const [produkPreviews, setProdukPreviews] = useState<AttachmentPreview[]>([]);
  const [pengujianPreviews, setPengujianPreviews] = useState<AttachmentPreview[]>([]);
  const [produkError, setProdukError] = useState("");
  const [pengujianError, setPengujianError] = useState("");

  useEffect(() => {
    return () => {
      produkPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
      pengujianPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [produkPreviews, pengujianPreviews]);

  const validateFiles = (files: File[], label: string) => {
    if (files.length > MAX_FILES_PER_CATEGORY) {
      return `Maksimal ${MAX_FILES_PER_CATEGORY} gambar ${label}.`;
    }

    const invalidType = files.find((file) => !ALLOWED_IMAGE_TYPES.has(file.type));
    if (invalidType) {
      return "Lampiran hanya boleh berupa JPEG atau PNG.";
    }

    const oversized = files.find((file) => file.size > MAX_FILE_BYTES);
    if (oversized) {
      return "Ukuran setiap gambar lampiran maksimal 4 MB.";
    }

    return "";
  };

  const handleProdukChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    produkPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    const validationError = validateFiles(files, "produk");
    if (validationError) {
      e.currentTarget.value = "";
      setProdukPreviews([]);
      setProdukError(validationError);
      return;
    }

    setProdukError("");
    setProdukPreviews(
      files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    );
  };

  const handlePengujianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    pengujianPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    const validationError = validateFiles(files, "pengujian");
    if (validationError) {
      e.currentTarget.value = "";
      setPengujianPreviews([]);
      setPengujianError(validationError);
      return;
    }

    setPengujianError("");
    setPengujianPreviews(
      files.map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <UploadCard
        name="attachmentProduk"
        title="Lampiran Gambar Produk"
        accentClass="text-indigo-600"
        existingItems={existingProduk}
        selectedItems={produkPreviews}
        error={produkError}
        onChange={handleProdukChange}
      />

      <UploadCard
        name="attachmentPengujian"
        title="Lampiran Gambar Pengujian"
        accentClass="text-cyan-600"
        existingItems={existingPengujian}
        selectedItems={pengujianPreviews}
        error={pengujianError}
        onChange={handlePengujianChange}
      />
    </div>
  );
}
