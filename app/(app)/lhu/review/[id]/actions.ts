"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { lhuReviews } from "@/lib/db/schema";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { getLhuDocumentById, setLhuStatus } from "@/lib/db/queries/lhu";
import { insertAuditLog } from "@/lib/db/queries/audit";
import { randomUUID } from "crypto";

function invalidatePaths(id: string) {
  revalidatePath("/lhu");
  revalidatePath("/lhu/review");
  revalidatePath(`/lhu/${id}`);
  revalidatePath(`/lhu/review/${id}`);
}

async function insertReview(
  lhuDocumentId: string,
  reviewerUserId: string,
  action: "review" | "approve" | "return_revision" | "reject",
  comment?: string
) {
  await db.insert(lhuReviews).values({
    id: randomUUID(),
    lhuDocumentId,
    reviewerUserId,
    action,
    comment: comment ?? null,
    createdAt: new Date(),
  });
}

/**
 * QA approves the document (status: review → approved)
 */
export async function approveLhuAction(id: string, notes?: string) {
  const session = await requireSession();
  assertPermission(session, "approveDocument");

  const doc = await getLhuDocumentById(id);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };
  if (doc.status !== "review" && doc.status !== "draft") {
    return { success: false, error: "Hanya dokumen berstatus draft atau review yang bisa diapprove." };
  }

  await setLhuStatus(id, "approved", {
    approvalNotes: notes,
    approvedByUserId: session.id,
  });

  await insertReview(id, session.id, "approve", notes);

  await insertAuditLog({
    userId: session.id,
    action: "approve",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { notes },
  });

  invalidatePaths(id);
  return { success: true };
}

/**
 * QA returns document for revision (status: review → revisi)
 */
export async function returnLhuAction(id: string, notes?: string) {
  const session = await requireSession();
  assertPermission(session, "returnRevision");

  const doc = await getLhuDocumentById(id);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };
  if (doc.status !== "review" && doc.status !== "draft") {
    return { success: false, error: "Hanya dokumen berstatus draft atau review yang bisa dikembalikan." };
  }

  await setLhuStatus(id, "revisi");
  await insertReview(id, session.id, "return_revision", notes);

  await insertAuditLog({
    userId: session.id,
    action: "return_revision",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { notes },
  });

  invalidatePaths(id);
  return { success: true };
}
