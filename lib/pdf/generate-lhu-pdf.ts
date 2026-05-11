import fs from "fs/promises";
import path from "path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFImage,
  type PDFPage,
} from "pdf-lib";
import type {
  PdfAttachmentGridElement,
  PdfDynamicImageElement,
  PdfDynamicTextElement,
  PdfLayoutElement,
  PdfResultsTableElement,
  PdfStaticImageElement,
  PdfStaticTextElement,
  PdfTemplateLayoutMap,
} from "./lhu-template-default-map";
import type { PdfLayoutRenderData } from "./pdf-layout-render-data";

export interface GenerateLhuPdfInput {
  layout: PdfTemplateLayoutMap;
  data: PdfLayoutRenderData;
  debugGrid?: boolean;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized.padEnd(6, "0").slice(0, 6);

  const red = parseInt(value.slice(0, 2), 16) / 255;
  const green = parseInt(value.slice(2, 4), 16) / 255;
  const blue = parseInt(value.slice(4, 6), 16) / 255;

  return rgb(red, green, blue);
}

function getFont(fonts: { normal: PDFFont; bold: PDFFont }, weight: "normal" | "bold") {
  return weight === "bold" ? fonts.bold : fonts.normal;
}

function resolveText(
  element: PdfStaticTextElement | PdfDynamicTextElement,
  data: PdfLayoutRenderData,
) {
  if (element.type === "staticText") return element.text;
  return data.textBindings[element.binding] || "";
}

function resolveImage(
  element: PdfStaticImageElement | PdfDynamicImageElement,
  data: PdfLayoutRenderData,
) {
  if (element.type === "staticImage") return element.src;
  return data.imageBindings[element.binding] || "";
}

function decodeDataUri(value: string) {
  const match = value.match(/^data:(.+?);base64,(.+)$/);
  if (!match) return null;

  return {
    mimeType: match[1],
    bytes: Uint8Array.from(Buffer.from(match[2], "base64")),
  };
}

async function readImageBytes(src: string) {
  if (!src) return null;

  if (src.startsWith("data:")) {
    const parsed = decodeDataUri(src);
    if (!parsed) return null;

    return {
      bytes: parsed.bytes,
      mimeType: parsed.mimeType,
    };
  }

  if (!src.startsWith("/")) return null;

  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));

  try {
    const bytes = await fs.readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();
    return {
      bytes: Uint8Array.from(bytes),
      mimeType: extension === ".jpg" || extension === ".jpeg" ? "image/jpeg" : "image/png",
    };
  } catch {
    return null;
  }
}

async function loadImage(
  pdfDoc: PDFDocument,
  src: string,
  cache: Map<string, PDFImage>,
) {
  if (!src) return null;
  if (cache.has(src)) return cache.get(src) ?? null;

  const payload = await readImageBytes(src);
  if (!payload) return null;

  const embedded =
    payload.mimeType === "image/jpeg"
      ? await pdfDoc.embedJpg(payload.bytes)
      : await pdfDoc.embedPng(payload.bytes);

  cache.set(src, embedded);
  return embedded;
}

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number) {
  const paragraphs = text.replace(/\r/g, "").split("\n");
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }

    const words = paragraph.split(/\s+/);
    let current = "";

    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, fontSize);

      if (width <= maxWidth || !current) {
        current = candidate;
        continue;
      }

      lines.push(current);
      current = word;
    }

    if (current) {
      lines.push(current);
    }
  }

  return lines;
}

function drawTextBlock(
  page: PDFPage,
  fonts: { normal: PDFFont; bold: PDFFont },
  text: string,
  element: PdfStaticTextElement | PdfDynamicTextElement,
) {
  if (!text) return;

  const font = getFont(fonts, element.fontWeight);
  const pageHeight = page.getHeight();
  const lineHeight = element.fontSize * element.lineHeight;
  const lines = wrapText(text, font, element.fontSize, element.width);
  const maxLines = Math.max(1, Math.floor(element.height / lineHeight));

  lines.slice(0, maxLines).forEach((line, index) => {
    const lineWidth = font.widthOfTextAtSize(line, element.fontSize);
    let x = element.x;

    if (element.align === "center") {
      x += Math.max((element.width - lineWidth) / 2, 0);
    } else if (element.align === "right") {
      x += Math.max(element.width - lineWidth, 0);
    }

    const y = pageHeight - element.y - element.fontSize - index * lineHeight;

    page.drawText(line, {
      x,
      y,
      size: element.fontSize,
      font,
      color: hexToRgb(element.color),
    });
  });
}

function drawLineElement(page: PDFPage, element: PdfLayoutElement) {
  if (element.type !== "line") return;

  const pageHeight = page.getHeight();
  page.drawLine({
    start: { x: element.x, y: pageHeight - element.y },
    end: { x: element.x + element.width, y: pageHeight - element.y - element.height },
    thickness: element.strokeWidth,
    color: hexToRgb(element.strokeColor),
  });
}

function drawPlaceholder(
  page: PDFPage,
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const pageHeight = page.getHeight();

  page.drawRectangle({
    x,
    y: pageHeight - y - height,
    width,
    height,
    borderWidth: 1,
    borderColor: rgb(0.8, 0.83, 0.87),
    color: rgb(0.97, 0.98, 0.99),
  });

  page.drawText(label, {
    x: x + 8,
    y: pageHeight - y - Math.min(height / 2, 16),
    size: 8,
    color: rgb(0.45, 0.5, 0.56),
  });
}

async function drawImageElement(
  page: PDFPage,
  pdfDoc: PDFDocument,
  data: PdfLayoutRenderData,
  element: PdfStaticImageElement | PdfDynamicImageElement,
  cache: Map<string, PDFImage>,
) {
  if (element.type === "dynamicImage" && element.binding === "qrCode") {
    drawPlaceholder(page, "QR Code", element.x, element.y, element.width, element.height);
    return;
  }

  const imageSrc = resolveImage(element, data);
  const image = await loadImage(pdfDoc, imageSrc, cache);

  if (!image) {
    drawPlaceholder(page, element.name, element.x, element.y, element.width, element.height);
    return;
  }

  const pageHeight = page.getHeight();
  const imageSize = image.scale(1);
  const widthRatio = element.width / imageSize.width;
  const heightRatio = element.height / imageSize.height;
  const scale =
    element.fit === "cover"
      ? Math.max(widthRatio, heightRatio)
      : Math.min(widthRatio, heightRatio);
  const drawWidth = imageSize.width * scale;
  const drawHeight = imageSize.height * scale;
  const offsetX = element.x + (element.width - drawWidth) / 2;
  const offsetY = pageHeight - element.y - drawHeight - (element.height - drawHeight) / 2;

  page.drawImage(image, {
    x: offsetX,
    y: offsetY,
    width: drawWidth,
    height: drawHeight,
  });
}

function drawResultsTable(
  page: PDFPage,
  fonts: { normal: PDFFont; bold: PDFFont },
  data: PdfLayoutRenderData,
  element: PdfResultsTableElement,
) {
  const pageHeight = page.getHeight();
  const rows = data.resultsTableRows.slice(0, element.maxRows);
  const totalWidth = element.columns.reduce((sum, column) => sum + column.width, 0) || 1;
  const scaleWidth = element.width / totalWidth;
  let currentY = element.y;

  if (element.showHeader) {
    let currentX = element.x;

    element.columns.forEach((column) => {
      const width = column.width * scaleWidth;
      page.drawRectangle({
        x: currentX,
        y: pageHeight - currentY - element.headerHeight,
        width,
        height: element.headerHeight,
        borderWidth: element.showGrid ? 1 : 0,
        borderColor: hexToRgb(element.borderColor),
        color: hexToRgb(element.headerFillColor),
      });

      const headerText = column.label;
      const textWidth = fonts.bold.widthOfTextAtSize(headerText, element.headerFontSize);
      const textX =
        column.align === "right"
          ? currentX + width - textWidth - element.cellPadding
          : column.align === "center"
            ? currentX + (width - textWidth) / 2
            : currentX + element.cellPadding;

      page.drawText(headerText, {
        x: textX,
        y: pageHeight - currentY - element.headerFontSize - 10,
        size: element.headerFontSize,
        font: fonts.bold,
        color: hexToRgb(element.textColor),
      });

      currentX += width;
    });

    currentY += element.headerHeight;
  }

  rows.forEach((row) => {
    let currentX = element.x;

    element.columns.forEach((column) => {
      const width = column.width * scaleWidth;
      const rawValue = row[column.valueKey] || "";
      const lines = wrapText(rawValue, fonts.normal, element.fontSize, width - element.cellPadding * 2);

      page.drawRectangle({
        x: currentX,
        y: pageHeight - currentY - element.rowHeight,
        width,
        height: element.rowHeight,
        borderWidth: element.showGrid ? 1 : 0,
        borderColor: hexToRgb(element.borderColor),
      });

      lines.slice(0, 2).forEach((line, lineIndex) => {
        const lineWidth = fonts.normal.widthOfTextAtSize(line, element.fontSize);
        const textX =
          column.align === "right"
            ? currentX + width - lineWidth - element.cellPadding
            : column.align === "center"
              ? currentX + (width - lineWidth) / 2
              : currentX + element.cellPadding;

        page.drawText(line, {
          x: textX,
          y:
            pageHeight -
            currentY -
            element.fontSize -
            8 -
            lineIndex * (element.fontSize * 1.2),
          size: element.fontSize,
          font: fonts.normal,
          color: hexToRgb(element.textColor),
        });
      });

      currentX += width;
    });

    currentY += element.rowHeight;
  });
}

async function drawAttachmentGrid(
  page: PDFPage,
  pdfDoc: PDFDocument,
  fonts: { normal: PDFFont; bold: PDFFont },
  data: PdfLayoutRenderData,
  element: PdfAttachmentGridElement,
  cache: Map<string, PDFImage>,
) {
  const pageHeight = page.getHeight();
  const items = data.attachmentBindings[element.category].slice(0, element.columns * element.rows);
  const totalGapX = element.gap * Math.max(0, element.columns - 1);
  const totalGapY = element.gap * Math.max(0, element.rows - 1);
  const cellWidth = (element.width - totalGapX) / Math.max(element.columns, 1);
  const cellHeight = (element.height - totalGapY) / Math.max(element.rows, 1);

  for (let index = 0; index < element.columns * element.rows; index += 1) {
    const rowIndex = Math.floor(index / element.columns);
    const columnIndex = index % element.columns;
    const item = items[index];
    const x = element.x + columnIndex * (cellWidth + element.gap);
    const y = element.y + rowIndex * (cellHeight + element.gap);
    const captionHeight = element.showCaptions ? element.captionFontSize + 10 : 0;
    const imageHeight = cellHeight - captionHeight;

    page.drawRectangle({
      x,
      y: pageHeight - y - cellHeight,
      width: cellWidth,
      height: cellHeight,
      borderWidth: 1,
      borderColor: hexToRgb(element.borderColor),
    });

    if (item?.src) {
      const image = await loadImage(pdfDoc, item.src, cache);
      if (image) {
        const imageSize = image.scale(1);
        const widthRatio = cellWidth / imageSize.width;
        const heightRatio = imageHeight / imageSize.height;
        const scale =
          element.fit === "cover"
            ? Math.max(widthRatio, heightRatio)
            : Math.min(widthRatio, heightRatio);

        const drawWidth = imageSize.width * scale;
        const drawHeight = imageSize.height * scale;

        page.drawImage(image, {
          x: x + (cellWidth - drawWidth) / 2,
          y: pageHeight - y - drawHeight - (imageHeight - drawHeight) / 2,
          width: drawWidth,
          height: drawHeight,
        });
      }
    }

    if (element.showCaptions) {
      page.drawText(item?.caption || `Lampiran ${index + 1}`, {
        x: x + 6,
        y: pageHeight - y - cellHeight + 4,
        size: element.captionFontSize,
        font: fonts.normal,
        color: rgb(0.3, 0.35, 0.4),
      });
    }
  }
}

function drawDebugOutline(page: PDFPage, element: PdfLayoutElement) {
  const pageHeight = page.getHeight();

  page.drawRectangle({
    x: element.x,
    y: pageHeight - element.y - Math.max(Math.abs(element.height), 1),
    width: Math.max(Math.abs(element.width), 1),
    height: Math.max(Math.abs(element.height), 1),
    borderWidth: 0.75,
    borderColor: rgb(0.85, 0.2, 0.2),
  });
}

export async function generateLhuPdf({
  layout,
  data,
  debugGrid,
}: GenerateLhuPdfInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fonts = {
    normal: await pdfDoc.embedFont(StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
  };
  const imageCache = new Map<string, PDFImage>();

  for (const pageLayout of layout.pages) {
    const page = pdfDoc.addPage([pageLayout.width, pageLayout.height]);
    const background = await loadImage(pdfDoc, pageLayout.backgroundSrc, imageCache);

    if (background) {
      page.drawImage(background, {
        x: 0,
        y: 0,
        width: pageLayout.width,
        height: pageLayout.height,
      });
    }

    const elements = layout.elements
      .filter((element) => element.pageId === pageLayout.id && element.visible)
      .sort((first, second) => first.zIndex - second.zIndex);

    for (const element of elements) {
      if (debugGrid) {
        drawDebugOutline(page, element);
      }

      switch (element.type) {
        case "staticText":
        case "dynamicText":
          drawTextBlock(page, fonts, resolveText(element, data), element);
          break;
        case "staticImage":
        case "dynamicImage":
          await drawImageElement(page, pdfDoc, data, element, imageCache);
          break;
        case "line":
          drawLineElement(page, element);
          break;
        case "resultsTable":
          drawResultsTable(page, fonts, data, element);
          break;
        case "attachmentGrid":
          await drawAttachmentGrid(page, pdfDoc, fonts, data, element, imageCache);
          break;
      }
    }
  }

  return pdfDoc.save();
}
