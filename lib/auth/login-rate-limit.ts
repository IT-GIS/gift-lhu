import { createHash, randomUUID } from "crypto";
import { db } from "@/lib/db";
import { loginAttempts } from "@/lib/db/schema";
import { eq, lt } from "drizzle-orm";

const WINDOW_MS = 10 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;
const RETENTION_MS = 24 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createAttemptKey(email: string, ipAddress: string) {
  return createHash("sha256")
    .update(`${normalizeEmail(email)}\0${ipAddress}`)
    .digest("hex");
}

function isInsideWindow(firstFailedAt: Date, now: Date) {
  return now.getTime() - firstFailedAt.getTime() <= WINDOW_MS;
}

export function getLoginClientIp(headersList: Headers) {
  const forwardedFor = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    headersList.get("cf-connecting-ip")?.trim() ||
    headersList.get("x-real-ip")?.trim() ||
    forwardedFor ||
    "unknown"
  ).slice(0, 64);
}

export async function checkLoginRateLimit(email: string, ipAddress: string) {
  const attemptKey = createAttemptKey(email, ipAddress);
  const [row] = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.attemptKey, attemptKey))
    .limit(1);

  const now = new Date();
  if (row?.lockedUntil && row.lockedUntil > now) {
    return {
      limited: true,
      retryAfterSeconds: Math.ceil((row.lockedUntil.getTime() - now.getTime()) / 1000),
    };
  }

  return { limited: false, retryAfterSeconds: 0 };
}

export async function recordFailedLogin(email: string, ipAddress: string) {
  const normalizedEmail = normalizeEmail(email);
  const attemptKey = createAttemptKey(normalizedEmail, ipAddress);
  const now = new Date();
  const [row] = await db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.attemptKey, attemptKey))
    .limit(1);

  if (!row) {
    await db.insert(loginAttempts).values({
      id: randomUUID(),
      attemptKey,
      email: normalizedEmail,
      ipAddress,
      failedCount: 1,
      firstFailedAt: now,
      lastFailedAt: now,
      lockedUntil: null,
      createdAt: now,
      updatedAt: now,
    });
    return { failedCount: 1, locked: false };
  }

  const failedCount = isInsideWindow(row.firstFailedAt, now) ? row.failedCount + 1 : 1;
  const firstFailedAt = failedCount === 1 ? now : row.firstFailedAt;
  const lockedUntil =
    failedCount >= MAX_FAILED_ATTEMPTS ? new Date(now.getTime() + LOCK_MS) : null;

  await db
    .update(loginAttempts)
    .set({
      email: normalizedEmail,
      ipAddress,
      failedCount,
      firstFailedAt,
      lastFailedAt: now,
      lockedUntil,
      updatedAt: now,
    })
    .where(eq(loginAttempts.attemptKey, attemptKey));

  return { failedCount, locked: Boolean(lockedUntil) };
}

export async function resetLoginAttempts(email: string, ipAddress: string) {
  const attemptKey = createAttemptKey(email, ipAddress);
  await db.delete(loginAttempts).where(eq(loginAttempts.attemptKey, attemptKey));
}

export async function cleanupOldLoginAttempts() {
  const cutoff = new Date(Date.now() - RETENTION_MS);
  await db.delete(loginAttempts).where(lt(loginAttempts.updatedAt, cutoff));
}
