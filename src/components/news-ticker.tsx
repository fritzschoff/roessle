import Link from "next/link";

export function NewsTicker({ title, href }: { title: string; href: string }) {
  return (
    <div className="bg-ckb-red py-2 overflow-hidden border-b border-white/10">
      <div className="flex items-center gap-0">
        <span className="shrink-0 px-4 text-white text-[11px] font-bold uppercase tracking-widest opacity-80 border-r border-white/30 mr-4">
          Aktuelles
        </span>
        {/* Marquee container */}
        <div className="overflow-hidden flex-1">
          <div className="flex whitespace-nowrap animate-ticker">
            {/* Duplicate the content for seamless loop */}
            {[0, 1].map((i) => (
              <Link
                key={i}
                href={href}
                className="inline-block text-white text-[11px] font-bold uppercase tracking-widest hover:underline pr-24"
                aria-hidden={i === 1}
                tabIndex={i === 1 ? -1 : undefined}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
