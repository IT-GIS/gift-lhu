import { AlertTriangle, CheckCircle2, FileSearch, ShieldAlert } from "lucide-react";
import { PublicResultTable } from "@/components/lhu/public-result-table";
import { Card } from "@/components/ui/card";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

export default async function PublicClientScanPage({
  params,
}: {
  params: Promise<{ lhuId: string }>;
}) {
  const { lhuId } = await params;
  const doc = await getLhuDocumentById(lhuId);

  if (!doc) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 font-sans sm:px-6 md:py-16">
        <div className="mx-auto max-w-2xl">
          <Card className="rounded-2xl border-t-8 border-t-rose-500 bg-white p-8 text-center shadow-xl md:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 text-rose-500">
              <AlertTriangle className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">LHU TIDAK DITEMUKAN</h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Sistem gagal menemukan Dokumen Laporan Hasil Uji dengan identitas yang tercantum di QR code ini.
            </p>
            <div className="mt-10 border-t border-slate-100 pt-8 text-sm font-medium text-slate-500">
              Sistem Validasi LHU © PT. Global Inspeksi Forensik Teknik
            </div>
          </Card>
        </div>
      </main>
    );
  }

  const isValid = doc.status === "published";
  const isRevoked = doc.status === "revoked";
  const customerName = doc.customer?.companyName ?? "-";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 font-sans sm:px-6 sm:py-12 md:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="mb-10 flex flex-col items-center justify-center space-y-3 text-center">
          <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <FileSearch className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Verifikasi Keaslian LHU
          </h1>
          <p className="max-w-lg font-medium text-slate-500">
            Halaman Resmi Verifikasi Dokumen Laporan Hasil Uji Beton
          </p>
        </div>

        <Card className="relative overflow-hidden rounded-3xl border-slate-200/60 bg-white p-6 shadow-xl sm:p-10">
          <div
            className={`absolute left-0 top-0 h-2 w-full ${
              isValid ? "bg-emerald-500" : isRevoked ? "bg-rose-500" : "bg-amber-500"
            }`}
          />

          <div className="mb-8 flex flex-col justify-between gap-6 pt-2 sm:flex-row sm:items-start">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Status Registrasi
              </div>
              {isValid ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-emerald-700 shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold tracking-wide">DOKUMEN VALID</span>
                </div>
              ) : isRevoked ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-rose-700 shadow-sm">
                  <ShieldAlert className="h-5 w-5" />
                  <span className="font-bold tracking-wide">DOKUMEN TIDAK SAH (REVOKED)</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-4 py-2 text-amber-700 shadow-sm">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-bold tracking-wide">DOKUMEN DRAFT / PROSES</span>
                </div>
              )}
            </div>
            <div className="sm:text-right">
              <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Nomor Seri LHU
              </div>
              <div className="text-xl font-black text-slate-800 sm:text-2xl">
                {doc.referenceNumber || "Dalam Proses"}
              </div>
            </div>
          </div>

          {!isValid && (
            <div
              className={`mb-8 rounded-2xl border p-5 ${
                isRevoked
                  ? "border-rose-100 bg-rose-50 text-rose-800"
                  : "border-amber-100 bg-amber-50 text-amber-800"
              }`}
            >
              <h4 className="mb-1 font-bold">
                {isRevoked ? "Mengapa Dokumen Ini Tidak Sah?" : "Peringatan Dokumen"}
              </h4>
              <p className="text-sm">
                {isRevoked
                  ? doc.revokedReason
                  : "Dokumen ini belum berstatus diterbitkan secara publik. Hasil uji bersifat sementara."}
              </p>
            </div>
          )}

          <div className="grid gap-x-6 gap-y-6 rounded-2xl border border-slate-100 bg-slate-50 p-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Nama Pelanggan
              </div>
              <div className="font-semibold text-slate-800">{customerName}</div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Nama Proyek
              </div>
              <div className="font-semibold text-slate-800">{doc.projectName}</div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Parameter Uji
              </div>
              <div className="font-semibold text-slate-800">{doc.testType}</div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Bentuk Benda Uji
              </div>
              <div className="font-semibold text-slate-800">
                {getConcreteTypeLabel(doc.concreteType)}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Tanggal Diuji
              </div>
              <div className="font-semibold text-slate-800">
                {formatDate(doc.testingDate.toISOString())}
              </div>
            </div>
            <div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                Tanggal Publish LHU
              </div>
              <div className="font-semibold text-slate-800">
                {doc.publishedAt ? formatDate(doc.publishedAt.toISOString()) : "-"}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-100 pt-8" />

          <h3 className="mb-6 text-lg font-bold text-slate-900 sm:text-xl">
            Rekapitulasi Hasil Pengujian Kuat Tekan
          </h3>
          {doc.resultRows.length > 0 ? (
            <div className="mb-10">
              <PublicResultTable
                title="Rekapitulasi Hasil Pengujian Kuat Tekan"
                rows={doc.resultRows}
              />
            </div>
          ) : (
            <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm italic text-slate-500">
              Data hasil pengujian belum ditambahkan pada laporan ini.
            </div>
          )}

          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-slate-800 p-6 text-white sm:p-8 md:flex-row">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="mb-2 text-lg font-bold text-white/90">Pusat Verifikasi Laboratorium</h4>
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                Halaman digital ini adalah representasi tervalidasi dari Dokumen Fisik Laporan Hasil Uji (LHU) Beton.
                Segala upaya pemalsuan di luar data yang tercantum dinyatakan <strong>tidak sah</strong>.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-12 pb-20 text-center text-sm font-medium text-slate-400">
          Diterbitkan & Dilindungi Sistem Laboratorium © 2026
        </div>
      </div>
    </main>
  );
}
