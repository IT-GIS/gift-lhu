import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";
import { getActivePdfLayout, getPdfLayoutVersionHistory } from "@/lib/db/queries/pdf-layout";
import { PageHeader } from "@/components/shared/page-header";
import { PdfLayoutEditorClient } from "@/components/settings/pdf-layout-editor-client";

export default async function PdfTemplateLayoutPage() {
  const session = await requireSession();
  
  if (!can(session.role, "manageSettings")) {
    redirect("/dashboard");
  }

  const { layout, versionId, versionNumber } = await getActivePdfLayout("GIFT-LAB-LHU-0000");
  const history = await getPdfLayoutVersionHistory("GIFT-LAB-LHU-0000");

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title="PDF Template Layout Editor"
        description="Susun layout PDF berbasis template bingkai dengan elemen bebas seperti teks, gambar, garis, tabel, dan lampiran."
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="flex items-center gap-3">
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Info:</strong> Editor ini memakai kanvas visual di atas `Bingkai_pdf.png`.
            Tambahkan elemen bebas, atur propertinya, lalu geser langsung dari preview untuk menata judul, isi form, tabel, lampiran, tanda tangan, garis, dan gambar lain.
          </div>
        </div>
      </div>

      <PdfLayoutEditorClient 
        initialLayout={layout}
        activeVersionId={versionId}
        activeVersionNumber={versionNumber}
        history={history.versions.map(v => ({
            id: v.id,
            versionNumber: v.versionNumber,
            createdAt: v.createdAt.toISOString(),
            notes: v.notes,
            isPublish: v.id === history.activeVersionId
        }))}
      />
    </div>
  );
}
