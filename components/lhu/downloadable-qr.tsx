"use client";

import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadableQRProps {
  url: string;
  size?: number;
  fileName?: string;
  showPreviewBtn?: boolean;
}

export function DownloadableQR({ 
  url, 
  size = 120, 
  fileName = "QR_Verifikasi.png",
  showPreviewBtn = true 
}: DownloadableQRProps) {
  const qrRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png");
    
    // Simulate anchor click to download
    const anchor = document.createElement("a");
    anchor.href = pngUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <QRCodeCanvas value={url} size={size} ref={qrRef} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDownload}
          className="h-8 text-xs px-3 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:hover:bg-indigo-900/50 border-indigo-200 dark:border-indigo-800"
        >
          <Download className="w-3.5 h-3.5 mr-1.5" />
          Download
        </Button>
        {showPreviewBtn && (
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="h-8 text-xs px-3 font-semibold"
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Preview URL
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
