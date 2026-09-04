"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Camera, ScanLine, Search, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Detector = new (options?: { formats?: string[] }) => {
  detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
};

export function VerifySearchClient({ defaultValue, error }: { defaultValue: string; error: boolean }) {
  const [value, setValue] = useState(defaultValue);
  const [scanning, setScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);

  function stopScanner() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  useEffect(() => () => stopScanner(), []);

  async function startScanner() {
    const DetectorClass = (window as unknown as { BarcodeDetector?: Detector }).BarcodeDetector;
    if (!DetectorClass || !navigator.mediaDevices?.getUserMedia) {
      setScanning(true);
      setScanMessage("Scanner tidak didukung browser ini. Masukkan nomor secara manual.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } } });
      streamRef.current = stream;
      setScanning(true);
      setScanMessage("Arahkan kamera ke QR atau barcode dokumen LHU.");
      const video = videoRef.current;
      if (!video) return;
      video.srcObject = stream;
      await video.play();
      const detector = new DetectorClass({ formats: ["qr_code", "code_128", "code_39", "ean_13", "ean_8", "upc_a"] });
      const scan = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          frameRef.current = requestAnimationFrame(scan);
          return;
        }
        try {
          const result = (await detector.detect(videoRef.current))[0]?.rawValue?.trim();
          if (result) {
            stopScanner();
            setScanning(false);
            try {
              const url = new URL(result);
              if (url.origin === window.location.origin && url.pathname.startsWith("/verify/")) {
                window.open(url.href, "_blank", "noopener,noreferrer");
                setValue("");
                return;
              }
            } catch { /* Barcode contains an identifier. */ }
            setValue(result);
            setScanMessage("Nomor berhasil dibaca. Tekan Verifikasi.");
            return;
          }
        } catch {
          setScanMessage("Kamera aktif. Arahkan ke barcode yang terlihat jelas.");
        }
        frameRef.current = requestAnimationFrame(scan);
      };
      frameRef.current = requestAnimationFrame(scan);
    } catch {
      setScanning(true);
      setScanMessage("Kamera tidak dapat dibuka. Periksa izin kamera atau masukkan nomor manual.");
    }
  }

  function closeScanner() {
    stopScanner();
    setScanning(false);
    setScanMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const identifier = new FormData(event.currentTarget).get("identifier")?.toString().trim();
    if (!identifier) return;
    window.open(`/verify?identifier=${encodeURIComponent(identifier)}`, "_blank", "noopener,noreferrer");
    setValue("");
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="identifier" className="block text-sm font-semibold text-slate-800">Nomor order atau nomor LHU</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative min-w-0 flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><Input id="identifier" name="identifier" value={value} onChange={(event) => setValue(event.target.value)} placeholder="GIS2701HOF0007 atau LP/J-0034D/26" required className="h-12 rounded-xl border-slate-200 pl-12 text-base" /></div>
          <Button type="submit" className="h-12 rounded-xl bg-cyan-600 px-6 font-bold hover:bg-cyan-700">Verifikasi</Button>
        </div>
      </form>
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 sm:flex-row"><span className="flex items-center gap-3 text-sm text-slate-600"><ScanLine className="h-5 w-5 text-cyan-600" />Scan QR/barcode dokumen LHU</span><Button type="button" variant="outline" onClick={startScanner} className="w-full rounded-lg border-cyan-200 text-cyan-700 sm:w-auto"><Camera className="mr-2 h-4 w-4" />Buka Kamera</Button></div>
      {error && <div className="flex gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800" role="alert"><X className="h-5 w-5 shrink-0" /><span><strong>Dokumen tidak ditemukan.</strong> Pastikan nomor benar dan dokumen sudah dipublikasikan.</span></div>}
      {scanning && <div className="overflow-hidden rounded-xl bg-slate-950"><div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-white"><span>Pemindai dokumen</span><button type="button" onClick={closeScanner} aria-label="Tutup pemindai"><X className="h-5 w-5" /></button></div><div className="relative aspect-video"><video ref={videoRef} muted playsInline className="h-full w-full object-cover" /><div className="pointer-events-none absolute inset-[18%] rounded-xl border-2 border-cyan-300" /></div><p className="px-4 py-3 text-center text-xs text-slate-300">{scanMessage}</p></div>}
      <div className="flex items-center gap-2 text-xs text-slate-500"><ShieldCheck className="h-4 w-4 text-cyan-600" />Hanya dokumen published dengan token aktif yang dapat diverifikasi.</div>
    </div>
  );
}
