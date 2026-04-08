import { Plus, Trash2 } from "lucide-react";
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

export interface TestRow {
  id: string;
  kodeSampel: string;
  tanggalBuat: string;
  tanggalTest: string;
  berat: string;
  umur: string;
  ukuran: string;
  tekananMaksimum: string;
  teganganHancurMpa: string;
  teganganHancurOther: string;
  konversiTeganganHancurKubus: string;
  polaHancur: string;
  keterangan: string;
}

interface TestResultsFormProps {
  rows: TestRow[];
  onAddRow: () => void;
  onRemoveRow: (id: string) => void;
  onUpdateRow: (id: string, field: keyof TestRow, value: string) => void;
  analystNameDefault?: string;
}

export function TestResultsForm({
  rows,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
  analystNameDefault,
}: TestResultsFormProps) {
  return (
    <Card className="overflow-hidden border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mb-4 flex flex-col justify-between gap-4 border-b pb-4 dark:border-slate-700 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Tabel Rekam Data Pengujian
        </h2>
        <Button
          type="button"
          onClick={onAddRow}
          size="sm"
          className="bg-indigo-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Baris Sampel
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">No.</TableHead>
              <TableHead className="min-w-[120px] text-center">Kode<br />Sampel</TableHead>
              <TableHead className="min-w-[110px] text-center">Tanggal<br />Buat</TableHead>
              <TableHead className="min-w-[110px] text-center">Tanggal<br />Test</TableHead>
              <TableHead className="min-w-[80px] text-center">Berat<br />(Kg)</TableHead>
              <TableHead className="min-w-[80px] text-center">Umur<br />(Hari)</TableHead>
              <TableHead className="min-w-[90px] text-center">Ukuran<br />(mm)</TableHead>
              <TableHead className="min-w-[100px] text-center">Tekanan<br />Maksimum<br />(kN)</TableHead>
              <TableHead className="min-w-[100px] text-center">Tegangan<br />Hancur<br />(Mpa)</TableHead>
              <TableHead className="min-w-[100px] text-center">Tegangan<br />Hancur<br />(Kg/cm²)</TableHead>
              <TableHead className="min-w-[140px] text-center">Konversi Teg.<br />Hancur ke Kubus<br />(Kg/cm²)</TableHead>
              <TableHead className="min-w-[150px] text-center">Pola<br />Hancur</TableHead>
              <TableHead className="min-w-[120px] text-center">Keterangan</TableHead>
              <TableHead className="w-12 text-center">Hapus</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="px-2 py-2 text-center font-medium text-slate-500">
                  {index + 1}
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    value={row.kodeSampel}
                    onChange={(e) => onUpdateRow(row.id, "kodeSampel", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="-"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="date"
                    value={row.tanggalBuat}
                    onChange={(e) => onUpdateRow(row.id, "tanggalBuat", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent px-1 text-xs shadow-none ring-0 focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="date"
                    value={row.tanggalTest}
                    onChange={(e) => onUpdateRow(row.id, "tanggalTest", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent px-1 text-xs shadow-none ring-0 focus-visible:ring-1"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    step="0.01"
                    value={row.berat}
                    onChange={(e) => onUpdateRow(row.id, "berat", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    value={row.umur}
                    onChange={(e) => onUpdateRow(row.id, "umur", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    value={row.ukuran}
                    onChange={(e) => onUpdateRow(row.id, "ukuran", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="-"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    step="0.01"
                    value={row.tekananMaksimum}
                    onChange={(e) => onUpdateRow(row.id, "tekananMaksimum", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    step="0.01"
                    value={row.teganganHancurMpa}
                    onChange={(e) => onUpdateRow(row.id, "teganganHancurMpa", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs font-semibold text-indigo-700 shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    step="0.01"
                    value={row.teganganHancurOther}
                    onChange={(e) => onUpdateRow(row.id, "teganganHancurOther", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs font-semibold text-indigo-700 shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    type="number"
                    step="0.01"
                    value={row.konversiTeganganHancurKubus}
                    onChange={(e) =>
                      onUpdateRow(row.id, "konversiTeganganHancurKubus", e.target.value)
                    }
                    className="h-10 w-full rounded-none border-0 bg-transparent text-center text-xs font-semibold text-indigo-700 shadow-none ring-0 focus-visible:ring-1"
                    placeholder="0"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    value={row.polaHancur}
                    onChange={(e) => onUpdateRow(row.id, "polaHancur", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent px-3 text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="Contoh: Kerucut seimbang"
                  />
                </TableCell>
                <TableCell className="p-0">
                  <Input
                    value={row.keterangan}
                    onChange={(e) => onUpdateRow(row.id, "keterangan", e.target.value)}
                    className="h-10 w-full rounded-none border-0 bg-transparent text-xs shadow-none ring-0 focus-visible:ring-1"
                    placeholder="Catatan..."
                  />
                </TableCell>
                <TableCell className="p-0 text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveRow(row.id)}
                    disabled={rows.length === 1}
                    className="mx-auto block h-8 w-8 text-rose-500 transition-colors hover:bg-rose-50 hover:text-rose-700 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/30">
            <tr>
              <td className="border-r border-slate-200 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300">
                Analis:
              </td>
              <td colSpan={13} className="p-0">
                <Input
                  name="analystName"
                  defaultValue={analystNameDefault}
                  className="h-10 w-full rounded-none border-0 bg-transparent text-sm shadow-none ring-0 focus-visible:ring-1"
                  placeholder="Masukkan Nama Analis / Penguji..."
                />
              </td>
            </tr>
          </tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
}
