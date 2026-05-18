import Link from "next/link";

export function NewsTicker({ title, href }: { title: string; href: string }) {
  return (
    <div className="bg-ckb-red px-4 sm:px-6 lg:px-8 py-2 border-b border-white/10">
      <p className="text-white text-[11px] font-bold uppercase tracking-widest truncate">
        <span className="opacity-60 mr-2">Aktuelles:</span>
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </p>
    </div>
  );
}
