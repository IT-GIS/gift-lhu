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
  sessionMode?: "db" | "jwt";
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
  let sessionMode: SessionUser["sessionMode"] = "db";

  try {
    // Persist session server-side so it can be invalidated.
    await createDbSession(user.id, sessionId);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("[auth] Failed to persist DB session:", error);
      throw new Error("Failed to persist session");
    }

    sessionMode = "jwt";
    console.error("[auth] Failed to persist DB session, falling back to JWT-only session in development:", error);
  }

  const sessionUser: SessionUser = { ...user, sessionId, sessionMode };

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
    if (payload?.sessionId && payload.sessionMode !== "jwt") {
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

  if (payload.sessionMode === "jwt") {
    if (process.env.NODE_ENV === "production") {
      cookieStore.delete(COOKIE_NAME);
      return null;
    }

    return payload;
  }

  try {
    // Validate that session still exists + not expired in DB.
    const dbSession = await getDbSession(payload.sessionId);
    if (!dbSession) return null;
    if (dbSession.expiresAt < new Date()) {
      await deleteDbSession(payload.sessionId).catch(() => {});
      cookieStore.delete(COOKIE_NAME);
      return null;
    }

    return payload;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("[auth] Failed to validate DB session:", error);
      cookieStore.delete(COOKIE_NAME);
      return null;
    }

    console.error("[auth] Failed to validate DB session, falling back to JWT session:", error);
    return payload;
  }
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

  try {
    // Update last login timestamp, but don't block login if it fails.
    await updateLastLogin(user.id);
  } catch (error) {
    console.error("[auth] Failed to update last login timestamp:", error);
  }

  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    sessionMode: "db",
  };
}
