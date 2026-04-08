export type LhuStatus =
  | "draft"
  | "input_hasil"
  | "review"
  | "revisi"
  | "approved"
  | "published"
  | "revoked";

export type Role =
  | "super_admin"
  | "admin"
  | "frontdesk"
  | "analis"
  | "qa"
  | "viewer";

export const demoUsers = [
  {
    id: "usr_sa",
    fullName: "Super Admin GISHUB",
    email: "superadmin@example.com",
    password: "Demo123!",
    role: "super_admin" as const,
  },
  {
    id: "usr_admin",
    fullName: "Admin Operasional",
    email: "admin@example.com",
    password: "Demo123!",
    role: "admin" as const,
  },
  {
    id: "usr_lab",
    fullName: "Analis Lab Beton",
    email: "analis@example.com",
    password: "Demo123!",
    role: "analis" as const,
  },
  {
    id: "usr_qa",
    fullName: "QA Supervisor",
    email: "qa@example.com",
    password: "Demo123!",
    role: "qa" as const,
  },
];

export const kpiCards = [
  { label: "Total Draft", value: 18, delta: "+4 minggu ini" },
  { label: "Menunggu Input Hasil", value: 11, delta: "3 prioritas tinggi" },
  { label: "Menunggu Review", value: 7, delta: "2 butuh revisi" },
  { label: "Approved", value: 24, delta: "Stabil" },
  { label: "Published", value: 132, delta: "+18 bulan ini" },
  { label: "Revoked", value: 2, delta: "Kontrol aktif" },
];

export const monthlyDocuments = [
  { month: "Jan", draft: 9, review: 4, published: 12 },
  { month: "Feb", draft: 7, review: 6, published: 14 },
  { month: "Mar", draft: 10, review: 5, published: 18 },
  { month: "Apr", draft: 12, review: 8, published: 16 },
  { month: "Mei", draft: 11, review: 7, published: 22 },
  { month: "Jun", draft: 14, review: 9, published: 20 },
];

export const statusMix = [
  { name: "Draft", value: 18 },
  { name: "Input Hasil", value: 11 },
  { name: "Review", value: 7 },
  { name: "Approved", value: 24 },
  { name: "Published", value: 132 },
  { name: "Revoked", value: 2 },
];

const initialLhuDocuments = [
  {
    id: "lhu_001",
    documentCode: "DRF-2026-0001",
    lhuNumber: "LHU-BTN/2026/0031",
    publicToken: "valid-demo-token",
    customer: "PT Beton Konstruksi Nusantara",
    projectName: "Tower Residence Blok A",
    projectAddress: "Jl. Pembangunan Raya No. 18, Jakarta",
    referenceNumber: "REF/BTN/031/III/2026",
    concreteType: "silinder" as const,
    testType: "Kuat Tekan Beton",
    status: "published" as const,
    receivedDate: "2026-03-06",
    testingDate: "2026-03-17",
    publishedAt: "2026-03-20",
    notes: "Pengujian sesuai permintaan pelanggan dan prosedur internal laboratorium.",
    approvalNotes: "Data valid dan siap dipublikasikan.",
    summary: "Rata-rata kuat tekan 31,84 MPa dengan 6 benda uji.",
    attachments: [
      { id: "att_1", category: "produk", fileName: "sample-beton-01.jpg", caption: "Visual benda uji sebelum pengujian" },
      { id: "att_2", category: "pengujian", fileName: "compression-test-01.jpg", caption: "Proses pengujian kuat tekan" },
    ],
    results: [
      {
        id: "row_1",
        rowNumber: 1,
        sampleCode: "BTN-S-01",
        castingDate: "2026-02-17",
        testingDate: "2026-03-17",
        ageDays: 28,
        weight: 12.75,
        dimension: "15 x 30 cm",
        maxLoad: 563.2,
        compressiveStrength: 31.86,
        failurePattern: "Kerucut seimbang",
        remarks: "Normal",
        analystName: "Rudi Hartono",
      },
      {
        id: "row_2",
        rowNumber: 2,
        sampleCode: "BTN-S-02",
        castingDate: "2026-02-17",
        testingDate: "2026-03-17",
        ageDays: 28,
        weight: 12.63,
        dimension: "15 x 30 cm",
        maxLoad: 560.1,
        compressiveStrength: 31.68,
        failurePattern: "Geser moderat",
        remarks: "Normal",
        analystName: "Rudi Hartono",
      },
      {
        id: "row_3",
        rowNumber: 3,
        sampleCode: "BTN-S-03",
        castingDate: "2026-02-17",
        testingDate: "2026-03-17",
        ageDays: 28,
        weight: 12.71,
        dimension: "15 x 30 cm",
        maxLoad: 565.0,
        compressiveStrength: 31.98,
        failurePattern: "Kerucut seimbang",
        remarks: "Normal",
        analystName: "Rudi Hartono",
      },
    ],
    timeline: [
      { label: "Draft dibuat oleh Frontdesk", time: "06 Mar 2026 · 08:51" },
      { label: "Hasil uji diinput Analis", time: "17 Mar 2026 · 10:22" },
      { label: "QA approve dokumen", time: "19 Mar 2026 · 16:40" },
      { label: "Dokumen dipublish dan QR dibuat", time: "20 Mar 2026 · 09:10" },
    ],
    reviewHistory: [
      { action: "review", reviewer: "QA Supervisor", comment: "Pastikan konsistensi satuan dimensi.", createdAt: "2026-03-18T14:20:00Z" },
      { action: "approve", reviewer: "QA Supervisor", comment: "Sudah sesuai.", createdAt: "2026-03-19T09:05:00Z" },
    ],
  },
  {
    id: "lhu_002",
    documentCode: "DRF-2026-0002",
    lhuNumber: null,
    publicToken: "draft-demo-token",
    customer: "PT Cipta Bangun Prima",
    projectName: "Gudang Logistik Cikarang",
    projectAddress: "Kawasan Industri Delta, Cikarang",
    referenceNumber: "REF/CBP/044/III/2026",
    concreteType: "kubus" as const,
    testType: "Kuat Tekan Beton",
    status: "review" as const,
    receivedDate: "2026-03-11",
    testingDate: "2026-03-21",
    publishedAt: null,
    notes: "Menunggu review akhir QA.",
    approvalNotes: null,
    summary: "4 benda uji, rentang kuat tekan 29,41–30,12 MPa.",
    attachments: [],
    results: [
      {
        id: "row_4",
        rowNumber: 1,
        sampleCode: "BTN-K-01",
        castingDate: "2026-02-22",
        testingDate: "2026-03-21",
        ageDays: 28,
        weight: 8.21,
        dimension: "15 x 15 x 15 cm",
        maxLoad: 675.4,
        compressiveStrength: 30.02,
        failurePattern: "Kolom retak",
        remarks: "Perlu cek ulang foto uji",
        analystName: "Rudi Hartono",
      },
    ],
    timeline: [
      { label: "Draft dibuat oleh Frontdesk", time: "11 Mar 2026 · 10:15" },
      { label: "Hasil uji diinput Analis", time: "21 Mar 2026 · 13:35" },
      { label: "Dokumen dikirim ke QA", time: "21 Mar 2026 · 15:10" },
    ],
    reviewHistory: [],
  },
  {
    id: "lhu_003",
    documentCode: "DRF-2026-0003",
    lhuNumber: "LHU-BTN/2026/0019",
    publicToken: "revoked-demo-token",
    customer: "PT Surya Infrastruktur",
    projectName: "Flyover Selatan",
    projectAddress: "Semarang",
    referenceNumber: "REF/SI/011/II/2026",
    concreteType: "silinder" as const,
    testType: "Kuat Tekan Beton",
    status: "revoked" as const,
    receivedDate: "2026-02-05",
    testingDate: "2026-02-26",
    publishedAt: "2026-02-28",
    revokedAt: "2026-03-12",
    revokedReason: "Dokumen direvisi karena koreksi identitas sampel.",
    notes: "Dokumen lama sudah tidak aktif.",
    approvalNotes: "Riwayat disimpan untuk audit.",
    summary: "Dokumen tidak lagi berlaku.",
    attachments: [],
    results: [],
    timeline: [
      { label: "Dokumen dipublish", time: "28 Feb 2026 · 09:10" },
      { label: "Dokumen direvoke", time: "12 Mar 2026 · 14:00" },
    ],
    reviewHistory: [],
  },
];

let loadedDocs = initialLhuDocuments;

if (typeof window === "undefined") {
  try {
    const fs = require("fs");
    const path = require("path");
    const dbPath = path.join(process.cwd(), ".next", "lhu_db.json");
    if (fs.existsSync(dbPath)) {
      loadedDocs = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    }
  } catch (e) {
    console.error("Failed to load DB", e);
  }
}

const globalForDemo = globalThis as unknown as { lhuDocuments: typeof initialLhuDocuments };

export const lhuDocuments = globalForDemo.lhuDocuments || loadedDocs;

if (process.env.NODE_ENV !== "production") {
  globalForDemo.lhuDocuments = lhuDocuments;
}

export function saveLhuData() {
  if (typeof window === "undefined") {
    try {
      const fs = require("fs");
      const path = require("path");
      const dbPath = path.join(process.cwd(), ".next", "lhu_db.json");
      fs.writeFileSync(dbPath, JSON.stringify(lhuDocuments, null, 2));
    } catch (e) {
      console.error("Failed to save DB", e);
    }
  }
}

export const recentActivities = [
  { title: "LHU-BTN/2026/0031 dipublish", description: "Token verifikasi dibuat dan QR aktif.", time: "2 jam lalu" },
  { title: "DRF-2026-0002 masuk review QA", description: "Menunggu approval supervisor.", time: "4 jam lalu" },
  { title: "2 lampiran ditambahkan", description: "Gudang Logistik Cikarang.", time: "Hari ini" },
  { title: "Role analis diperbarui", description: "Akses publish dinonaktifkan.", time: "Kemarin" },
];

export const quickActions = [
  { href: "/lhu/new", label: "Buat LHU Baru" },
  { href: "/lhu/lhu_002/results", label: "Input Hasil" },
  { href: "/lhu/lhu_002/review", label: "Review QA" },
  { href: "/lhu/lhu_001/publish", label: "Publish Draft" },
  { href: "/verify/valid-demo-token", label: "Buka Verifikasi Sample" },
];

export function getDocumentById(id: string) {
  return lhuDocuments.find((item) => item.id === id);
}

export function getDocumentByToken(token: string) {
  return lhuDocuments.find((item) => item.publicToken === token);
}
