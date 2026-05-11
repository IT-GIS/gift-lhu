import { notFound } from "next/navigation";
import { getLhuDocumentById } from "@/lib/db/queries/lhu";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { ResultEditorConnected } from "@/components/lhu/result-editor-connected";

export default async function ResultsInputPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getLhuDocumentById(id);
  if (!doc) return notFound();

  const displayTestingNumber =
    doc.referenceNumber || doc.projectName || doc.documentCode;
  const allowedStatuses = ["draft", "input_hasil", "revisi"];

  if (!allowedStatuses.includes(doc.status)) {
    return (
      <div className="space-y-6">
        <PageHeader
          title={`Input Hasil - ${displayTestingNumber}`}
          description="Dokumen tidak dapat diedit pada status ini."
        />
        <Card className="bg-white/85 p-8 text-center dark:bg-slate-900/80">
          <p className="text-muted-foreground">
            Dokumen berstatus <strong>{doc.status}</strong> tidak dapat diinput hasil.
          </p>
        </Card>
      </div>
    );
  }

  const initialRows = doc.resultRows.map((r) => ({
    id: r.id,
    rowNumber: r.rowNumber,
    sampleCode: r.sampleCode,
    castingDate: r.castingDate.toISOString().split("T")[0],
    testingDate: r.testingDate.toISOString().split("T")[0],
    ageDays: String(r.ageDays),
    weight: r.weight ?? "",
    dimension: r.dimension ?? "",
    maxLoad: r.maxLoad ?? "",
    compressiveStrength: r.compressiveStrength ?? "",
    compressiveStrengthKgCm2: r.compressiveStrengthKgCm2 ?? "",
    cubeConversionStrengthKgCm2: r.cubeConversionStrengthKgCm2 ?? "",
    failurePattern: r.failurePattern ?? "",
    remarks: r.remarks ?? "",
    analystName: r.analystName ?? "",
  }));

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Input Hasil - ${displayTestingNumber}`}
        description={`Pengisian hasil uji untuk ${doc.customer?.companyName ?? "pelanggan"} - Acuan: ${doc.concreteType === "silinder" ? "Beton Silinder" : "Beton Kubus"}`}
      />
      <ResultEditorConnected
        lhuDocumentId={id}
        initialRows={initialRows}
        currentStatus={doc.status}
      />
    </div>
  );
}
