import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageSquareText } from "lucide-react";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { ResultTable } from "@/components/lhu/result-table";
import { AttachmentGallery } from "@/components/lhu/attachment-gallery";
import { ReviewHeaderActions, ReviewPanelActions } from "@/components/lhu/review-actions";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

export default async function ReviewQaPage({
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

  return (
    <div className="space-y-6 pb-10">
      <Link
        href="/lhu/review"
        className="inline-flex w-fit items-center rounded-full border bg-white/50 px-3 py-1.5 text-sm font-medium text-indigo-600 shadow-sm backdrop-blur-sm transition-colors hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Review QA
      </Link>

      <PageHeader
        title={`Review QA - ${displayTestingNumber}`}
        description="Halaman review untuk QA atau Supervisor: cek ringkasan dokumen, tabel hasil, lampiran, histori perubahan, dan masukkan catatan."
        actions={<ReviewHeaderActions id={doc.id} />}
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
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <MessageSquareText className="h-5 w-5 text-primary" />
            Panel Komentar QA
          </div>
          <ReviewPanelActions id={doc.id} currentStatus={doc.status} />
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
