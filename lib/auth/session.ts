import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { randomUUID } from "crypto";
import {
  verifyCredentials,
  createDbSession,
  deleteDbSession,
  getDbSession,
  updateLastLogin,
  UserRow,
} from "@/lib/db/queries/users";

const COOKIE_NAME = "lhuv_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET environment variable is not set");
  return new TextEncoder().encode(secret);
}

// ─── Session Types ───────────────────────────────────────────────────────────

export type SessionUser = {
  id: string;
  sessionId: string;
  email: string;
  fullName: string;
  role: UserRow["role"];
};

// ─── Token Management ────────────────────────────────────────────────────────

async function signToken(payload: SessionUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify<SessionUser>(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

// ─── Session CRUD ─────────────────────────────────────────────────────────────

export async function createSession(user: Omit<SessionUser, "sessionId">) {
  const sessionId = randomUUID();
  const sessionUser: SessionUser = { ...user, sessionId };

  // Persist session server-side so it can be invalidated
  await createDbSession(user.id, sessionId);

  const token = await signToken(sessionUser);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    const payload = await verifyToken(token);
    if (payload?.sessionId) {
      // Remove from DB so server-side invalidation works
      await deleteDbSession(payload.sessionId).catch(() => {});
    }
  }

  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload?.sessionId) return null;

  // Validate that session still exists + not expired in DB
  const dbSession = await getDbSession(payload.sessionId);
  if (!dbSession) return null;
  if (dbSession.expiresAt < new Date()) {
    await deleteDbSession(payload.sessionId).catch(() => {});
    cookieStore.delete(COOKIE_NAME);
    return null;
  }

  return payload;
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * Authenticate a user from the database.
 * Returns session-ready user object or null.
 */
export async function authenticate(
  email: string,
  password: string
): Promise<Omit<SessionUser, "sessionId"> | null> {
  const user = await verifyCredentials(email, password);
  if (!user) return null;

  // Update last login timestamp
  await updateLastLogin(user.id);

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  };
}
