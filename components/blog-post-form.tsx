"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { Upload, X } from "lucide-react";
import type { PostRow } from "@/lib/db/queries/posts";
import { blogCategories } from "@/components/landing/landing-data";
import { Button } from "@/components/ui/button";

type BlogPostFormProps = {
  action: (formData: FormData) => void;
  post?: PostRow;
  submitLabel: string;
};

function toDateTimeLocal(value?: Date | null) {
  if (!value) return "";
  const offset = value.getTimezoneOffset() * 60_000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const categories = blogCategories.filter((c) => c !== "All Posts");

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/40";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";

// ── Drag-and-drop cover uploader ─────────────────────────────────────────────

function CoverUploader({ defaultUrl }: { defaultUrl?: string | null }) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Hanya JPEG, PNG, atau WebP yang diizinkan.");
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setError("Ukuran file maksimal 4 MB.");
      return;
    }

    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/posts/upload-image", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload gagal.");
      setUrl(json.url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, []);

  return (
    <div className="space-y-2">
      <input type="hidden" name="imageUrl" value={url} />

      {url ? (
        <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview cover" className="h-44 w-full object-cover" />
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute right-2 top-2 rounded-lg bg-black/60 p-1.5 text-white transition hover:bg-red-600"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`flex h-44 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition ${
            dragging
              ? "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-950/30"
              : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-600"
          }`}
        >
          {uploading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
          ) : (
            <>
              <div className="rounded-xl bg-slate-200 p-3 dark:bg-slate-700">
                <Upload className="h-5 w-5 text-slate-500 dark:text-slate-400" />
              </div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Drag &amp; drop atau{" "}
                <span className="text-indigo-600 dark:text-indigo-400">pilih file</span>
              </p>
              <p className="text-[11px] text-slate-400">JPEG · PNG · WebP · Maks 4 MB</p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }}
      />

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export function BlogPostForm({ action, post, submitLabel }: BlogPostFormProps) {
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [autoSlug, setAutoSlug] = useState(!post?.slug);

  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      {post && <input type="hidden" name="postId" value={post.id} />}

      {/* ── Kolom kiri ── */}
      <div className="space-y-5">
        {/* Judul */}
        <div>
          <label className={label}>Judul Artikel</label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-semibold shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950"
            type="text"
            name="title"
            defaultValue={post?.title}
            onChange={(e) => { if (autoSlug) setSlug(slugify(e.target.value)); }}
            placeholder="Contoh: Pengujian Material Konstruksi"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className={label}>Slug URL</label>
          <input
            className={field}
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }}
            placeholder="pengujian-material-konstruksi"
            required
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Terisi otomatis dari judul · hanya huruf kecil, angka, tanda hubung
          </p>
        </div>

        {/* Ringkasan */}
        <div>
          <label className={label}>Ringkasan</label>
          <textarea
            className={`${field} min-h-24 leading-7`}
            name="excerpt"
            defaultValue={post?.excerpt ?? ""}
            placeholder="1–2 kalimat ringkas untuk preview artikel."
          />
        </div>

        {/* Konten */}
        <div>
          <label className={label}>Isi Artikel</label>
          <textarea
            className={`${field} min-h-[420px] resize-y leading-8`}
            name="content"
            defaultValue={post?.content}
            placeholder={"Tulis isi artikel di sini.\n\nPisahkan paragraf dengan baris kosong."}
            required
          />
        </div>
      </div>

      {/* ── Sidebar kanan ── */}
      <aside className="space-y-4 xl:sticky xl:top-6 xl:self-start">
        {/* Tombol aksi */}
        <div className="flex flex-col gap-2.5">
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            {submitLabel}
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href="/posts">Batal</Link>
          </Button>
        </div>

        {/* Cover image */}
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className={`${label} mb-3`}>Gambar Cover</p>
          <CoverUploader defaultUrl={post?.imageUrl} />
        </div>

        {/* Kategori */}
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <label className={`${label} mb-3`}>Kategori</label>
          <select
            className={field}
            name="category"
            defaultValue={post?.category ?? categories[0]}
            required
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Tanggal publish */}
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <label className={`${label} mb-3`}>Tanggal Publish</label>
          <input
            className={field}
            type="datetime-local"
            name="publishedAt"
            defaultValue={toDateTimeLocal(post?.publishedAt)}
          />
          <p className="mt-1.5 text-[11px] text-slate-400">Kosongkan untuk pakai waktu sekarang.</p>
        </div>
      </aside>
    </form>
  );
}
