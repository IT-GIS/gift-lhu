"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { deletePostAction } from "@/app/(app)/posts/actions";

export function DeletePostButton({ postId, postTitle }: { postId: string; postTitle: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Hapus post "${postTitle}"?\n\nTindakan ini tidak bisa dibatalkan.`)) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form ref={formRef} action={deletePostAction}>
      <input type="hidden" name="postId" value={postId} />
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
