"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  createLhuDraft,
  createVerificationToken,
  generateDocumentCode,
  setLhuStatus,
} from "@/lib/db/queries/lhu";
import { upsertCustomer } from "@/lib/db/queries/customers";
import { insertAuditLog } from "@/lib/db/queries/audit";
import { lhuAttachments, lhuResultRows } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { randomUUID } from "crypto";
import { TestRow } from "@/components/lhu/test-results-form";
import fs from "fs/promises";
import path from "path";

async function saveBase64Image(base64Data: string, prefix: string): Promise<string> {
  if (!base64Data.startsWith("data:image")) return base64Data; // in case it's a regular string

  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const type = matches[1];
  const data = Buffer.from(matches[2], 'base64');
  let extension = "jpg";
  if (type === "image/png") extension = "png";
  if (type === "image/jpeg" || type === "image/jpg") extension = "jpg";

  const fileName = `${prefix}-${randomUUID()}.${extension}`;
  const dirPath = path.join(process.cwd(), "public", "uploads", "lhu");
  
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(path.join(dirPath, fileName), data);
  
  return `/uploads/lhu/${fileName}`;
}

export interface CreateLhuInput {
  customer: string;
  projectName: string;
  projectAddress: string;
  referenceNumber: string;
  concreteType: string;
  testType: string;
  receivedDate: string;
  testingDate: string;
  attachmentProduk?: string[];
  attachmentPengujian?: string[];
  analystName?: string;
  testRows?: TestRow[];
}

export async function createLhuAction(input: CreateLhuInput) {
  const session = await requireSession();
  assertPermission(session, "createDraft");

  // Resolve or create customer
  const customer = await upsertCustomer({
    companyName: input.customer.trim(),
  });

  const concreteType =
    input.concreteType?.toLowerCase().includes("kubus") ? "kubus" : "silinder";

  const id = await createLhuDraft({
    customerId: customer.id,
    lhuNumber: input.projectName.trim(),
    projectName: input.projectName.trim(),
    projectAddress: input.projectAddress.trim(),
    referenceNumber: input.referenceNumber.trim(),
    testType: input.testType.trim() || "Kuat Tekan Beton",
    concreteType,
    receivedDate: new Date(input.receivedDate),
    testingDate: new Date(input.testingDate),
    createdByUserId: session.id,
  });

  // Handle Attachments if exist
  const now = new Date();
  const attachmentsToInsert = [];

  if (input.attachmentProduk && input.attachmentProduk.length > 0) {
    for (const [idx, base64Str] of input.attachmentProduk.entries()) {
      try {
        const url = await saveBase64Image(base64Str, `produk-${idx}`);
        attachmentsToInsert.push({
          id: randomUUID(),
          lhuDocumentId: id,
          category: "produk" as const,
          fileUrl: url,
          fileName: `gambar_produk_${idx + 1}.jpg`,
          sortOrder: idx,
          createdAt: now,
          updatedAt: now,
        });
      } catch (e) {
        console.error("Gagal simpan gambar produk:", e);
      }
    }
  }

  if (input.attachmentPengujian && input.attachmentPengujian.length > 0) {
    for (const [idx, base64Str] of input.attachmentPengujian.entries()) {
      try {
        const url = await saveBase64Image(base64Str, `pengujian-${idx}`);
        attachmentsToInsert.push({
          id: randomUUID(),
          lhuDocumentId: id,
          category: "pengujian" as const,
          fileUrl: url,
          fileName: `gambar_pengujian_${idx + 1}.jpg`,
          sortOrder: idx,
          createdAt: now,
          updatedAt: now,
        });
      } catch (e) {
        console.error("Gagal simpan gambar pengujian:", e);
      }
    }
  }

  if (attachmentsToInsert.length > 0) {
    await db.insert(lhuAttachments).values(attachmentsToInsert);
  }


  // Handle Result Rows if exist
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
    analystName: input.analystName || null,
    createdAt: now,
    updatedAt: now,
  })) || [];

  if (rowsToInsert.length > 0) {
    await db.insert(lhuResultRows).values(rowsToInsert);
  }

  await insertAuditLog({
    userId: session.id,
    action: "create_draft",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { documentCode: await generateDocumentCode(), customer: customer.companyName },
  });

  const lhuNumber = input.projectName.trim();
  const publicToken = await createVerificationToken(id);
  await setLhuStatus(id, "published", {
    lhuNumber,
    publishedAt: new Date(),
  });

  await insertAuditLog({
    userId: session.id,
    action: "publish",
    entityType: "lhu_documents",
    entityId: id,
    metadata: { lhuNumber, autoPublished: true },
  });

  await insertAuditLog({
    userId: session.id,
    action: "generate_token",
    entityType: "lhu_verification_tokens",
    entityId: id,
    metadata: { publicToken, autoPublished: true },
  });

  revalidatePath("/lhu");
  revalidatePath("/publish");
  revalidatePath("/dashboard");

  return { success: true, id, lhuNumber, publicToken };
}
