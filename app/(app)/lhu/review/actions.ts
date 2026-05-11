"use server";

import { db } from "@/lib/db";
import { lhuDocuments, customers } from "@/lib/db/schema";
import { eq, inArray, desc } from "drizzle-orm";

/**
 * Server action untuk mengambil daftar dokumen yang berstatus "draft", "review", atau "revisi".
 * Dipanggil dari client component agar selalu mendapat data segar dari DB.
 */
export async function getReviewDocuments() {
  const rows = await db
    .select({
      doc: lhuDocuments,
      customerName: customers.companyName,
    })
    .from(lhuDocuments)
    .leftJoin(customers, eq(lhuDocuments.customerId, customers.id))
    .where(inArray(lhuDocuments.status, ["draft", "review", "revisi"]))
    .orderBy(desc(lhuDocuments.updatedAt));

  return rows.map((r) => ({
    ...r.doc,
    customer: r.customerName ?? "—",
  }));
}
