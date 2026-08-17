import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Schmale Display-Schrift für Spielpaarungen, Anstoßzeiten und Datumsblöcke. */
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-rajdhani-src",
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
    <html lang="de" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="bg-white text-ckb-dark font-sans">{children}</body>
    </html>
  );
}
