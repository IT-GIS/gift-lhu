import Link from "next/link";
import { Filter, Plus, QrCode, Search } from "lucide-react";
import type { LhuStatus } from "@/lib/db/queries/lhu";
import { listLhuDocuments } from "@/lib/db/queries/lhu";
import { requireSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";
import { StatusBadge } from "@/components/shared/status-badge";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeleteLhuButton } from "@/components/lhu/delete-lhu-button";
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

const validStatuses: LhuStatus[] = [
  "draft",
  "input_hasil",
  "revisi",
  "approved",
  "published",
  "revoked",
];

export default async function LhuIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const sp = await searchParams;
  const session = await requireSession();
  const canDelete = can(session.role, "deleteLhu");
  const statusFilter = validStatuses.includes(sp.status as LhuStatus)
    ? (sp.status as LhuStatus)
    : undefined;

  const rows = await listLhuDocuments({
    status: statusFilter,
    search: sp.search,
    limit: 100,
  });

  return (
    <div className="space-y-6 pb-10 md:space-y-8">
      <PageHeader
        title="Data LHU"
        description="Daftar laporan hasil uji dengan fitur pencarian, filter, dan monitoring workflow."
        actions={
          <Button asChild className="w-full bg-indigo-600 shadow-sm hover:bg-indigo-700 sm:w-auto">
            <Link href="/lhu/new">
              <Plus className="mr-2 h-4 w-4" />
              Buat Draft LHU
            </Link>
          </Button>
        }
      />

      <Card className="border-slate-200 bg-white/85 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 md:p-6">
        <form className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              name="search"
              defaultValue={sp.search}
              placeholder="Cari nomor pengujian, pelanggan, proyek..."
              className="flex h-10 w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[480px]">
            <select
              name="status"
              defaultValue={sp.status ?? ""}
              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <option value="">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="input_hasil">Input Hasil</option>
              <option value="revisi">Revisi</option>
              <option value="approved">Approved</option>
              <option value="published">Published</option>
              <option value="revoked">Revoked</option>
            </select>
            <Button type="submit" variant="secondary" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </form>
      </Card>

      <Card className="overflow-hidden border-slate-200 bg-white/85 p-0 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <TableContainer className="rounded-none border-0 shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="whitespace-nowrap hover:bg-transparent">
                <TableHead>Nomor Pengujian</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Pengujian / Acuan</TableHead>
                <TableHead>Tanggal Test</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="whitespace-nowrap">
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-r-0 py-12 text-center text-muted-foreground">
                    Tidak ada data LHU ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map(({ doc, customer }) => {
                  const displayNumber = doc.projectName || doc.lhuNumber || doc.documentCode;

                  return (
                    <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {displayNumber}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {doc.lhuNumber || doc.documentCode}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                      {customer?.companyName ?? "-"}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {doc.concreteType.toUpperCase()}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{doc.testType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatDate(doc.testingDate.toISOString())}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {doc.publishedAt ? formatDate(doc.publishedAt.toISOString()) : "Belum terbit"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs font-semibold" asChild>
                          <Link href={`/lhu/${doc.id}`}>Detail</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs font-semibold hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          asChild
                        >
                          <Link href={`/lhu/${doc.id}/edit`}>Edit</Link>
                        </Button>
                        {doc.status === "published" && (
                          <Button size="sm" className="h-8 bg-indigo-600 text-xs font-semibold hover:bg-indigo-700" asChild>
                            <Link href={`/lhu/${doc.id}/publish`}>
                              <QrCode className="mr-1.5 h-3.5 w-3.5" />
                              QR
                            </Link>
                          </Button>
                        )}
                        {canDelete && (
                          <DeleteLhuButton
                            id={doc.id}
                            label={displayNumber}
                          />
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
