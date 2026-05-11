"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/** Props untuk VerificationCard. */
interface VerificationCardProps {
  /** Token publik unik dokumen untuk URL verifikasi. */
  token: string;
  /** Base URL aplikasi (dari env APP_URL). */
  appUrl: string;
}

/** Menampilkan QR Code dan link verifikasi publik pada halaman publish. */
export function VerificationCard({ token, appUrl }: VerificationCardProps) {
  const publicUrl = `${appUrl}/verify/${token}`;
  const hasToken = Boolean(token);

  return (
    <Card className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,240,255,0.92))] dark:bg-slate-900/80 dark:border-slate-800">
      <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="flex justify-center rounded-[28px] border border-primary/10 bg-white p-6 shadow-glow">
          <QRCodeSVG value={hasToken ? publicUrl : appUrl} size={176} />
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
                <Link href={publicUrl}>Preview public page</Link>
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
          </div>
        </div>
      </div>
    </Card>
  );
}
