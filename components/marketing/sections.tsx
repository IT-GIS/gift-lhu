"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  FileCheck2,
  FileSearch2,
  FolderKanban,
  QrCode,
  ScrollText,
  ShieldCheck,
  Undo2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  { icon: FileCheck2, title: "Draft to Publish Workflow", description: "Alur sederhana dari input awal sampai dokumen final dengan kendali status yang jelas." },
  { icon: QrCode, title: "QR / Barcode Verification", description: "Token publik unik hanya dibuat saat dokumen resmi dipublish." },
  { icon: FolderKanban, title: "Beton Silinder & Kubus", description: "Header acuan mengikuti format bisnis laboratorium tanpa membingungkan pengguna." },
  { icon: ScrollText, title: "Multi-row Result Table", description: "Satu LHU mendukung banyak benda uji dengan tabel hasil yang nyaman diisi." },
  { icon: ShieldCheck, title: "QA Review", description: "Approve, return for revision, dan histori review untuk menjaga kendali mutu." },
  { icon: Upload, title: "Lampiran Pengujian", description: "Foto benda uji, foto alat, dan catatan visual dapat dilampirkan rapi." },
  { icon: BadgeCheck, title: "PDF Export", description: "Siap cetak dan siap kirim ke klien dengan QR verifikasi yang konsisten." },
  { icon: Undo2, title: "Revocation Support", description: "Dokumen yang tidak berlaku lagi tetap punya jejak audit yang aman." },
  { icon: FileSearch2, title: "Audit Trail", description: "Aktivitas penting terekam sejak draft, review, publish, hingga revoke." },
];

const workflow = ["Buat Draft", "Input Hasil", "Review QA", "Publish", "Scan QR", "Validasi LHU"];

export function MarketingSections() {
  return (
    <>
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            ["Verification-ready", "QR baru aktif saat dokumen resmi terbit."],
            ["Audit-friendly", "Riwayat perubahan dan status tersusun untuk keperluan audit."],
            ["Role-based approval", "Frontdesk, Lab, QA, dan Admin punya batas akses yang jelas."],
          ].map(([title, desc]) => (
            <Card key={title} className="bg-white/70">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <Card className="bg-white/70">
            <CardHeader>
              <Badge className="w-fit bg-destructive/10 text-destructive">Masalah Manual</Badge>
              <CardTitle className="mt-3 text-3xl">LHU sulit diverifikasi ketika barcode hanya jadi gambar tempelan.</CardTitle>
              <CardDescription className="text-base leading-7">
                Dalam alur manual, approval lambat, revisi tidak tercatat, lampiran tercecer, dan hasil scan sering tidak
                terhubung ke sistem verifikasi yang benar.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-[linear-gradient(135deg,rgba(99,102,241,0.09),rgba(255,255,255,0.84))]">
            <CardHeader>
              <Badge className="w-fit bg-success/10 text-success">Solusi Produk</Badge>
              <CardTitle className="mt-3 text-3xl">Satu workflow rapi dari draft sampai bukti validitas publik.</CardTitle>
              <CardDescription className="text-base leading-7">
                Dokumen final hanya dipublish setelah approval, token dibuat aman, QR aktif, dan halaman publik menampilkan
                status VALID, TIDAK VALID, atau REVOKED secara meyakinkan.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section id="features" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Features</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Dirancang untuk workflow laboratorium yang serius.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fokus pada trust, clarity, dan simplicity — bukan dashboard yang ramai tapi membingungkan.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full bg-white/72">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="mt-3 leading-7">{feature.description}</CardDescription>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Workflow</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Sederhana untuk user awam, tetap kuat untuk audit.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-6">
            {workflow.map((item, index) => (
              <Card key={item} className="bg-white/75 p-5 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="text-sm font-medium">{item}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="verification" className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(233,243,255,0.9))]">
            <CardHeader>
              <Badge className="w-fit bg-success/10 text-success">Simulation</Badge>
              <CardTitle className="mt-3 text-3xl">Hasil scan yang terlihat resmi dan mudah dipercaya klien.</CardTitle>
              <CardDescription className="text-base leading-7">
                Menampilkan badge validitas, nomor LHU, jenis pengujian, tipe beton, tanggal terbit, dan ringkasan hasil
                tanpa membuat publik melihat data internal yang tidak perlu.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/80 p-8">
            <div className="rounded-[28px] border border-success/20 bg-success/5 p-8">
              <Badge className="bg-success text-success-foreground">VALID</Badge>
              <h3 className="mt-5 text-2xl font-semibold">LHU-BTN/2026/0031</h3>
              <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
                <div><span className="text-muted-foreground">Pelanggan</span><div className="mt-1 font-medium">PT Beton Konstruksi Nusantara</div></div>
                <div><span className="text-muted-foreground">Jenis Uji</span><div className="mt-1 font-medium">Kuat Tekan Beton</div></div>
                <div><span className="text-muted-foreground">Acuan</span><div className="mt-1 font-medium">Beton Silinder</div></div>
                <div><span className="text-muted-foreground">Tanggal Publish</span><div className="mt-1 font-medium">20 Maret 2026</div></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="contact" className="px-6 py-20">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-white/60 bg-[linear-gradient(135deg,rgba(99,102,241,0.12),rgba(255,255,255,0.95))] p-10 shadow-glass">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Ready to deploy internally</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em]">Mulai setup internal untuk workflow LHU yang lebih rapi.</h2>
              <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                Sistem ini cocok untuk perusahaan sertifikasi atau laboratorium yang ingin menggabungkan operasional internal
                dan verifikasi publik dalam satu produk yang kredibel.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/login">Masuk Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/verify/valid-demo-token">Lihat Sample Verification</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
