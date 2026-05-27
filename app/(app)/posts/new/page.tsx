import { redirect } from "next/navigation";
import { BlogPostForm } from "@/components/blog-post-form";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/rbac";
import { requireSession } from "@/lib/auth/session";
import { createPostAction } from "../actions";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function NewPostPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await requireSession();
  if (!can(session.role, "managePosts")) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Tambah Post"
        description="Tulis artikel internal dengan judul, slug, cover, ringkasan, konten, dan tanggal publish."
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <Card className="border-slate-200 bg-white/85 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <BlogPostForm action={createPostAction} submitLabel="Simpan Post" />
      </Card>
    </div>
  );
}
