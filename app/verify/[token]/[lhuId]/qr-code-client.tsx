"use client";

import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface QrCodeClientProps {
  /** URL yang di-encode ke dalam QR Code */
  value: string;
  /** Nomor LHU, digunakan sebagai nama file saat diunduh */
  lhuNumber: string;
  /** URL opsional untuk membuka tampilan klien publik */
  previewUrl?: string;
}

/**
 * QrCodeClient Component
 * Menampilkan QR Code yang dapat di-scan klien untuk verifikasi dokumen LHU.
 * Menyediakan tombol unduh gambar QR (PNG) dan tautan ke tampilan klien publik.
 */
export function QrCodeClient({ value, lhuNumber, previewUrl }: QrCodeClientProps) {
  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement;
    if (!canvas) return;

    // Convert canvas ke data URL lalu picu unduhan
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;

    // Sanitasi nomor LHU agar aman dipakai sebagai nama file
    const safeFilename =
      lhuNumber && lhuNumber !== "-"
        ? `QR-${lhuNumber.replace(/[^a-zA-Z0-9]/g, "-")}.png`
        : "QR-Verify.png";

    downloadLink.download = safeFilename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="bg-white p-5 rounded-xl border-2 border-slate-100 shadow-sm shrink-0 flex flex-col items-center group hover:border-indigo-200 transition-colors w-full max-w-[220px]">
      <div className="p-2 bg-white rounded-lg group-hover:scale-[1.03] transition-transform">
        <QRCodeCanvas
          id="qr-canvas"
          value={value}
          size={160}
          level="H"
          includeMargin={false}
        />
      </div>
      <span className="text-[10px] text-slate-500 mt-4 mb-2 font-semibold tracking-[0.2em] uppercase text-center">
        Scan to Verify
      </span>
      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs font-medium border-slate-200 hover:bg-slate-50 text-slate-700"
        onClick={downloadQR}
      >
        <Download className="mr-2 h-3.5 w-3.5" />
        Unduh QR
      </Button>
      {previewUrl && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          asChild
        >
          <a href={previewUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-3 w-3" />
            Buka Tampilan Klien
          </a>
        </Button>
      )}
    </div>
  );
}

