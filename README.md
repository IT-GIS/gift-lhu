# LHU Verification System

Starter fullstack modern untuk **Laporan Hasil Uji (LHU) Kuat Tekan Beton** dengan fokus utama pada **verifikasi publik berbasis QR/token**.

## Yang sudah disiapkan

- Next.js App Router + TypeScript
- Tailwind CSS + komponen UI bergaya shadcn
- Drizzle ORM schema untuk MySQL
- Landing page publik GIFT Laboratory dari referensi WordPress lama
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
- `app/(landing)` untuk landing publik
- `app/(app)` untuk dashboard internal
- `app/verify/[token]` untuk public verification
- `app/api/public/verify/[token]` untuk endpoint verifikasi JSON

## Migrasi landing WordPress

Landing publik sekarang dipisah dari aplikasi internal:

- halaman publik: `app/(landing)/page.tsx`
- halaman publik tambahan: `/profile`, `/services`, `/blog`, `/contact`
- alias WordPress lama: `/about` -> `/profile`, `/blog-financial-services-v1` -> `/blog`
- komponen landing WordPress-to-TSX: `components/landing/wp-landing.tsx`
- data landing: `components/landing/landing-data.ts`
- CSS landing lokal: `components/landing/WpStyles.tsx` dan `public/landing/css`
- aplikasi internal LHU: `app/(app)`
- profil akun internal: `/account`
- asset landing publik: `public/landing`
- asset logo aplikasi: `public/brand`

File SQL `u652037858_f4kBS.sql` yang dikirim berisi database WordPress
(`wp_posts`, `wp_options`, Elementor, AIOSEO, WPForms). Database tersebut
dipakai sebagai referensi konten dan identitas landing, bukan digabung ke
schema operasional LHU yang sudah ada di Drizzle.

Source visual landing diambil dari folder WordPress
`c:\Users\Thinkpad X390\Documents\Project 2026\giftlandingpage`, terutama
homepage Elementor dengan `page_on_front = 1184` dan theme
`royal-elementor-kit`. Markup WordPress mentah tidak dirender lagi; struktur
halaman sudah dikonversi ke TSX, sementara CSS Elementor yang dibutuhkan
disajikan dari asset lokal dan diberi override kecil untuk environment Next.js.

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
