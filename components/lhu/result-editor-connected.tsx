"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CopyPlus, GripVertical, Loader2, Plus, Save, Send, Trash2 } from "lucide-react";
import { saveResultsAction, submitForReviewAction } from "@/app/(app)/lhu/[id]/results/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type EditableRow = {
  id: string;
  rowNumber: number;
  sampleCode: string;
  castingDate: string;
  testingDate: string;
  ageDays: string;
  weight: string;
  dimension: string;
  maxLoad: string;
  compressiveStrength: string;
  compressiveStrengthKgCm2: string;
  cubeConversionStrengthKgCm2: string;
  failurePattern: string;
  remarks: string;
  analystName: string;
};

function createEmptyRow(n: number): EditableRow {
  return {
    id: crypto.randomUUID(),
    rowNumber: n,
    sampleCode: "",
    castingDate: "",
    testingDate: "",
    ageDays: "",
    weight: "",
    dimension: "",
    maxLoad: "",
    compressiveStrength: "",
    compressiveStrengthKgCm2: "",
    cubeConversionStrengthKgCm2: "",
    failurePattern: "",
    remarks: "",
    analystName: "",
  };
}

interface Props {
  lhuDocumentId: string;
  initialRows: EditableRow[];
  currentStatus: string;
}

const FIELDS: { key: keyof EditableRow; label: string; type?: string; center?: boolean }[] = [
  { key: "sampleCode", label: "Kode Sampel" },
  { key: "castingDate", label: "Tanggal Buat", type: "date", center: true },
  { key: "testingDate", label: "Tanggal Test", type: "date", center: true },
  { key: "ageDays", label: "Umur (Hari)", type: "number", center: true },
  { key: "weight", label: "Berat (Kg)", type: "number", center: true },
  { key: "dimension", label: "Ukuran (mm)", center: true },
  { key: "maxLoad", label: "Tekanan Maksimum (kN)", type: "number", center: true },
  { key: "compressiveStrength", label: "Tegangan Hancur (Mpa)", type: "number", center: true },
  {
    key: "compressiveStrengthKgCm2",
    label: "Tegangan Hancur (Kg/cm²)",
    type: "number",
    center: true,
  },
  {
    key: "cubeConversionStrengthKgCm2",
    label: "Konversi Teg. Hancur ke Kubus (Kg/cm²)",
    type: "number",
    center: true,
  },
  { key: "failurePattern", label: "Pola Hancur", center: true },
  { key: "remarks", label: "Keterangan" },
  { key: "analystName", label: "Nama Analis" },
];

export function ResultEditorConnected({
  lhuDocumentId,
  initialRows,
  currentStatus,
}: Props) {
  const router = useRouter();
  const [rows, setRows] = useState<EditableRow[]>(
    initialRows.length > 0 ? initialRows : [createEmptyRow(1)],
  );
  const [isSaving, startSave] = useTransition();
  const [isSubmitting, startSubmit] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const updateRow = (id: string, field: keyof EditableRow, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const addRow = () => {
    setRows((prev) => [...prev, createEmptyRow(prev.length + 1)]);
  };

  const duplicateRow = (id: string) => {
    setRows((prev) => {
      const target = prev.find((r) => r.id === id);
      if (!target) return prev;
      return [...prev, { ...target, id: crypto.randomUUID(), rowNumber: prev.length + 1 }];
    });
  };

  const removeRow = (id: string) => {
    setRows((prev) =>
      prev
        .filter((r) => r.id !== id)
        .map((r, i) => ({ ...r, rowNumber: i + 1 })),
    );
  };

  const averageStrength = useMemo(() => {
    const vals = rows
      .map((r) => parseFloat(r.compressiveStrength))
      .filter((v) => !isNaN(v));
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [rows]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const serializeRows = () =>
    rows.map((r) => ({
      rowNumber: r.rowNumber,
      sampleCode: r.sampleCode,
      castingDate: r.castingDate,
      testingDate: r.testingDate,
      ageDays: parseInt(r.ageDays) || 0,
      weight: r.weight || null,
      dimension: r.dimension || null,
      maxLoad: r.maxLoad || null,
      compressiveStrength: r.compressiveStrength || null,
      compressiveStrengthKgCm2: r.compressiveStrengthKgCm2 || null,
      cubeConversionStrengthKgCm2: r.cubeConversionStrengthKgCm2 || null,
      failurePattern: r.failurePattern || null,
      remarks: r.remarks || null,
      analystName: r.analystName || null,
    }));

  const handleSave = () => {
    startSave(async () => {
      const result = await saveResultsAction(lhuDocumentId, serializeRows());

      if (result?.success) {
        showMessage("success", "Hasil uji berhasil disimpan.");
        router.refresh();
      } else {
        showMessage("error", result?.error || "Gagal menyimpan.");
      }
    });
  };

  const handleSubmitForReview = () => {
    startSubmit(async () => {
      const saveResult = await saveResultsAction(lhuDocumentId, serializeRows());

      if (!saveResult?.success) {
        showMessage("error", saveResult?.error || "Gagal menyimpan sebelum submit.");
        return;
      }

      const submitResult = await submitForReviewAction(lhuDocumentId);
      if (submitResult?.success) {
        showMessage("success", "Dokumen berhasil dikirim ke QA Review!");
        setTimeout(() => router.push("/lhu"), 1200);
      } else {
        showMessage("error", submitResult?.error || "Gagal mengirim ke review.");
      }
    });
  };

  return (
    <div className="space-y-5">
      {message && (
        <div
          className={`rounded-xl px-4 py-3 text-sm font-medium ${
            message.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <Card className="bg-white/80 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Tabel Hasil Uji</div>
            <p className="text-sm text-muted-foreground">
              Tambah, duplikat, dan edit baris data uji. Simpan sebagai draft atau langsung kirim ke QA.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Status saat ini: {currentStatus}</p>
          </div>
          {averageStrength > 0 && (
            <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
              Rata-rata kuat tekan: {averageStrength.toFixed(2)} Mpa
            </div>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden bg-white/85 p-0 dark:border-slate-800 dark:bg-slate-900/80">
        <TableContainer className="rounded-none border-0 shadow-none">
          <Table className="min-w-[1800px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-8 text-center" />
                <TableHead className="w-8 text-center">No</TableHead>
                {FIELDS.map((field) => (
                  <TableHead
                    key={field.key}
                    className={field.center ? "text-center" : undefined}
                  >
                    {field.label}
                  </TableHead>
                ))}
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="px-2 py-2 text-center text-muted-foreground">
                    <GripVertical className="mx-auto h-4 w-4" />
                  </TableCell>
                  <TableCell className="px-2 py-2 text-center font-medium text-muted-foreground">
                    {row.rowNumber}
                  </TableCell>
                  {FIELDS.map((field) => (
                    <TableCell key={field.key} className="p-0">
                      <Input
                        type={field.type ?? "text"}
                        value={row[field.key] as string}
                        onChange={(e) => updateRow(row.id, field.key, e.target.value)}
                        className={`h-10 min-w-[110px] w-full rounded-none border-0 bg-transparent text-xs shadow-none ring-0 focus-visible:ring-1 ${
                          field.center ? "text-center" : ""
                        } ${
                          [
                            "compressiveStrength",
                            "compressiveStrengthKgCm2",
                            "cubeConversionStrengthKgCm2",
                          ].includes(field.key)
                            ? "font-semibold text-indigo-700"
                            : ""
                        }`}
                      />
                    </TableCell>
                  ))}
                  <TableCell className="px-2 py-2">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => duplicateRow(row.id)}
                        title="Duplikat baris"
                      >
                        <CopyPlus className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeRow(row.id)}
                        disabled={rows.length === 1}
                        title="Hapus baris"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6 dark:border-slate-700">
        <Button variant="outline" onClick={addRow}>
          <Plus className="h-4 w-4" />
          Tambah Baris
        </Button>

        <div className="flex-1" />

        <Button variant="secondary" onClick={handleSave} disabled={isSaving || isSubmitting}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Simpan Draft
        </Button>

        <Button
          onClick={handleSubmitForReview}
          disabled={isSaving || isSubmitting}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Kirim ke Review QA
        </Button>
      </div>
    </div>
  );
}
