# Deploy ke Hostinger

Project ini adalah aplikasi `Next.js` fullstack, jadi cara deploy-nya bukan upload biasa ke `public_html`.
Karena aplikasi memakai server-side rendering, route API, koneksi MySQL, dan simpan lampiran ke filesystem lokal, deploy yang tepat adalah lewat fitur **Node.js Apps** di Hostinger.

## Ringkasan kebutuhan

- Paket Hostinger minimal:
  - `Business Web Hosting`, atau
  - salah satu paket `Cloud Hosting`
- Alternatif:
  - `VPS` jika ingin kontrol penuh via SSH
- Node.js yang dipakai:
  - pilih `22.x` atau `20.x`
  - `next@16.2.1` pada project ini butuh Node `>=20.9.0`

## Kenapa tidak cukup upload ke File Manager

Project ini memakai:

- `next build` dan `next start` di `package.json`
- koneksi MySQL dari `lib/db/index.ts`
- API route di folder `app/api`
- middleware/auth
- upload gambar lokal ke `public/uploads/lhu`

Artinya aplikasi harus jalan sebagai proses Node.js, bukan sebagai file HTML statis atau PHP biasa.

## Langkah deploy yang disarankan

### 1. Siapkan source code

Pilihan terbaik adalah **GitHub repository**.
Kalau mau pakai ZIP, pastikan isi ZIP langsung berisi file project seperti:

- `package.json`
- `app/`
- `components/`
- `lib/`
- `public/`
- `drizzle/`
- `docs/`

Jangan sertakan:

- `node_modules/`
- `.next/`
- file `.env` lokal

### 2. Tambah website Node.js di Hostinger

Di hPanel:

1. Masuk ke `Websites`
2. Klik `Add Website`
3. Pilih `Node.js Apps`
4. Pilih salah satu:
   - `Import Git Repository`, atau
   - `Upload your website files`

Kalau framework tidak terdeteksi otomatis, pilih `Next.js` atau `Other`.

### 3. Isi build settings

Gunakan nilai berikut:

- Node.js version: `22.x`
- Build command: `npm run build`
- Start command: `npm run start`

Kalau Hostinger meminta output directory secara manual, pakai:

- Output directory: `.next`

## Environment variables

Tambahkan environment variables berikut di dashboard Node.js app Hostinger:

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
AUTH_SECRET=ganti_dengan_random_string_panjang
APP_URL=https://domain-anda.com
COMPANY_NAME=PT. Global Inspeksi Forensik Teknik
NODE_ENV=production
```

Catatan:

- Hostname database Hostinger biasanya `localhost`
- Nama database dan user biasanya memakai prefix otomatis dari Hostinger

## Setup database MySQL

### 1. Buat database

Di hPanel:

1. Buka `Websites`
2. Masuk ke website yang dipakai
3. Buka menu `Databases Management`
4. Buat MySQL database dan user

### 2. Import struktur tabel

Import SQL ini lewat `phpMyAdmin` dengan urutan:

1. `drizzle/0000_dazzling_the_stranger.sql`
2. `drizzle/0001_powerful_runaways.sql`
3. `drizzle/0002_foamy_lorna_dane.sql`
4. `drizzle/0003_lean_prima.sql`
5. `drizzle/0004_tranquil_proemial_gods.sql` (tabel `contact_messages` untuk fitur Pesan Masuk)

Catatan: `npm run build` hanya menjalankan `drizzle-kit generate` untuk membuat file migrasi lokal. Command itu tidak otomatis menerapkan struktur tabel ke database Hostinger, jadi file SQL di atas tetap harus diimport ke database production.

### 3. Seed user login

Kalau Anda punya akses untuk menjalankan command di server:

```bash
npm run seed
```

Kalau tidak ada akses command, import file berikut lewat `phpMyAdmin`:

- `docs/hostinger-seed-users.sql`

File tersebut membuat akun default:

- `superadmin@gift-lab.id`
- `admin@gift-lab.id`
- `analis@gift-lab.id`
- `qa@gift-lab.id`

Password default:

```text
Admin@Gift2026!
```

## Setelah deploy

Setelah website sukses build:

1. buka domain aplikasi
2. login dengan akun admin hasil seed
3. cek halaman:
   - `/login`
   - `/dashboard`
   - `/verify/[token]`

## Catatan penting untuk project ini

### 1. Upload lampiran masih disimpan lokal

Kode saat ini menyimpan gambar ke:

- `public/uploads/lhu`

Ini praktis untuk awal, tapi untuk production jangka panjang lebih aman dipindahkan ke object storage.
Saya menyimpulkan ini dari implementasi upload di server actions.

### 2. Backup sebelum redeploy besar

Karena ada file lampiran lokal, lakukan backup folder upload sebelum redeploy besar atau migrasi host.

### 3. Warning Next.js

Build project saat ini berhasil, tetapi ada warning bahwa `middleware.ts` di Next.js 16 sudah deprecated dan ke depan sebaiknya diganti ke `proxy.ts`.
Ini tidak menghalangi deploy sekarang.

## Nilai yang sudah saya verifikasi dari project ini

- Build lokal berhasil dengan:

```bash
npm run build
```

- Script produksi yang dipakai memang:

```json
{
  "build": "drizzle-kit generate && next build",
  "start": "next start"
}
```

## Referensi

- Hostinger Node.js hosting options:
  - https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/
- Hostinger add Node.js web app:
  - https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
- Hostinger add env vars:
  - https://www.hostinger.com/support/how-to-add-environment-variables-during-node-js-application-deployment/
- Hostinger MySQL database details:
  - https://www.hostinger.com/support/1583552-how-to-find-your-mysql-database-details-in-hostinger/
