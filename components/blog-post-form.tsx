"use client";

import Link from "next/link";
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

const categories = blogCategories.filter((category) => category !== "All Posts");
const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-indigo-900/40";
const labelClass = "mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200";
const helpClass = "mt-1.5 block text-xs leading-5 text-slate-500";

export function BlogPostForm({ action, post, submitLabel }: BlogPostFormProps) {
  return (
    <form action={action} className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      {post ? <input type="hidden" name="postId" value={post.id} /> : null}

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-indigo-600">
            Informasi utama
          </p>
          <div className="mt-5 grid gap-5">
            <label className="block">
              <span className={labelClass}>Judul artikel</span>
              <input
                className={`${fieldClass} text-base font-semibold`}
                type="text"
                name="title"
                defaultValue={post?.title}
                placeholder="Contoh: Pengujian Material Konstruksi"
                required
              />
            </label>

            <label className="block">
              <span className={labelClass}>Slug URL</span>
              <input
                className={fieldClass}
                type="text"
                name="slug"
                defaultValue={post?.slug}
                placeholder="pengujian-material-konstruksi"
                required
              />
              <span className={helpClass}>Gunakan huruf kecil, angka, dan tanda hubung.</span>
            </label>

            <label className="block">
              <span className={labelClass}>Ringkasan singkat</span>
              <textarea
                className={`${fieldClass} min-h-28 leading-7`}
                name="excerpt"
                defaultValue={post?.excerpt ?? ""}
                placeholder="Tulis 1-2 kalimat ringkas untuk preview artikel."
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-indigo-600">
            Isi artikel
          </p>
          <textarea
            className={`${fieldClass} mt-5 min-h-[480px] resize-y leading-8`}
            name="content"
            defaultValue={post?.content}
            placeholder={`Tulis isi artikel di sini.\n\nPisahkan paragraf dengan baris kosong.`}
            required
          />
        </div>
      </div>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-indigo-600">
            Publikasi
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={labelClass}>Tanggal publish</span>
              <input
                className={fieldClass}
                type="datetime-local"
                name="publishedAt"
                defaultValue={toDateTimeLocal(post?.publishedAt)}
              />
              <span className={helpClass}>Boleh dikosongkan. Sistem akan memakai waktu sekarang.</span>
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-indigo-600">
            Tampilan kartu
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={labelClass}>Kategori</span>
              <select className={fieldClass} name="category" defaultValue={post?.category ?? categories[0]} required>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Gambar cover</span>
              <input
                className={fieldClass}
                type="text"
                name="imageUrl"
                defaultValue={post?.imageUrl ?? ""}
                placeholder="/landing/blog-konstruksi.png"
              />
              <span className={helpClass}>Isi path gambar dari folder public atau URL gambar.</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
            {submitLabel}
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/posts">Batal</Link>
          </Button>
        </div>
      </aside>
    </form>
  );
}
