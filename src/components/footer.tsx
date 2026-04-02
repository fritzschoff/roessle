import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ckb-dark text-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Cannstatter Kurve Berlin e.V.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-white transition-colors">
              Datenschutzerklärung
            </Link>
            <a
              href="mailto:kontakt@ckb08.de"
              className="hover:text-white transition-colors"
            >
              kontakt@ckb08.de
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-gray-600 mt-6">
          Fern der Heimat, nah im Herzen.
        </p>
      </div>
    </footer>
  );
}
