/**
 * scripts/seed.ts
 * Run: npm run seed
 *
 * Seeds the database with initial users, settings, and a sample customer.
 * Safe to run multiple times — existing records are skipped (idempotent).
 *
 * NOTE: Uses relative imports only (no @/ aliases) so tsx can resolve them
 * without needing bundler-mode tsconfig.
 */

import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

// ── Inline schema (minimal, just the tables we need) ──────────────────────────
// We duplicate these so the seed runs in isolation without Next.js bundler.
import { mysqlTable, varchar, boolean, datetime, text } from "drizzle-orm/mysql-core";

const users = mysqlTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("viewer"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: datetime("last_login_at"),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

const settings = mysqlTable("settings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  settingKey: varchar("setting_key", { length: 100 }).notNull().unique(),
  settingValue: text("setting_value"),
  updatedAt: datetime("updated_at").notNull(),
});

const customers = mysqlTable("customers", {
  id: varchar("id", { length: 36 }).primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  address: text("address"),
  createdAt: datetime("created_at").notNull(),
  updatedAt: datetime("updated_at").notNull(),
});

// ── Seed data ─────────────────────────────────────────────────────────────────

const defaultUsers = [
  { fullName: "Super Administrator", email: "superadmin@gift-lab.id", password: "Admin@Gift2026!", role: "super_admin" },
  { fullName: "Admin Laboratorium",  email: "admin@gift-lab.id",       password: "Admin@Gift2026!", role: "admin"       },
  { fullName: "Analis Lab",          email: "analis@gift-lab.id",      password: "Admin@Gift2026!", role: "analis"      },
  { fullName: "QA Supervisor",       email: "qa@gift-lab.id",          password: "Admin@Gift2026!", role: "qa"          },
];

const defaultSettings = [
  { key: "company_name",           value: "PT. Global Inspeksi Forensik Teknik" },
  { key: "company_address",        value: "Jl. Laboratorium No. 1, Jakarta" },
  { key: "company_email",          value: "lab@gift-lab.id" },
  { key: "company_phone",          value: "021-00000000" },
  { key: "lhu_number_format",      value: "LHU-BTN/{year}/{sequence}" },
  { key: "verification_base_url",  value: process.env.APP_URL || "http://localhost:3000" },
  { key: "document_footer",        value: "Dokumen ini sah apabila diverifikasi pada halaman publik resmi laboratorium." },
  { key: "logo_url",               value: "/gift-logo.png" },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("❌  DATABASE_URL not set in .env");
    process.exit(1);
  }

  if (process.env.NODE_ENV === "production") {
    console.warn(
      "WARNING: Production seed keeps default bootstrap passwords. Change all default account passwords immediately after first login."
    );
  }

  const pool = mysql.createPool({ uri: process.env.DATABASE_URL });
  const db = drizzle(pool, { mode: "default" });

  console.log("🌱  Starting database seed...\n");

  // ── Users ──────────────────────────────────────────────────────────────────
  console.log("👤  Seeding users...");
  for (const u of defaultUsers) {
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, u.email))
      .limit(1);

    if (existing.length > 0) {
      console.log(`   ⚠  Skipping (already exists): ${u.email}`);
      continue;
    }

    const passwordHash = await bcrypt.hash(u.password, 12);
    const now = new Date();
    await db.insert(users).values({
      id: randomUUID(),
      fullName: u.fullName,
      email: u.email,
      passwordHash,
      role: u.role,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`   ✓  Created: ${u.email}  [${u.role}]`);
  }

  // ── Settings ───────────────────────────────────────────────────────────────
  console.log("\n⚙️   Seeding settings...");
  for (const s of defaultSettings) {
    const existing = await db
      .select({ id: settings.id })
      .from(settings)
      .where(eq(settings.settingKey, s.key))
      .limit(1);

    if (existing.length > 0) {
      console.log(`   ⚠  Skipping (already exists): ${s.key}`);
      continue;
    }

    await db.insert(settings).values({
      id: randomUUID(),
      settingKey: s.key,
      settingValue: s.value,
      updatedAt: new Date(),
    });
    console.log(`   ✓  Setting: ${s.key}`);
  }

  // ── Sample Customer ────────────────────────────────────────────────────────
  console.log("\n🏢  Seeding sample customer...");
  const existingCustomer = await db
    .select({ id: customers.id })
    .from(customers)
    .where(eq(customers.email, "pelanggan@example.com"))
    .limit(1);

  if (existingCustomer.length === 0) {
    const now = new Date();
    await db.insert(customers).values({
      id: randomUUID(),
      companyName: "PT Pelanggan Contoh",
      contactName: "Budi Santoso",
      phone: "0812-0000-0000",
      email: "pelanggan@example.com",
      address: "Jl. Contoh No. 1, Jakarta",
      createdAt: now,
      updatedAt: now,
    });
    console.log("   ✓  Customer: PT Pelanggan Contoh");
  } else {
    console.log("   ⚠  Customer already exists");
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  console.log("\n✅  Seed selesai!\n");
  if (process.env.NODE_ENV === "production") {
    console.log("Production users seeded. Default passwords are intentionally not printed.");
    console.log("Change all default account passwords immediately after first login.");
  } else {
    console.log("📋  Credentials yang bisa digunakan:");
    for (const u of defaultUsers) {
      console.log(`   ${u.role.padEnd(12)}  →  ${u.email}   /   ${u.password}`);
    }
  }
  console.log("");

  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("❌  Seed gagal:", err);
  process.exit(1);
});
