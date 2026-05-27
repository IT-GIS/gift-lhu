"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteLhuAction } from "@/app/(app)/lhu/actions";

interface DeleteLhuButtonProps {
  id: string;
  label: string;
}

export function DeleteLhuButton({ id, label }: DeleteLhuButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setError("");
    startTransition(async () => {
      const result = await deleteLhuAction(id);
      if (!result.success) {
        setError(result.error || "Gagal menghapus data LHU.");
        return;
      }

      setIsOpen(false);
      router.refresh();
    });
  };

  return (
    <>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="h-8 border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
        Hapus
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Hapus Data LHU?
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Data <span className="font-semibold">{label}</span> akan dihapus dari daftar LHU beserta tabel hasil, lampiran, review, dan token QR.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Batal
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Ya, Hapus
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
