"use server";

import { redirect } from "next/navigation";
import { authenticate, createSession, clearSession } from "@/lib/auth/session";
import { insertAuditLog } from "@/lib/db/queries/audit";
import { requireSession } from "@/lib/auth/session";

export async function loginAction(formData: FormData) {
  try {
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      return { error: "Email dan password wajib diisi." };
    }

    const user = await authenticate(email, password);
    if (!user) {
      return { error: "Email atau password salah." };
    }

    await createSession(user);

    // Log login event (non-blocking)
    await insertAuditLog({
      userId: user.id,
      action: "login",
      entityType: "users",
      entityId: user.id,
      metadata: { email: user.email, role: user.role },
    });

    redirect("/dashboard");
  } catch (error) {
    console.error("[auth] Login action failed:", error);
    return {
      error:
        "Login gagal karena konfigurasi server atau database belum siap. Periksa AUTH_SECRET, DATABASE_URL, dan tabel users/sessions di production.",
    };
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
