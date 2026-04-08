import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { auditLogs } from "@/lib/db/schema";

export type AuditAction =
  | "login"
  | "logout"
  | "create_draft"
  | "edit_document"
  | "input_results"
  | "submit_review"
  | "approve"
  | "return_revision"
  | "publish"
  | "revoke"
  | "generate_token"
  | "update_settings"
  | "create_user"
  | "edit_user"
  | "delete_user"
  | "upload_attachment"
  | "delete_attachment"
  | "create_pdf_layout_version"
  | "publish_pdf_layout"
  | "reset_pdf_layout";

export interface AuditLogInput {
  userId?: string | null;
  action: AuditAction;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}

export async function insertAuditLog(input: AuditLogInput) {
  try {
    await db.insert(auditLogs).values({
      id: randomUUID(),
      userId: input.userId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadataJson: input.metadata ?? null,
      createdAt: new Date(),
    });
  } catch (err) {
    // Audit log failure should never break the main flow
    console.error("[audit] Failed to insert audit log:", err);
  }
}
