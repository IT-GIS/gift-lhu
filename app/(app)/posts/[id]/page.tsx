import { notFound, redirect } from "next/navigation";
import { BlogPostForm } from "@/components/blog-post-form";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/rbac";
import { requireSession } from "@/lib/auth/session";
import { getPostById } from "@/lib/db/queries/posts";
import { formatDate } from "@/lib/utils";
import { updatePostAction } from "../actions";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const session = await requireSession();
  if (!can(session.role, "managePosts")) {
    redirect("/dashboard");
  }

  const [{ id }, query] = await Promise.all([params, searchParams]);
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const success = typeof query.success === "string" ? query.success : undefined;
  const error = typeof query.error === "string" ? query.error : undefined;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={post.title}
        description={`Terakhir diperbarui ${formatDate(post.updatedAt)}.`}
      />

      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <Card className="border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <BlogPostForm action={updatePostAction} post={post} submitLabel="Update Post" />
      </Card>
    </div>
  );
}
