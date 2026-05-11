import { desc } from "drizzle-orm";
import { BlogLandingPage } from "@/components/landing/wp-landing";
import { blogPosts } from "@/components/landing/landing-data";
import { db } from "@/lib/db/index";
import { posts } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | GIFT Laboratory",
};

export default async function BlogPage() {
  const dbPosts = await getPublishedPosts();

  return <BlogLandingPage posts={dbPosts.length > 0 ? dbPosts : blogPosts} />;
}

async function getPublishedPosts() {
  try {
    const allPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.publishedAt)],
    });

    return allPosts.map((post, index) => ({
      title: post.title,
      date: new Date(post.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      category: post.category || "Blog",
      image: normalizePostImage(post.imageUrl, index),
      excerpt: post.excerpt || stripHtml(post.content).slice(0, 180),
      href: `/blog/${post.slug}`,
    }));
  } catch {
    return [];
  }
}

function normalizePostImage(imageUrl: string | null, index: number) {
  if (imageUrl?.startsWith("/")) {
    return imageUrl;
  }

  return blogPosts[index % blogPosts.length]?.image || "/landing/blog-konstruksi.png";
}

function stripHtml(content: string) {
  return content.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

