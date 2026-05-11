import type { LhuDocumentFull } from "@/lib/db/queries/lhu";
import {
  type PdfDynamicImageBinding,
  type PdfDynamicTextBinding,
} from "@/lib/pdf/lhu-template-default-map";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

export interface PdfLayoutAttachmentItem {
  src: string;
  caption: string;
  fileName: string;
}

export interface PdfLayoutRenderData {
  textBindings: Record<PdfDynamicTextBinding, string>;
  imageBindings: Partial<Record<PdfDynamicImageBinding, string>>;
  qrValue: string;
  resultsTableRows: Array<Record<string, string>>;
  attachmentBindings: Record<"produk" | "pengujian", PdfLayoutAttachmentItem[]>;
}

function normalizeImageSrc(src?: string | null) {
  if (!src) return "";
  if (
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }

  return `/${src}`;
}

function createEmptyTextBindings(): Record<PdfDynamicTextBinding, string> {
  return {
    companyName: "",
    companyAddress: "",
    companyEmail: "",
    reportTitle: "",
    reportSubtitle: "",
    referenceNumber: "",
    customerName: "",
    customerAddress: "",
    projectName: "",
    projectAddress: "",
    testMethod: "",
    testNumber: "",
    sampleCount: "",
    receivedDate: "",
    testedDate: "",
    issueCityDate: "",
    signerPosition: "",
    signerName: "",
    documentFooter: "",
    verificationUrl: "",
  };
}

function buildAttachmentItems(doc: LhuDocumentFull, category: "produk" | "pengujian") {
  return doc.attachments
    .filter((attachment) => attachment.category === category)
    .map((attachment) => ({
      src: normalizeImageSrc(attachment.fileUrl),
      caption: attachment.caption || attachment.fileName || "Lampiran",
      fileName: attachment.fileName,
    }));
}

export function buildPdfLayoutRenderData(input: {
  doc: LhuDocumentFull;
  settings: Record<string, string>;
}): PdfLayoutRenderData {
  const { doc, settings } = input;
  const appUrl =
    settings.verification_base_url || process.env.APP_URL || "http://localhost:3000";
  const activeToken = doc.activeToken?.publicToken;
  const verificationUrl = activeToken ? `${appUrl}/verify/${activeToken}` : appUrl;
  const signerName = settings.pdf_signer_name || "Penanggung Jawab";
  const signerPosition = settings.pdf_signer_position || "Manajer Teknik";
  const publishedReferenceDate = doc.publishedAt ?? doc.updatedAt ?? new Date();
  const issueCity = settings.pdf_issue_city || "Pagedangan";
  const textBindings = createEmptyTextBindings();

  textBindings.companyName = settings.company_name || "PT Global Inspeksi Forensik Teknik";
  textBindings.companyAddress = settings.company_address || "";
  textBindings.companyEmail = settings.company_email || "";
  textBindings.reportTitle = "Laporan Hasil Pengujian";
  textBindings.reportSubtitle = `Pengujian ${getConcreteTypeLabel(doc.concreteType)}`;
  textBindings.referenceNumber = doc.referenceNumber || "-";
  textBindings.customerName = doc.customer?.companyName || "-";
  textBindings.customerAddress = doc.customer?.address || "-";
  textBindings.projectName = doc.projectName || "-";
  textBindings.projectAddress = doc.projectAddress || "-";
  textBindings.testMethod = doc.testType || "-";
  textBindings.testNumber = doc.lhuNumber || doc.documentCode || doc.referenceNumber || "-";
  textBindings.sampleCount = `${doc.resultRows.length} sampel`;
  textBindings.receivedDate = formatDate(doc.receivedDate);
  textBindings.testedDate = formatDate(doc.testingDate);
  textBindings.issueCityDate = `${issueCity}, ${formatDate(publishedReferenceDate)}`;
  textBindings.signerPosition = signerPosition;
  textBindings.signerName = signerName;
  textBindings.documentFooter = settings.document_footer || "";
  textBindings.verificationUrl = verificationUrl;

  return {
    textBindings,
    imageBindings: {
      companyLogo:
        settings.pdf_company_logo ||
        settings.logo_dashboard ||
        settings.logo_web ||
        settings.logo_login ||
        "",
      signature: settings.pdf_signature_image || "",
    },
    qrValue: verificationUrl,
    resultsTableRows: doc.resultRows.map((row) => ({
      rowNumber: String(row.rowNumber),
      sampleCode: row.sampleCode || "-",
      castingDate: formatDate(row.castingDate),
      testingDate: formatDate(row.testingDate),
      weight: row.weight || "-",
      ageDays: String(row.ageDays ?? "-"),
      dimension: row.dimension || "-",
      maxLoad: row.maxLoad || "-",
      compressiveStrength: row.compressiveStrength || "-",
      compressiveStrengthKgCm2: row.compressiveStrengthKgCm2 || "-",
      cubeConversionStrengthKgCm2: row.cubeConversionStrengthKgCm2 || "-",
      failurePattern: row.failurePattern || "-",
      remarks: row.remarks || "",
    })),
    attachmentBindings: {
      produk: buildAttachmentItems(doc, "produk"),
      pengujian: buildAttachmentItems(doc, "pengujian"),
    },
  };
}

export function createSamplePdfLayoutRenderData(): PdfLayoutRenderData {
  const textBindings = createEmptyTextBindings();

  textBindings.companyName = "PT GLOBAL INSPEKSI FORENSIK TEKNIK";
  textBindings.companyAddress =
    "Komplek 91 Distrik BSD Blok C5, Pagedangan\nKabupaten Tangerang, Banten 15339";
  textBindings.companyEmail = "globalinspeksiforensikteknik@gmail.com";
  textBindings.reportTitle = "Laporan Hasil Pengujian";
  textBindings.reportSubtitle = "Pengujian Kuat Tekan Beton Silinder";
  textBindings.referenceNumber = "REF-001/PJT/2026";
  textBindings.customerName = "PT Maju Mundur Sejahtera";
  textBindings.customerAddress = "Jl. Industri No. 45, Jakarta";
  textBindings.projectName = "Gedung Sample A";
  textBindings.projectAddress = "Pagedangan, Kabupaten Tangerang";
  textBindings.testMethod = "SNI 1974:2011";
  textBindings.testNumber = "GIFT/LHU/2026/0045";
  textBindings.sampleCount = "5 sampel";
  textBindings.receivedDate = "20 Februari 2026";
  textBindings.testedDate = "28 Februari 2026";
  textBindings.issueCityDate = "Pagedangan, 01 Maret 2026";
  textBindings.signerPosition = "Manajer Teknik";
  textBindings.signerName = "Ir. Budiman Sutanto";
  textBindings.documentFooter = "Dokumen ini sah setelah diverifikasi melalui QR code.";
  textBindings.verificationUrl = "https://gift-lab.test/verify/sample-token";

  return {
    textBindings,
    imageBindings: {
      companyLogo: "",
      signature: "",
    },
    qrValue: "https://gift-lab.test/verify/sample-token",
    resultsTableRows: [
      {
        rowNumber: "1",
        sampleCode: "S-01",
        castingDate: "01 Februari 2026",
        testingDate: "28 Februari 2026",
        weight: "12.5",
        ageDays: "28",
        dimension: "15x30",
        maxLoad: "450",
        compressiveStrength: "25.4",
        compressiveStrengthKgCm2: "259.1",
        cubeConversionStrengthKgCm2: "271.0",
        failurePattern: "1",
        remarks: "OK",
      },
      {
        rowNumber: "2",
        sampleCode: "S-02",
        castingDate: "01 Februari 2026",
        testingDate: "28 Februari 2026",
        weight: "12.4",
        ageDays: "28",
        dimension: "15x30",
        maxLoad: "446",
        compressiveStrength: "25.1",
        compressiveStrengthKgCm2: "256.0",
        cubeConversionStrengthKgCm2: "268.4",
        failurePattern: "2",
        remarks: "OK",
      },
      {
        rowNumber: "3",
        sampleCode: "S-03",
        castingDate: "01 Februari 2026",
        testingDate: "28 Februari 2026",
        weight: "12.6",
        ageDays: "28",
        dimension: "15x30",
        maxLoad: "452",
        compressiveStrength: "25.6",
        compressiveStrengthKgCm2: "260.8",
        cubeConversionStrengthKgCm2: "272.8",
        failurePattern: "1",
        remarks: "OK",
      },
    ],
    attachmentBindings: {
      produk: [
        { src: "", caption: "Produk 1", fileName: "produk-1.png" },
        { src: "", caption: "Produk 2", fileName: "produk-2.png" },
      ],
      pengujian: [
        { src: "", caption: "Pengujian 1", fileName: "pengujian-1.png" },
        { src: "", caption: "Pengujian 2", fileName: "pengujian-2.png" },
      ],
    },
  };
}
