import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  getDashboardStats,
  getRecentAuditLogs,
  listLhuDocuments,
  getMonthlyChartData,
} from "@/lib/db/queries/lhu";
import { DocumentsChartCard } from "@/components/dashboard/documents-chart-card";
import { StatusChartCard } from "@/components/dashboard/status-chart-card";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatDate, getConcreteTypeLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ACTION_LABELS: Record<string, string> = {
  login: "Login",
  logout: "Logout",
  create_draft: "Buat Draft",
  edit_document: "Edit Dokumen",
  input_results: "Input Hasil Uji",
  submit_review: "Kirim ke Proses",
  approve: "Approve",
  return_revision: "Kembalikan Revisi",
  publish: "Publish Dokumen",
  revoke: "Revoke Dokumen",
  generate_token: "Generate Token Verifikasi",
  update_settings: "Update Settings",
  create_user: "Tambah User",
  edit_user: "Edit User",
  upload_attachment: "Upload Lampiran",
  delete_attachment: "Hapus Lampiran",
};

export default async function DashboardPage() {
  const [stats, recentLogs, recentDocs, monthlyData] = await Promise.all([
    getDashboardStats(),
    getRecentAuditLogs(8),
    listLhuDocuments({ limit: 5 }),
    getMonthlyChartData(),
  ]);

  const kpiCards = [
    { label: "Draft", value: stats.draft, color: "text-slate-600" },
    { label: "Input Hasil", value: stats.input_hasil, color: "text-blue-600" },
    { label: "Proses", value: stats.review, color: "text-amber-600" },
    { label: "Revisi", value: stats.revisi, color: "text-orange-600" },
    { label: "Approved", value: stats.approved, color: "text-purple-600" },
    { label: "Published", value: stats.published, color: "text-emerald-600" },
    { label: "Revoked", value: stats.revoked, color: "text-red-600" },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Ringkasan operasional LHU kuat tekan beton, aktivitas terbaru, dan jalur cepat ke workflow utama."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-4">
        {kpiCards.map((kpi) => (
          <Card
            key={kpi.label}
            className="bg-white/85 dark:bg-slate-900/80 p-5 flex flex-col gap-2 shadow-sm border-slate-200 dark:border-slate-800"
          >
            <div className="text-sm font-medium text-muted-foreground">{kpi.label}</div>
            <div className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <DocumentsChartCard allData={monthlyData} />
        <StatusChartCard counts={stats} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Recent Activity */}
        <Card className="neu-card rounded-2xl">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">Aktivitas Terbaru</div>
          <div className="mt-5 space-y-3">
            {recentLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada aktivitas tercatat.</p>
            ) : (
              recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="group relative rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-raised)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {ACTION_LABELS[log.action] ?? log.action}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{log.userFullName ?? "System"}</div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                    {log.createdAt.toLocaleString("id-ID", {
                      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Latest Documents */}
        <Card className="neu-card rounded-2xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">Dokumen Terbaru</div>
              <div className="text-sm text-muted-foreground">Snapshot dokumen penting</div>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/lhu">
                Buka semua
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {recentDocs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Belum ada dokumen LHU.</p>
            ) : (
              recentDocs.map(({ doc, customer }) => (
                <div
                  key={doc.id}
                  className="group overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--neu-bg)", boxShadow: "var(--neu-raised)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {doc.referenceNumber || doc.documentCode}
                      </div>
                      <div className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 truncate">
                        {customer?.companyName ?? "—"}
                        <span className="text-slate-300 mx-1">•</span>
                        {doc.projectName}
                      </div>
                      <div className="mt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {getConcreteTypeLabel(doc.concreteType)}
                        <span className="mx-1">•</span>
                        {formatDate(doc.testingDate.toISOString())}
                      </div>
                    </div>
                    <div className="shrink-0">
                      <StatusBadge status={doc.status} />
                    </div>
                  </div>
                  <div className="mt-5 border-t border-slate-100 dark:border-slate-800/50 pt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      asChild
                      className="h-8 px-4 text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors rounded-full"
                    >
                      <Link href={`/lhu/${doc.id}`}>
                        Lihat Detail
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
