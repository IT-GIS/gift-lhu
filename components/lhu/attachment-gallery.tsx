import { Card } from "@/components/ui/card";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

interface Attachment {
  id: string;
  category: string;
  fileName: string;
  caption: string;
  fileUrl?: string;
}

function AttachmentPreviewGrid({ items }: { items: Attachment[] }) {
  if (items.length === 0) {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800/50">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-slate-900">
          <ImageIcon className="h-6 w-6 text-slate-400" />
        </div>
        <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
          Belum ada lampiran tersimpan
        </p>
        <p className="text-xs text-slate-500">
          Lampiran akan muncul di sini setelah diunggah dari form.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((attachment) => (
        <div
          key={attachment.id}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
            {attachment.fileUrl ? (
              <img
                src={attachment.fileUrl}
                alt={attachment.caption || attachment.fileName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
          </div>
          <div className="border-t border-slate-100 px-2 py-1.5 dark:border-slate-700">
            <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
              {attachment.fileName}
            </div>
            {attachment.caption ? (
              <div className="mt-1 line-clamp-2 text-[11px] text-slate-400 dark:text-slate-500">
                {attachment.caption}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function AttachmentCategoryCard({
  title,
  accentClass,
  items,
  previewColumnsClass,
  previewAspectClass,
}: {
  title: string;
  accentClass: string;
  items: Attachment[];
  previewColumnsClass: string;
  previewAspectClass: string;
}) {
  return (
    <Card className="border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100">
        <UploadCloud className={`h-5 w-5 ${accentClass}`} />
        {title}
      </h3>
      <AttachmentPreviewGridSized
        items={items}
        previewColumnsClass={previewColumnsClass}
        previewAspectClass={previewAspectClass}
      />
    </Card>
  );
}

function AttachmentPreviewGridSized({
  items,
  previewColumnsClass,
  previewAspectClass,
}: {
  items: Attachment[];
  previewColumnsClass: string;
  previewAspectClass: string;
}) {
  if (items.length === 0) {
    return <AttachmentPreviewGrid items={items} />;
  }

  return (
    <div className={previewColumnsClass}>
      {items.map((attachment) => (
        <div
          key={attachment.id}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
        >
          <div className={`${previewAspectClass} overflow-hidden bg-slate-100 dark:bg-slate-900`}>
            {attachment.fileUrl ? (
              <img
                src={attachment.fileUrl}
                alt={attachment.caption || attachment.fileName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}
          </div>
          <div className="border-t border-slate-100 px-2 py-1.5 dark:border-slate-700">
            <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
              {attachment.fileName}
            </div>
            {attachment.caption ? (
              <div className="mt-1 line-clamp-2 text-[11px] text-slate-400 dark:text-slate-500">
                {attachment.caption}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AttachmentGallery({
  attachments,
  size = "default",
}: {
  attachments: Attachment[];
  size?: "default" | "large";
}) {
  const produkAttachments = attachments.filter(
    (attachment) => attachment.category === "produk",
  );
  const pengujianAttachments = attachments.filter(
    (attachment) => attachment.category === "pengujian",
  );
  const previewColumnsClass =
    size === "large" ? "grid grid-cols-1 gap-4" : "grid grid-cols-2 gap-3 sm:grid-cols-3";
  const previewAspectClass = size === "large" ? "aspect-[16/11]" : "aspect-square";

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AttachmentCategoryCard
        title="Lampiran Gambar Produk"
        accentClass="text-indigo-600"
        items={produkAttachments}
        previewColumnsClass={previewColumnsClass}
        previewAspectClass={previewAspectClass}
      />
      <AttachmentCategoryCard
        title="Lampiran Gambar Pengujian"
        accentClass="text-cyan-600"
        items={pengujianAttachments}
        previewColumnsClass={previewColumnsClass}
        previewAspectClass={previewAspectClass}
      />
    </div>
  );
}
