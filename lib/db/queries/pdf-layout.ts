import { db } from "@/lib/db";
import { pdfTemplateLayouts, pdfTemplateLayoutVersions } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import {
  DEFAULT_PDF_LAYOUT_MAP,
  normalizePdfLayout,
  type PdfTemplateLayoutMap,
} from "@/lib/pdf/lhu-template-default-map";

export async function getActivePdfLayout(
  templateKey: string = "GIFT-LAB-LHU-0000"
): Promise<{ layout: PdfTemplateLayoutMap; versionId: string | null; versionNumber: number | null }> {
  // Ambil layout layout master
  const [master] = await db
    .select()
    .from(pdfTemplateLayouts)
    .where(eq(pdfTemplateLayouts.templateKey, templateKey))
    .limit(1);

  if (!master || !master.activeVersionId) {
    return {
      layout: normalizePdfLayout(DEFAULT_PDF_LAYOUT_MAP),
      versionId: null,
      versionNumber: null,
    };
  }

  // Ambil versi aktif
  const [activeVersion] = await db
    .select()
    .from(pdfTemplateLayoutVersions)
    .where(eq(pdfTemplateLayoutVersions.id, master.activeVersionId))
    .limit(1);

  if (!activeVersion) {
    return {
      layout: normalizePdfLayout(DEFAULT_PDF_LAYOUT_MAP),
      versionId: null,
      versionNumber: null,
    };
  }

  const mergedLayout = normalizePdfLayout(activeVersion.layoutJson);

  return { 
    layout: mergedLayout, 
    versionId: activeVersion.id, 
    versionNumber: activeVersion.versionNumber 
  };
}

export async function savePdfLayoutVersion(input: {
  templateKey: string;
  layoutJson: PdfTemplateLayoutMap;
  userId: string;
  notes?: string;
  publishImmediately: boolean;
}) {
  const now = new Date();

  // 1. Pastikan template layout master ada
  let master = await db
    .select()
    .from(pdfTemplateLayouts)
    .where(eq(pdfTemplateLayouts.templateKey, input.templateKey))
    .limit(1)
    .then(rows => rows[0]);

  let nextVersionNumber = 1;

  if (!master) {
    const id = randomUUID();
    await db.insert(pdfTemplateLayouts).values({
      id,
      templateKey: input.templateKey,
      activeVersionId: null,
      createdAt: now,
      updatedAt: now,
    });
    master = { id, templateKey: input.templateKey, activeVersionId: null, createdAt: now, updatedAt: now };
  } else {
    // Cari versi terbaru untuk auto-increment versionNumber
    const [latest] = await db
      .select({ versionNumber: pdfTemplateLayoutVersions.versionNumber })
      .from(pdfTemplateLayoutVersions)
      .where(eq(pdfTemplateLayoutVersions.layoutId, master.id))
      .orderBy(desc(pdfTemplateLayoutVersions.versionNumber))
      .limit(1);
    
    if (latest) {
      nextVersionNumber = latest.versionNumber + 1;
    }
  }

  // 2. Insert layout version
  const versionId = randomUUID();
  const normalizedLayout = normalizePdfLayout(input.layoutJson);

  await db.insert(pdfTemplateLayoutVersions).values({
    id: versionId,
    layoutId: master.id,
    versionNumber: nextVersionNumber,
    layoutJson: normalizedLayout,
    createdByUserId: input.userId,
    notes: input.notes ?? null,
    createdAt: now,
  });

  // 3. Update master active version id jika publishImmediate
  if (input.publishImmediately) {
    await db
      .update(pdfTemplateLayouts)
      .set({
        activeVersionId: versionId,
        updatedAt: now,
      })
      .where(eq(pdfTemplateLayouts.id, master.id));
  }

  return versionId;
}

export async function getPdfLayoutVersionHistory(templateKey: string = "GIFT-LAB-LHU-0000") {
  const [master] = await db
    .select()
    .from(pdfTemplateLayouts)
    .where(eq(pdfTemplateLayouts.templateKey, templateKey))
    .limit(1);

  if (!master) return { versions: [], activeVersionId: null };

  const versions = await db
    .select()
    .from(pdfTemplateLayoutVersions)
    .where(eq(pdfTemplateLayoutVersions.layoutId, master.id))
    .orderBy(desc(pdfTemplateLayoutVersions.versionNumber));

  return {
    versions,
    activeVersionId: master.activeVersionId,
  };
}

export async function publishLayoutVersion(templateKey: string, versionId: string) {
  const [master] = await db
    .select()
    .from(pdfTemplateLayouts)
    .where(eq(pdfTemplateLayouts.templateKey, templateKey))
    .limit(1);

  if (!master) throw new Error("Template layout not found");

  await db
    .update(pdfTemplateLayouts)
    .set({
      activeVersionId: versionId,
      updatedAt: new Date(),
    })
    .where(eq(pdfTemplateLayouts.id, master.id));
}

export async function resetLayoutToDefault(templateKey: string) {
    // Menonaktifkan layout aktif sehingga sistem kembali memakai map default.
    await db
      .update(pdfTemplateLayouts)
      .set({
        activeVersionId: null,
        updatedAt: new Date(),
      })
      .where(eq(pdfTemplateLayouts.templateKey, templateKey));
}
