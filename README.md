# LHU Verification System

Starter fullstack modern untuk **Laporan Hasil Uji (LHU) Kuat Tekan Beton** dengan fokus utama pada **verifikasi publik berbasis QR/token**.

## Yang sudah disiapkan

- Next.js App Router + TypeScript
- Tailwind CSS + komponen UI bergaya shadcn
- Drizzle ORM schema untuk MySQL
- Landing page premium ala SaaS B2B
- Login demo + proteksi route dasar
- Dashboard internal
- Data LHU list
- Wizard create draft
- Detail LHU
- Editable result table
- QA review page
- Publish page + QR preview
- Public verification page
- Print-ready page untuk PDF/export
- User management dan audit log page
- Seed reference & schema

## Jalankan lokal

```bash
cp .env.example .env
npm install
npm run dev
```

## Siapkan database

1. Buat database MySQL, misalnya `lhu_verification`
2. Isi `.env`:

```env
DATABASE_URL=mysql://root:password@127.0.0.1:3306/lhu_verification
AUTH_SECRET=secret-yang-aman
APP_URL=http://localhost:3000
```

3. Generate & push schema:

```bash
npm run db:generate
npm run db:push
```

4. Lihat contoh hash seed demo:

```bash
npm run seed
```

## Catatan arsitektur

Struktur project memakai:
- `app/(marketing)` untuk landing publik
- `app/(app)` untuk dashboard internal
- `app/verify/[token]` untuk public verification
- `app/api/public/verify/[token]` untuk endpoint verifikasi JSON

## Catatan penting

Versi ini adalah **starter production-minded**:
- UI, struktur folder, dan alur kerja utama sudah dibangun
- Data saat ini masih memakai `lib/data/demo.ts` agar mudah dipreview
- Langkah berikutnya adalah menghubungkan seluruh page/action ke Drizzle + MySQL nyata, upload file storage, PDF generator, dan autentikasi database penuh

## Langkah penguatan berikutnya yang saya sarankan

1. Ganti auth demo menjadi auth database penuh
2. Tambahkan server actions untuk CRUD LHU
3. Tambahkan upload storage (S3 / local object storage)
4. Tambahkan generator PDF resmi
5. Tambahkan revoke workflow + nomor revisi otomatis
6. Tambahkan audit logs tersimpan ke DB real
