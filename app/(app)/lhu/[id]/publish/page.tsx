import { notFound } from "next/navigation";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { VerificationCard } from "@/components/lhu/verification-card";
import { PublishActions } from "./publish-actions";
import { getConcreteTypeLabel } from "@/lib/utils";

export default async function PublishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getLhuDocumentById(id);
  if (!doc) return notFound();

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const activeToken = doc.activeToken?.publicToken ?? "";
  const isPublished = doc.status === "published";
  const displayTestingNumber =
    doc.referenceNumber || doc.projectName || doc.documentCode;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Publish LHU - ${displayTestingNumber}`}
        description="Pada tahap ini sistem menyiapkan nomor LHU final, token verifikasi unik, QR code, dan publishes dokumen secara permanen."
        actions={
          <PublishActions
            id={doc.id}
            docToken={activeToken}
            isPublished={isPublished}
            currentStatus={doc.status}
          />
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="bg-white/85 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-lg font-semibold">Preview Final Metadata</div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <div className="text-sm text-muted-foreground">Nomor Pengujian</div>
              <div className="mt-1 font-medium">{displayTestingNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Verification Token</div>
              <div className="mt-1 break-all font-mono text-xs text-muted-foreground">
                {activeToken || (
                  <span className="italic">Belum ada - akan dibuat saat publish</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Acuan</div>
              <div className="mt-1 font-medium">{doc.testType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Pengujian</div>
              <div className="mt-1 font-medium">{getConcreteTypeLabel(doc.concreteType)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Customer</div>
              <div className="mt-1 font-medium">{doc.customer?.companyName ?? "-"}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Jumlah Hasil Uji</div>
              <div className="mt-1 font-medium">{doc.resultRows.length} sampel</div>
            </div>
          </div>

          {doc.status !== "approved" && !isPublished && (
            <div className="mt-6 rounded-[24px] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400">
              Dokumen harus berstatus <strong>approved</strong> sebelum bisa dipublish.
              Status saat ini: <strong>{doc.status}</strong>.
            </div>
          )}

          {isPublished && doc.publishedAt && (
            <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400">
              Dokumen dipublish pada{" "}
              {doc.publishedAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          )}
        </Card>

        <VerificationCard token={activeToken} appUrl={appUrl} />
      </div>
    </div>
  );
}
