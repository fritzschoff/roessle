import Image from "next/image";
import Link from "next/link";
import { VFB } from "@/lib/teams";
import type { Termin, BlogPost } from "@/lib/schema";

function formatShortDate(datum: string) {
  // Append noon to avoid UTC-midnight parsing shifting the date in German timezone
  const d = new Date(datum + "T12:00:00");
  const weekday = d.toLocaleDateString("de-DE", { weekday: "short" });
  const dayMonth = d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" });
  return { weekday, dayMonth };
}

function TeamLogo({
  src,
  alt,
  size,
}: {
  src: string | null | undefined;
  alt: string;
  size: number;
}) {
  if (!src) return null;
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <Image src={src} alt={alt} fill className="object-contain drop-shadow-sm" />
    </div>
  );
}

function MiniGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity"
    >
      <TeamLogo src={VFB.logo} alt="VfB" size={20} />
      <div className="text-center leading-none">
        <p className="text-[8px] font-bold text-white/90">
          {weekday} {dayMonth}
        </p>
        <p className="text-[8px] text-white/70">{termin.uhrzeit}</p>
      </div>
      {termin.wettbewerbLogo && (
        <TeamLogo src={termin.wettbewerbLogo} alt={termin.wettbewerb ?? ""} size={12} />
      )}
      <TeamLogo
        src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"}
        alt={termin.gegner}
        size={20}
      />
    </Link>
  );
}

function NextGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="flex flex-col justify-center gap-3 bg-ckb-red px-4 sm:px-5 py-4
                 w-full md:w-[38%] lg:w-[32%] shrink-0"
    >
      <p className="text-white text-[9px] font-bold uppercase tracking-widest leading-relaxed opacity-75">
        Die nächsten Spiele<br className="hidden sm:block" /> live im Rössle
      </p>
      <div className="flex items-center gap-2 sm:gap-3">
        <TeamLogo src={VFB.logo} alt="VfB Stuttgart" size={52} />
        <div className="text-white">
          <p className="font-extrabold text-xl leading-none">{dayMonth}</p>
          <p className="text-xs leading-tight opacity-80 mt-0.5">
            {weekday}: {termin.uhrzeit}
          </p>
        </div>
        {termin.wettbewerbLogo && (
          <TeamLogo
            src={termin.wettbewerbLogo}
            alt={termin.wettbewerb ?? ""}
            size={24}
          />
        )}
        <TeamLogo
          src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"}
          alt={termin.gegner}
          size={52}
        />
      </div>
    </Link>
  );
}

type Props = {
  termine: Termin[];
  latestPost?: Pick<BlogPost, "title" | "slug" | "excerpt" | "publishedAt"> | null;
};

export function GameBar({ termine, latestPost }: Props) {
  if (termine.length === 0 && !latestPost) return null;

  const [next, ...rest] = termine;

  return (
    // sticky on mobile so it pins below the navbar when user scrolls; static on md+
    <div className="sticky top-0 z-20 md:static">
      {/* Two-column main bar */}
      <div className="flex">
        {/* Left column: next game (always dark red, full width on mobile) */}
        {next && <NextGame termin={next} />}

        {/* Right column: latest blog post — hidden on mobile */}
        {latestPost && (
          <div className="hidden md:flex flex-col justify-center flex-1 bg-white px-5 lg:px-8 py-4 min-w-0 border-t border-gray-100">
            <Link
              href={`/aktuelles/${latestPost.slug}`}
              className="font-bold text-sm text-black hover:text-ckb-red transition-colors leading-snug line-clamp-2"
            >
              {latestPost.title}
            </Link>
            {latestPost.excerpt && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                {latestPost.excerpt}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <Link
                href={`/aktuelles/${latestPost.slug}`}
                className="text-xs text-ckb-red hover:underline font-medium"
              >
                Mehr lesen...
              </Link>
              {latestPost.publishedAt && (
                <span className="text-xs text-gray-400">
                  {new Date(latestPost.publishedAt).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mini upcoming games strip */}
      {rest.length > 0 && (
        <div className="bg-[#6b1010] px-4 sm:px-6 py-2 border-t border-white/10">
          <div className="flex items-center gap-5 overflow-x-auto">
            {rest.slice(0, 7).map((t) => (
              <MiniGame key={t.id} termin={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
