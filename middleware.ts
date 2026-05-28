/**
 * proxy.ts — Route protection via JWT verification
 * In Next.js 16+, this file replaces middleware.ts
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "lhuv_session";

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET environment variable is not set");
  return new TextEncoder().encode(secret);
}

const protectedPatterns = [
  "/dashboard",
  "/lhu",
  "/settings",
  "/users",
  "/audit-logs",
  "/account",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPatterns.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Cryptographically verify the JWT — not just check existence
  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    // Token invalid or expired — clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete(COOKIE_NAME);
    return response;
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/lhu/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/audit-logs/:path*",
    "/account/:path*",
  ],
};
