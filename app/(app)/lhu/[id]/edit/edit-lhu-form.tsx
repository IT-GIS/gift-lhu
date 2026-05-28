"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { GeneralInfoForm } from "@/components/lhu/general-info-form";
import { AttachmentForm } from "@/components/lhu/attachment-form";
import { TestResultsForm, TestRow } from "@/components/lhu/test-results-form";
import { updateLhuAction } from "./actions";

function createEmptyRow(): TestRow {
  return {
    id: Math.random().toString(36).substr(2, 9),
    kodeSampel: "",
    tanggalBuat: "",
    tanggalTest: "",
    berat: "",
    umur: "",
    ukuran: "",
    tekananMaksimum: "",
    teganganHancurMpa: "",
    teganganHancurOther: "",
    konversiTeganganHancurKubus: "",
    polaHancur: "",
    keterangan: "",
  };
}

export function EditLhuForm({ doc }: { doc: any }) {
  const router = useRouter();
  const analystNameDefault =
    doc.resultRows?.find((r: any) => r.analystName)?.analystName ?? "";
  const displayTestingNumber =
    doc.referenceNumber || doc.projectName || doc.documentCode;
  const existingProduk = (doc.attachments ?? [])
    .filter((attachment: any) => attachment.category === "produk")
    .map((attachment: any) => ({
      url: attachment.fileUrl,
      name: attachment.fileName ?? "Lampiran produk",
    }));
  const existingPengujian = (doc.attachments ?? [])
    .filter((attachment: any) => attachment.category === "pengujian")
    .map((attachment: any) => ({
      url: attachment.fileUrl,
      name: attachment.fileName ?? "Lampiran pengujian",
    }));

  const initialRows: TestRow[] =
    doc.resultRows && doc.resultRows.length > 0
      ? doc.resultRows.map((r: any) => ({
          id: r.id || Math.random().toString(36).substr(2, 9),
          kodeSampel: r.sampleCode ?? "",
          tanggalBuat: r.castingDate
            ? new Date(r.castingDate).toISOString().split("T")[0]
            : "",
          tanggalTest: r.testingDate
            ? new Date(r.testingDate).toISOString().split("T")[0]
            : "",
          berat: String(r.weight ?? ""),
          umur: String(r.ageDays ?? ""),
          ukuran: String(r.dimension ?? ""),
          tekananMaksimum: String(r.maxLoad ?? ""),
          teganganHancurMpa: String(r.compressiveStrength ?? ""),
          teganganHancurOther: String(r.compressiveStrengthKgCm2 ?? ""),
          konversiTeganganHancurKubus: String(
            r.cubeConversionStrengthKgCm2 ?? "",
          ),
          polaHancur: String(r.failurePattern ?? ""),
          keterangan: String(r.remarks ?? ""),
        }))
      : [createEmptyRow()];

  const [rows, setRows] = useState<TestRow[]>(initialRows);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const addRow = () => setRows([...rows, createEmptyRow()]);
  const removeRow = (id: string) => {
    if (rows.length > 1) setRows(rows.filter((r) => r.id !== id));
  };
  const updateRow = (id: string, field: keyof TestRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const input = {
      customer: String(fd.get("customer") || ""),
      projectName: String(fd.get("projectName") || ""),
      projectAddress: String(fd.get("projectAddress") || ""),
      referenceNumber: String(fd.get("referenceNumber") || ""),
      concreteType: String(fd.get("concreteType") || ""),
      testType: String(fd.get("testType") || ""),
      receivedDate: String(fd.get("receivedDate") || ""),
      testingDate: String(fd.get("testingDate") || ""),
      notes: String(fd.get("notes") || ""),
      analystName: String(fd.get("analystName") || ""),
      testRows: rows,
    } as any;

    const filesProduk = fd.getAll("attachmentProduk") as File[];
    const filesPengujian = fd.getAll("attachmentPengujian") as File[];

    startTransition(async () => {
      const getBase64 = async (file: File | null) => {
        if (!file || file.size === 0) return undefined;
        const arrayBuffer = await file.arrayBuffer();
        return `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      };

      try {
        const produkBase64 = await Promise.all(filesProduk.map(getBase64));
        input.attachmentProduk = produkBase64.filter(Boolean);

        const pengujianBase64 = await Promise.all(filesPengujian.map(getBase64));
        input.attachmentPengujian = pengujianBase64.filter(Boolean);
      } catch (err) {
        alert("Gagal membaca file lampiran.");
        return;
      }

      try {
        const result = await updateLhuAction(doc.id, input);
        if (result?.success) {
          router.push(`/lhu/${doc.id}`);
          router.refresh();
        } else {
          setError(result?.error || "Gagal menyimpan perubahan.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan perubahan.");
      }
    });
  };

  const defaultValues = {
    customer: doc.customer?.companyName ?? doc.customer ?? "",
    projectName: doc.projectName ?? "",
    projectAddress: doc.projectAddress ?? "",
    referenceNumber: doc.referenceNumber ?? "",
    concreteType: doc.concreteType ?? "silinder",
    testType: doc.testType ?? "Kuat Tekan Beton",
    receivedDate:
      doc.receivedDate instanceof Date
        ? doc.receivedDate.toISOString().split("T")[0]
        : String(doc.receivedDate ?? "").split("T")[0],
    testingDate:
      doc.testingDate instanceof Date
        ? doc.testingDate.toISOString().split("T")[0]
        : String(doc.testingDate ?? "").split("T")[0],
    notes: doc.notes ?? "",
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-20">
      <Link
        href="/lhu"
        className="inline-flex w-fit items-center rounded-full border bg-white/50 px-3 py-1.5 text-sm font-medium text-indigo-600 shadow-sm backdrop-blur-sm transition-colors hover:text-indigo-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Kembali ke Data LHU
      </Link>

      <PageHeader
        title={`Edit LHU - ${displayTestingNumber}`}
        description="Perbaiki data Laporan Hasil Uji. Perubahan tersimpan pada dokumen yang sudah terpublish."
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <GeneralInfoForm defaultValues={defaultValues} />

      <div className="mb-4 mt-8">
        <TestResultsForm
          rows={rows}
          onAddRow={addRow}
          onRemoveRow={removeRow}
          onUpdateRow={updateRow}
          analystNameDefault={analystNameDefault}
        />
      </div>

      <div className="mb-4 mt-8">
        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-slate-800 dark:text-slate-100">
          Lampiran Pendukung
        </h2>
        <AttachmentForm
          existingProduk={existingProduk}
          existingPengujian={existingPengujian}
        />
        <p className="mt-2 rounded-md border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-600 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500">
          <strong>Perhatian:</strong> Lampiran yang sudah tersimpan tetap dipakai
          jika Anda tidak memilih file baru. Jika memilih file baru, lampiran lama
          pada kategori tersebut akan diganti saat disimpan.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-200 pt-6">
        <Button
          variant="outline"
          size="lg"
          type="button"
          className="rounded-xl px-8"
          onClick={() => router.push(`/lhu/${doc.id}`)}
        >
          Batal
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-indigo-600 px-8 shadow-md hover:bg-indigo-700"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
