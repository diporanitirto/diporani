import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diporani SMA Negeri 1 Kasihan",
  description:
    "Profil Diporani SMA Negeri 1 Kasihan, sebuah organisasi Pramuka Penegak yang berfokus pada pengembangan karakter, keterampilan lapangan, dan pengetahuan umum bagi anggotanya.",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "any",
      },
    ],
    shortcut: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} m-0 antialiased bg-white text-slate-900 overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
