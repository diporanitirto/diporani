import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
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
        className={`${plusJakarta.variable} font-sans m-0 antialiased bg-white text-slate-900 overflow-x-clip`}
      >
        {children}
      </body>
    </html>
  );
}
