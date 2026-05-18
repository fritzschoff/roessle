import Image from "next/image";
import Link from "next/link";
import { VFB } from "@/lib/teams";
import { MiniGameSlider } from "@/components/mini-game-slider";
import type { Termin } from "@/lib/schema";

function formatShortDate(datum: string) {
  const d = new Date(datum + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("de-DE", { weekday: "short" }),
    dayMonth: d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
  };
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

function NextGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="flex flex-col justify-center gap-3 bg-ckb-red px-4 sm:px-5 py-4
                 w-full md:w-[55%] lg:w-[50%] shrink-0"
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
};

export function GameBar({ termine }: Props) {
  if (termine.length === 0) return null;

  const [next, ...rest] = termine;

  return (
    <div className="sticky top-0 z-20 md:static flex">
      {/* Left: next game */}
      {next && <NextGame termin={next} />}

      {/* Right: remaining games as slider — hidden on mobile */}
      {rest.length > 0 && (
        <div className="hidden md:flex flex-1 min-w-0">
          <MiniGameSlider termine={rest} />
        </div>
      )}
    </div>
  );
}
