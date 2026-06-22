import { randomUUID } from "crypto";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/lib/db";
import { contactMessages } from "@/lib/db/schema";

export type ContactMessageRow = typeof contactMessages.$inferSelect;

const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter."),
  email: z.string().trim().email("Format email tidak valid."),
  company: z.string().trim().max(191).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Pesan minimal 5 karakter."),
  sourcePage: z.enum(["home", "contact"]).optional(),
});

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function stripMs(d: Date) {
  d.setMilliseconds(0);
  return d;
}

export function getContactMessageErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? "Input pesan tidak valid.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengirim pesan.";
}

export async function listContactMessages() {
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
}

export async function getContactMessageById(id: string) {
  const rows = await db.select().from(contactMessages).where(eq(contactMessages.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function createContactMessage(input: Record<string, string>) {
  const parsed = contactMessageSchema.parse(input);
  const id = randomUUID();

  await db.insert(contactMessages).values({
    id,
    name: parsed.name,
    email: parsed.email,
    company: nullable(parsed.company),
    message: parsed.message,
    sourcePage: parsed.sourcePage ?? "home",
    status: "new",
    createdAt: stripMs(new Date()),
  });

  return id;
}

export async function markContactMessageRead(id: string) {
  await db.update(contactMessages).set({ status: "read" }).where(eq(contactMessages.id, id));
}

export async function deleteContactMessage(id: string) {
  const message = await getContactMessageById(id);
  if (!message) throw new Error("Pesan tidak ditemukan.");
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
}
