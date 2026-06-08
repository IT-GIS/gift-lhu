import { NextResponse } from "next/server";
import { getLhuDocumentByToken } from "@/lib/db/queries/lhu";
import { getSettings } from "@/lib/db/queries/settings";
import { getActivePdfLayout } from "@/lib/db/queries/pdf-layout";
import { buildPdfLayoutRenderData } from "@/lib/pdf/pdf-layout-render-data";
import { generateLhuPdf } from "@/lib/pdf/generate-lhu-pdf";

export const runtime = "nodejs";

const PDF_SETTING_KEYS = [
  "company_name",
  "company_address",
  "company_email",
  "verification_base_url",
  "document_footer",
  "pdf_company_logo",
  "pdf_signature_image",
  "pdf_signer_name",
  "pdf_signer_position",
  "pdf_issue_city",
];

function toSafeFilename(text: string) {
  return text
    .trim()
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9\s\-_.]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "dokumen";
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const doc = await getLhuDocumentByToken(token);

  if (
    !doc ||
    !doc.activeToken ||
    doc.activeToken.publicToken !== token ||
    !doc.activeToken.isActive ||
    doc.status !== "published"
  ) {
    return new NextResponse("Dokumen tidak tersedia atau token tidak valid.", { status: 404 });
  }

  try {
    const [settings, layoutResult] = await Promise.all([
      getSettings(PDF_SETTING_KEYS),
      getActivePdfLayout("GIFT-LAB-LHU-0000"),
    ]);

    const renderData = buildPdfLayoutRenderData({ doc, settings });
    const pdfBuffer = await generateLhuPdf({
      layout: layoutResult.layout,
      data: renderData,
    });

    const refNum = toSafeFilename(doc.lhuNumber || doc.referenceNumber || doc.documentCode || "LHU");
    const customer = toSafeFilename(doc.customer?.companyName || "Pelanggan");
    const filename = `${refNum}-${customer}.pdf`;

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Gagal generate PDF:", error);
    return new NextResponse("Gagal menghasilkan dokumen PDF.", { status: 500 });
  }
}
