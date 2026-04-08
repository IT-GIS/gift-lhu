import { listLhuDocuments } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { PublishedListClient } from "./published-list-client";

export default async function PublishedDocumentsPage() {
  const publishedDocs = await listLhuDocuments({ status: "published" });
  
  const formattedDocs = publishedDocs.map(r => ({
    id: r.doc.id,
    lhuNumber: r.doc.referenceNumber,
    documentCode: r.doc.documentCode,
    customer: r.customer?.companyName || "—",
    projectName: r.doc.projectName,
    concreteType: r.doc.concreteType,
    testType: r.doc.testType,
    testingDate: r.doc.testingDate,
    status: r.doc.status,
    publishedAt: r.doc.publishedAt
  }));

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <PageHeader
        title="Dokumen Publish"
        description="Daftar laporan hasil uji yang telah diterbitkan dan tervalidasi."
      />
      <PublishedListClient docs={formattedDocs} />
    </div>
  );
}
