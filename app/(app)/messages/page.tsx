import Link from "next/link";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/rbac";
import { requireSession } from "@/lib/auth/session";
import { listContactMessages } from "@/lib/db/queries/contact-messages";
import { formatDate } from "@/lib/utils";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getMessage(params: Record<string, string | string[] | undefined>, key: "success" | "error") {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function MessagesPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await requireSession();
  if (!can(session.role, "viewContactMessages")) {
    redirect("/dashboard");
  }

  const [params, messages] = await Promise.all([searchParams, listContactMessages()]);
  const success = getMessage(params, "success");
  const error = getMessage(params, "error");

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="Pesan Masuk"
        description="Pertanyaan yang dikirim pengunjung lewat form Hubungi Kami di landing page."
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
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Daftar pesan</h2>
          <p className="text-sm text-muted-foreground">{messages.length} pesan ditemukan</p>
        </div>

        <div className="space-y-3">
          {messages.map((message) => (
            <Link
              key={message.id}
              href={`/messages/${message.id}`}
              className="block rounded-2xl border border-slate-200 bg-slate-50/70 px-5 py-4 transition hover:border-indigo-200 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-900"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{message.name}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        message.status === "new"
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {message.status === "new" ? "Baru" : "Dibaca"}
                    </span>
                    {message.company && (
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {message.company}
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                    {message.message}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                    <span>{message.email}</span>
                    <span>Dari: {message.sourcePage === "home" ? "Halaman Utama" : "Halaman Kontak"}</span>
                    <span>{formatDate(message.createdAt)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {messages.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/40">
              Belum ada pesan masuk.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
