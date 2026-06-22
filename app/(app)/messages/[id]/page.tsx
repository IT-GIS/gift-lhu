import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { can } from "@/lib/auth/rbac";
import { requireSession } from "@/lib/auth/session";
import { getContactMessageById, markContactMessageRead } from "@/lib/db/queries/contact-messages";
import { formatDate } from "@/lib/utils";
import { DeleteMessageButton } from "@/components/messages/delete-message-button";

type Params = Promise<{ id: string }>;

export default async function MessageDetailPage({ params }: { params: Params }) {
  const session = await requireSession();
  if (!can(session.role, "viewContactMessages")) {
    redirect("/dashboard");
  }

  const { id } = await params;
  const message = await getContactMessageById(id);

  if (!message) {
    notFound();
  }

  if (message.status === "new") {
    await markContactMessageRead(id);
  }

  const sourceLabel = message.sourcePage === "home" ? "Halaman Utama" : "Halaman Kontak";

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={message.name}
        description={`Dikirim ${formatDate(message.createdAt)} melalui form Hubungi Kami di ${sourceLabel}.`}
        actions={<DeleteMessageButton messageId={message.id} messageName={message.name} />}
      />

      <Card className="border-slate-200 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground">Nama</div>
            <div className="mt-1 font-medium">{message.name}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="mt-1 font-medium">{message.email}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Perusahaan / Instansi</div>
            <div className="mt-1 font-medium">{message.company || "-"}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Tanggal</div>
            <div className="mt-1 font-medium">{formatDate(message.createdAt)}</div>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-sm text-muted-foreground">Pesan</div>
          <div className="mt-2 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
            {message.message}
          </div>
        </div>
      </Card>

      <Link
        href="/messages"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#289db9] dark:text-slate-400 dark:hover:text-[#5ac8e0]"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Pesan Masuk
      </Link>
    </div>
  );
}
