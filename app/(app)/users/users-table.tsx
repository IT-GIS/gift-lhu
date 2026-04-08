"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { roleLabels, type Role } from "@/lib/auth/rbac";
import {
  createUserAction,
  updateUserRoleAction,
  toggleUserActiveAction,
  resetUserPasswordAction,
} from "./actions";
import type { UserRow } from "@/lib/db/queries/users";

interface Props {
  users: UserRow[];
  currentUserId: string;
}

export function UsersTable({ users, currentUserId }: Props) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState<UserRow | null>(null);
  const [resetUser, setResetUser] = useState<UserRow | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [toast, setToast] = useState("");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setErrors({});
    startTransition(async () => {
      const result = await createUserAction(fd);
      if (result.success) {
        setShowAddModal(false);
        showToast("User berhasil ditambahkan!");
        router.refresh();
      } else {
        setErrors({ add: result.error || "Gagal." });
      }
    });
  };

  const handleEditRole = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editUser) return;
    const fd = new FormData(e.currentTarget);
    const role = fd.get("role") as Role;
    startTransition(async () => {
      await updateUserRoleAction(editUser.id, role);
      setEditUser(null);
      showToast(`Role ${editUser.fullName} berhasil diubah!`);
      router.refresh();
    });
  };

  const handleToggleActive = (user: UserRow) => {
    startTransition(async () => {
      await toggleUserActiveAction(user.id, !user.isActive);
      showToast(`User ${user.fullName} ${!user.isActive ? "diaktifkan" : "dinonaktifkan"}.`);
      router.refresh();
    });
  };

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resetUser) return;
    setErrors({});
    startTransition(async () => {
      const result = await resetUserPasswordAction(resetUser.id, newPassword);
      if (result.success) {
        setResetUser(null);
        setNewPassword("");
        showToast(`Password ${resetUser.fullName} berhasil direset!`);
      } else {
        setErrors({ reset: result.error || "Gagal." });
      }
    });
  };

  return (
    <div className="space-y-4 relative">
      {toast && (
        <div className="fixed top-6 right-6 z-[100] bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-lg px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <span className="font-medium">{toast}</span>
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={() => setShowAddModal(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-sm">
          + Tambah User
        </Button>
      </div>

      <Card className="overflow-hidden bg-white/85 dark:bg-slate-900/80 p-0 border border-slate-200 dark:border-slate-800 shadow-sm">
        <TableContainer className="rounded-none border-0 shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-slate-800 dark:text-slate-100">
                    {user.fullName}
                    {user.id === currentUserId && (
                      <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">Kamu</span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-600 dark:text-slate-400">{user.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                      {roleLabels[user.role as Role] || user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      user.isActive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      {user.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {user.lastLoginAt
                      ? user.lastLoginAt.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
                      : "Belum login"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 flex-wrap">
                      <Button size="sm" variant="outline" className="h-8 text-[11px] font-semibold" onClick={() => setEditUser(user)}>
                        Edit Role
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 text-[11px] font-semibold" onClick={() => { setResetUser(user); setNewPassword(""); }}>
                        Reset PW
                      </Button>
                      {user.id !== currentUserId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`h-8 text-[11px] font-semibold ${user.isActive ? "text-red-500 hover:text-red-700" : "text-emerald-600 hover:text-emerald-800"}`}
                          onClick={() => handleToggleActive(user)}
                          disabled={isPending}
                        >
                          {user.isActive ? "Nonaktifkan" : "Aktifkan"}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal — Tambah User */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border dark:border-slate-700">
            <h3 className="text-xl font-bold mb-1">Tambah User Baru</h3>
            <p className="text-sm text-slate-500 mb-6">Tambahkan anggota tim baru ke dalam sistem.</p>
            {errors.add && <div className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{errors.add}</div>}
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input name="fullName" required placeholder="Contoh: Budi Santoso" />
              </div>
              <div className="space-y-2">
                <Label>Email Akun</Label>
                <Input name="email" type="email" required placeholder="budi@lab.id" />
              </div>
              <div className="space-y-2">
                <Label>Password Awal (min. 8 karakter)</Label>
                <Input name="password" type="password" required minLength={8} placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Role Akses</Label>
                <select name="role" required className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {Object.entries(roleLabels).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>Batal</Button>
                <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700">
                  {isPending ? "Menyimpan..." : "Simpan User"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal — Edit Role */}
      {editUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border dark:border-slate-700">
            <h3 className="text-xl font-bold mb-1">Ubah Role User</h3>
            <p className="text-sm text-slate-500 mb-6">Ubah hak akses untuk <strong>{editUser.fullName}</strong>.</p>
            <form onSubmit={handleEditRole} className="space-y-4">
              <div className="space-y-2">
                <Label>Pilih Role Baru</Label>
                <select name="role" defaultValue={editUser.role} className="flex h-10 w-full rounded-md border border-input bg-white dark:bg-slate-800 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {Object.entries(roleLabels).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Button type="button" variant="outline" onClick={() => setEditUser(null)}>Batal</Button>
                <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700">
                  {isPending ? "Menyimpan..." : "Update Role"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Modal — Reset Password */}
      {resetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border dark:border-slate-700">
            <h3 className="text-xl font-bold mb-1">Reset Password</h3>
            <p className="text-sm text-slate-500 mb-6">Atur password baru untuk <strong>{resetUser.fullName}</strong>.</p>
            {errors.reset && <div className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{errors.reset}</div>}
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label>Password Baru (min. 8 karakter)</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <Button type="button" variant="outline" onClick={() => setResetUser(null)}>Batal</Button>
                <Button type="submit" disabled={isPending || newPassword.length < 8} className="bg-indigo-600 hover:bg-indigo-700">
                  {isPending ? "Menyimpan..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
