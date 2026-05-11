import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";

interface PublicResultRow {
  id: string;
  rowNumber: number;
  sampleCode: string;
  castingDate: string | Date;
  testingDate: string | Date;
  ageDays: number;
  weight?: string | number | null;
  dimension?: string | null;
  maxLoad?: string | number | null;
  compressiveStrength?: string | number | null;
  compressiveStrengthKgCm2?: string | number | null;
  cubeConversionStrengthKgCm2?: string | number | null;
  failurePattern?: string | null;
  remarks?: string | null;
  analystName?: string | null;
}

function fmtVal(value: string | number | null | undefined, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  return `${value}${suffix}`;
}

function fmtDate(value: string | Date | null | undefined) {
  if (!value) return "-";
  const serialized = value instanceof Date ? value.toISOString() : value;
  return formatDate(serialized);
}

function getAnalystSummary(rows: PublicResultRow[]) {
  const analysts = Array.from(
    new Set(
      rows
        .map((row) => String(row.analystName ?? "").trim())
        .filter((value) => value && value !== "-" && value !== "--"),
    ),
  );

  return analysts.length > 0 ? analysts.join(", ") : "-";
}

export function PublicResultTable({
  rows,
  title = "Hasil Pengujian",
  showSampleCount = true,
}: {
  rows: PublicResultRow[];
  title?: string | null;
  showSampleCount?: boolean;
}) {
  if (rows.length === 0) return null;

  const analystSummary = getAnalystSummary(rows);
  const showHeader = typeof title === "string" && title.trim().length > 0;

  return (
    <Card className="overflow-hidden p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      {showHeader ? (
        <div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold leading-snug dark:border-slate-800 sm:px-6 sm:py-4 sm:text-base">
          {title}
          {showSampleCount ? ` (${rows.length} sampel)` : ""}
        </div>
      ) : null}

      <TableContainer className="rounded-none border-0 shadow-none">
        <Table className="min-w-[1180px] lg:min-w-[1500px]">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12 text-center">No.</TableHead>
              <TableHead className="min-w-[120px] text-center">
                Kode<br />Sampel
              </TableHead>
              <TableHead className="min-w-[110px] text-center">
                Tanggal<br />Buat
              </TableHead>
              <TableHead className="min-w-[110px] text-center">
                Tanggal<br />Test
              </TableHead>
              <TableHead className="min-w-[80px] text-center">
                Berat<br />(Kg)
              </TableHead>
              <TableHead className="min-w-[80px] text-center">
                Umur<br />(Hari)
              </TableHead>
              <TableHead className="min-w-[90px] text-center">
                Ukuran<br />(mm)
              </TableHead>
              <TableHead className="min-w-[100px] text-center">
                Tekanan<br />Maksimum<br />(kN)
              </TableHead>
              <TableHead className="min-w-[100px] text-center">
                Tegangan<br />Hancur<br />(Mpa)
              </TableHead>
              <TableHead className="min-w-[100px] text-center">
                Tegangan<br />Hancur<br />(Kg/cm2)
              </TableHead>
              <TableHead className="min-w-[140px] text-center">
                Konversi Teg.<br />Hancur ke Kubus<br />(Kg/cm2)
              </TableHead>
              <TableHead className="min-w-[150px] text-center">
                Pola<br />Hancur
              </TableHead>
              <TableHead className="min-w-[120px] text-center">Keterangan</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="px-2 py-2 text-center font-medium text-slate-500">
                  {row.rowNumber}
                </TableCell>
                <TableCell className="text-center font-semibold">{row.sampleCode}</TableCell>
                <TableCell className="text-center">{fmtDate(row.castingDate)}</TableCell>
                <TableCell className="text-center">{fmtDate(row.testingDate)}</TableCell>
                <TableCell className="text-center">{fmtVal(row.weight)}</TableCell>
                <TableCell className="text-center">{fmtVal(row.ageDays, " Hari")}</TableCell>
                <TableCell className="text-center">{fmtVal(row.dimension)}</TableCell>
                <TableCell className="text-center">{fmtVal(row.maxLoad)}</TableCell>
                <TableCell className="text-center font-semibold text-indigo-600 dark:text-indigo-400">
                  {fmtVal(row.compressiveStrength, " Mpa")}
                </TableCell>
                <TableCell className="text-center">
                  {fmtVal(row.compressiveStrengthKgCm2)}
                </TableCell>
                <TableCell className="text-center">
                  {fmtVal(row.cubeConversionStrengthKgCm2)}
                </TableCell>
                <TableCell className="text-center">{fmtVal(row.failurePattern)}</TableCell>
                <TableCell className="text-center text-muted-foreground">
                  {fmtVal(row.remarks)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <tfoot className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/30">
            <tr>
              <td className="border-r border-slate-200 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300">
                Analis:
              </td>
              <td colSpan={12} className="break-words px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                {analystSummary}
              </td>
            </tr>
          </tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
}
