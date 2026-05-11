# Architecture Notes

## Route grouping
- `(marketing)` untuk landing page publik
- `(app)` untuk panel internal agar layout internal terisolasi
- `verify/[token]` untuk halaman publik hasil scan QR

## Core entity flow
1. `lhu_documents` dibuat dengan status `draft`
2. `lhu_result_rows` diisi analis
3. `lhu_reviews` menyimpan histori review
4. Publish menghasilkan `lhuNumber` + `lhu_verification_tokens`
5. Public page melakukan lookup token aktif
6. Jika dokumen dicabut, status berubah `revoked`

## Suggested production upgrades
- Gunakan Auth.js / custom auth DB-backed
- Tambahkan object storage abstraction
- Tambahkan rate limiting endpoint verifikasi publik
- Tambahkan PDF service terpisah
- Tambahkan signed asset URLs untuk lampiran publik
