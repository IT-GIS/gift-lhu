import {
  boolean,
  datetime,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  longtext,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: varchar("full_name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: mysqlEnum("role", [
    "super_admin",
    "admin",
    "frontdesk",
    "analis",
    "qa",
    "viewer",
  ]).notNull(),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: datetime("last_login_at"),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const sessions = mysqlTable("sessions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  expiresAt: datetime("expires_at").notNull(),
  createdAt: datetime("created_at").notNull(),
});

export const customers = mysqlTable("customers", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyName: varchar("company_name", { length: 191 }).notNull(),
  contactName: varchar("contact_name", { length: 191 }),
  phone: varchar("phone", { length: 64 }),
  email: varchar("email", { length: 191 }),
  address: text("address"),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const lhuDocuments = mysqlTable("lhu_documents", {
  id: varchar("id", { length: 36 }).primaryKey(),
  documentCode: varchar("document_code", { length: 100 }).notNull().unique(),
  lhuNumber: varchar("lhu_number", { length: 100 }),
  customerId: varchar("customer_id", { length: 36 }).notNull(),
  projectName: varchar("project_name", { length: 191 }).notNull(),
  projectAddress: text("project_address").notNull(),
  referenceNumber: varchar("reference_number", { length: 100 }).notNull(),
  testType: varchar("test_type", { length: 100 }).notNull().default("Kuat Tekan Beton"),
  concreteType: mysqlEnum("concrete_type", ["silinder", "kubus"]).notNull(),
  status: mysqlEnum("status", [
    "draft",
    "input_hasil",
    "review",
    "revisi",
    "approved",
    "published",
    "revoked",
  ]).notNull().default("draft"),
  receivedDate: datetime("received_date").notNull(),
  testingDate: datetime("testing_date").notNull(),
  notes: text("notes"),
  approvalNotes: text("approval_notes"),
  publishedAt: datetime("published_at"),
  revokedAt: datetime("revoked_at"),
  revokedReason: text("revoked_reason"),
  approvedByUserId: varchar("approved_by_user_id", { length: 36 }),
  createdByUserId: varchar("created_by_user_id", { length: 36 }).notNull(),
  updatedByUserId: varchar("updated_by_user_id", { length: 36 }),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const lhuResultRows = mysqlTable("lhu_result_rows", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lhuDocumentId: varchar("lhu_document_id", { length: 36 }).notNull(),
  rowNumber: int("row_number").notNull(),
  sampleCode: varchar("sample_code", { length: 100 }).notNull(),
  castingDate: datetime("casting_date").notNull(),
  testingDate: datetime("testing_date").notNull(),
  ageDays: int("age_days").notNull(),
  weight: varchar("weight", { length: 64 }),
  dimension: varchar("dimension", { length: 100 }),
  maxLoad: varchar("max_load", { length: 64 }),
  compressiveStrength: varchar("compressive_strength", { length: 64 }),
  compressiveStrengthKgCm2: varchar("compressive_strength_kg_cm2", { length: 64 }),
  cubeConversionStrengthKgCm2: varchar("cube_conversion_strength_kg_cm2", { length: 64 }),
  failurePattern: varchar("failure_pattern", { length: 191 }),
  remarks: text("remarks"),
  analystName: varchar("analyst_name", { length: 191 }),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const lhuAttachments = mysqlTable("lhu_attachments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lhuDocumentId: varchar("lhu_document_id", { length: 36 }).notNull(),
  category: mysqlEnum("category", ["produk", "pengujian"]).notNull(),
  fileUrl: longtext("file_url").notNull(), // Switched to longtext to handle base64 strings
  fileName: varchar("file_name", { length: 191 }).notNull(),
  caption: varchar("caption", { length: 255 }),
  sortOrder: int("sort_order").notNull().default(0),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const lhuReviews = mysqlTable("lhu_reviews", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lhuDocumentId: varchar("lhu_document_id", { length: 36 }).notNull(),
  reviewerUserId: varchar("reviewer_user_id", { length: 36 }).notNull(),
  action: mysqlEnum("action", ["review", "approve", "return_revision", "reject"]).notNull(),
  comment: text("comment"),
  createdAt: datetime("created_at").notNull(),
});

export const lhuVerificationTokens = mysqlTable("lhu_verification_tokens", {
  id: varchar("id", { length: 36 }).primaryKey(),
  lhuDocumentId: varchar("lhu_document_id", { length: 36 }).notNull(),
  publicToken: varchar("public_token", { length: 191 }).notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  revokedReason: text("revoked_reason"),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const auditLogs = mysqlTable("audit_logs", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }),
  action: varchar("action", { length: 191 }).notNull(),
  entityType: varchar("entity_type", { length: 100 }).notNull(),
  entityId: varchar("entity_id", { length: 36 }).notNull(),
  metadataJson: json("metadata_json"),
  createdAt: datetime("created_at").notNull(),
});

export const settings = mysqlTable("settings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  settingKey: varchar("setting_key", { length: 191 }).notNull().unique(),
  settingValue: text("setting_value").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const pdfTemplateLayouts = mysqlTable("pdf_template_layouts", {
  id: varchar("id", { length: 36 }).primaryKey(),
  templateKey: varchar("template_key", { length: 100 }).notNull().unique(), // e.g. "GIFT-LAB-LHU-0000"
  activeVersionId: varchar("active_version_id", { length: 36 }), // References pdfTemplateLayoutVersions.id
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

export const pdfTemplateLayoutVersions = mysqlTable("pdf_template_layout_versions", {
  id: varchar("id", { length: 36 }).primaryKey(),
  layoutId: varchar("layout_id", { length: 36 }).notNull(), // References pdfTemplateLayouts.id
  versionNumber: int("version_number").notNull(),
  layoutJson: json("layout_json").notNull(),
  createdByUserId: varchar("created_by_user_id", { length: 36 }).notNull(), // Siapa yang buat versi ini
  notes: text("notes"), // Opsional, catatan perubahan
  createdAt: datetime("created_at").notNull(),
});
