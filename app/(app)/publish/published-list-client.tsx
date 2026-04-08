"use client";

import { useState } from "react";
import Link from "next/link";
import { Filter, Search } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
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
import { formatDate } from "@/lib/utils";

export function PublishedListClient({ docs }: { docs: any[] }) {
  const [search, setSearch] = useState("");

  const filteredDocs = docs.filter(
    (doc) =>
      (doc.referenceNumber || "").toLowerCase().includes(search.toLowerCase()) ||
      (doc.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (doc.projectName || "").toLowerCase().includes(search.toLowerCase()) ||
      (doc.documentCode || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="group relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-indigo-600" />
          <Input
            placeholder="Ketik detail pencarian: Nomor pengujian, Adhi Karya, dst..."
            className="h-11 rounded-xl border-slate-200 bg-white/60 pl-10 backdrop-blur-sm transition-shadow focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="h-11 shrink-0 rounded-xl border-slate-200 bg-white/60 px-6 backdrop-blur-sm hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filter Advanced
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/85 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
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
              {filteredDocs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-r-0 p-0">
                    <div className="flex flex-col items-center border-t border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-muted-foreground dark:border-slate-800 dark:bg-slate-900/30">
                      <Search className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-600" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        Tidak ada kecocokan
                      </h3>
                      <p className="mt-1 text-sm">
                        Tidak ditemukan dokumen Publish untuk kata kunci {search ? `"${search}"` : "yang dicari"}.
                      </p>
                      {search && (
                        <Button
                          variant="ghost"
                          onClick={() => setSearch("")}
                          className="mt-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                        >
                          Reset Pencarian
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {doc.projectName || doc.documentCode}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                      {doc.customer}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {doc.concreteType?.toUpperCase()}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{doc.testType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {doc.testingDate ? formatDate(new Date(doc.testingDate).toISOString()) : "-"}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {doc.publishedAt ? formatDate(new Date(doc.publishedAt).toISOString()) : "Belum terbit"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button asChild size="sm" variant="outline" className="h-8 text-xs font-semibold">
                        <Link href={`/publish/${doc.id}`}>Lihat Detail</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
