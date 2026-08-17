import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white shadow-bar-bottom h-[38px] md:h-[31px] flex items-center justify-center relative z-40">
      <div className="flex items-center justify-center gap-2 text-xs text-black">
        <Link href="/kontakt" className="hover:text-ckb-red transition-colors">
          Kontakt
        </Link>
        <span className="text-black/25">|</span>
        <Link href="/datenschutz" className="hover:text-ckb-red transition-colors">
          Datenschutzerklärung
        </Link>
        <span className="text-black/25">|</span>
        <Link href="/impressum" className="hover:text-ckb-red transition-colors">
          Impressum
        </Link>
      </div>
    </footer>
  );
}
