"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  getLhuDocumentById,
  upsertResultRows,
  setLhuStatus,
  ResultRowInput,
} from "@/lib/db/queries/lhu";
import { insertAuditLog } from "@/lib/db/queries/audit";

export interface SaveResultRowInput {
  rowNumber: number;
  sampleCode: string;
  castingDate: string;
  testingDate: string;
  ageDays: number;
  weight?: string | null;
  dimension?: string | null;
  maxLoad?: string | null;
  compressiveStrength?: string | null;
  compressiveStrengthKgCm2?: string | null;
  cubeConversionStrengthKgCm2?: string | null;
  failurePattern?: string | null;
  remarks?: string | null;
  analystName?: string | null;
}

/**
 * Save result rows to DB (overwrite existing) without changing status.
 */
export async function saveResultsAction(
  lhuDocumentId: string,
  rows: SaveResultRowInput[]
) {
  const session = await requireSession();
  assertPermission(session, "inputResults");

  const doc = await getLhuDocumentById(lhuDocumentId);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };

  const allowedStatuses = ["draft", "input_hasil", "revisi"];
  if (!allowedStatuses.includes(doc.status)) {
    return { success: false, error: `Status dokumen '${doc.status}' tidak mengizinkan input hasil.` };
  }

  const dbRows: ResultRowInput[] = rows.map((r) => ({
    rowNumber: r.rowNumber,
    sampleCode: r.sampleCode,
    castingDate: new Date(r.castingDate),
    testingDate: new Date(r.testingDate),
    ageDays: r.ageDays,
    weight: r.weight || null,
    dimension: r.dimension || null,
    maxLoad: r.maxLoad || null,
    compressiveStrength: r.compressiveStrength || null,
    compressiveStrengthKgCm2: r.compressiveStrengthKgCm2 || null,
    cubeConversionStrengthKgCm2: r.cubeConversionStrengthKgCm2 || null,
    failurePattern: r.failurePattern || null,
    remarks: r.remarks || null,
    analystName: r.analystName || null,
  }));

  await upsertResultRows(lhuDocumentId, dbRows);

  // Move status to input_hasil if still draft
  if (doc.status === "draft") {
    await setLhuStatus(lhuDocumentId, "input_hasil");
  }

  await insertAuditLog({
    userId: session.id,
    action: "input_results",
    entityType: "lhu_documents",
    entityId: lhuDocumentId,
    metadata: { rowCount: rows.length },
  });

  revalidatePath(`/lhu/${lhuDocumentId}`);
  revalidatePath(`/lhu/${lhuDocumentId}/results`);

  return { success: true };
}

/**
 * Submit document for QA review (status: input_hasil → review).
 */
export async function submitForReviewAction(lhuDocumentId: string) {
  const session = await requireSession();
  assertPermission(session, "submitForReview");

  const doc = await getLhuDocumentById(lhuDocumentId);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };

  if (doc.status !== "input_hasil" && doc.status !== "revisi") {
    return {
      success: false,
      error: `Dokumen harus berstatus 'input_hasil' atau 'revisi' untuk dikirim ke review. Status saat ini: '${doc.status}'.`,
    };
  }

  if (!doc.resultRows || doc.resultRows.length === 0) {
    return { success: false, error: "Tidak bisa mengirim ke review tanpa hasil uji." };
  }

  await setLhuStatus(lhuDocumentId, "review");

  await insertAuditLog({
    userId: session.id,
    action: "submit_review",
    entityType: "lhu_documents",
    entityId: lhuDocumentId,
    metadata: { rowCount: doc.resultRows.length },
  });

  revalidatePath("/lhu");
  revalidatePath("/lhu/review");
  revalidatePath(`/lhu/${lhuDocumentId}`);

  return { success: true };
}
