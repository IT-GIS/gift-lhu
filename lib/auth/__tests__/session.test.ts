import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { SignJWT } from "jose";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockCookieSet = vi.fn();
const mockCookieGet = vi.fn();
const mockCookieDelete = vi.fn();
const mockCookieStore = {
  set: mockCookieSet,
  get: mockCookieGet,
  delete: mockCookieDelete,
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

const mockCreateDbSession = vi.fn();
const mockGetDbSession = vi.fn();
const mockDeleteDbSession = vi.fn();

vi.mock("@/lib/db/queries/users", () => ({
  createDbSession: (...args: unknown[]) => mockCreateDbSession(...args),
  getDbSession: (...args: unknown[]) => mockGetDbSession(...args),
  deleteDbSession: (...args: unknown[]) => mockDeleteDbSession(...args),
  verifyCredentials: vi.fn(),
  updateLastLogin: vi.fn(),
}));

// ── Import setelah mock ───────────────────────────────────────────────────────

import { createSession, getSession, getMidnightInDays } from "../session";

// ── Helpers ──────────────────────────────────────────────────────────────────

const AUTH_SECRET = "test-secret-that-is-long-enough-32chars";
process.env.AUTH_SECRET = AUTH_SECRET;

const SECRET = new TextEncoder().encode(AUTH_SECRET);

const baseUser = {
  id: "user-123",
  email: "test@example.com",
  fullName: "Test User",
  role: "staff" as const,
  sessionMode: "db" as const,
};

async function makeValidToken(overrides: Record<string, unknown> = {}): Promise<string> {
  const expiresAt = getMidnightInDays(1);
  return new SignJWT({
    id: "user-123",
    email: "test@example.com",
    fullName: "Test User",
    role: "staff",
    sessionId: "session-abc",
    sessionMode: "db",
    ...overrides,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(SECRET);
}

// ── Tests: createSession ─────────────────────────────────────────────────────

describe("createSession", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-17T10:30:00.000Z"));
    mockCreateDbSession.mockResolvedValue(undefined);
    vi.clearAllMocks();
    mockCreateDbSession.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("remember=false: expiresAt passed to createDbSession is tomorrow midnight", async () => {
    await createSession(baseUser, false);

    expect(mockCreateDbSession).toHaveBeenCalledOnce();
    const [, , expiresAt] = mockCreateDbSession.mock.calls[0] as [string, string, Date];

    const expected = getMidnightInDays(1);
    expect(expiresAt.getTime()).toBe(expected.getTime());
  });

  it("remember=true: expiresAt passed to createDbSession is 7-day midnight", async () => {
    await createSession(baseUser, true);

    expect(mockCreateDbSession).toHaveBeenCalledOnce();
    const [, , expiresAt] = mockCreateDbSession.mock.calls[0] as [string, string, Date];

    const expected = getMidnightInDays(7);
    expect(expiresAt.getTime()).toBe(expected.getTime());
  });

  it("remember=false: cookie maxAge is less than or equal to 24h in seconds", async () => {
    await createSession(baseUser, false);

    expect(mockCookieSet).toHaveBeenCalledOnce();
    const [, , options] = mockCookieSet.mock.calls[0] as [string, string, { maxAge: number }];
    expect(options.maxAge).toBeGreaterThan(0);
    expect(options.maxAge).toBeLessThanOrEqual(24 * 60 * 60);
  });

  it("remember=true: cookie maxAge matches getMidnightInDays(7) within 5 seconds", async () => {
    await createSession(baseUser, true);

    expect(mockCookieSet).toHaveBeenCalledOnce();
    const [, , options] = mockCookieSet.mock.calls[0] as [string, string, { maxAge: number }];
    const expectedMaxAge = Math.floor((getMidnightInDays(7).getTime() - Date.now()) / 1000);
    expect(Math.abs(options.maxAge - expectedMaxAge)).toBeLessThanOrEqual(5);
  });

  it("cookie maxAge and expiresAt are consistent (within 1 second)", async () => {
    await createSession(baseUser, false);

    const [, , options] = mockCookieSet.mock.calls[0] as [string, string, { maxAge: number }];
    const [, , expiresAt] = mockCreateDbSession.mock.calls[0] as [string, string, Date];

    const expectedMaxAge = Math.floor((expiresAt.getTime() - Date.now()) / 1000);
    expect(Math.abs(options.maxAge - expectedMaxAge)).toBeLessThanOrEqual(1);
  });

  it("cookie has httpOnly, sameSite=lax, path=/", async () => {
    await createSession(baseUser, false);

    const [, , options] = mockCookieSet.mock.calls[0] as [
      string,
      string,
      { httpOnly: boolean; sameSite: string; path: string }
    ];
    expect(options.httpOnly).toBe(true);
    expect(options.sameSite).toBe("lax");
    expect(options.path).toBe("/");
  });

  it("DB failure in development falls back to jwt sessionMode without throwing", async () => {
    vi.stubEnv("NODE_ENV", "development");
    mockCreateDbSession.mockRejectedValueOnce(new Error("DB down"));

    await expect(createSession(baseUser, false)).resolves.not.toThrow();

    vi.unstubAllEnvs();
  });
});

// ── Tests: getSession ────────────────────────────────────────────────────────

describe("getSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when no cookie present", async () => {
    mockCookieGet.mockReturnValue(undefined);

    const result = await getSession();
    expect(result).toBeNull();
  });

  it("returns null when JWT token is invalid/malformed", async () => {
    mockCookieGet.mockReturnValue({ value: "not-a-valid-jwt" });

    const result = await getSession();
    expect(result).toBeNull();
  });

  it("returns null when DB session no longer exists", async () => {
    const token = await makeValidToken();
    mockCookieGet.mockReturnValue({ value: token });
    mockGetDbSession.mockResolvedValue(null);

    const result = await getSession();
    expect(result).toBeNull();
  });

  it("returns null and deletes cookie when DB session is expired", async () => {
    const token = await makeValidToken();
    mockCookieGet.mockReturnValue({ value: token });
    mockGetDbSession.mockResolvedValue({
      userId: "user-123",
      expiresAt: new Date(Date.now() - 1000), // 1 second in the past
    });
    mockDeleteDbSession.mockResolvedValue(undefined);

    const result = await getSession();

    expect(result).toBeNull();
    expect(mockCookieDelete).toHaveBeenCalledWith("lhuv_session");
  });

  it("returns SessionUser when session is valid and not expired", async () => {
    const token = await makeValidToken();
    mockCookieGet.mockReturnValue({ value: token });
    mockGetDbSession.mockResolvedValue({
      userId: "user-123",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour in the future
    });

    const result = await getSession();

    expect(result).not.toBeNull();
    expect(result?.id).toBe("user-123");
    expect(result?.email).toBe("test@example.com");
    expect(result?.sessionId).toBe("session-abc");
  });

  it("does not call deleteDbSession when session is valid", async () => {
    const token = await makeValidToken();
    mockCookieGet.mockReturnValue({ value: token });
    mockGetDbSession.mockResolvedValue({
      userId: "user-123",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    });

    await getSession();

    expect(mockDeleteDbSession).not.toHaveBeenCalled();
  });
});
