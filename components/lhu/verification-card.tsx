"use client";

import { useRef } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VerificationCardProps {
  token: string;
  appUrl: string;
  fileName?: string;
}

/** Menampilkan QR Code dan link verifikasi publik pada halaman publish. */
export function VerificationCard({ token, appUrl, fileName = "QR-Verifikasi.png" }: VerificationCardProps) {
  const publicUrl = `${appUrl}/verify/${token}`;
  const hasToken = Boolean(token);
  const qrRef = useRef<HTMLCanvasElement>(null);

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

  return (
    <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,240,255,0.92))] dark:bg-slate-900/80 dark:border-slate-800">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center rounded-[28px] border border-primary/10 bg-white p-6 shadow-glow">
          <QRCodeCanvas
            ref={qrRef}
            value={hasToken ? publicUrl : appUrl}
            size={176}
            level="H"
          />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Verification Token</div>
          <div className="mt-1 text-xl font-semibold">{token || "-"}</div>
          <div className="mt-5 text-sm text-muted-foreground break-all">
            {hasToken ? publicUrl : "Token publik akan tersedia setelah dokumen dipublish."}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {hasToken ? (
              <Button variant="secondary" asChild>
                <Link href={publicUrl} target="_blank">Preview public page</Link>
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                Preview public page
              </Button>
            )}
            <Button
              onClick={() => navigator.clipboard.writeText(publicUrl)}
              disabled={!hasToken}
            >
              Copy verification link
            </Button>
            <Button
              variant="outline"
              onClick={handleDownload}
              disabled={!hasToken}
              className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700 dark:text-indigo-400 dark:border-indigo-800 dark:bg-indigo-950/30"
            >
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
