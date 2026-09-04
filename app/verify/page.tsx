import Image from "next/image";
import Link from "next/link";
import { FileCheck2, LockKeyhole, ScanLine, SearchCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getPublishedLhuTokenByIdentifier } from "@/lib/db/queries/lhu";
import { VerifySearchClient } from "./verify-search-client";

export const metadata = { title: "Verifikasi LHU | GIFT Laboratory", description: "Verifikasi keaslian Laporan Hasil Uji GIFT Laboratory." };

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ identifier?: string }> }) {
  const params = await searchParams;
  const identifier = params.identifier?.trim() ?? "";
  if (identifier) {
    const token = await getPublishedLhuTokenByIdentifier(identifier);
    if (token) redirect(`/verify/${encodeURIComponent(token)}`);
  }
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-900">
      <header className="absolute inset-x-0 top-4 z-20 px-4 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/60 bg-white/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Kembali ke beranda"><Image src="/landing/logo-gift3.png" alt="Logo GIFT" width={42} height={42} className="h-9 w-9 shrink-0 object-contain" priority /><span className="truncate text-sm font-black tracking-tight sm:text-base">Global Inspeksi Forensik Teknik</span></Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama"><Link href="/" className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-cyan-50">Beranda</Link><Link href="/profile" className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-cyan-50">Profil</Link><Link href="/services" className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-cyan-50">Layanan</Link><Link href="/contact" className="rounded-full px-4 py-2 text-sm font-bold text-slate-600 hover:bg-cyan-50">Kontak</Link><Link href="/verify" className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-bold text-white">Verifikasi LHU</Link></nav>
        <details className="relative md:hidden"><summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full bg-cyan-50 text-cyan-700 [&::-webkit-details-marker]:hidden"><ScanLine className="h-5 w-5" /></summary><div className="absolute right-0 top-12 grid min-w-44 gap-1 rounded-2xl border bg-white p-2 text-sm font-bold shadow-xl"><Link href="/" className="rounded-xl px-3 py-2">Beranda</Link><Link href="/profile" className="rounded-xl px-3 py-2">Profil</Link><Link href="/services" className="rounded-xl px-3 py-2">Layanan</Link><Link href="/contact" className="rounded-xl px-3 py-2">Kontak</Link></div></details>
      </div></header>
      <section className="relative isolate flex min-h-screen items-center px-4 py-28 sm:px-6 lg:px-8"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,.16),transparent_32%),linear-gradient(135deg,#071525,#0c2238_55%,#071525)]" /><div className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(148,163,184,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.16)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20"><div className="text-white"><div className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100"><SearchCheck className="h-4 w-4 text-cyan-300" />Portal verifikasi publik</div><h1 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Pastikan LHU Anda <span className="text-cyan-300">resmi.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">Masukkan nomor order atau nomor LHU untuk membuka laporan hasil uji yang telah dipublikasikan oleh GIFT Laboratory.</p><div className="mt-8 grid max-w-lg gap-4 sm:grid-cols-3"><div className="border-l border-cyan-300/40 pl-3"><FileCheck2 className="mb-2 h-5 w-5 text-cyan-300" /><p className="text-xs text-slate-300">Data resmi</p></div><div className="border-l border-cyan-300/40 pl-3"><ScanLine className="mb-2 h-5 w-5 text-cyan-300" /><p className="text-xs text-slate-300">Scan barcode</p></div><div className="border-l border-cyan-300/40 pl-3"><LockKeyhole className="mb-2 h-5 w-5 text-cyan-300" /><p className="text-xs text-slate-300">Akses aman</p></div></div></div>
          <Card className="border-0 bg-white p-5 shadow-2xl sm:p-8 lg:p-10"><div className="mb-8 flex items-center justify-between gap-4 border-b border-slate-100 pb-6"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-600">GIFT Laboratory</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Verifikasi dokumen LHU</h2></div><Image src="/landing/logo-gift3.png" alt="Logo GIFT Laboratory" width={62} height={62} className="h-14 w-14 object-contain" /></div><VerifySearchClient defaultValue={identifier} error={Boolean(identifier)} /><p className="mt-7 text-xs text-slate-400">Contoh: GIS2701HOF0007 atau LP/J-0034D/26</p></Card>
        </div>
      </section>
    </main>
  );
}
