import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const MAX_ATTACHMENTS_PER_CATEGORY = 10;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const UPLOAD_PREFIX = "/uploads/lhu/";

type AttachmentCategoryLabel = "produk" | "pengujian";

function getImageExtension(mimeType: string, data: Buffer) {
  const isJpeg = data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  const isPng =
    data.length >= 8 &&
    data[0] === 0x89 &&
    data[1] === 0x50 &&
    data[2] === 0x4e &&
    data[3] === 0x47 &&
    data[4] === 0x0d &&
    data[5] === 0x0a &&
    data[6] === 0x1a &&
    data[7] === 0x0a;

  if (mimeType === "image/jpeg" && isJpeg) return "jpg";
  if (mimeType === "image/png" && isPng) return "png";

  return null;
}

function parseImageDataUri(value: string) {
  if (!value.startsWith("data:image")) {
    if (value.startsWith(UPLOAD_PREFIX)) return null;
    throw new Error("Lampiran harus berupa gambar JPEG atau PNG yang valid.");
  }

  const matches = value.match(/^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!matches) {
    throw new Error("Lampiran harus berupa gambar JPEG atau PNG.");
  }

  const mimeType = matches[1];
  const data = Buffer.from(matches[2].replace(/\s+/g, ""), "base64");
  if (data.length === 0 || data.length > MAX_IMAGE_BYTES) {
    throw new Error("Ukuran setiap gambar lampiran maksimal 4 MB.");
  }

  const extension = getImageExtension(mimeType, data);
  if (!extension) {
    throw new Error("Isi file lampiran tidak sesuai format JPEG/PNG.");
  }

  return { data, extension };
}

export function assertAttachmentLimit(files: string[] | undefined, category: AttachmentCategoryLabel) {
  if ((files?.length ?? 0) > MAX_ATTACHMENTS_PER_CATEGORY) {
    throw new Error(`Maksimal ${MAX_ATTACHMENTS_PER_CATEGORY} gambar ${category}.`);
  }
}

export function validateLhuAttachmentImages(files: string[] | undefined, category: AttachmentCategoryLabel) {
  assertAttachmentLimit(files, category);
  for (const file of files ?? []) {
    parseImageDataUri(file);
  }
}

export async function saveLhuAttachmentImage(value: string, prefix: string): Promise<string> {
  const parsed = parseImageDataUri(value);
  if (!parsed) return value;

  const fileName = `${prefix}-${randomUUID()}.${parsed.extension}`;
  const dirPath = path.join(process.cwd(), "public", "uploads", "lhu");

  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(path.join(dirPath, fileName), parsed.data, { flag: "wx" });

  return `${UPLOAD_PREFIX}${fileName}`;
}
