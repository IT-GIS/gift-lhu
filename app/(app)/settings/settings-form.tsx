"use client";

import { useState, useTransition, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, UploadCloud, X } from "lucide-react";
import { saveSettingsAction } from "./actions";

interface Props {
  defaultValues: Record<string, string>;
}

function ImageUploadWithScale({
  title,
  namePrefix,
  defaultBase64,
  defaultScale,
}: {
  title: string;
  namePrefix: string;
  defaultBase64?: string;
  defaultScale?: string;
}) {
  const [base64, setBase64] = useState<string>(defaultBase64 || "");
  const [scale, setScale] = useState<number>(parseInt(defaultScale || "80", 10) || 80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIMENSION = 300;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height *= MAX_DIMENSION / width;
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width *= MAX_DIMENSION / height;
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setBase64(canvas.toDataURL(file.type || "image/png", 0.9));
        }
      };
      if (event.target?.result && typeof event.target.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setBase64("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="flex items-center justify-between">
        <Label className="font-semibold text-slate-800 dark:text-slate-200">{title}</Label>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        <div className="flex-1 space-y-4">
          <input type="hidden" name={namePrefix} value={base64} />
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="dark:bg-slate-800/50"
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload Foto
            </Button>
            {base64 && (
              <Button type="button" variant="ghost" size="sm" onClick={handleClear} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                <X className="mr-1 h-3 w-3" /> Hapus
              </Button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Ukuran Tampilan (Scale)</span>
              <span>{scale}%</span>
            </div>
            <input
              type="range"
              name={`${namePrefix}_scale`}
              min="20"
              max="200"
              value={scale}
              onChange={(e) => setScale(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-500"
            />
          </div>
        </div>

        <div className="w-40 shrink-0 flex flex-col items-center justify-center min-h-[140px] rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-2 overflow-hidden">
          {base64 ? (
            <img
              src={base64}
              alt="Preview"
              style={{ width: `${scale}%`, height: `${scale}%`, objectFit: "contain", transition: "all 0.2s" }}
            />
          ) : (
            <span className="text-xs text-muted-foreground text-center">Belum ada foto</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function SettingsForm({ defaultValues }: Props) {
  const [isSaving, startSave] = useTransition();
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    fd.forEach((value, key) => {
      if (typeof value === "string") data[key] = value;
    });

    startSave(async () => {
      const result = await saveSettingsAction(data);
      if (result.success) {
        setSuccessMsg("Pengaturan berhasil disimpan!");
        setTimeout(() => setSuccessMsg(""), 3000);

        // Force-refresh the browser tab favicon with cache-busting
        const existingLink = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
        if (existingLink) {
          existingLink.href = `/api/public/favicon?t=${Date.now()}`;
        } else {
          const newLink = document.createElement("link");
          newLink.rel = "icon";
          newLink.href = `/api/public/favicon?t=${Date.now()}`;
          document.head.appendChild(newLink);
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm font-medium">
          <CheckCircle className="h-4 w-4" />
          {successMsg}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="space-y-5 bg-white/85 dark:bg-slate-900/60 p-6 md:p-8">
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Branding & Identitas Lab</div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="dark:text-slate-300">Nama Perusahaan / Laboratorium</Label>
            <Input
              id="company_name"
              name="company_name"
              defaultValue={defaultValues.company_name ?? ""}
              placeholder="PT. Global Inspeksi Forensik Teknik"
              className="dark:bg-slate-800/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_address" className="dark:text-slate-300">Alamat</Label>
            <Textarea
              id="company_address"
              name="company_address"
              defaultValue={defaultValues.company_address ?? ""}
              rows={2}
              className="dark:bg-slate-800/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_email" className="dark:text-slate-300">Email</Label>
              <Input
                id="company_email"
                name="company_email"
                type="email"
                defaultValue={defaultValues.company_email ?? ""}
                className="dark:bg-slate-800/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_phone" className="dark:text-slate-300">Telepon</Label>
              <Input
                id="company_phone"
                name="company_phone"
                defaultValue={defaultValues.company_phone ?? ""}
                className="dark:bg-slate-800/50"
              />
            </div>
          </div>


        </Card>

        <Card className="space-y-5 bg-white/85 dark:bg-slate-900/60 p-6 md:p-8 flex flex-col">
          <div className="flex-1 space-y-5">
            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">Aturan Dokumen</div>

            <div className="space-y-2">
              <Label htmlFor="verification_base_url" className="dark:text-slate-300">
                Domain Verifikasi Publik
              </Label>
              <Input
                id="verification_base_url"
                name="verification_base_url"
                type="url"
                defaultValue={defaultValues.verification_base_url ?? ""}
                placeholder="https://gift-laboratory.com"
                className="dark:bg-slate-800/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="document_footer" className="dark:text-slate-300">Footer Dokumen Legal</Label>
              <Textarea
                id="document_footer"
                name="document_footer"
                rows={4}
                defaultValue={defaultValues.document_footer ?? ""}
                placeholder="Dokumen ini sah apabila diverifikasi pada halaman publik resmi laboratorium."
                className="dark:bg-slate-800/50"
              />
            </div>

          </div>
        </Card>

        <Card className="space-y-5 bg-white/85 dark:bg-slate-900/60 p-6 md:p-8 xl:col-span-2">
          <div className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">Logo & Branding (Dashboard, Login, Web)</div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <ImageUploadWithScale 
              title="Logo Login" 
              namePrefix="logo_login" 
              defaultBase64={defaultValues.logo_login}
              defaultScale={defaultValues.logo_login_scale}
            />
            
            <ImageUploadWithScale 
              title="Logo Dashboard" 
              namePrefix="logo_dashboard" 
              defaultBase64={defaultValues.logo_dashboard}
              defaultScale={defaultValues.logo_dashboard_scale}
            />
            
            <ImageUploadWithScale 
              title="Logo Website Publik" 
              namePrefix="logo_web" 
              defaultBase64={defaultValues.logo_web}
              defaultScale={defaultValues.logo_web_scale}
            />
          </div>
        </Card>

        <div className="xl:col-span-2 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 shadow-md"
            >
              {isSaving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
              ) : (
                "Simpan Pengaturan"
              )}
            </Button>
          </div>
        </div>
    </form>
  );
}
