import { db } from "@/lib/db";
import { customers } from "@/lib/db/schema";
import { eq, like } from "drizzle-orm";
import { randomUUID } from "crypto";

export type Customer = typeof customers.$inferSelect;

export async function listCustomers(search?: string): Promise<Customer[]> {
  const all = await db.select().from(customers).orderBy(customers.companyName);
  if (!search) return all;
  const q = search.toLowerCase();
  return all.filter((c) => c.companyName.toLowerCase().includes(q));
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const rows = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function upsertCustomer(input: {
  companyName: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
}): Promise<Customer> {
  // Try find by name first
  const existing = await db
    .select()
    .from(customers)
    .where(eq(customers.companyName, input.companyName))
    .limit(1);

  if (existing[0]) return existing[0];

  const id = randomUUID();
  const now = new Date();
  await db.insert(customers).values({
    id,
    companyName: input.companyName,
    contactName: input.contactName ?? null,
    phone: input.phone ?? null,
    email: input.email ?? null,
    address: input.address ?? null,
    createdAt: now,
    updatedAt: now,
  });

  return (await getCustomerById(id))!;
}
