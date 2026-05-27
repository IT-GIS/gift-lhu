import { BlogLandingPage } from "@/components/landing/wp-landing";
import { blogPosts } from "@/components/landing/landing-data";

export const metadata = {
  title: "Blog | GIFT Laboratory",
};

export default function BlogPage() {
  return <BlogLandingPage posts={blogPosts} />;
}
