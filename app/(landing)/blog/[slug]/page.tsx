import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { BlogDetailLandingPage } from "@/components/landing/wp-landing";
import { blogPosts } from "@/components/landing/landing-data";
import { db } from "@/lib/db/index";
import { posts } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found | GIFT Laboratory" };
  }

  return { title: `${post.title} | GIFT Laboratory` };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailLandingPage post={post} />;
}

async function getPost(slug: string) {
  const staticPost = blogPosts.find((post) => post.href === `/blog/${slug}`);

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (!post) {
      return staticPost
        ? {
            ...staticPost,
            content: staticPost.excerpt,
          }
        : null;
    }

    return {
      title: post.title,
      date: new Date(post.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      category: post.category || "Blog",
      image: post.imageUrl?.startsWith("/")
        ? post.imageUrl
        : staticPost?.image || "/landing/blog-konstruksi.png",
      excerpt: post.excerpt || stripHtml(post.content).slice(0, 180),
      content: post.content,
      href: `/blog/${post.slug}`,
    };
  } catch {
    return staticPost
      ? {
          ...staticPost,
          content: staticPost.excerpt,
        }
      : null;
  }
}

function stripHtml(content: string) {
  return content.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

