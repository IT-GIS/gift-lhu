"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { deleteLhuDocument, getLhuDocumentById } from "@/lib/db/queries/lhu";
import { insertAuditLog } from "@/lib/db/queries/audit";

export async function deleteLhuAction(id: string) {
  const session = await requireSession();
  assertPermission(session, "deleteLhu");

  const doc = await getLhuDocumentById(id);
  if (!doc) {
    return { success: false, error: "Data LHU tidak ditemukan." };
  }

  await deleteLhuDocument(id);

  await insertAuditLog({
    userId: session.id,
    action: "delete_document",
    entityType: "lhu_documents",
    entityId: id,
    metadata: {
      documentCode: doc.documentCode,
      lhuNumber: doc.lhuNumber,
      projectName: doc.projectName,
      customer: doc.customer?.companyName ?? null,
    },
  });

  revalidatePath("/lhu");
  revalidatePath("/dashboard");
  revalidatePath("/publish");

  return { success: true };
}
