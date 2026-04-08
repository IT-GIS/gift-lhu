import { db } from "@/lib/db";
import { settings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

/**
 * Get a single setting value by key.
 * Returns null if not found.
 */
export async function getSetting(key: string): Promise<string | null> {
  const row = await db
    .select({ value: settings.settingValue })
    .from(settings)
    .where(eq(settings.settingKey, key))
    .limit(1);
  return row[0]?.value ?? null;
}

/**
 * Get multiple settings at once. Returns a key-value map.
 */
export async function getSettings(
  keys: string[]
): Promise<Record<string, string>> {
  if (keys.length === 0) return {};
  const rows = await db
    .select({ key: settings.settingKey, value: settings.settingValue })
    .from(settings);
  const map: Record<string, string> = {};
  for (const row of rows) {
    if (keys.includes(row.key)) {
      map[row.key] = row.value;
    }
  }
  return map;
}

/**
 * Upsert a setting (insert or update if already exists).
 */
export async function upsertSetting(
  key: string,
  value: string
): Promise<void> {
  const existing = await db
    .select({ id: settings.id })
    .from(settings)
    .where(eq(settings.settingKey, key))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(settings)
      .set({ settingValue: value, updatedAt: new Date() })
      .where(eq(settings.settingKey, key));
  } else {
    await db.insert(settings).values({
      id: randomUUID(),
      settingKey: key,
      settingValue: value,
      updatedAt: new Date(),
    });
  }
}

/**
 * Upsert multiple settings at once.
 */
export async function upsertSettings(
  entries: Record<string, string>
): Promise<void> {
  for (const [key, value] of Object.entries(entries)) {
    await upsertSetting(key, value);
  }
}
