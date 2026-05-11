"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  createUser,
  updateUserRole,
  setUserActive,
  updateUserPassword,
  type UserRow,
} from "@/lib/db/queries/users";
import { insertAuditLog } from "@/lib/db/queries/audit";

export async function createUserAction(formData: FormData) {
  const session = await requireSession();
  assertPermission(session, "manageUsers");

  const fullName = String(formData.get("fullName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const role = String(formData.get("role") || "") as UserRow["role"];

  if (!fullName || !email || !password || !role) {
    return { success: false, error: "Semua field wajib diisi." };
  }

  if (password.length < 8) {
    return { success: false, error: "Password minimal 8 karakter." };
  }

  try {
    const user = await createUser({ fullName, email, password, role });
    await insertAuditLog({
      userId: session.id,
      action: "create_user",
      entityType: "users",
      entityId: user.id,
      metadata: { email, role },
    });
    revalidatePath("/users");
    return { success: true };
  } catch (err: any) {
    if (err?.message?.includes("Duplicate entry")) {
      return { success: false, error: "Email sudah digunakan." };
    }
    return { success: false, error: "Gagal membuat user." };
  }
}

export async function updateUserRoleAction(userId: string, role: UserRow["role"]) {
  const session = await requireSession();
  assertPermission(session, "manageUsers");

  await updateUserRole(userId, role);
  await insertAuditLog({
    userId: session.id,
    action: "edit_user",
    entityType: "users",
    entityId: userId,
    metadata: { newRole: role },
  });

  revalidatePath("/users");
  return { success: true };
}

export async function toggleUserActiveAction(userId: string, isActive: boolean) {
  const session = await requireSession();
  assertPermission(session, "manageUsers");

  await setUserActive(userId, isActive);
  await insertAuditLog({
    userId: session.id,
    action: "edit_user",
    entityType: "users",
    entityId: userId,
    metadata: { isActive },
  });

  revalidatePath("/users");
  return { success: true };
}

export async function resetUserPasswordAction(userId: string, newPassword: string) {
  const session = await requireSession();
  assertPermission(session, "manageUsers");

  if (newPassword.length < 8) {
    return { success: false, error: "Password minimal 8 karakter." };
  }

  await updateUserPassword(userId, newPassword);
  await insertAuditLog({
    userId: session.id,
    action: "edit_user",
    entityType: "users",
    entityId: userId,
    metadata: { action: "password_reset" },
  });

  revalidatePath("/users");
  return { success: true };
}
