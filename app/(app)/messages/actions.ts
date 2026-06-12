"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { deleteContactMessage, getContactMessageErrorMessage } from "@/lib/db/queries/contact-messages";

function withMessage(path: string, type: "success" | "error", message: string) {
  const params = new URLSearchParams({ [type]: message });
  return `${path}?${params.toString()}`;
}

export async function deleteMessageAction(formData: FormData) {
  const session = await requireSession();
  assertPermission(session, "viewContactMessages");

  const messageId = formData.get("messageId");
  if (typeof messageId !== "string" || !messageId) {
    redirect(withMessage("/messages", "error", "ID pesan tidak valid."));
  }

  try {
    await deleteContactMessage(messageId);
    revalidatePath("/messages");
  } catch (error) {
    redirect(withMessage("/messages", "error", getContactMessageErrorMessage(error)));
  }

  redirect(withMessage("/messages", "success", "Pesan berhasil dihapus."));
}
