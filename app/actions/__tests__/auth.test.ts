import { describe, it, expect, beforeEach, vi } from "vitest";

// ── Mocks ────────────────────────────────────────────────────────────────────

const mockCreateSession = vi.fn();
const mockAuthenticate = vi.fn();

vi.mock("@/lib/auth/session", () => ({
  authenticate: (...args: unknown[]) => mockAuthenticate(...args),
  createSession: (...args: unknown[]) => mockCreateSession(...args),
  clearSession: vi.fn(),
  requireSession: vi.fn(),
}));

vi.mock("@/lib/auth/login-rate-limit", () => ({
  checkLoginRateLimit: vi.fn().mockResolvedValue({ limited: false, retryAfterSeconds: 0 }),
  cleanupOldLoginAttempts: vi.fn().mockResolvedValue(undefined),
  getLoginClientIp: vi.fn().mockReturnValue("127.0.0.1"),
  recordFailedLogin: vi.fn().mockResolvedValue({ failedCount: 1, locked: false }),
  resetLoginAttempts: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/db/queries/audit", () => ({
  insertAuditLog: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("next/headers", () => ({
  headers: vi.fn().mockResolvedValue(new Headers()),
}));

// redirect throws by design in Next.js — catch it in tests that trigger success path
vi.mock("next/navigation", () => ({
  redirect: vi.fn().mockImplementation((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

// ── Import setelah mock ───────────────────────────────────────────────────────

import { loginAction } from "../auth";

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value);
  }
  return fd;
}

const fakeUser = {
  id: "user-1",
  email: "admin@example.com",
  fullName: "Admin",
  role: "admin" as const,
  sessionMode: "db" as const,
};

// ── Tests ────────────────────────────────────────────────────────────────────

describe("loginAction — remember me flag", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthenticate.mockResolvedValue(fakeUser);
    mockCreateSession.mockResolvedValue(undefined);
  });

  it("calls createSession with remember=false when checkbox not sent", async () => {
    const fd = makeFormData({ email: "admin@example.com", password: "secret" });

    // redirect throws — catch it so test doesn't fail
    await loginAction(fd).catch(() => {});

    expect(mockCreateSession).toHaveBeenCalledWith(fakeUser, false);
  });

  it("calls createSession with remember=true when checkbox is 'on'", async () => {
    const fd = makeFormData({
      email: "admin@example.com",
      password: "secret",
      remember: "on",
    });

    await loginAction(fd).catch(() => {});

    expect(mockCreateSession).toHaveBeenCalledWith(fakeUser, true);
  });

  it("remember='off' is treated as false (only 'on' is truthy)", async () => {
    const fd = makeFormData({
      email: "admin@example.com",
      password: "secret",
      remember: "off",
    });

    await loginAction(fd).catch(() => {});

    expect(mockCreateSession).toHaveBeenCalledWith(fakeUser, false);
  });
});

describe("loginAction — validation & auth failures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAuthenticate.mockResolvedValue(null);
    mockCreateSession.mockResolvedValue(undefined);
  });

  it("returns error when email is missing", async () => {
    const fd = makeFormData({ email: "", password: "secret" });

    const result = await loginAction(fd);

    expect(result).toEqual({ error: "Email dan password wajib diisi." });
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it("returns error when password is missing", async () => {
    const fd = makeFormData({ email: "admin@example.com", password: "" });

    const result = await loginAction(fd);

    expect(result).toEqual({ error: "Email dan password wajib diisi." });
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it("returns error when credentials are wrong", async () => {
    const fd = makeFormData({ email: "admin@example.com", password: "wrong" });

    const result = await loginAction(fd);

    expect(result).toEqual({ error: "Email atau password salah." });
    expect(mockCreateSession).not.toHaveBeenCalled();
  });

  it("does not create session when authentication fails", async () => {
    const fd = makeFormData({ email: "x@x.com", password: "x" });

    await loginAction(fd);

    expect(mockCreateSession).not.toHaveBeenCalled();
  });
});
