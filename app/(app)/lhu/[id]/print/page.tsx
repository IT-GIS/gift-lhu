import { notFound } from "next/navigation";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { getActivePdfLayout } from "@/lib/db/queries/pdf-layout";
import { getSettings } from "@/lib/db/queries/settings";
import { buildPdfLayoutRenderData } from "@/lib/pdf/pdf-layout-render-data";
import { PdfLayoutDocumentRenderer } from "@/components/pdf/pdf-layout-renderer";

const PRINT_SETTING_KEYS = [
  "company_name",
  "company_address",
  "company_email",
  "verification_base_url",
  "document_footer",
  "logo_login",
  "logo_dashboard",
  "logo_web",
  "pdf_company_logo",
  "pdf_signature_image",
  "pdf_signer_name",
  "pdf_signer_position",
  "pdf_issue_city",
] as const;

export default async function PrintLhuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [doc, settingsResult, activeLayout] = await Promise.all([
    getLhuDocumentById(id),
    getSettings([...PRINT_SETTING_KEYS]),
    getActivePdfLayout("GIFT-LAB-LHU-0000"),
  ]);

  if (!doc) return notFound();

  const renderData = buildPdfLayoutRenderData({
    doc,
    settings: settingsResult,
  });

  return (
    <main className="min-h-screen bg-slate-200 px-4 py-6 text-slate-900 print:bg-white print:px-0 print:py-0">
      <style>{`
        @page {
          size: A4;
          margin: 0;
        }

        @media print {
          html, body {
            background: #ffffff !important;
          }

          .pdf-print-stack {
            gap: 0 !important;
          }

          .pdf-print-page {
            margin: 0 auto !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            break-after: page;
            page-break-after: always;
          }

          .pdf-print-page:last-child {
            break-after: auto;
            page-break-after: auto;
          }
        }
      `}</style>

      <div className="pdf-print-stack mx-auto flex max-w-[920px] flex-col gap-6 print:max-w-none">
        <PdfLayoutDocumentRenderer
          layout={activeLayout.layout}
          data={renderData}
          scale={1}
          className="items-center"
          pageClassName="pdf-print-page"
        />
      </div>
    </main>
  );
}
