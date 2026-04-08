"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, QrCode, FileCheck2, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const floatingCards = [
  { title: "Draft to Publish", icon: FileCheck2, position: "left-0 top-16" },
  { title: "QA Approval", icon: ShieldCheck, position: "right-10 top-8" },
  { title: "QR Verification", icon: QrCode, position: "right-0 bottom-10" },
];

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-20 pt-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-6 bg-primary/10 text-primary">Verification-ready • Audit-friendly • Role-based</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.7 }}
            className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-foreground md:text-7xl"
          >
            LHU Verification untuk laboratorium beton yang ingin terlihat rapi, cepat, dan meyakinkan.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            Kelola hasil uji kuat tekan beton, review QA, publikasi final, dan bukti verifikasi QR dalam satu alur yang
            terasa seperti produk SaaS premium — bukan form internal biasa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button size="lg" asChild>
              <Link href="#contact">
                Request Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/verify/valid-demo-token">
                <ScanSearch className="h-4 w-4" />
                Scan Sample Verification
              </Link>
            </Button>
          </motion.div>

          <div className="mt-10 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>• Beton Silinder & Beton Kubus</span>
            <span>• Multi-row hasil uji</span>
            <span>• Revocation support</span>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_44%)]" />
          <div className="absolute -left-10 top-4 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35),transparent_60%)] blur-3xl" />
          <div className="absolute right-0 top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),transparent_60%)] blur-3xl" />

          {floatingCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.08, duration: 0.6 }}
                className={`absolute hidden rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-glass backdrop-blur md:flex ${item.position}`}
              >
                <Icon className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{item.title}</span>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <Card className="relative overflow-hidden bg-white/75 p-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="grid gap-4">
                <div className="rounded-[24px] border border-border bg-[linear-gradient(135deg,rgba(99,102,241,0.12),rgba(255,255,255,0.8))] p-5">
                  <div className="text-sm text-muted-foreground">Dashboard Snapshot</div>
                  <div className="mt-2 text-2xl font-semibold">132 Published LHU</div>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-white/80 p-3">
                      <div className="text-xs text-muted-foreground">Draft</div>
                      <div className="mt-1 text-xl font-semibold">18</div>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-3">
                      <div className="text-xs text-muted-foreground">Review</div>
                      <div className="mt-1 text-xl font-semibold">7</div>
                    </div>
                    <div className="rounded-2xl bg-white/80 p-3">
                      <div className="text-xs text-muted-foreground">Revoked</div>
                      <div className="mt-1 text-xl font-semibold">2</div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[24px] border border-border bg-white/80 p-5">
                    <div className="text-sm font-medium">LHU Preview</div>
                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Nomor</span><span>LHU-BTN/2026/0031</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Acuan</span><span>Beton Silinder</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-primary">Published</span></div>
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(232,240,255,0.95))] p-5">
                    <div className="text-sm font-medium">Public Verification</div>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="rounded-[26px] border border-primary/20 bg-white p-6 shadow-glow">
                        <QrCode className="h-20 w-20 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
