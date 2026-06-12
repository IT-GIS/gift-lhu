"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { deleteMessageAction } from "@/app/(app)/messages/actions";

export function DeleteMessageButton({ messageId, messageName }: { messageId: string; messageName: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Hapus pesan dari "${messageName}"?\n\nTindakan ini tidak bisa dibatalkan.`)) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form ref={formRef} action={deleteMessageAction}>
      <input type="hidden" name="messageId" value={messageId} />
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/60"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Hapus
      </button>
    </form>
  );
}
