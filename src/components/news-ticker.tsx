import Link from "next/link";

export function NewsTicker({
  title,
  excerpt,
  href,
}: {
  title: string;
  excerpt?: string | null;
  href: string;
}) {
  const text = excerpt ? `${title} — ${excerpt}` : title;

  return (
    <div className="bg-ckb-red py-2 overflow-hidden border-b border-white/10">
      <div className="flex items-center">
        <span className="shrink-0 px-3 text-white text-[10px] font-bold uppercase tracking-widest opacity-80 border-r border-white/30 mr-0">
          Aktuelles
        </span>
        {/* Marquee */}
        <div className="overflow-hidden flex-1 ml-4">
          <Link
            href={href}
            className="block whitespace-nowrap animate-ticker hover:opacity-80 transition-opacity"
            style={{ display: "inline-block" }}
          >
            <span className="text-white text-[11px] font-bold uppercase tracking-widest pr-24">
              {text}
            </span>
            {/* Second copy for seamless loop */}
            <span className="text-white text-[11px] font-bold uppercase tracking-widest pr-24">
              {text}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
