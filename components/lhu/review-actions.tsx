"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { approveLhuAction, returnLhuAction } from "@/app/(app)/lhu/review/[id]/actions";

export function ReviewHeaderActions({ id }: { id: string }) {
  const router = useRouter();
  const [isApproving, startApprove] = useTransition();
  const [isReturning, startReturn] = useTransition();

  const handleApprove = () => {
    startApprove(async () => {
      const result = await approveLhuAction(id);
      if (result?.success) router.push("/lhu");
      else alert(result?.error || "Gagal approve.");
    });
  };

  const handleReturn = () => {
    startReturn(async () => {
      const result = await returnLhuAction(id);
      if (result?.success) router.push("/lhu");
      else alert(result?.error || "Gagal mengembalikan.");
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={handleReturn} disabled={isReturning || isApproving} className="w-full sm:w-auto">
        {isReturning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
        {isReturning ? "Mengirim..." : "Return Revision"}
      </Button>
      <Button onClick={handleApprove} disabled={isApproving || isReturning} className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
        {isApproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
        {isApproving ? "Memproses..." : "Approve Dokumen"}
      </Button>
    </>
  );
}

/**
 * Panel komentar QA di bawah: textarea catatan + tombol Kembalikan / Approve.
 * Digunakan di dalam Card kanan pada halaman review detail.
 */
export function ReviewPanelActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [notes, setNotes] = useState("");

  const handleApprove = async () => {
    setIsApproving(true);
    await approveLhuAction(id, notes);
    setIsApproving(false);
    router.push("/lhu");
  };

  const handleReturn = async () => {
    setIsReturning(true);
    await returnLhuAction(id, notes);
    setIsReturning(false);
    router.push("/lhu/review");
  };

  return (
    <>
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Tuliskan catatan review, koreksi, wajib diisi apabila memilih Return Revision..."
        className="min-h-[120px] bg-white dark:bg-slate-900 dark:border-slate-700 transition-shadow focus-visible:ring-indigo-500"
      />
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <Button variant="outline" onClick={handleReturn} disabled={isReturning || isApproving || !notes.trim()} className="w-full sm:w-auto hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200">
          {isReturning ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
          Kembalikan sebagai Draft
        </Button>
        <Button onClick={handleApprove} disabled={isApproving || isReturning} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 shadow-md hover:-translate-y-0.5 transition-transform">
          {isApproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
          Approve & Lock for Publish
        </Button>
      </div>
    </>
  );
}
