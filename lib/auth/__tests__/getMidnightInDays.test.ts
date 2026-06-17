import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Prevent session.ts import chain from hitting the real DB or Next.js internals
vi.mock("next/headers", () => ({ cookies: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/db/queries/users", () => ({
  createDbSession: vi.fn(),
  getDbSession: vi.fn(),
  deleteDbSession: vi.fn(),
  verifyCredentials: vi.fn(),
  updateLastLogin: vi.fn(),
}));

import { getMidnightInDays } from "../session";

describe("getMidnightInDays", () => {
  beforeEach(() => {
    // Fix "now" to 2026-06-17 10:30:00 UTC
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-17T10:30:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns a date with time exactly at 00:00:00.000", () => {
    const result = getMidnightInDays(1);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it("getMidnightInDays(1) is tomorrow midnight (always in the future)", () => {
    const result = getMidnightInDays(1);
    const now = new Date();
    expect(result.getTime()).toBeGreaterThan(now.getTime());
  });

  it("getMidnightInDays(7) is 7 days ahead midnight", () => {
    const result = getMidnightInDays(7);
    const expected = new Date();
    expected.setDate(expected.getDate() + 7);
    expected.setHours(0, 0, 0, 0);
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("getMidnightInDays(1) date is one day ahead of today", () => {
    const result = getMidnightInDays(1);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    expect(result.getDate()).toBe(tomorrow.getDate());
    expect(result.getMonth()).toBe(tomorrow.getMonth());
    expect(result.getFullYear()).toBe(tomorrow.getFullYear());
  });

  it("getMidnightInDays(1) maxAge is less than 24h in seconds", () => {
    const result = getMidnightInDays(1);
    const now = new Date();
    const diffSeconds = Math.floor((result.getTime() - now.getTime()) / 1000);
    expect(diffSeconds).toBeLessThanOrEqual(24 * 60 * 60);
    expect(diffSeconds).toBeGreaterThan(0);
  });
});
