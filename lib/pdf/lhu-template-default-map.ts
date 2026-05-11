export type PdfPageId = "page1" | "page2";
export type PdfTextAlign = "left" | "center" | "right";
export type PdfTextWeight = "normal" | "bold";
export type PdfImageFit = "contain" | "cover";

export type PdfDynamicTextBinding =
  | "companyName"
  | "companyAddress"
  | "companyEmail"
  | "reportTitle"
  | "reportSubtitle"
  | "referenceNumber"
  | "customerName"
  | "customerAddress"
  | "projectName"
  | "projectAddress"
  | "testMethod"
  | "testNumber"
  | "sampleCount"
  | "receivedDate"
  | "testedDate"
  | "issueCityDate"
  | "signerPosition"
  | "signerName"
  | "documentFooter"
  | "verificationUrl";

export type PdfDynamicImageBinding = "companyLogo" | "signature" | "qrCode";

export type PdfLayoutElementType =
  | "staticText"
  | "dynamicText"
  | "staticImage"
  | "dynamicImage"
  | "line"
  | "resultsTable"
  | "attachmentGrid";

export interface PdfLayoutPage {
  id: PdfPageId;
  name: string;
  width: number;
  height: number;
  backgroundSrc: string;
  backgroundColor: string;
}

export interface PdfLayoutElementBase {
  id: string;
  name: string;
  type: PdfLayoutElementType;
  pageId: PdfPageId;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  opacity: number;
  zIndex: number;
}

export interface PdfStaticTextElement extends PdfLayoutElementBase {
  type: "staticText";
  text: string;
  fontSize: number;
  fontWeight: PdfTextWeight;
  align: PdfTextAlign;
  color: string;
  lineHeight: number;
}

export interface PdfDynamicTextElement extends PdfLayoutElementBase {
  type: "dynamicText";
  binding: PdfDynamicTextBinding;
  fontSize: number;
  fontWeight: PdfTextWeight;
  align: PdfTextAlign;
  color: string;
  lineHeight: number;
}

export interface PdfStaticImageElement extends PdfLayoutElementBase {
  type: "staticImage";
  src: string;
  fit: PdfImageFit;
}

export interface PdfDynamicImageElement extends PdfLayoutElementBase {
  type: "dynamicImage";
  binding: PdfDynamicImageBinding;
  fit: PdfImageFit;
}

export interface PdfLineElement extends PdfLayoutElementBase {
  type: "line";
  strokeColor: string;
  strokeWidth: number;
}

export interface PdfResultsTableColumn {
  id: string;
  label: string;
  valueKey: string;
  width: number;
  align: PdfTextAlign;
}

export interface PdfResultsTableElement extends PdfLayoutElementBase {
  type: "resultsTable";
  fontSize: number;
  headerFontSize: number;
  rowHeight: number;
  headerHeight: number;
  cellPadding: number;
  showHeader: boolean;
  showGrid: boolean;
  borderColor: string;
  headerFillColor: string;
  textColor: string;
  maxRows: number;
  columns: PdfResultsTableColumn[];
}

export interface PdfAttachmentGridElement extends PdfLayoutElementBase {
  type: "attachmentGrid";
  category: "produk" | "pengujian";
  columns: number;
  rows: number;
  gap: number;
  fit: PdfImageFit;
  showCaptions: boolean;
  captionFontSize: number;
  borderColor: string;
}

export type PdfLayoutElement =
  | PdfStaticTextElement
  | PdfDynamicTextElement
  | PdfStaticImageElement
  | PdfDynamicImageElement
  | PdfLineElement
  | PdfResultsTableElement
  | PdfAttachmentGridElement;

export interface PdfTemplateLayoutMap {
  version: 2;
  templateKey: string;
  pages: PdfLayoutPage[];
  elements: PdfLayoutElement[];
}

export const PDF_DYNAMIC_TEXT_BINDINGS: Array<{
  value: PdfDynamicTextBinding;
  label: string;
}> = [
  { value: "companyName", label: "Nama Perusahaan" },
  { value: "companyAddress", label: "Alamat Perusahaan" },
  { value: "companyEmail", label: "Email Perusahaan" },
  { value: "reportTitle", label: "Judul Laporan" },
  { value: "reportSubtitle", label: "Subjudul Laporan" },
  { value: "referenceNumber", label: "Nomor Referensi" },
  { value: "customerName", label: "Nama Pelanggan" },
  { value: "customerAddress", label: "Alamat Pelanggan" },
  { value: "projectName", label: "Nama Proyek" },
  { value: "projectAddress", label: "Alamat Proyek" },
  { value: "testMethod", label: "Metode / Acuan Uji" },
  { value: "testNumber", label: "Nomor Pengujian" },
  { value: "sampleCount", label: "Jumlah Sampel" },
  { value: "receivedDate", label: "Tanggal Terima" },
  { value: "testedDate", label: "Tanggal Uji" },
  { value: "issueCityDate", label: "Kota & Tanggal Terbit" },
  { value: "signerPosition", label: "Jabatan Penandatangan" },
  { value: "signerName", label: "Nama Penandatangan" },
  { value: "documentFooter", label: "Footer Dokumen" },
  { value: "verificationUrl", label: "URL Verifikasi" },
];

export const PDF_DYNAMIC_IMAGE_BINDINGS: Array<{
  value: PdfDynamicImageBinding;
  label: string;
}> = [
  { value: "companyLogo", label: "Logo Perusahaan" },
  { value: "signature", label: "Tanda Tangan" },
  { value: "qrCode", label: "QR Code Verifikasi" },
];

export const DEFAULT_RESULTS_TABLE_COLUMNS: PdfResultsTableColumn[] = [
  { id: "rowNumber", label: "No", valueKey: "rowNumber", width: 42, align: "center" },
  { id: "sampleCode", label: "Kode Sampel", valueKey: "sampleCode", width: 92, align: "left" },
  { id: "castingDate", label: "Tgl Buat", valueKey: "castingDate", width: 74, align: "center" },
  { id: "testingDate", label: "Tgl Uji", valueKey: "testingDate", width: 74, align: "center" },
  { id: "weight", label: "Berat", valueKey: "weight", width: 58, align: "center" },
  { id: "ageDays", label: "Umur", valueKey: "ageDays", width: 58, align: "center" },
  { id: "dimension", label: "Ukuran", valueKey: "dimension", width: 64, align: "center" },
  { id: "maxLoad", label: "Beban", valueKey: "maxLoad", width: 66, align: "center" },
  { id: "compressiveStrength", label: "Kuat Tekan (Mpa)", valueKey: "compressiveStrength", width: 86, align: "center" },
  { id: "compressiveStrengthKgCm2", label: "Teg. Hancur (Kg/cm2)", valueKey: "compressiveStrengthKgCm2", width: 94, align: "center" },
  { id: "cubeConversionStrengthKgCm2", label: "Konversi Kubus", valueKey: "cubeConversionStrengthKgCm2", width: 96, align: "center" },
  { id: "failurePattern", label: "Pola Hancur", valueKey: "failurePattern", width: 74, align: "center" },
  { id: "remarks", label: "Keterangan", valueKey: "remarks", width: 98, align: "left" },
];

function createTextElement(
  id: string,
  name: string,
  pageId: PdfPageId,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
  fontWeight: PdfTextWeight,
  align: PdfTextAlign,
  color: string,
  lineHeight: number,
  textOrBinding: string,
  dynamic = false,
  zIndex = 1,
): PdfStaticTextElement | PdfDynamicTextElement {
  const base = {
    id,
    name,
    pageId,
    x,
    y,
    width,
    height,
    fontSize,
    fontWeight,
    align,
    color,
    lineHeight,
    visible: true,
    opacity: 1,
    zIndex,
  };

  if (dynamic) {
    return {
      ...base,
      type: "dynamicText",
      binding: textOrBinding as PdfDynamicTextBinding,
    };
  }

  return {
    ...base,
    type: "staticText",
    text: textOrBinding,
  };
}

function createLineElement(
  id: string,
  name: string,
  pageId: PdfPageId,
  x: number,
  y: number,
  width: number,
  height: number,
  strokeWidth: number,
  strokeColor: string,
  zIndex = 1,
): PdfLineElement {
  return {
    id,
    name,
    type: "line",
    pageId,
    x,
    y,
    width,
    height,
    strokeWidth,
    strokeColor,
    visible: true,
    opacity: 1,
    zIndex,
  };
}

function createDynamicImageElement(
  id: string,
  name: string,
  pageId: PdfPageId,
  x: number,
  y: number,
  width: number,
  height: number,
  binding: PdfDynamicImageBinding,
  fit: PdfImageFit,
  zIndex = 1,
): PdfDynamicImageElement {
  return {
    id,
    name,
    type: "dynamicImage",
    pageId,
    x,
    y,
    width,
    height,
    binding,
    fit,
    visible: true,
    opacity: 1,
    zIndex,
  };
}

function createAttachmentGridElement(
  id: string,
  name: string,
  pageId: PdfPageId,
  x: number,
  y: number,
  width: number,
  height: number,
  category: "produk" | "pengujian",
  zIndex = 1,
): PdfAttachmentGridElement {
  return {
    id,
    name,
    type: "attachmentGrid",
    pageId,
    x,
    y,
    width,
    height,
    category,
    columns: 2,
    rows: 2,
    gap: 12,
    fit: "cover",
    showCaptions: true,
    captionFontSize: 10,
    borderColor: "#CBD5E1",
    visible: true,
    opacity: 1,
    zIndex,
  };
}

function createResultsTableElement(
  id: string,
  name: string,
  pageId: PdfPageId,
  x: number,
  y: number,
  width: number,
  height: number,
  zIndex = 1,
): PdfResultsTableElement {
  return {
    id,
    name,
    type: "resultsTable",
    pageId,
    x,
    y,
    width,
    height,
    fontSize: 10,
    headerFontSize: 10,
    rowHeight: 28,
    headerHeight: 34,
    cellPadding: 6,
    showHeader: true,
    showGrid: true,
    borderColor: "#94A3B8",
    headerFillColor: "#F8FAFC",
    textColor: "#0F172A",
    maxRows: 12,
    columns: DEFAULT_RESULTS_TABLE_COLUMNS.map((column) => ({ ...column })),
    visible: true,
    opacity: 1,
    zIndex,
  };
}

export const DEFAULT_PDF_LAYOUT_MAP: PdfTemplateLayoutMap = {
  version: 2,
  templateKey: "GIFT-LAB-LHU-0000",
  pages: [
    {
      id: "page1",
      name: "Halaman 1",
      width: 794,
      height: 1123,
      backgroundSrc: "/pdf-templates/Bingkai_pdf.png",
      backgroundColor: "#FFFFFF",
    },
    {
      id: "page2",
      name: "Halaman 2",
      width: 794,
      height: 1123,
      backgroundSrc: "/pdf-templates/Bingkai_pdf.png",
      backgroundColor: "#FFFFFF",
    },
  ],
  elements: [
    createTextElement("company-name", "Nama Perusahaan", "page1", 80, 62, 634, 28, 16, "bold", "center", "#1E3A8A", 1.2, "companyName", true, 1),
    createTextElement("company-address", "Alamat Perusahaan", "page1", 120, 94, 554, 48, 10, "normal", "center", "#0F172A", 1.4, "companyAddress", true, 1),
    createTextElement("company-email", "Email Perusahaan", "page1", 120, 144, 554, 18, 10, "normal", "center", "#0F172A", 1.2, "companyEmail", true, 1),
    createDynamicImageElement("signature-box", "Tanda Tangan", "page1", 560, 915, 110, 70, "signature", "contain", 1),
    createDynamicImageElement("qr-box", "QR Code", "page1", 80, 942, 90, 90, "qrCode", "contain", 1),
    createTextElement("report-title", "Judul Laporan", "page1", 120, 190, 554, 28, 18, "bold", "center", "#0F172A", 1.2, "reportTitle", true, 1),
    createTextElement("report-subtitle", "Subjudul Laporan", "page1", 120, 224, 554, 20, 12, "bold", "center", "#0F172A", 1.2, "reportSubtitle", true, 1),
    createLineElement("divider-top", "Garis Header", "page1", 86, 262, 622, 0, 1.25, "#94A3B8", 1),
    createTextElement("label-customer", "Label Pelanggan", "page1", 86, 284, 150, 18, 10, "bold", "left", "#475569", 1.2, "Nama Pelanggan", false, 1),
    createTextElement("value-customer", "Value Pelanggan", "page1", 250, 284, 458, 18, 10, "normal", "left", "#0F172A", 1.3, "customerName", true, 1),
    createTextElement("label-project", "Label Proyek", "page1", 86, 312, 150, 18, 10, "bold", "left", "#475569", 1.2, "Nama Proyek", false, 1),
    createTextElement("value-project", "Value Proyek", "page1", 250, 312, 458, 18, 10, "normal", "left", "#0F172A", 1.3, "projectName", true, 1),
    createTextElement("label-address", "Label Alamat", "page1", 86, 340, 150, 18, 10, "bold", "left", "#475569", 1.2, "Alamat Proyek", false, 1),
    createTextElement("value-address", "Value Alamat", "page1", 250, 340, 458, 36, 10, "normal", "left", "#0F172A", 1.3, "projectAddress", true, 1),
    createTextElement("label-reference", "Label Referensi", "page1", 86, 388, 150, 18, 10, "bold", "left", "#475569", 1.2, "Nomor Referensi", false, 1),
    createTextElement("value-reference", "Value Referensi", "page1", 250, 388, 210, 18, 10, "normal", "left", "#0F172A", 1.3, "referenceNumber", true, 1),
    createTextElement("label-method", "Label Metode", "page1", 470, 388, 120, 18, 10, "bold", "left", "#475569", 1.2, "Acuan", false, 1),
    createTextElement("value-method", "Value Metode", "page1", 592, 388, 116, 18, 10, "normal", "left", "#0F172A", 1.3, "testMethod", true, 1),
    createTextElement("label-sample", "Label Sampel", "page1", 86, 416, 150, 18, 10, "bold", "left", "#475569", 1.2, "Jumlah Sampel", false, 1),
    createTextElement("value-sample", "Value Sampel", "page1", 250, 416, 210, 18, 10, "normal", "left", "#0F172A", 1.3, "sampleCount", true, 1),
    createTextElement("label-received", "Label Tanggal Terima", "page1", 470, 416, 120, 18, 10, "bold", "left", "#475569", 1.2, "Tanggal Terima", false, 1),
    createTextElement("value-received", "Value Tanggal Terima", "page1", 592, 416, 116, 18, 10, "normal", "left", "#0F172A", 1.3, "receivedDate", true, 1),
    createTextElement("label-tested", "Label Tanggal Uji", "page1", 470, 444, 120, 18, 10, "bold", "left", "#475569", 1.2, "Tanggal Uji", false, 1),
    createTextElement("value-tested", "Value Tanggal Uji", "page1", 592, 444, 116, 18, 10, "normal", "left", "#0F172A", 1.3, "testedDate", true, 1),
    createResultsTableElement("results-table", "Tabel Hasil Pengujian", "page1", 72, 486, 650, 320, 1),
    createTextElement("verification-url", "URL Verifikasi", "page1", 184, 972, 210, 60, 9, "normal", "left", "#475569", 1.3, "verificationUrl", true, 1),
    createTextElement("issue-city-date", "Kota & Tanggal", "page1", 522, 894, 186, 18, 10, "normal", "center", "#0F172A", 1.2, "issueCityDate", true, 1),
    createTextElement("signer-position", "Jabatan", "page1", 522, 919, 186, 18, 10, "normal", "center", "#0F172A", 1.2, "signerPosition", true, 1),
    createTextElement("signer-name", "Nama Penandatangan", "page1", 522, 998, 186, 18, 10, "bold", "center", "#0F172A", 1.2, "signerName", true, 1),
    createTextElement("footer-text", "Footer Dokumen", "page1", 86, 1062, 622, 20, 9, "normal", "center", "#64748B", 1.2, "documentFooter", true, 1),
    createTextElement("attachments-title-produk", "Judul Lampiran Produk", "page2", 80, 74, 300, 24, 15, "bold", "left", "#0F172A", 1.2, "Lampiran Gambar Produk", false, 1),
    createAttachmentGridElement("attachments-produk", "Grid Lampiran Produk", "page2", 80, 114, 634, 360, "produk", 1),
    createTextElement("attachments-title-pengujian", "Judul Lampiran Pengujian", "page2", 80, 536, 340, 24, 15, "bold", "left", "#0F172A", 1.2, "Lampiran Gambar Pengujian", false, 1),
    createAttachmentGridElement("attachments-pengujian", "Grid Lampiran Pengujian", "page2", 80, 576, 634, 360, "pengujian", 1),
  ],
};

function cloneDefaultLayout(): PdfTemplateLayoutMap {
  return JSON.parse(JSON.stringify(DEFAULT_PDF_LAYOUT_MAP)) as PdfTemplateLayoutMap;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPageId(value: unknown): value is PdfPageId {
  return value === "page1" || value === "page2";
}

function isElementType(value: unknown): value is PdfLayoutElementType {
  return (
    value === "staticText" ||
    value === "dynamicText" ||
    value === "staticImage" ||
    value === "dynamicImage" ||
    value === "line" ||
    value === "resultsTable" ||
    value === "attachmentGrid"
  );
}

function sanitizeElement(value: unknown): PdfLayoutElement | null {
  if (!isObject(value) || !isElementType(value.type) || !isPageId(value.pageId)) {
    return null;
  }

  const base: PdfLayoutElementBase = {
    id: String(value.id ?? `el-${Date.now()}`),
    name: String(value.name ?? "Elemen"),
    type: value.type,
    pageId: value.pageId,
    x: Number(value.x ?? 0),
    y: Number(value.y ?? 0),
    width: Number(value.width ?? 120),
    height: Number(value.height ?? 40),
    visible: Boolean(value.visible ?? true),
    opacity: Number(value.opacity ?? 1),
    zIndex: Number(value.zIndex ?? 1),
  };

  switch (value.type) {
    case "staticText":
      return {
        ...base,
        type: "staticText",
        text: String(value.text ?? ""),
        fontSize: Number(value.fontSize ?? 12),
        fontWeight: value.fontWeight === "bold" ? "bold" : "normal",
        align: value.align === "center" || value.align === "right" ? value.align : "left",
        color: String(value.color ?? "#0F172A"),
        lineHeight: Number(value.lineHeight ?? 1.2),
      };
    case "dynamicText":
      return {
        ...base,
        type: "dynamicText",
        binding: PDF_DYNAMIC_TEXT_BINDINGS.some((item) => item.value === value.binding)
          ? (value.binding as PdfDynamicTextBinding)
          : "reportTitle",
        fontSize: Number(value.fontSize ?? 12),
        fontWeight: value.fontWeight === "bold" ? "bold" : "normal",
        align: value.align === "center" || value.align === "right" ? value.align : "left",
        color: String(value.color ?? "#0F172A"),
        lineHeight: Number(value.lineHeight ?? 1.2),
      };
    case "staticImage":
      return {
        ...base,
        type: "staticImage",
        src: String(value.src ?? ""),
        fit: value.fit === "cover" ? "cover" : "contain",
      };
    case "dynamicImage":
      return {
        ...base,
        type: "dynamicImage",
        binding: PDF_DYNAMIC_IMAGE_BINDINGS.some((item) => item.value === value.binding)
          ? (value.binding as PdfDynamicImageBinding)
          : "companyLogo",
        fit: value.fit === "cover" ? "cover" : "contain",
      };
    case "line":
      return {
        ...base,
        type: "line",
        strokeColor: String(value.strokeColor ?? "#94A3B8"),
        strokeWidth: Number(value.strokeWidth ?? 1),
      };
    case "resultsTable":
      return {
        ...base,
        type: "resultsTable",
        fontSize: Number(value.fontSize ?? 10),
        headerFontSize: Number(value.headerFontSize ?? 10),
        rowHeight: Number(value.rowHeight ?? 28),
        headerHeight: Number(value.headerHeight ?? 34),
        cellPadding: Number(value.cellPadding ?? 6),
        showHeader: Boolean(value.showHeader ?? true),
        showGrid: Boolean(value.showGrid ?? true),
        borderColor: String(value.borderColor ?? "#94A3B8"),
        headerFillColor: String(value.headerFillColor ?? "#F8FAFC"),
        textColor: String(value.textColor ?? "#0F172A"),
        maxRows: Number(value.maxRows ?? 12),
        columns: Array.isArray(value.columns) && value.columns.length > 0
          ? value.columns.map((column, index) => ({
              id: String((column as Record<string, unknown>).id ?? `column-${index}`),
              label: String((column as Record<string, unknown>).label ?? `Kolom ${index + 1}`),
              valueKey: String((column as Record<string, unknown>).valueKey ?? `value-${index}`),
              width: Number((column as Record<string, unknown>).width ?? 80),
              align:
                (column as Record<string, unknown>).align === "center" ||
                (column as Record<string, unknown>).align === "right"
                  ? ((column as Record<string, unknown>).align as PdfTextAlign)
                  : "left",
            }))
          : DEFAULT_RESULTS_TABLE_COLUMNS.map((column) => ({ ...column })),
      };
    case "attachmentGrid":
      return {
        ...base,
        type: "attachmentGrid",
        category: value.category === "pengujian" ? "pengujian" : "produk",
        columns: Number(value.columns ?? 2),
        rows: Number(value.rows ?? 2),
        gap: Number(value.gap ?? 12),
        fit: value.fit === "contain" ? "contain" : "cover",
        showCaptions: Boolean(value.showCaptions ?? true),
        captionFontSize: Number(value.captionFontSize ?? 10),
        borderColor: String(value.borderColor ?? "#CBD5E1"),
      };
  }
}

export function normalizePdfLayout(rawLayout: unknown): PdfTemplateLayoutMap {
  if (!isObject(rawLayout)) {
    return cloneDefaultLayout();
  }

  if (rawLayout.version !== 2 || !Array.isArray(rawLayout.pages) || !Array.isArray(rawLayout.elements)) {
    return cloneDefaultLayout();
  }

  const defaults = cloneDefaultLayout();
  const rawPages = rawLayout.pages as unknown[];
  const rawElements = rawLayout.elements as unknown[];
  const pages = defaults.pages.map((defaultPage) => {
    const matched = rawPages.find(
      (page) => isObject(page) && page.id === defaultPage.id,
    ) as Record<string, unknown> | undefined;

    if (!matched) return defaultPage;

    return {
      ...defaultPage,
      name: String(matched.name ?? defaultPage.name),
      width: Number(matched.width ?? defaultPage.width),
      height: Number(matched.height ?? defaultPage.height),
      backgroundSrc: String(matched.backgroundSrc ?? defaultPage.backgroundSrc),
      backgroundColor: String(matched.backgroundColor ?? defaultPage.backgroundColor),
    };
  });

  const elements = rawElements
    .map((element) => sanitizeElement(element))
    .filter((element): element is PdfLayoutElement => Boolean(element));

  return {
    version: 2,
    templateKey: String(rawLayout.templateKey ?? defaults.templateKey),
    pages,
    elements: elements.length > 0 ? elements : defaults.elements,
  };
}

export function createLayoutElement(
  type: PdfLayoutElementType,
  pageId: PdfPageId,
): PdfLayoutElement {
  const baseX = 120;
  const baseY = 160;
  const timestamp = Date.now();

  switch (type) {
    case "staticText":
      return createTextElement(
        `static-text-${timestamp}`,
        "Teks Bebas",
        pageId,
        baseX,
        baseY,
        220,
        32,
        14,
        "bold",
        "left",
        "#0F172A",
        1.2,
        "Tulis teks di sini",
        false,
        10,
      );
    case "dynamicText":
      return createTextElement(
        `dynamic-text-${timestamp}`,
        "Teks Dinamis",
        pageId,
        baseX,
        baseY,
        220,
        32,
        12,
        "normal",
        "left",
        "#0F172A",
        1.2,
        "reportTitle",
        true,
        10,
      );
    case "staticImage":
      return {
        id: `static-image-${timestamp}`,
        name: "Gambar Bebas",
        type: "staticImage",
        pageId,
        x: baseX,
        y: baseY,
        width: 120,
        height: 120,
        src: "",
        fit: "contain",
        visible: true,
        opacity: 1,
        zIndex: 10,
      };
    case "dynamicImage":
      return createDynamicImageElement(
        `dynamic-image-${timestamp}`,
        "Gambar Dinamis",
        pageId,
        baseX,
        baseY,
        120,
        120,
        "companyLogo",
        "contain",
        10,
      );
    case "line":
      return createLineElement(
        `line-${timestamp}`,
        "Garis",
        pageId,
        baseX,
        baseY,
        200,
        0,
        1.5,
        "#0F172A",
        10,
      );
    case "resultsTable":
      return createResultsTableElement(
        `table-${timestamp}`,
        "Tabel Hasil",
        pageId,
        72,
        420,
        650,
        320,
        10,
      );
    case "attachmentGrid":
      return createAttachmentGridElement(
        `attachment-grid-${timestamp}`,
        "Grid Lampiran",
        pageId,
        80,
        180,
        634,
        300,
        "produk",
        10,
      );
  }
}
