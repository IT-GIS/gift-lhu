"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { upsertSettings } from "@/lib/db/queries/settings";
import { insertAuditLog } from "@/lib/db/queries/audit";

export async function saveSettingsAction(data: Record<string, string>) {
  const session = await requireSession();
  assertPermission(session, "manageSettings");

  // Filter out empty values and non-string entries
  const filtered = Object.fromEntries(
    Object.entries(data).filter(([, v]) => typeof v === "string" && v.trim() !== "")
  );

  await upsertSettings(filtered);

  await insertAuditLog({
    userId: session.id,
    action: "update_settings",
    entityType: "settings",
    entityId: "global",
    metadata: { keys: Object.keys(filtered) },
  });

  revalidatePath("/settings");
  return { success: true };
}
