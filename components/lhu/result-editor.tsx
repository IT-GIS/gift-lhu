"use client";

import { useMemo, useState } from "react";
import { CopyPlus, Plus, Trash2, GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditableRow = {
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
  failurePattern: string;
  remarks: string;
  analystName: string;
};

export function ResultEditor() {
  const [rows, setRows] = useState<EditableRow[]>([
    {
      id: crypto.randomUUID(),
      rowNumber: 1,
      sampleCode: "BTN-S-04",
      castingDate: "2026-02-20",
      testingDate: "2026-03-20",
      ageDays: "28",
      weight: "12.60",
      dimension: "15 x 30 cm",
      maxLoad: "560.0",
      compressiveStrength: "31.67",
      failurePattern: "Kerucut seimbang",
      remarks: "",
      analystName: "Rudi Hartono",
    },
  ]);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        rowNumber: prev.length + 1,
        sampleCode: "",
        castingDate: "",
        testingDate: "",
        ageDays: "",
        weight: "",
        dimension: "",
        maxLoad: "",
        compressiveStrength: "",
        failurePattern: "",
        remarks: "",
        analystName: "",
      },
    ]);
  };

  const duplicateRow = (id: string) => {
    setRows((prev) => {
      const target = prev.find((row) => row.id === id);
      if (!target) return prev;
      return [...prev, { ...target, id: crypto.randomUUID(), rowNumber: prev.length + 1 }];
    });
  };

  const removeRow = (id: string) => {
    setRows((prev) =>
      prev.filter((row) => row.id !== id).map((row, index) => ({ ...row, rowNumber: index + 1 })),
    );
  };

  const averageStrength = useMemo(() => {
    const values = rows
      .map((row) => Number.parseFloat(row.compressiveStrength))
      .filter((value) => !Number.isNaN(value));
    if (!values.length) return 0;
    return values.reduce((acc, curr) => acc + curr, 0) / values.length;
  }, [rows]);

  return (
    <div className="space-y-5">
      <Card className="bg-white/80 dark:bg-slate-900/80 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-lg font-semibold">Editable Result Table</div>
            <p className="text-sm text-muted-foreground">
              UX dirancang agar user lab bisa tambah baris, duplicate, hapus, dan koreksi angka dengan cepat.
            </p>
          </div>
          <div className="rounded-2xl bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
            Rata-rata kuat tekan: {averageStrength.toFixed(2)} Mpa
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden bg-white/85 dark:bg-slate-900/80 dark:border-slate-800 p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1400px] text-sm">
            <thead className="sticky top-0 bg-muted/80 backdrop-blur">
              <tr className="border-b border-border text-left">
                {["", "No", "Kode Sampel", "Tanggal Buat", "Tanggal Test", "Umur (Hari)", "Berat (Kg)", "Ukuran (mm)", "Tekanan Maksimum (kN)", "Tegangan Hancur (Mpa)", "Pola Hancur", "Keterangan", "Nama Analis", "Aksi"].map((head) => (
                  <th key={head} className="px-3 py-3 font-medium text-muted-foreground">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border align-top">
                  <td className="px-3 py-3 text-muted-foreground"><GripVertical className="h-4 w-4" /></td>
                  <td className="px-3 py-3">{row.rowNumber}</td>
                  {(
                    [
                      "sampleCode",
                      "castingDate",
                      "testingDate",
                      "ageDays",
                      "weight",
                      "dimension",
                      "maxLoad",
                      "compressiveStrength",
                      "failurePattern",
                      "remarks",
                      "analystName",
                    ] as const
                  ).map((field) => (
                    <td key={field} className="px-3 py-3">
                      <Input
                        value={row[field]}
                        onChange={(event) =>
                          setRows((prev) =>
                            prev.map((item) =>
                              item.id === row.id ? { ...item, [field]: event.target.value } : item,
                            ),
                          )
                        }
                      />
                    </td>
                  ))}
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="icon" onClick={() => duplicateRow(row.id)}>
                        <CopyPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => removeRow(row.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button onClick={addRow}>
          <Plus className="h-4 w-4" />
          Tambah Baris
        </Button>
        <Button variant="secondary">Autosave Draft</Button>
        <Button variant="secondary">Kirim ke Review</Button>
      </div>
    </div>
  );
}
