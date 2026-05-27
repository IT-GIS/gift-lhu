import { ShieldCheck, ShieldOff, ShieldX } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { AttachmentGallery } from "@/components/lhu/attachment-gallery";
import { PublicResultTable } from "@/components/lhu/public-result-table";
import { Card } from "@/components/ui/card";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

export default async function VerifyDetailPage({
  params,
}: {
  params: Promise<{ token: string; lhuId: string }>;
}) {
  const { token, lhuId } = await params;
  const appUrl = process.env.APP_URL || "http://localhost:3000";
  const verifyUrl = `${appUrl}/verify/${token}/${lhuId}`;

  const doc = await getLhuDocumentById(lhuId);

  if (!doc) {
    return (
      <VerifyError
        title="Dokumen Tidak Ditemukan"
        message="Dokumen yang Anda cari tidak tersedia."
        icon="invalid"
      />
    );
  }

  if (doc.status === "revoked") {
    return (
      <VerifyError
        title="Dokumen Tidak Berlaku"
        message={`Laporan ini telah direvoke dan tidak lagi berlaku secara resmi.${doc.revokedReason ? ` Alasan: ${doc.revokedReason}` : ""}`}
        icon="revoked"
      />
    );
  }

  if (doc.status !== "published") {
    return (
      <VerifyError
        title="Dokumen Belum Terbit"
        message="Dokumen ini belum dipublikasikan."
        icon="invalid"
      />
    );
  }

  const customerName = doc.customer?.companyName ?? "-";
  const testNumber = doc.projectName || doc.referenceNumber || doc.documentCode || "-";
  const sampleCount = `${doc.resultRows.length} sampel`;
  const attachments = doc.attachments.map((attachment) => ({
    id: attachment.id,
    category: attachment.category,
    fileName: attachment.fileName,
    caption: attachment.caption ?? "",
    fileUrl: attachment.fileUrl,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/30">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
            <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
              Dokumen Terverifikasi
            </div>
            <div className="mt-0.5 text-sm text-emerald-700 dark:text-emerald-400">
              Laporan ini telah diverifikasi sebagai dokumen resmi laboratorium.
            </div>
          </div>
        </div>

        <Card className="bg-white shadow-sm dark:bg-slate-900">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Nomor Pengujian
                </div>
                <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {doc.referenceNumber}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">Nama Pelanggan</div>
                  <div className="mt-1 font-medium">{customerName}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Alamat</div>
                  <div className="mt-1 font-medium">{doc.projectAddress || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Metode Uji</div>
                  <div className="mt-1 font-medium">{doc.testType || "-"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Acuan</div>
                  <div className="mt-1 font-medium">{getConcreteTypeLabel(doc.concreteType)}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">No. Pengujian</div>
                  <div className="mt-1 font-medium">{testNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Jumlah Contoh</div>
                  <div className="mt-1 font-medium">{sampleCount}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Terima Tanggal</div>
                  <div className="mt-1 font-medium">{formatDate(doc.receivedDate.toISOString())}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Diuji Tanggal</div>
                  <div className="mt-1 font-medium">{formatDate(doc.testingDate.toISOString())}</div>
                </div>
                {doc.publishedAt && (
                  <div className="col-span-2">
                    <div className="text-xs text-muted-foreground">Tanggal Publish</div>
                    <div className="mt-1 font-medium">{formatDate(doc.publishedAt.toISOString())}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-white">
                <QRCodeSVG value={verifyUrl} size={140} />
              </div>
              <div className="max-w-[160px] text-center text-xs text-muted-foreground">
                Scan QR untuk melihat validasi detail
              </div>
            </div>
          </div>
        </Card>

        <PublicResultTable rows={doc.resultRows} />

        <div className="space-y-4">
          <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Lampiran
          </div>
          <AttachmentGallery attachments={attachments} size="large" />
        </div>

        <div className="pt-4 text-center text-xs text-muted-foreground">
          Data ditarik pada {new Date().toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  );
}

function VerifyError({
  title,
  message,
  icon,
}: {
  title: string;
  message: string;
  icon: "invalid" | "revoked";
}) {
  const Icon = icon === "revoked" ? ShieldOff : ShieldX;
  const colorClass = icon === "revoked" ? "text-amber-600" : "text-red-600";
  const bgClass = icon === "revoked" ? "bg-amber-100" : "bg-red-100";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 dark:from-slate-950 dark:to-slate-900">
      <Card className="max-w-md w-full bg-white p-10 text-center shadow-xl dark:bg-slate-900">
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${bgClass}`}>
          <Icon className={`h-8 w-8 ${colorClass}`} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{message}</p>
      </Card>
    </div>
  );
}
