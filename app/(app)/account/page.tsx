"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Camera, User, Lock, Save, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = () => {
    setIsSaving(true);
    setSuccessMsg("");
    // Simulasi request network (database update)
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg("Profil akun berhasil diperbarui!");
      setTimeout(() => setSuccessMsg(""), 3500);
    }, 800);
  };

  return (
    <div className="space-y-8 relative pb-20">
      <PageHeader
        title="Pengaturan Profil Akun"
        description="Kelola informasi pribadi, foto profil, dan kredensial keamanan untuk mengakses sistem Control Panel Internal."
      />

      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-sm px-4 py-3 rounded-lg flex items-center gap-3 absolute top-0 right-0 z-50 animate-in fade-in slide-in-from-top-4">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          <span className="font-medium text-sm">{successMsg}</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Kolom Kiri: Foto Profil */}
        <div className="xl:col-span-1">
          <Card className="bg-white/90 p-6 md:p-8 flex flex-col items-center text-center shadow-sm border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6 self-start w-full border-b pb-4 dark:border-slate-700">
              <Camera className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Foto Profil
            </div>
            
            <div className="relative group cursor-pointer mb-6">
              <div className="h-32 w-32 rounded-full bg-indigo-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
                <User className="h-16 w-16 text-indigo-400 dark:text-slate-500" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>

            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl">Admin Operasional</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">admin@ptgis.co.id</p>
            
            <div className="w-full relative">
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors">
                Unggah Foto Baru
              </Button>
              {/* Form Input File Invisible untuk Trigger Upload */}
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
            </div>
            <p className="text-[11px] text-slate-400 mt-3">Rekomendasi ukuran: 256x256px (Max: 2MB). Format: JPG, PNG.</p>
          </Card>
        </div>

        {/* Kolom Kanan: Data Profil & Keamanan */}
        <div className="xl:col-span-2 space-y-6">
          
          <Card className="bg-white/90 p-6 md:p-8 shadow-sm border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6 border-b pb-4 dark:border-slate-700">
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Informasi Personal
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap</Label>
                <Input defaultValue="Admin Operasional" className="bg-white dark:bg-slate-950 transition-shadow focus-visible:ring-indigo-500" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">Alamat Email / Akun</Label>
                <Input defaultValue="admin@ptgis.co.id" className="bg-white dark:bg-slate-950 transition-shadow focus-visible:ring-indigo-500" />
              </div>
            </div>
          </Card>

          <Card className="bg-white/90 p-6 md:p-8 shadow-sm border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 mb-6 border-b pb-4 dark:border-slate-700">
              <Lock className="h-5 w-5 text-rose-500" />
              Keamanan Kata Sandi
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2 max-w-md">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">Password Saat Ini</Label>
                <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-950 transition-shadow focus-visible:ring-rose-500" />
                <p className="text-[11px] text-slate-500">Dibutuhkan jika Anda ingin mengganti password baru.</p>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">Password Baru</Label>
                <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-950 transition-shadow focus-visible:ring-rose-500" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-slate-700 dark:text-slate-300">Konfirmasi Password Baru</Label>
                <Input type="password" placeholder="••••••••" className="bg-white dark:bg-slate-950 transition-shadow focus-visible:ring-rose-500" />
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              size="lg" 
              className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Menyimpan Perubahan..." : "Simpan Profil"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
