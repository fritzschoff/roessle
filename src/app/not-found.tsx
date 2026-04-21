import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-105px)] relative overflow-hidden flex items-center">
        <div className="px-6 sm:px-10 lg:px-16 py-16 relative z-10">
          <p className="font-lobster text-lg sm:text-2xl text-ckb-red mb-2">
            Seite nicht gefunden
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold uppercase leading-tight tracking-tight text-black">
            404
          </h1>
          <p className="text-sm text-black mt-4 max-w-md leading-relaxed">
            Die angeforderte Seite existiert leider nicht.
            <br />
            Vielleicht wurde sie verschoben oder gelöscht.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="/"
              className="bg-ckb-red text-white text-xs px-8 py-2.5 hover:bg-ckb-red-dark transition-colors"
            >
              Zur Startseite
            </Link>
            <Link
              href="/kontakt"
              className="border-2 border-black text-black text-xs px-8 py-2.5 hover:bg-black hover:text-white transition-colors"
            >
              Kontakt
            </Link>
          </div>
        </div>

        {/* Wappen - desktop */}
        <div className="absolute right-[-80px] top-[-60px] w-[500px] h-[700px] hidden md:block pointer-events-none select-none">
          <Image
            src="/images/ckb-wappen.svg"
            alt=""
            fill
            className="object-contain opacity-90"
            aria-hidden="true"
          />
        </div>
        {/* Wappen - mobile */}
        <div className="absolute right-[-20px] top-[-10px] w-[140px] h-[140px] md:hidden pointer-events-none select-none">
          <Image
            src="/images/ckb-wappen.svg"
            alt=""
            fill
            className="object-contain opacity-80"
            aria-hidden="true"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
