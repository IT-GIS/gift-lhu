import Link from "next/link";
import { ShieldX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PublicClientScanPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8 font-sans">
      <Card className="max-w-md bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <ShieldX className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Link Verifikasi Tidak Berlaku
        </h1>
        <p className="mt-3 leading-relaxed text-slate-600">
          Halaman verifikasi publik harus dibuka menggunakan token QR resmi. Silakan gunakan link
          verifikasi yang dimulai dengan /verify/.
        </p>
        <Button asChild className="mt-7">
          <Link href="/">Kembali ke Website</Link>
        </Button>
      </Card>
    </main>
  );
}
