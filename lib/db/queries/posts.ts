import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { blogPosts } from "@/components/landing/landing-data";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";

export type PostRow = typeof posts.$inferSelect;

const postSchema = z.object({
  title: z.string().trim().min(3, "Judul post minimal 3 karakter."),
  slug: z
    .string()
    .trim()
    .min(3, "Slug minimal 3 karakter.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung."),
  category: z.string().trim().min(2, "Kategori wajib diisi.").max(191),
  excerpt: z.string().trim().max(1000).optional().or(z.literal("")),
  content: z.string().trim().min(10, "Konten minimal 10 karakter."),
  imageUrl: z.string().trim().max(255).optional().or(z.literal("")),
  publishedAt: z.string().trim().optional().or(z.literal("")),
});

const updatePostSchema = postSchema.extend({
  postId: z.string().trim().min(1),
});

function parsePublishedAt(value?: string | null) {
  if (!value) return new Date();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function getPostErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Input post tidak valid.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat menyimpan post.";
}

function slugFromHref(href: string) {
  return href.split("/").filter(Boolean).pop() ?? "";
}

async function ensureLandingPosts() {
  const now = new Date();

  for (const post of blogPosts) {
    const slug = slugFromHref(post.href);
    if (!slug) continue;

    const existing = await db
      .select({ id: posts.id })
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1);

    if (existing.length > 0) continue;

    const publishedAt = parsePublishedAt(post.date);

    await db.insert(posts).values({
      id: randomUUID(),
      title: post.title,
      slug,
      content: Array.isArray(post.content) ? post.content.join("\n\n") : post.content,
      excerpt: post.excerpt ?? null,
      imageUrl: post.image ?? null,
      category: post.category ?? "Blog",
      publishedAt,
      createdAt: now,
      updatedAt: now,
    });
  }
}

export async function listPosts() {
  await ensureLandingPosts();
  return db.select().from(posts).orderBy(desc(posts.publishedAt), desc(posts.updatedAt));
}

export async function getPostById(id: string) {
  const rows = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createPost(input: Record<string, string>) {
  const parsed = postSchema.parse(input);
  const now = new Date();
  const id = randomUUID();

  await db.insert(posts).values({
    id,
    title: parsed.title,
    slug: parsed.slug,
    content: parsed.content,
    excerpt: nullable(parsed.excerpt),
    imageUrl: nullable(parsed.imageUrl),
    category: parsed.category,
    publishedAt: parsePublishedAt(parsed.publishedAt),
    createdAt: now,
    updatedAt: now,
  });

  const post = await getPostById(id);
  if (!post) throw new Error("Post gagal dibuat.");
  return post;
}

export async function updatePost(input: Record<string, string>) {
  const parsed = updatePostSchema.parse(input);

  await db
    .update(posts)
    .set({
      title: parsed.title,
      slug: parsed.slug,
      content: parsed.content,
      excerpt: nullable(parsed.excerpt),
      imageUrl: nullable(parsed.imageUrl),
      category: parsed.category,
      publishedAt: parsePublishedAt(parsed.publishedAt),
      updatedAt: new Date(),
    })
    .where(eq(posts.id, parsed.postId));

  const post = await getPostById(parsed.postId);
  if (!post) throw new Error("Post tidak ditemukan.");
  return post;
}
