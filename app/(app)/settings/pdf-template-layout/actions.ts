"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import {
  savePdfLayoutVersion,
  publishLayoutVersion,
  resetLayoutToDefault,
} from "@/lib/db/queries/pdf-layout";
import { insertAuditLog } from "@/lib/db/queries/audit";
import type { PdfTemplateLayoutMap } from "@/lib/pdf/lhu-template-default-map";

const TEMPLATE_KEY = "GIFT-LAB-LHU-0000";

export async function savePdfLayoutAction(layoutJson: PdfTemplateLayoutMap, publishImmediately: boolean, notes?: string) {
  const session = await requireSession();
  assertPermission(session, "manageSettings");

  const versionId = await savePdfLayoutVersion({
    templateKey: TEMPLATE_KEY,
    layoutJson,
    userId: session.id,
    notes,
    publishImmediately,
  });

  await insertAuditLog({
    userId: session.id,
    action: "create_pdf_layout_version",
    entityType: "pdf_template_layout_versions",
    entityId: versionId,
    metadata: { templateKey: TEMPLATE_KEY, publishImmediately },
  });

  revalidatePath("/settings");
  revalidatePath("/settings/pdf-template-layout");
  return { success: true, versionId };
}

export async function publishLayoutVersionAction(versionId: string) {
  const session = await requireSession();
  assertPermission(session, "manageSettings");

  await publishLayoutVersion(TEMPLATE_KEY, versionId);

  await insertAuditLog({
    userId: session.id,
    action: "publish_pdf_layout",
    entityType: "pdf_template_layout_versions",
    entityId: versionId,
    metadata: { templateKey: TEMPLATE_KEY },
  });

  revalidatePath("/settings");
  revalidatePath("/settings/pdf-template-layout");
  return { success: true };
}

export async function resetPdfLayoutAction() {
  const session = await requireSession();
  assertPermission(session, "manageSettings");

  await resetLayoutToDefault(TEMPLATE_KEY);

  await insertAuditLog({
    userId: session.id,
    action: "reset_pdf_layout",
    entityType: "pdf_template_layouts",
    entityId: TEMPLATE_KEY,
  });

  revalidatePath("/settings");
  revalidatePath("/settings/pdf-template-layout");
  return { success: true };
}
