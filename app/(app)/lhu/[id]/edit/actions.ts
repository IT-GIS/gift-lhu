"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  updateLhuDraft,
  getLhuDocumentById,
  upsertResultRows,
  setLhuStatus,
  ResultRowInput,
} from "@/lib/db/queries/lhu";
import { upsertCustomer } from "@/lib/db/queries/customers";
import { insertAuditLog } from "@/lib/db/queries/audit";
import { lhuAttachments, lhuResultRows } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { TestRow } from "@/components/lhu/test-results-form";
import { saveLhuAttachmentImage, validateLhuAttachmentImages } from "@/lib/lhu/attachment-upload";

export interface UpdateLhuInput {
  customer: string;
  projectName: string;
  projectAddress: string;
  referenceNumber: string;
  concreteType: string;
  testType: string;
  receivedDate: string;
  testingDate: string;
  notes?: string;
  analystName?: string;
  attachmentProduk?: string[];
  attachmentPengujian?: string[];
  testRows?: TestRow[];
}

export async function updateLhuAction(id: string, input: UpdateLhuInput) {
  const session = await requireSession();
  assertPermission(session, "editDraft");
  validateLhuAttachmentImages(input.attachmentProduk, "produk");
  validateLhuAttachmentImages(input.attachmentPengujian, "pengujian");

  const doc = await getLhuDocumentById(id);
  if (!doc) return { success: false, error: "Dokumen tidak ditemukan." };

  const customer = await upsertCustomer({ companyName: input.customer.trim() });
  const concreteType =
    input.concreteType?.toLowerCase().includes("kubus") ? "kubus" : "silinder";

  await updateLhuDraft(id, {
    customerId: customer.id,
    projectName: input.projectName.trim(),
    projectAddress: input.projectAddress.trim(),
    referenceNumber: input.referenceNumber.trim(),
    testType: input.testType.trim(),
    concreteType,
    receivedDate: new Date(input.receivedDate),
    testingDate: new Date(input.testingDate),
    notes: input.notes?.trim(),
    updatedByUserId: session.id,
  });

  const now = new Date();

  // Handle Attachments
  const replaceAttachments = async (
    category: "produk" | "pengujian",
    files: string[] | undefined,
    prefix: string,
  ) => {
    if (!files || files.length === 0) return;

    try {
      const attachmentsToInsert = await Promise.all(
        files.map(async (file, idx) => ({
          id: randomUUID(),
          lhuDocumentId: id,
          category,
          fileUrl: await saveLhuAttachmentImage(file, `${prefix}-${idx}`),
          fileName: `gambar_${prefix}_${idx + 1}.jpg`,
          sortOrder: idx,
          createdAt: now,
          updatedAt: now,
        })),
      );

      await db.delete(lhuAttachments).where(
        and(eq(lhuAttachments.lhuDocumentId, id), eq(lhuAttachments.category, category)),
      );

      await db.insert(lhuAttachments).values(attachmentsToInsert);
    } catch (e) {
      console.error(`Gagal update lampiran ${category}`, e);
    }
  };

  await replaceAttachments("produk", input.attachmentProduk, "produk");
  await replaceAttachments("pengujian", input.attachmentPengujian, "pengujian");

  // Handle Result Rows: Delete existing ones and re-insert the provided array
  await db.delete(lhuResultRows).where(eq(lhuResultRows.lhuDocumentId, id));
  
  const rowsToInsert = input.testRows?.filter(r => r.kodeSampel.trim()).map((r, idx) => ({
    id: randomUUID(),
    lhuDocumentId: id,
    rowNumber: idx + 1,
    sampleCode: r.kodeSampel.trim(),
    castingDate: r.tanggalBuat ? new Date(r.tanggalBuat) : now,
    testingDate: r.tanggalTest ? new Date(r.tanggalTest) : now,
    ageDays: parseInt(r.umur) || 0,
    weight: r.berat || null,
    dimension: r.ukuran || null,
    maxLoad: r.tekananMaksimum || null,
    compressiveStrength: r.teganganHancurMpa || null,
    compressiveStrengthKgCm2: r.teganganHancurOther || null,
    cubeConversionStrengthKgCm2: r.konversiTeganganHancurKubus || null,
    failurePattern: r.polaHancur || null,
    remarks: r.keterangan || null,
    analystName: input.analystName?.trim() || null,
    createdAt: now,
    updatedAt: now,
  })) || [];

  if (rowsToInsert.length > 0) {
    await db.insert(lhuResultRows).values(rowsToInsert as any);
  }

  await insertAuditLog({
    userId: session.id,
    action: "edit_document",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { customer: customer.companyName },
  });

  revalidatePath("/lhu");
  revalidatePath(`/lhu/${id}`);
  revalidatePath(`/lhu/${id}/edit`);

  return { success: true };
}
