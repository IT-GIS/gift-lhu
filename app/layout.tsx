import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "LHU Verification System",
  description: "Workflow dan verifikasi publik untuk LHU kuat tekan beton.",
};

/**
 * RootLayout
 * Layout utama aplikasi yang membungkus seluruh halaman.
 * Menyediakan ThemeProvider untuk mendukung dark/light mode.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/api/public/favicon" type="image/png" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

