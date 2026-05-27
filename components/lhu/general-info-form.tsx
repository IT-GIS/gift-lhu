import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

export function GeneralInfoForm({
  defaultValues,
  importSlot,
}: {
  defaultValues?: Record<string, any>;
  importSlot?: React.ReactNode;
}) {
  const selectClassName = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <Card className="bg-white/85 dark:bg-slate-900/80 p-6 shadow-sm border-slate-200 dark:border-slate-800">
      <div className="mb-6 border-b pb-4 dark:border-slate-700">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-100">
          <FileText className="h-5 w-5 text-indigo-600" />
          Informasi Umum Laporan
        </h2>
      </div>

      {importSlot}

      <input type="hidden" name="referenceNumber" defaultValue={defaultValues?.referenceNumber || ""} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Nama Pelanggan</Label>
          <Input defaultValue={defaultValues?.customer} name="customer" placeholder="Masukkan nama pelanggan..." className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Pengujian</Label>
          <select name="concreteType" className={selectClassName + " bg-white dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 transition-shadow focus-visible:ring-indigo-500"} defaultValue={defaultValues?.concreteType || ""}>
            <option value="" disabled>Pilih Pengujian...</option>
            <option value="silinder">Kuat Tekan Beton Silinder</option>
            <option value="kubus">Kuat Tekan Beton Kubus</option>
          </select>
        </div>




        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Acuan</Label>
          <Input defaultValue={defaultValues?.testType} name="testType" placeholder="Standar yang digunakan (misal: SNI ...)" className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group md:col-span-2">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Alamat Perusahaan / Proyek</Label>
          <Textarea defaultValue={defaultValues?.projectAddress} name="projectAddress" placeholder="Alamat lengkap lokasi atau perusahaan..." className="bg-white min-h-[80px] transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">No. Pengujian</Label>
          <Input defaultValue={defaultValues?.projectName} name="projectName" placeholder="Nomor unik registrasi lab..." className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Jumlah Contoh</Label>
          <Input defaultValue={defaultValues?.sampleCount} name="sampleCount" type="number" placeholder="Banyaknya sampel..." className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Tanggal Terima</Label>
          <Input defaultValue={defaultValues?.receivedDate} name="receivedDate" type="date" className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Tanggal Diuji</Label>
          <Input defaultValue={defaultValues?.testingDate} name="testingDate" type="date" className="bg-white transition-shadow focus-visible:ring-indigo-500" />
        </div>

        <div className="space-y-2 relative group md:col-span-2">
          <Label className="font-semibold text-slate-700 dark:text-slate-300 group-focus-within:text-indigo-600 transition-colors">Penandatangan Laporan (Analis / Manager)</Label>
          <select name="signer" className={selectClassName + " bg-white dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 md:max-w-md transition-shadow focus-visible:ring-indigo-500"} defaultValue="">
            <option value="" disabled>Pilih Penandatangan...</option>
            <option value="Feri Indriyanto">Feri Indriyanto</option>
            <option value="Vera Marini">Vera Marini</option>
          </select>
        </div>
      </div>
    </Card>
  );
}
