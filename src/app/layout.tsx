import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "JanganGolput",
  description: "AYO KITA SUKSESKAN PEMILU 2024 TANPA GOLPUT!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${openSans.className} text-neutral-900`}>
        <Header /> <main className="bg-white">{children}</main> <Footer />
      </body>
    </html>
  );
}
