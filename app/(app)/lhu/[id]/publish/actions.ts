"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { lhuVerificationTokens } from "@/lib/db/schema";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  getLhuDocumentById,
  setLhuStatus,
  createVerificationToken,
} from "@/lib/db/queries/lhu";
import { insertAuditLog } from "@/lib/db/queries/audit";

/**
 * Publish a document: status approved → published
 * - Uses No. Pengujian as final LHU number (locked after this)
 * - Creates verification token in DB
 * - Records publish timestamp
 */
export async function publishLhuAction(id: string) {
  const session = await requireSession();
  assertPermission(session, "publish");

  const doc = await getLhuDocumentById(id);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };

  if (doc.status !== "approved") {
    return {
      success: false,
      error: `Dokumen harus berstatus 'approved' untuk dipublish. Status saat ini: '${doc.status}'.`,
    };
  }

  // Use No. Pengujian from the form as final LHU number (immutable after publish)
  const lhuNumber = doc.projectName || doc.referenceNumber || doc.documentCode;

  // Create a new unique verification token in the DB
  const publicToken = await createVerificationToken(id);

  // Mark as published with final metadata
  await setLhuStatus(id, "published", {
    lhuNumber,
    publishedAt: new Date(),
  });

  await insertAuditLog({
    userId: session.id,
    action: "publish",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { lhuNumber, publicToken },
  });

  await insertAuditLog({
    userId: session.id,
    action: "generate_token",
    entityType: "lhu_verification_tokens",
    entityId: id,
    metadata: { publicToken },
  });

  revalidatePath("/lhu");
  revalidatePath("/dashboard");
  revalidatePath(`/lhu/${id}`);
  revalidatePath(`/lhu/${id}/publish`);

  return { success: true, token: publicToken, lhuNumber };
}

/**
 * Revoke a published document.
 * Token is deactivated. Verification page will show "not valid".
 */
export async function revokeLhuAction(id: string, reason: string) {
  const session = await requireSession();
  assertPermission(session, "revoke");

  const doc = await getLhuDocumentById(id);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };
  if (doc.status !== "published") {
    return { success: false, error: "Hanya dokumen published yang bisa direvoke." };
  }

  if (!reason.trim()) {
    return { success: false, error: "Alasan revoke wajib diisi." };
  }

  await setLhuStatus(id, "revoked", {
    revokedReason: reason.trim(),
    revokedAt: new Date(),
  });

  // Deactivate all verification tokens for this document
  await db
    .update(lhuVerificationTokens)
    .set({
      isActive: false,
      revokedReason: reason.trim(),
      updatedAt: new Date(),
    })
    .where(eq(lhuVerificationTokens.lhuDocumentId, id));

  await insertAuditLog({
    userId: session.id,
    action: "revoke",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { reason },
  });

  revalidatePath("/lhu");
  revalidatePath("/dashboard");
  revalidatePath(`/lhu/${id}`);
  revalidatePath(`/lhu/${id}/publish`);

  return { success: true };
}
