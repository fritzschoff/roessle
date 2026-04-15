import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ckb-dark py-6">
      <div className="flex items-center justify-center gap-2 text-xs text-white">
        <Link href="/kontakt" className="hover:text-gray-300 transition-colors">
          Kontakt
        </Link>
        <span className="text-gray-500">|</span>
        <Link href="/datenschutz" className="hover:text-gray-300 transition-colors">
          Datenschutzerklärung
        </Link>
        <span className="text-gray-500">|</span>
        <Link href="/impressum" className="hover:text-gray-300 transition-colors">
          Impressum
        </Link>
      </div>
    </footer>
  );
}
