import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Cannstatter Kurve Berlin e.V.",
    template: "%s | CKB'08",
  },
  description:
    "Cannstatter Kurve Berlin — Der VfB-Fanclub in Berlin. Fern der Heimat, nah im Herzen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable}`}>
      <body className="bg-white text-ckb-dark font-sans">{children}</body>
    </html>
  );
}
