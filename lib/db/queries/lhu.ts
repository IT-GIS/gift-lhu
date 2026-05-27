import { db } from "@/lib/db";
import {
  lhuDocuments,
  lhuResultRows,
  lhuAttachments,
  lhuReviews,
  lhuVerificationTokens,
  customers,
  users,
  auditLogs,
} from "@/lib/db/schema";
import { eq, desc, and, like, inArray } from "drizzle-orm";
import { randomUUID } from "crypto";
import { getSetting } from "@/lib/db/queries/settings";

// ─── Types ───────────────────────────────────────────────────────────────────

export type LhuDoc = typeof lhuDocuments.$inferSelect;
export type LhuStatus = LhuDoc["status"];
export type ResultRow = typeof lhuResultRows.$inferSelect;
export type Attachment = typeof lhuAttachments.$inferSelect;
export type Review = typeof lhuReviews.$inferSelect;
export type VerificationToken = typeof lhuVerificationTokens.$inferSelect;

export interface LhuDocumentFull extends LhuDoc {
  customer: typeof customers.$inferSelect | null;
  resultRows: ResultRow[];
  attachments: Attachment[];
  reviews: (Review & { reviewer: { fullName: string } | null })[];
  activeToken: VerificationToken | null;
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listLhuDocuments(opts?: {
  status?: LhuStatus;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const { status, search, limit = 50, offset = 0 } = opts ?? {};

  const rows = await db
    .select({
      doc: lhuDocuments,
      customer: {
        id: customers.id,
        companyName: customers.companyName,
      },
    })
    .from(lhuDocuments)
    .leftJoin(customers, eq(lhuDocuments.customerId, customers.id))
    .where(status ? eq(lhuDocuments.status, status) : undefined)
    .orderBy(desc(lhuDocuments.createdAt))
    .limit(limit)
    .offset(offset);

  // Client-side search filter (simple, can be moved to DB for production perf)
  if (search) {
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        r.doc.documentCode.toLowerCase().includes(q) ||
        r.doc.lhuNumber?.toLowerCase().includes(q) ||
        r.customer?.companyName.toLowerCase().includes(q) ||
        r.doc.projectName.toLowerCase().includes(q)
    );
  }

  return rows;
}

// ─── Detail ───────────────────────────────────────────────────────────────────

export async function getLhuDocumentById(
  id: string
): Promise<LhuDocumentFull | null> {
  const docRows = await db
    .select()
    .from(lhuDocuments)
    .where(eq(lhuDocuments.id, id))
    .limit(1);

  if (!docRows[0]) return null;
  const doc = docRows[0];

  // Fetch related data in parallel
  const [
    customerRows,
    resultRowsData,
    attachmentsData,
    reviewsData,
    activeTokenRows,
  ] = await Promise.all([
    db
      .select()
      .from(customers)
      .where(eq(customers.id, doc.customerId))
      .limit(1),
    db
      .select()
      .from(lhuResultRows)
      .where(eq(lhuResultRows.lhuDocumentId, id))
      .orderBy(lhuResultRows.rowNumber),
    db
      .select()
      .from(lhuAttachments)
      .where(eq(lhuAttachments.lhuDocumentId, id))
      .orderBy(lhuAttachments.sortOrder),
    db
      .select({
        review: lhuReviews,
        reviewerName: users.fullName,
      })
      .from(lhuReviews)
      .leftJoin(users, eq(lhuReviews.reviewerUserId, users.id))
      .where(eq(lhuReviews.lhuDocumentId, id))
      .orderBy(desc(lhuReviews.createdAt)),
    db
      .select()
      .from(lhuVerificationTokens)
      .where(
        and(
          eq(lhuVerificationTokens.lhuDocumentId, id),
          eq(lhuVerificationTokens.isActive, true)
        )
      )
      .limit(1),
  ]);

  return {
    ...doc,
    customer: customerRows[0] ?? null,
    resultRows: resultRowsData,
    attachments: attachmentsData,
    reviews: reviewsData.map((r) => ({
      ...r.review,
      reviewer: r.reviewerName ? { fullName: r.reviewerName } : null,
    })),
    activeToken: activeTokenRows[0] ?? null,
  };
}

// ─── Verify token (public) ────────────────────────────────────────────────────

export async function getLhuDocumentByToken(
  token: string
): Promise<LhuDocumentFull | null> {
  const tokenRows = await db
    .select()
    .from(lhuVerificationTokens)
    .where(eq(lhuVerificationTokens.publicToken, token))
    .limit(1);

  if (!tokenRows[0]) return null;
  return getLhuDocumentById(tokenRows[0].lhuDocumentId);
}

// ─── Sequence / Document Code ─────────────────────────────────────────────────

export async function generateDocumentCode(): Promise<string> {
  const year = new Date().getFullYear();
  const rows = await db
    .select({ documentCode: lhuDocuments.documentCode })
    .from(lhuDocuments);

  const usedNumbers = rows
    .map((row) => row.documentCode.match(new RegExp(`^DRF-${year}-(\\d+)$`))?.[1])
    .filter((value): value is string => Boolean(value))
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));
  const usedCodes = new Set(rows.map((row) => row.documentCode));
  let nextNumber = Math.max(0, ...usedNumbers) + 1;
  let code = `DRF-${year}-${String(nextNumber).padStart(4, "0")}`;

  while (usedCodes.has(code)) {
    nextNumber += 1;
    code = `DRF-${year}-${String(nextNumber).padStart(4, "0")}`;
  }

  return code;
}

export async function generateLhuNumber(
  concreteType: "silinder" | "kubus"
): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = concreteType === "silinder" ? "BTN" : "KBS";

  // Count published docs this year to determine sequence
  const published = await db
    .select({ id: lhuDocuments.id })
    .from(lhuDocuments)
    .where(eq(lhuDocuments.status, "published"));

  const seq = String(published.length + 1).padStart(4, "0");
  
  const customFormat = await getSetting("lhu_number_format");
  if (customFormat) {
    return customFormat
      .replace(/{year}/g, String(year))
      .replace(/{sequence}/g, seq)
      .replace(/{prefix}/g, prefix);
  }

  return `LHU-${prefix}/${year}/${seq}`;
}

// ─── Create Draft ─────────────────────────────────────────────────────────────

export interface CreateDraftInput {
  customerId: string;
  lhuNumber?: string | null;
  projectName: string;
  projectAddress: string;
  referenceNumber: string;
  testType: string;
  concreteType: "silinder" | "kubus";
  receivedDate: Date;
  testingDate: Date;
  notes?: string;
  createdByUserId: string;
}

export async function createLhuDraft(
  input: CreateDraftInput
): Promise<string> {
  const id = randomUUID();
  const now = new Date();
  const documentCode = await generateDocumentCode();

  await db.insert(lhuDocuments).values({
    id,
    documentCode,
    lhuNumber: input.lhuNumber ?? input.projectName,
    customerId: input.customerId,
    projectName: input.projectName,
    projectAddress: input.projectAddress,
    referenceNumber: input.referenceNumber,
    testType: input.testType,
    concreteType: input.concreteType,
    status: "draft",
    receivedDate: input.receivedDate,
    testingDate: input.testingDate,
    notes: input.notes ?? null,
    approvalNotes: null,
    publishedAt: null,
    revokedAt: null,
    revokedReason: null,
    approvedByUserId: null,
    createdByUserId: input.createdByUserId,
    updatedByUserId: null,
    createdAt: now,
    updatedAt: now,
  });

  return id;
}

// ─── Update Draft ─────────────────────────────────────────────────────────────

export interface UpdateDraftInput {
  customerId?: string;
  projectName?: string;
  projectAddress?: string;
  referenceNumber?: string;
  testType?: string;
  concreteType?: "silinder" | "kubus";
  receivedDate?: Date;
  testingDate?: Date;
  notes?: string;
  updatedByUserId: string;
}

export async function updateLhuDraft(
  id: string,
  input: UpdateDraftInput
): Promise<void> {
  await db
    .update(lhuDocuments)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(lhuDocuments.id, id));
}

export async function deleteLhuDocument(id: string): Promise<void> {
  await db.transaction(async (tx) => {
    await tx.delete(lhuResultRows).where(eq(lhuResultRows.lhuDocumentId, id));
    await tx.delete(lhuAttachments).where(eq(lhuAttachments.lhuDocumentId, id));
    await tx.delete(lhuReviews).where(eq(lhuReviews.lhuDocumentId, id));
    await tx.delete(lhuVerificationTokens).where(eq(lhuVerificationTokens.lhuDocumentId, id));
    await tx.delete(lhuDocuments).where(eq(lhuDocuments.id, id));
  });
}

// ─── Status transitions ───────────────────────────────────────────────────────

export async function setLhuStatus(
  id: string,
  status: LhuStatus,
  extra?: {
    approvalNotes?: string | null;
    approvedByUserId?: string | null;
    revokedReason?: string | null;
    revokedAt?: Date | null;
    publishedAt?: Date | null;
    lhuNumber?: string | null;
  }
): Promise<void> {
  const updateData: Record<string, unknown> = {
    status,
    updatedAt: new Date(),
  };

  if (extra) {
    if (extra.approvalNotes !== undefined) updateData.approvalNotes = extra.approvalNotes;
    if (extra.approvedByUserId !== undefined) updateData.approvedByUserId = extra.approvedByUserId;
    if (extra.revokedReason !== undefined) updateData.revokedReason = extra.revokedReason;
    if (extra.revokedAt !== undefined) updateData.revokedAt = extra.revokedAt;
    if (extra.publishedAt !== undefined) updateData.publishedAt = extra.publishedAt;
    if (extra.lhuNumber !== undefined) updateData.lhuNumber = extra.lhuNumber;
  }

  await db
    .update(lhuDocuments)
    .set(updateData as any)
    .where(eq(lhuDocuments.id, id));
}

// ─── Result Rows ──────────────────────────────────────────────────────────────

export interface ResultRowInput {
  rowNumber: number;
  sampleCode: string;
  castingDate: Date;
  testingDate: Date;
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

export async function upsertResultRows(
  lhuDocumentId: string,
  rows: ResultRowInput[]
): Promise<void> {
  // Delete old rows and re-insert (simpler than complex upsert logic)
  await db
    .delete(lhuResultRows)
    .where(eq(lhuResultRows.lhuDocumentId, lhuDocumentId));

  if (rows.length === 0) return;

  const now = new Date();
  await db.insert(lhuResultRows).values(
    rows.map((r) => ({
      id: randomUUID(),
      lhuDocumentId,
      rowNumber: r.rowNumber,
      sampleCode: r.sampleCode,
      castingDate: r.castingDate,
      testingDate: r.testingDate,
      ageDays: r.ageDays,
      weight: r.weight ?? null,
      dimension: r.dimension ?? null,
      maxLoad: r.maxLoad ?? null,
      compressiveStrength: r.compressiveStrength ?? null,
      compressiveStrengthKgCm2: r.compressiveStrengthKgCm2 ?? null,
      cubeConversionStrengthKgCm2: r.cubeConversionStrengthKgCm2 ?? null,
      failurePattern: r.failurePattern ?? null,
      remarks: r.remarks ?? null,
      analystName: r.analystName ?? null,
      createdAt: now,
      updatedAt: now,
    }))
  );
}

// ─── Verification Token ───────────────────────────────────────────────────────

export async function createVerificationToken(
  lhuDocumentId: string
): Promise<string> {
  // Deactivate old tokens for this document
  await db
    .update(lhuVerificationTokens)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(lhuVerificationTokens.lhuDocumentId, lhuDocumentId));

  const token = randomUUID();
  const now = new Date();
  await db.insert(lhuVerificationTokens).values({
    id: randomUUID(),
    lhuDocumentId,
    publicToken: token,
    isActive: true,
    revokedReason: null,
    createdAt: now,
    updatedAt: now,
  });

  return token;
}

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const allDocs = await db
    .select({
      status: lhuDocuments.status,
    })
    .from(lhuDocuments);

  const counts: Record<string, number> = {
    draft: 0,
    input_hasil: 0,
    review: 0,
    revisi: 0,
    approved: 0,
    published: 0,
    revoked: 0,
  };

  for (const doc of allDocs) {
    counts[doc.status] = (counts[doc.status] ?? 0) + 1;
  }

  return counts;
}

export async function getRecentAuditLogs(limit = 8) {
  const logs = await db
    .select({
      id: auditLogs.id,
      action: auditLogs.action,
      entityType: auditLogs.entityType,
      entityId: auditLogs.entityId,
      createdAt: auditLogs.createdAt,
      userFullName: users.fullName,
    })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(limit);

  return logs;
}

// ─── Monthly Chart Data ───────────────────────────────────────────────────────

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export interface MonthlyChartPoint {
  month: string;
  draft: number;
  review: number;
  published: number;
}

/**
 * Aggregate document counts by month for the current year.
 * Groups all docs by createdAt month.
 */
export async function getMonthlyChartData(year?: number): Promise<MonthlyChartPoint[]> {
  const targetYear = year ?? new Date().getFullYear();

  const docs = await db
    .select({
      createdAt: lhuDocuments.createdAt,
      status: lhuDocuments.status,
    })
    .from(lhuDocuments);

  // Initialize 12 month buckets
  const buckets: MonthlyChartPoint[] = MONTH_LABELS.map((month) => ({
    month,
    draft: 0,
    review: 0,
    published: 0,
  }));

  for (const doc of docs) {
    const d = new Date(doc.createdAt);
    if (d.getFullYear() !== targetYear) continue;
    const monthIdx = d.getMonth(); // 0-based

    if (doc.status === "draft") buckets[monthIdx].draft++;
    else if (doc.status === "review") buckets[monthIdx].review++;
    else if (doc.status === "published") buckets[monthIdx].published++;
    // approved, revisi etc. count toward review bucket for chart clarity
    else if (doc.status === "approved" || doc.status === "revisi" || doc.status === "input_hasil") {
      buckets[monthIdx].review++;
    }
  }

  return buckets;
}
