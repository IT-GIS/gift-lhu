"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

// Menggunakan tipe data any sementara untuk fleksibilitas (sesuai demo)
export function VerifyListClient({ docs, token }: { docs: any[]; token: string }) {
  const [search, setSearch] = useState("");

  const filteredDocs = docs.filter(doc => 
    (doc.referenceNumber || "").toLowerCase().includes(search.toLowerCase()) ||
    (doc.customer || "").toLowerCase().includes(search.toLowerCase()) ||
    (doc.projectName || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-600 transition-colors" />
          <Input 
            placeholder="Ketik detail pencarian: LHU-BTN..., Adhi Karya, dst..." 
            className="pl-10 h-11 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 transition-shadow focus-visible:ring-indigo-500 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0 h-11 bg-white/60 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 hover:bg-slate-100 rounded-xl px-6">
          <Filter className="mr-2 h-4 w-4" />
          Filter Advanced
        </Button>
      </div>

      {/* List Container */}
      <div className="space-y-4">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-16 px-6 text-muted-foreground bg-slate-50 border border-slate-200 border-dashed dark:bg-slate-900/30 dark:border-slate-800 rounded-2xl flex flex-col items-center">
            <Search className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Tidak ada kecocokan</h3>
            <p className="mt-1 text-sm">Tidak ditemukan dokumen LHU untuk kata kunci "{search}".</p>
            <Button variant="ghost" onClick={() => setSearch("")} className="mt-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50">
              Reset Pencarian
            </Button>
          </div>
        ) : (
          filteredDocs.map((doc, idx) => (
            <div 
              key={doc.id} 
              className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 gap-5 md:gap-6">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Nomor LHU</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100">{doc.referenceNumber || "-"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Perusahaan</div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 truncate" title={doc.customer}>{doc.customer}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Proyek</div>
                    <div className="font-medium text-slate-800 dark:text-slate-200 truncate" title={doc.projectName}>{doc.projectName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-bold">Tanggal Publish</div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{doc.publishedAt ? formatDate(doc.publishedAt) : "-"}</div>
                  </div>
                </div>
                
                <Button asChild variant="default" className="w-full md:w-auto shrink-0 bg-indigo-600 hover:bg-indigo-700 dark:text-white rounded-xl shadow-sm transition-transform group-hover:scale-105 duration-300">
                  <Link href={`/verify/${token}/${doc.id}`}>
                    Lihat Detail Validasi
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
