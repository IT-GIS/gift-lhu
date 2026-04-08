import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";
import { ResultTable } from "@/components/lhu/result-table";
import { AttachmentGallery } from "@/components/lhu/attachment-gallery";
import { PrintActions } from "@/components/lhu/print-actions";
import { DownloadableQR } from "@/components/lhu/downloadable-qr";

export default async function PublishedDetailPage({
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

  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const publicVerifyUrl = doc.activeToken?.publicToken
    ? `${appUrl}/verify/${doc.activeToken.publicToken}`
    : null;
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
    <div className="mx-auto max-w-5xl space-y-8">
      <PageHeader
        title={displayTestingNumber}
        description="Detail Dokumen Publish: identitas proyek, hasil uji, lampiran gambar, dan QR verifikasi."
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/publish">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Daftar
              </Link>
            </Button>
            <PrintActions id={doc.id} />
          </>
        }
      />

      <Card className="bg-white/85 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Dokumen</div>
            <div className="mt-2 text-2xl font-semibold">
              {displayTestingNumber}
            </div>
            <div className="mt-2 text-muted-foreground">{customerName}</div>
          </div>
          <StatusBadge status={doc.status} />
        </div>

        <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="grid flex-1 gap-5 sm:grid-cols-2">
            {metadataItems.map((item) => (
              <div key={item.label}>
                <div className="text-sm text-muted-foreground">{item.label}</div>
                <div className="mt-1 font-medium">{item.value}</div>
              </div>
            ))}

            {doc.notes && (
              <div className="sm:col-span-2">
                <div className="text-sm text-muted-foreground">Catatan Umum</div>
                <div className="mt-1">{doc.notes}</div>
              </div>
            )}
          </div>

          {publicVerifyUrl && doc.status === "published" && (
            <div className="flex shrink-0 flex-col items-center border-t border-slate-100 pt-6 dark:border-slate-800/50 xl:border-l xl:border-t-0 xl:pl-8 xl:pt-0">
              <div className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                Verifikasi Publik
              </div>
              <DownloadableQR
                url={publicVerifyUrl}
                fileName={`QR-${doc.documentCode}.png`}
                size={180}
              />
            </div>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        <div className="text-xl font-semibold">Tabel Hasil Uji</div>
        <ResultTable rows={resultRows} />
      </div>

      <div className="space-y-4">
        <div className="text-xl font-semibold">Lampiran Gambar</div>
        <AttachmentGallery attachments={attachments} />
      </div>
    </div>
  );
}
