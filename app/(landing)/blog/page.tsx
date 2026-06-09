import { BlogLandingPage } from "@/components/landing/wp-landing";
import { blogPosts } from "@/components/landing/landing-data";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | GIFT Laboratory",
};

const FALLBACK_IMAGE = "/landing/blog-konstruksi.png";

function stripHtml(content: string) {
  return content.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function getAllPosts() {
  // Slug dari post statis — dipakai untuk deduplikasi
  const staticSlugs = new Set(
    blogPosts.map((p) => p.href.split("/").filter(Boolean).pop() ?? "")
  );

  let dbPosts: typeof posts.$inferSelect[] = [];
  try {
    dbPosts = await db.select().from(posts).orderBy(desc(posts.publishedAt));
  } catch {
    // Kalau DB tidak tersedia, tetap tampilkan post statis
  }

  const dbCards = dbPosts
    .filter((p) => !staticSlugs.has(p.slug)) // jangan duplikat post statis
    .map((p) => ({
      title: p.title,
      date: new Date(p.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      category: p.category || "Blog",
      image: p.imageUrl?.startsWith("/") ? p.imageUrl : FALLBACK_IMAGE,
      excerpt: p.excerpt || stripHtml(p.content).slice(0, 180),
      content: p.content,
      href: `/blog/${p.slug}`,
    }));

  // DB post terbaru tampil di atas, diikuti post statis
  return [...dbCards, ...blogPosts];
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const allPosts = await getAllPosts();
  const allCategories = [
    "All Posts",
    ...Array.from(new Set(allPosts.map((p) => p.category))),
  ];
  const filtered =
    category && category !== "All Posts"
      ? allPosts.filter((p) => p.category === category)
      : allPosts;
  return (
    <BlogLandingPage
      posts={filtered}
      selectedCategory={category}
      allCategories={allCategories}
    />
  );
}
