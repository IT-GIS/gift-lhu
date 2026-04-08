import { notFound } from "next/navigation";
import Link from "next/link";
import { ClipboardCheck, Edit, FileUp, QrCode } from "lucide-react";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";
import { ResultTable } from "@/components/lhu/result-table";
import { AttachmentGallery } from "@/components/lhu/attachment-gallery";
import { PrintActions } from "@/components/lhu/print-actions";

export default async function LhuDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getLhuDocumentById(id);
  if (!doc) return notFound();

  const customerName = doc.customer?.companyName ?? "-";
  const displayTestingNumber =
    doc.referenceNumber || doc.projectName || doc.documentCode;

  const resultRows = doc.resultRows.map((r) => ({
    id: r.id,
    rowNumber: r.rowNumber,
    sampleCode: r.sampleCode,
    castingDate: r.castingDate.toISOString().split("T")[0],
    testingDate: r.testingDate.toISOString().split("T")[0],
    ageDays: r.ageDays,
    weight: r.weight ?? "-",
    dimension: r.dimension ?? "-",
    maxLoad: r.maxLoad ?? "-",
    compressiveStrength: r.compressiveStrength ?? "-",
    compressiveStrengthKgCm2: r.compressiveStrengthKgCm2 ?? "-",
    cubeConversionStrengthKgCm2: r.cubeConversionStrengthKgCm2 ?? "-",
    failurePattern: r.failurePattern ?? "-",
    remarks: r.remarks ?? "",
    analystName: r.analystName ?? "-",
  }));

  const attachments = doc.attachments.map((a) => ({
    id: a.id,
    category: a.category,
    fileName: a.fileName,
    caption: a.caption ?? "",
    fileUrl: a.fileUrl,
  }));

  const metadataItems = [
    { label: "Nama Pelanggan", value: customerName },
    { label: "Alamat", value: doc.projectAddress || "-" },
    { label: "Pengujian", value: getConcreteTypeLabel(doc.concreteType) },
    { label: "Acuan", value: doc.testType || "-" },
    { label: "No. Pengujian", value: displayTestingNumber },
    { label: "Jumlah Contoh", value: `${doc.resultRows.length} sampel` },
    { label: "Terima Tanggal", value: formatDate(doc.receivedDate.toISOString()) },
    { label: "Diuji Tanggal", value: formatDate(doc.testingDate.toISOString()) },
  ];

  const canEdit = true;

  return (
    <div className="space-y-8">
      <PageHeader
        title={customerName}
        description="Detail dokumen LHU, identitas proyek, hasil uji, lampiran, histori review, dan timeline aktivitas."
        actions={
          <>
            <PrintActions id={doc.id} />
            {canEdit && (
              <Button variant="outline" asChild>
                <Link href={`/lhu/${doc.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Data
                </Link>
              </Button>
            )}
            {canEdit && (
              <Button variant="secondary" asChild>
                <Link href={`/lhu/${doc.id}/results`}>
                  <FileUp className="h-4 w-4" />
                  Input Hasil
                </Link>
              </Button>
            )}
            {doc.status === "review" && (
              <Button variant="secondary" asChild>
                <Link href={`/lhu/review/${doc.id}`}>
                  <ClipboardCheck className="h-4 w-4" />
                  Review QA
                </Link>
              </Button>
            )}
            {doc.status === "approved" && (
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href={`/lhu/${doc.id}/publish`}>
                  <QrCode className="h-4 w-4" />
                  Publish
                </Link>
              </Button>
            )}
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-white/85 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="text-sm text-muted-foreground">Dokumen</div>
            <StatusBadge status={doc.status} />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {metadataItems.map((item) => (
              <div key={item.label}>
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="mt-1 font-medium">{item.value}</div>
              </div>
            ))}

            {doc.notes && (
              <div className="md:col-span-2">
                <div className="text-sm text-muted-foreground">Catatan Umum</div>
                <div className="mt-1">{doc.notes}</div>
              </div>
            )}

            {doc.status === "revoked" && doc.revokedReason && (
              <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
                <div className="text-sm font-semibold text-red-700 dark:text-red-400">
                  Dokumen Direvoke
                </div>
                <div className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {doc.revokedReason}
                </div>
                {doc.revokedAt && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {formatDate(doc.revokedAt.toISOString())}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>

        <Card className="bg-white/85 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="text-lg font-semibold">Histori Review QA</div>
          <div className="mt-6 space-y-3">
            {doc.reviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada histori review.</p>
            ) : (
              doc.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-border bg-white/70 p-4 dark:border-slate-700 dark:bg-slate-800/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{review.reviewer?.fullName ?? "-"}</div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        review.action === "approve"
                          ? "bg-emerald-100 text-emerald-700"
                          : review.action === "return_revision"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {review.action === "approve"
                        ? "Approve"
                        : review.action === "return_revision"
                          ? "Revisi"
                          : review.action === "reject"
                            ? "Reject"
                            : "Review"}
                    </span>
                  </div>
                  {review.comment && (
                    <div className="mt-2 text-sm text-muted-foreground">{review.comment}</div>
                  )}
                  <div className="mt-2 text-xs text-muted-foreground">
                    {review.createdAt.toLocaleString("id-ID")}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="text-xl font-semibold">Tabel Hasil Uji</div>
        <ResultTable rows={resultRows} />
      </div>

      <div className="space-y-4">
        <div className="text-xl font-semibold">Lampiran</div>
        <AttachmentGallery attachments={attachments} />
      </div>
    </div>
  );
}
