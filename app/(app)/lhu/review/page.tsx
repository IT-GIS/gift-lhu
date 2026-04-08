"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardCheck, Loader2 } from "lucide-react";
import { getReviewDocuments } from "./actions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
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

type ReviewDoc = Awaited<ReturnType<typeof getReviewDocuments>>[number];

export default function ReviewQAListPage() {
  const [reviewDocs, setReviewDocs] = useState<ReviewDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviewDocuments().then((docs) => {
      setReviewDocs(docs);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-8 pb-20">
      <PageHeader
        title="Daftar Review QA"
        description="Daftar dokumen Laporan Hasil Uji (LHU) berstatus draft, review, atau revisi yang perlu dipantau oleh bagian Quality Assurance."
      />

      <Card className="overflow-hidden rounded-2xl p-1">
        <TableContainer className="border-0 shadow-none">
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
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-r-0 px-5 py-12 text-center text-sm text-muted-foreground">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : reviewDocs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="border-r-0 px-5 py-8 text-center text-sm text-muted-foreground">
                    Tidak ada dokumen draft, review, atau revisi saat ini.
                  </TableCell>
                </TableRow>
              ) : (
                reviewDocs.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="font-semibold text-slate-800 dark:text-slate-100">
                        {doc.projectName || doc.documentCode}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-800 dark:text-slate-100">
                      {doc.customer}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {doc.concreteType.toUpperCase()}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{doc.testType}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-700 dark:text-slate-200">
                        {formatDate(doc.testingDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Button asChild size="sm" className="h-8 bg-indigo-600 px-4 text-xs hover:bg-indigo-700">
                        <Link href={`/lhu/review/${doc.id}`}>
                          <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" />
                          Detail Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
