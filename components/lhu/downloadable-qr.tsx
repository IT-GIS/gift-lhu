"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadableQRProps {
  url: string;
  size?: number;
  fileName?: string;
  showPreviewBtn?: boolean;
  showCopyBtn?: boolean;
}

export function DownloadableQR({
  url,
  size = 120,
  fileName = "QR_Verifikasi.png",
  showPreviewBtn = true,
  showCopyBtn = true,
}: DownloadableQRProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = pngUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <QRCodeCanvas value={url} size={size} ref={qrRef} level="H" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="h-8 text-xs px-3 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/50 border-indigo-200 dark:border-indigo-800"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Download QR
        </Button>
        {showCopyBtn && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 text-xs px-3 font-semibold"
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5 mr-1.5 text-green-600" />Tersalin!</>
            ) : (
              <><Copy className="w-3.5 h-3.5 mr-1.5" />Salin Link</>
            )}
          </Button>
        )}
        {showPreviewBtn && (
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 text-xs px-3 font-semibold"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Halaman Publik
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
