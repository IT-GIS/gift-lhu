import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/rbac";
import { requireSession } from "@/lib/auth/session";
import { listPosts } from "@/lib/db/queries/posts";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getMessage(params: Record<string, string | string[] | undefined>, key: "success" | "error") {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function PostsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await requireSession();
  if (!can(session.role, "managePosts")) {
    redirect("/dashboard");
  }

  const [params, posts] = await Promise.all([searchParams, listPosts()]);
  const success = getMessage(params, "success");
  const error = getMessage(params, "error");

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Post"
        description="Kelola artikel internal yang tersimpan di database GIFT."
        actions={
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Post
            </Link>
          </Button>
        }
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

      <Card className="border-slate-200 bg-white/85 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-5 flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Daftar post</h2>
          <p className="text-sm text-muted-foreground">{posts.length} post ditemukan</p>
        </div>

        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4 transition hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{post.title}</h3>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                      Published
                    </span>
                    {post.category && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                    <span>/blog/{post.slug}</span>
                    <span>Publish: {formatDate(post.publishedAt)}</span>
                    <span>Updated: {formatDate(post.updatedAt)}</span>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-500">Edit post</div>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40">
              Belum ada post. Mulai dari tombol Tambah Post.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
