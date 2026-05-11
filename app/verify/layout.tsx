/**
 * Public Verify Layout
 * Route /verify/[token] bersifat publik (tanpa login) untuk verifikasi dokumen LHU
 * oleh klien eksternal melalui QR code.
 * TIDAK menggunakan AppShell karena tidak memerlukan session/autentikasi.
 */
export default function VerifyLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
