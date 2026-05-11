import { db } from "@/lib/db";
import { users, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";

// ─── Types ──────────────────────────────────────────────────────────────────

export type UserRow = typeof users.$inferSelect;
export type NewUser = {
  fullName: string;
  email: string;
  password: string; // plaintext — will be hashed here
  role: UserRow["role"];
};

// ─── Queries ────────────────────────────────────────────────────────────────

export async function getUserByEmail(email: string): Promise<UserRow | null> {
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return rows[0] ?? null;
}

export async function getUserById(id: string): Promise<UserRow | null> {
  const rows = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return rows[0] ?? null;
}

export async function listUsers(): Promise<UserRow[]> {
  return db.select().from(users).orderBy(users.createdAt);
}

export async function createUser(input: NewUser): Promise<UserRow> {
  const id = randomUUID();
  const passwordHash = await bcrypt.hash(input.password, 12);
  const now = new Date();

  await db.insert(users).values({
    id,
    fullName: input.fullName,
    email: input.email,
    passwordHash,
    role: input.role,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });

  const created = await getUserById(id);
  if (!created) throw new Error("User creation failed");
  return created;
}

export async function updateUserRole(
  id: string,
  role: UserRow["role"]
): Promise<void> {
  await db
    .update(users)
    .set({ role, updatedAt: new Date() })
    .where(eq(users.id, id));
}

export async function setUserActive(
  id: string,
  isActive: boolean
): Promise<void> {
  await db
    .update(users)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(users.id, id));
}

export async function updateUserPassword(
  id: string,
  newPassword: string
): Promise<void> {
  const passwordHash = await bcrypt.hash(newPassword, 12);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, id));
}

export async function updateLastLogin(id: string): Promise<void> {
  await db
    .update(users)
    .set({ lastLoginAt: new Date(), updatedAt: new Date() })
    .where(eq(users.id, id));
}

// ─── Session Helpers ────────────────────────────────────────────────────────

export async function createDbSession(
  userId: string,
  sessionId: string
): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
    createdAt: new Date(),
  });
}

export async function deleteDbSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function getDbSession(
  sessionId: string
): Promise<{ userId: string; expiresAt: Date } | null> {
  const rows = await db
    .select({ userId: sessions.userId, expiresAt: sessions.expiresAt })
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1);
  return rows[0] ?? null;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * Verify email + password against the database.
 * Returns the user object on success, null on failure.
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<UserRow | null> {
  const user = await getUserByEmail(email);
  if (!user || !user.isActive) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return user;
}
