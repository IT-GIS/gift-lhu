import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";
import { generateLhuPdf } from "@/lib/pdf/generate-lhu-pdf";
import { getActivePdfLayout } from "@/lib/db/queries/pdf-layout";
import {
  normalizePdfLayout,
  type PdfTemplateLayoutMap,
} from "@/lib/pdf/lhu-template-default-map";
import { createSamplePdfLayoutRenderData } from "@/lib/pdf/pdf-layout-render-data";

export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!can(session.role, "manageSettings")) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const searchParams = req.nextUrl.searchParams;
    const debugGrid = searchParams.get("debug") === "true";
    const overrideLayout = searchParams.get("layout");

    let layoutMap: PdfTemplateLayoutMap;

    if (overrideLayout) {
      try {
        layoutMap = normalizePdfLayout(JSON.parse(decodeURIComponent(overrideLayout)));
      } catch {
        return new NextResponse("Invalid layout JSON format", { status: 400 });
      }
    } else {
      const dbLayout = await getActivePdfLayout();
      layoutMap = dbLayout.layout;
    }

    const pdfBuffer = await generateLhuPdf({
      layout: layoutMap,
      data: createSamplePdfLayoutRenderData(),
      debugGrid,
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // Force browser to display inline
        "Content-Disposition": "inline; filename=preview.pdf",
      },
    });
  } catch (error: any) {
    console.error("PDF Preview generation failed:", error);
    return new NextResponse(`Error generating preview: ${error.message}`, { status: 500 });
  }
}
