"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, FileOutput, Loader2, Rocket, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publishLhuAction, revokeLhuAction } from "./actions";

export function PublishActions({
  id,
  docToken,
  isPublished,
  currentStatus,
}: {
  id: string;
  docToken: string;
  isPublished: boolean;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isPublishing, startPublish] = useTransition();
  const [isRevoking, startRevoke] = useTransition();
  const [revokeReason, setRevokeReason] = useState("");
  const [showRevokeInput, setShowRevokeInput] = useState(false);

  const handlePublish = () => {
    startPublish(async () => {
      const result = await publishLhuAction(id);
      if (result?.success) {
        router.push(`/verify/${result.token}`);
      } else {
        alert(result?.error || "Gagal mempublish dokumen.");
      }
    });
  };

  const handleRevoke = () => {
    if (!revokeReason.trim()) {
      alert("Alasan revoke wajib diisi.");
      return;
    }
    startRevoke(async () => {
      const result = await revokeLhuAction(id, revokeReason);
      if (result?.success) {
        router.push(`/lhu/${id}`);
        router.refresh();
      } else {
        alert(result?.error || "Gagal merevoke dokumen.");
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button variant="secondary" asChild>
        <Link href={`/lhu/${id}/print`} target="_blank">
          <Eye className="mr-2 h-4 w-4" />
          Preview Print
        </Link>
      </Button>

      {!isPublished && currentStatus === "approved" && (
        <Button
          onClick={handlePublish}
          disabled={isPublishing}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isPublishing ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
          ) : (
            <><Rocket className="mr-2 h-4 w-4" /> Publish Final</>
          )}
        </Button>
      )}

      {isPublished && !showRevokeInput && (
        <Button
          variant="destructive"
          onClick={() => setShowRevokeInput(true)}
        >
          <ShieldOff className="mr-2 h-4 w-4" />
          Revoke Dokumen
        </Button>
      )}

      {isPublished && showRevokeInput && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={revokeReason}
            onChange={(e) => setRevokeReason(e.target.value)}
            placeholder="Alasan revoke (wajib diisi)"
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm w-64"
          />
          <Button
            variant="destructive"
            onClick={handleRevoke}
            disabled={isRevoking || !revokeReason.trim()}
          >
            {isRevoking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Konfirmasi Revoke"}
          </Button>
          <Button variant="ghost" onClick={() => setShowRevokeInput(false)}>
            Batal
          </Button>
        </div>
      )}
    </div>
  );
}
