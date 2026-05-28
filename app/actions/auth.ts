"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authenticate, createSession, clearSession } from "@/lib/auth/session";
import { insertAuditLog } from "@/lib/db/queries/audit";
import { requireSession } from "@/lib/auth/session";
import {
  checkLoginRateLimit,
  cleanupOldLoginAttempts,
  getLoginClientIp,
  recordFailedLogin,
  resetLoginAttempts,
} from "@/lib/auth/login-rate-limit";

export async function loginAction(formData: FormData) {
  let shouldRedirect = false;

  try {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      return { error: "Email dan password wajib diisi." };
    }

    const clientIp = getLoginClientIp(await headers());
    await cleanupOldLoginAttempts().catch((error) => {
      console.error("[auth] Failed to cleanup old login attempts:", error);
    });

    const rateLimit = await checkLoginRateLimit(email, clientIp);
    if (rateLimit.limited) {
      await insertAuditLog({
        action: "login_locked",
        entityType: "users",
        entityId: "login",
        metadata: { email, ipAddress: clientIp, retryAfterSeconds: rateLimit.retryAfterSeconds },
      });
      return {
        error: "Terlalu banyak percobaan login. Coba lagi sekitar 15 menit.",
      };
    }

    const user = await authenticate(email, password);
    if (!user) {
      const failed = await recordFailedLogin(email, clientIp);
      await insertAuditLog({
        action: failed.locked ? "login_locked" : "login_failed",
        entityType: "users",
        entityId: "login",
        metadata: { email, ipAddress: clientIp, failedCount: failed.failedCount },
      });
      return { error: "Email atau password salah." };
    }

    await resetLoginAttempts(email, clientIp);
    await createSession(user);

    // Log login event (non-blocking)
    await insertAuditLog({
      userId: user.id,
      action: "login",
      entityType: "users",
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    });

    shouldRedirect = true;
  } catch (error) {
    console.error("[auth] Login action failed:", error);
    return {
      error:
        process.env.NODE_ENV === "production"
          ? "Login gagal karena layanan autentikasi belum siap. Silakan coba lagi atau hubungi administrator."
          : "Login gagal karena konfigurasi server atau database belum siap. Periksa AUTH_SECRET, DATABASE_URL, dan tabel users/sessions di production.",
    };
  }

  if (shouldRedirect) {
    redirect("/dashboard");
  }
}

export async function logoutAction() {
  try {
    const session = await requireSession();
    await insertAuditLog({
      userId: session.id,
      action: "logout",
      entityType: "users",
      entityId: session.id,
    });
  } catch {
    // If session is already gone, still clear and redirect
  }

  await clearSession();
  redirect("/login");
}
