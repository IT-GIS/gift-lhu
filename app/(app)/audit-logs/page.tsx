import { db } from "@/lib/db";
import { auditLogs, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { PageHeader } from "@/components/shared/page-header";
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

const ACTION_LABELS: Record<string, string> = {
  login: "Login",
  logout: "Logout",
  create_draft: "Buat Draft",
  edit_document: "Edit Dokumen",
  input_results: "Input Hasil Uji",
  submit_review: "Kirim ke Review",
  approve: "Approve",
  return_revision: "Kembalikan Revisi",
  publish: "Publish",
  revoke: "Revoke",
  generate_token: "Generate Token",
  update_settings: "Update Settings",
  create_user: "Tambah User",
  edit_user: "Edit User",
  upload_attachment: "Upload Lampiran",
  delete_attachment: "Hapus Lampiran",
};

export const dynamic = "force-dynamic";

export default async function AuditLogsPage() {
  const logs = await db
    .select({
      id: auditLogs.id,
      action: auditLogs.action,
      entityType: auditLogs.entityType,
      entityId: auditLogs.entityId,
      createdAt: auditLogs.createdAt,
      userFullName: users.fullName,
      userEmail: users.email,
    })
    .from(auditLogs)
    .leftJoin(users, eq(auditLogs.userId, users.id))
    .orderBy(desc(auditLogs.createdAt))
    .limit(200);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Audit Logs"
        description="Rekam aktivitas penting: create draft, input hasil, review, approve, publish, revoke, login, dan perubahan user."
      />

      <Card className="overflow-hidden bg-white/85 dark:bg-slate-900/80 dark:border-slate-800 p-0">
        <TableContainer className="rounded-none border-0 shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Aksi</TableHead>
                <TableHead>Entity Type</TableHead>
                <TableHead>Entity ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="border-r-0 py-10 text-center text-muted-foreground">
                    Belum ada aktivitas tercatat.
                  </TableCell>
                </TableRow>
              ) : (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {log.createdAt.toLocaleString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="font-medium text-slate-800 dark:text-slate-100">
                      {log.userFullName ?? <span className="text-muted-foreground italic">System</span>}
                      {log.userEmail && (
                        <div className="text-xs text-muted-foreground">{log.userEmail}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                        {ACTION_LABELS[log.action] ?? log.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{log.entityType}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground max-w-[120px] truncate" title={log.entityId}>
                      {log.entityId}
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
