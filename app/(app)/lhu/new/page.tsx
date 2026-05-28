"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { GeneralInfoForm } from "@/components/lhu/general-info-form";
import { AttachmentForm } from "@/components/lhu/attachment-form";
import { TestResultsForm, TestRow } from "@/components/lhu/test-results-form";
import { PdfImportDropzone } from "@/components/lhu/pdf-import-dropzone";
import type { ImportedLhuPdfData } from "@/lib/lhu/pdf-import";
import { createLhuAction, CreateLhuInput } from "./actions";

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

export default function CreateLhuPage() {
  const router = useRouter();
  const [rows, setRows] = useState<TestRow[]>([createEmptyRow()]);
  const [generalInfoDefaults, setGeneralInfoDefaults] = useState<Record<string, string>>({});
  const [analystNameDefault, setAnalystNameDefault] = useState("");
  const [importRevision, setImportRevision] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const addRow = () => setRows([...rows, createEmptyRow()]);
  const removeRow = (id: string) => {
    if (rows.length > 1) setRows(rows.filter((r) => r.id !== id));
  };
  const updateRow = (id: string, field: keyof TestRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handlePdfImported = (data: ImportedLhuPdfData) => {
    setGeneralInfoDefaults({
      customer: data.customer || "",
      projectName: data.projectName || "",
      projectAddress: data.projectAddress || "",
      referenceNumber: data.referenceNumber || "",
      concreteType: data.concreteType || "",
      testType: data.testType || "",
      sampleCount: data.sampleCount?.match(/\d+/)?.[0] || "",
      receivedDate: data.receivedDate || "",
      testingDate: data.testingDate || "",
    });
    setAnalystNameDefault(data.analystName || "");
    setRows(data.rows.length > 0 ? data.rows : [createEmptyRow()]);
    setImportRevision((value) => value + 1);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const input: CreateLhuInput = {
      customer: String(fd.get("customer") || ""),
      projectName: String(fd.get("projectName") || ""),
      projectAddress: String(fd.get("projectAddress") || ""),
      referenceNumber: String(fd.get("referenceNumber") || ""),
      concreteType: String(fd.get("concreteType") || ""),
      testType: String(fd.get("testType") || ""),
      receivedDate: String(fd.get("receivedDate") || ""),
      testingDate: String(fd.get("testingDate") || ""),
      analystName: String(fd.get("analystName") || ""),
      testRows: rows,
    };

    // Extract files if present
    const filesProduk = fd.getAll("attachmentProduk") as File[];
    const filesPengujian = fd.getAll("attachmentPengujian") as File[];

    if (!input.customer || !input.projectName || !input.receivedDate || !input.testingDate) {
      setError("Nama pelanggan, proyek, dan tanggal wajib diisi.");
      return;
    }

    setError(null);
    startTransition(async () => {
      // Convert files to base64
      const getBase64 = async (f: File | null) => {
        if (!f || f.size === 0) return undefined;
        const arrayBuffer = await f.arrayBuffer();
        return `data:${f.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      };

      try {
        const produkBase64 = await Promise.all(filesProduk.map(getBase64));
        input.attachmentProduk = produkBase64.filter(Boolean) as string[];

        const pengujianBase64 = await Promise.all(filesPengujian.map(getBase64));
        input.attachmentPengujian = pengujianBase64.filter(Boolean) as string[];
      } catch (err) {
        setError("Gagal membaca file lampiran.");
        return;
      }

      try {
        const result = await createLhuAction(input);
        if (result?.success) {
          router.push("/lhu");
        } else {
          setError("Gagal menyimpan dan mempublish LHU. Silakan coba lagi.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal menyimpan dan mempublish LHU.");
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 pb-20">
      <PageHeader
        title="Input Data LHU Baru"
        description="Lengkapi informasi pelanggan, hasil uji, dan lampiran. Setelah disimpan, LHU langsung terpublish dengan QR verifikasi."
      />

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm font-medium">
          {error}
        </div>
      )}

      <GeneralInfoForm
        key={`general-${importRevision}`}
        defaultValues={generalInfoDefaults}
        importSlot={<PdfImportDropzone onImported={handlePdfImported} />}
      />

      <div className="mt-8 mb-4">
        <TestResultsForm
          key={`results-${importRevision}`}
          rows={rows}
          onAddRow={addRow}
          onRemoveRow={removeRow}
          onUpdateRow={updateRow}
          analystNameDefault={analystNameDefault}
        />
      </div>

      <div className="mt-8 mb-4">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4 border-b pb-2">
          Lampiran Pendukung
        </h2>
        <AttachmentForm />
      </div>

      <div className="flex items-center justify-end gap-4 border-t border-slate-200 pt-6 mt-8">
        <Button
          variant="outline"
          size="lg"
          type="button"
          className="rounded-xl px-8"
          onClick={() => router.push("/lhu")}
        >
          Batal
        </Button>
        <Button
          size="lg"
          type="submit"
          disabled={isPending}
          className="rounded-xl px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md"
        >
          {isPending ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
          ) : (
          <><Save className="mr-2 h-4 w-4" /> Simpan & Publish</>
        )}
        </Button>
      </div>
    </form>
  );
}
