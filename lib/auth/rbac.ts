import type { SessionUser } from "@/lib/auth/session";

// ─── Role definitions ─────────────────────────────────────────────────────────

export type Role =
  | "super_admin"
  | "admin"
  | "frontdesk"
  | "analis"
  | "qa"
  | "viewer";

export const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin Laboratorium",
  frontdesk: "Frontdesk",
  analis: "Analis / Lab",
  qa: "QA / Supervisor",
  viewer: "Viewer / Auditor",
};

// ─── Permission Map ───────────────────────────────────────────────────────────

export const permissions = {
  createDraft: ["super_admin", "admin", "frontdesk"] as Role[],
  editDraft: ["super_admin", "admin", "frontdesk", "analis"] as Role[],
  inputResults: ["super_admin", "admin", "analis"] as Role[],
  submitForReview: ["super_admin", "admin", "analis"] as Role[],
  uploadAttachments: ["super_admin", "admin", "analis"] as Role[],
  reviewQa: ["super_admin", "admin", "qa"] as Role[],
  approveDocument: ["super_admin", "admin", "qa"] as Role[],
  returnRevision: ["super_admin", "admin", "qa"] as Role[],
  publish: ["super_admin", "admin", "qa"] as Role[],
  revoke: ["super_admin"] as Role[],
  deleteLhu: ["super_admin", "admin"] as Role[],
  managePosts: ["super_admin", "admin"] as Role[],
  manageUsers: ["super_admin"] as Role[],
  manageSettings: ["super_admin", "admin"] as Role[],
  viewAuditLogs: ["super_admin", "admin", "qa", "viewer"] as Role[],
} as const;

export type Permission = keyof typeof permissions;

// ─── Core helpers ─────────────────────────────────────────────────────────────

export function can(role: Role | string, permission: Permission): boolean {
  const allowed = permissions[permission] as readonly string[];
  return allowed.includes(role);
}

/**
 * Throws an error if the session user does not have the required permission.
 * Use this at the top of Server Actions to enforce server-side RBAC.
 *
 * @example
 * const session = await requireSession();
 * assertPermission(session, "publish");
 */
export function assertPermission(
  session: SessionUser,
  permission: Permission
): void {
  if (!can(session.role, permission)) {
    throw new Error(
      `Access denied. Role '${session.role}' cannot perform '${permission}'.`
    );
  }
}
