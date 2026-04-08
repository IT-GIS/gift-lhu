# Setup GitHub + Issue Tracking + Hostinger

Dokumen ini menjelaskan alur lengkap dari folder lokal sampai deploy ke Hostinger, termasuk cara agar progress kerja otomatis ikut muncul di GitHub Issue.

## Hasil akhir yang akan didapat

Setelah mengikuti langkah ini, Anda akan punya:

- repository GitHub untuk project ini
- issue template agar setiap pekerjaan tercatat rapi
- PR template agar perubahan selalu terhubung ke issue
- workflow GitHub Actions yang meng-update comment progress di issue
- project yang terhubung ke Hostinger lewat `Import Git Repository`

## 1. Persiapan lokal

Pastikan di komputer sudah ada:

- `Git`
- `Node.js 20.9+`
- akun `GitHub`
- akun `Hostinger` dengan fitur `Node.js Apps`

## 2. Rapikan file yang tidak boleh ikut ke GitHub

Project ini sebaiknya mengabaikan:

- `.env`
- `node_modules`
- `.next`
- `public/uploads`

Artinya credential lokal dan file upload runtime tidak ikut ter-push.

## 3. Buat repository Git lokal

Jalankan dari folder project:

```powershell
git init
git add .
git commit -m "Initial commit"
```

## 4. Buat repository baru di GitHub

Di GitHub:

1. klik `New repository`
2. isi nama repo, misalnya `gift-lhu`
3. pilih `Private` jika project internal
4. jangan centang README/gitignore/license jika repo lokal sudah siap
5. klik `Create repository`

## 5. Hubungkan project lokal ke GitHub

Ganti `USERNAME` dan `REPO` sesuai milik Anda:

```powershell
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

## 6. Aktifkan workflow issue progress

File berikut sudah dibuat:

- `.github/ISSUE_TEMPLATE/task.yml`
- `.github/pull_request_template.md`
- `.github/workflows/issue-progress-sync.yml`

Fungsinya:

- issue baru punya format yang rapi
- PR baru otomatis minta nomor issue
- issue akan punya comment progress yang di-update otomatis saat branch/PR berubah

Di GitHub, cek juga:

1. `Settings`
2. `Actions`
3. `General`
4. pastikan Actions diizinkan berjalan
5. jika comment issue gagal dibuat, set `Workflow permissions` ke `Read and write permissions`

## 7. Aturan penamaan branch

Agar update otomatis masuk ke issue yang benar, branch harus memakai format:

```text
issue-<nomor-issue>-<nama-singkat>
```

Contoh:

```text
issue-12-fix-login-hostinger
issue-13-update-pdf-layout
issue-14-deploy-production
```

Kalau format branch tidak sesuai, workflow tidak akan meng-update issue.

## 8. Cara membuat issue kerja

Di GitHub:

1. buka tab `Issues`
2. klik `New issue`
3. pilih template `Task / Deployment`
4. isi tujuan, ruang lingkup, checklist, dan catatan
5. submit issue

Contoh:

- Issue `#12`
- Judul: `[Task] Deploy aplikasi ke Hostinger`

## 9. Cara mulai mengerjakan issue

Misalnya Anda akan mengerjakan issue `#12`:

```powershell
git checkout -b issue-12-deploy-hostinger
```

Setelah itu edit code di VS Code seperti biasa.

## 10. Cara mengirim update agar issue ikut ter-update

Setelah ada perubahan:

```powershell
git add .
git commit -m "refs #12 siapkan env production dan konfigurasi deploy"
git push -u origin issue-12-deploy-hostinger
```

Saat push berhasil:

- GitHub Actions akan jalan
- issue `#12` akan mendapat atau meng-update comment progress otomatis

## 11. Cara membuat Pull Request

Di GitHub:

1. buka branch yang baru dipush
2. klik `Compare & pull request`
3. isi ringkasan perubahan
4. pada bagian `Linked Issue`, isi:

```text
Closes #12
```

5. buat PR

Saat PR dibuka atau di-update:

- workflow juga akan meng-update comment progress di issue terkait

Saat PR di-merge:

- issue akan tertutup otomatis bila memakai `Closes #12`

## 12. Setup repository ini ke Hostinger

Setelah repo ada di GitHub:

1. login ke Hostinger hPanel
2. buka `Websites`
3. klik `Add Website`
4. pilih `Node.js Apps`
5. pilih `Import Git Repository`
6. masukkan URL repository GitHub
7. pilih branch `main`

## 13. Isi build settings di Hostinger

Gunakan nilai ini:

- Node.js version: `22.x`
- Build command: `npm run build`
- Start command: `npm run start`

## 14. Buat database MySQL di Hostinger

Di hPanel:

1. buka website yang dipakai
2. masuk ke `Databases Management`
3. buat database MySQL
4. catat:
   - database name
   - username
   - password
   - host

## 15. Isi environment variables di Hostinger

Tambahkan:

```env
DATABASE_URL=mysql://DB_USER:DB_PASSWORD@localhost:3306/DB_NAME
AUTH_SECRET=isi-random-string-panjang
APP_URL=https://domain-anda.com
COMPANY_NAME=PT. Global Inspeksi Forensik Teknik
NODE_ENV=production
```

## 16. Import struktur database

Lewat `phpMyAdmin`, import berurutan:

1. `drizzle/0000_dazzling_the_stranger.sql`
2. `drizzle/0001_powerful_runaways.sql`

## 17. Buat akun login awal

Pilih salah satu:

- Jalankan `npm run seed` jika server menyediakan akses command
- atau import `docs/hostinger-seed-users.sql` lewat `phpMyAdmin`

Default login:

- `superadmin@gift-lab.id`
- `admin@gift-lab.id`
- `analis@gift-lab.id`
- `qa@gift-lab.id`

Password:

```text
Admin@Gift2026!
```

## 18. Deploy pertama

Setelah setting selesai:

1. jalankan deploy/build di Hostinger
2. tunggu sampai status sukses
3. buka domain aplikasi
4. cek:
   - `/login`
   - `/dashboard`
   - `/verify/[token]`

## 19. Alur update berikutnya

Untuk revisi berikutnya, gunakan pola yang sama:

1. buat issue
2. buat branch dari issue
3. edit di VS Code
4. `git add .`
5. `git commit -m "refs #nomor penjelasan singkat"`
6. `git push`
7. buat PR
8. merge ke `main`
9. redeploy di Hostinger jika belum auto-deploy

Dengan alur ini:

- histori kerja ada di issue
- code review ada di PR
- source of truth ada di GitHub
- server Hostinger tinggal mengambil branch production

## 20. Catatan penting

- Jangan commit file `.env`
- Jangan edit source code langsung di Hostinger File Manager bila workflow Git sudah dipakai
- Folder `public/uploads` berisi file runtime, jadi backup terpisah bila diperlukan
- Project ini sudah lolos `npm run build` secara lokal

## Referensi resmi

- GitHub Issues:
  - https://docs.github.com/issues
- Hostinger Node.js hosting:
  - https://www.hostinger.com/support/node-js-hosting-options-at-hostinger/
- Hostinger deploy Node.js app:
  - https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/
