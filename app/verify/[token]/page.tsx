import Image from "next/image";
import { ShieldCheck, ShieldOff, ShieldX } from "lucide-react";
import { AttachmentGallery } from "@/components/lhu/attachment-gallery";
import { PublicResultTable } from "@/components/lhu/public-result-table";
import { Card } from "@/components/ui/card";
import logoGift from "@/picture/LOGO_GIFT.png";
import logoKanGift from "@/picture/LOGO_KAN_GIFT.png";
import { getLhuDocumentByToken } from "@/lib/db/queries/lhu";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

const LABORATORY_PROFILE = {
  companyName: "PT GLOBAL INSPEKSI FORENSIK TEKNIK",
  addressLines: [
    "Komplek 91 Distrik BSD blok C5 Pagedangan",
    "Desa/Kelurahan Pagedangan, Kec. Pagedangan, Kab. Tangerang,",
    "Provinsi Banten 15339",
  ],
  email: "globalinspeksiforensikteknik@gmail.com",
};

export default async function VerifyTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const doc = await getLhuDocumentByToken(token);

  if (!doc) {
    return (
      <VerifyError
        title="Token Tidak Valid"
        message="Token verifikasi ini tidak ditemukan atau tidak aktif dalam sistem kami."
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
        message="Dokumen terkait token ini belum dipublikasikan."
        icon="invalid"
      />
    );
  }

  if (!doc.activeToken || doc.activeToken.publicToken !== token || !doc.activeToken.isActive) {
    return (
      <VerifyError
        title="Token Tidak Aktif"
        message="Token verifikasi ini sudah tidak aktif. Mungkin telah diterbitkan token baru."
        icon="invalid"
      />
    );
  }

  const customerName = doc.customer?.companyName ?? "-";
  const attachments = doc.attachments.map((attachment) => ({
    id: attachment.id,
    category: attachment.category,
    fileName: attachment.fileName,
    caption: attachment.caption ?? "",
    fileUrl: attachment.fileUrl,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-3 py-6 dark:from-slate-950 dark:to-slate-900 sm:px-4 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30 sm:items-center sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50 sm:h-12 sm:w-12">
              <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <div className="text-base font-bold text-emerald-800 dark:text-emerald-300 sm:text-lg">
                Dokumen Terverifikasi
              </div>
              <div className="mt-0.5 text-xs leading-relaxed text-emerald-700 dark:text-emerald-400 sm:text-sm">
                Laporan ini telah diverifikasi sebagai dokumen resmi laboratorium.
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
          <Card className="overflow-hidden border-sky-100 bg-white px-3 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:px-5 sm:py-4 lg:px-6">
            <div className="grid gap-4 md:grid-cols-[minmax(0,185px)_1fr_minmax(0,210px)] md:items-center md:gap-5">
              <div className="flex justify-center md:justify-start">
                <Image
                  src={logoGift}
                  alt="Logo GIFT"
                  priority
                  className="h-auto w-full max-w-[130px] object-contain sm:max-w-[145px] lg:max-w-[185px]"
                />
              </div>

              <div className="min-w-0 space-y-2 text-center md:text-left">
                <div className="text-sm font-extrabold uppercase leading-tight tracking-tight text-blue-900 dark:text-blue-300 sm:text-base lg:text-[1.65rem]">
                  {LABORATORY_PROFILE.companyName}
                </div>
                <div className="space-y-1 text-[11px] leading-snug text-slate-900 dark:text-slate-100 sm:text-sm lg:text-[1rem]">
                  {LABORATORY_PROFILE.addressLines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="break-words text-[11px] leading-snug text-slate-900 dark:text-slate-100 sm:text-sm lg:text-[1rem]">
                  Email:{" "}
                  <a
                    href={`mailto:${LABORATORY_PROFILE.email}`}
                    className="break-all font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 transition-colors hover:text-blue-800 dark:text-blue-300 dark:decoration-blue-500"
                  >
                    {LABORATORY_PROFILE.email}
                  </a>
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 md:items-end">
                <Image
                  src={logoKanGift}
                  alt="Logo Komite Akreditasi Nasional"
                  priority
                  className="h-auto w-full max-w-[145px] object-contain sm:max-w-[165px] lg:max-w-[210px]"
                />
              </div>
            </div>
          </Card>

          <Card className="bg-white p-4 shadow-sm dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Laporan Hasil Pengujian
                  </div>
                  <div className="mt-1 break-words text-xl font-bold text-slate-900 dark:text-slate-100 sm:text-2xl">
                    {doc.referenceNumber}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="text-xs text-muted-foreground">Nama Pelanggan</div>
                    <div className="mt-1 break-words font-medium">{customerName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Nomor Pengujian</div>
                    <div className="mt-1 break-words font-medium">{doc.projectName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Acuan</div>
                    <div className="mt-1 break-words font-medium">{doc.testType}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Pengujian</div>
                    <div className="mt-1 font-medium">{getConcreteTypeLabel(doc.concreteType)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Tanggal Terima</div>
                    <div className="mt-1 font-medium">{formatDate(doc.receivedDate.toISOString())}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Tanggal Uji</div>
                    <div className="mt-1 font-medium">{formatDate(doc.testingDate.toISOString())}</div>
                  </div>
                  {doc.publishedAt && (
                    <div className="sm:col-span-2">
                      <div className="text-xs text-muted-foreground">Tanggal Publish</div>
                      <div className="mt-1 font-medium">{formatDate(doc.publishedAt.toISOString())}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <PublicResultTable
            rows={doc.resultRows}
            title="Tabel Hasil Pengujian"
            showSampleCount={false}
          />

          <div className="space-y-4">
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">
              Lampiran
            </div>
            <AttachmentGallery attachments={attachments} size="large" />
          </div>

          <div className="break-all pt-2 text-center text-[11px] text-muted-foreground sm:pt-4 sm:text-xs">
            Verifikasi dilakukan pada {new Date().toLocaleString("id-ID")} {"|"}{" "}
            <span className="font-mono">{token}</span>
          </div>
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
        <div className="mt-8 text-xs text-muted-foreground">
          Jika Anda merasa ini keliru, hubungi laboratorium yang menerbitkan dokumen ini.
        </div>
      </Card>
    </div>
  );
}
