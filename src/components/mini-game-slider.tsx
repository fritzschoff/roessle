"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VFB } from "@/lib/teams";
import type { Termin } from "@/lib/schema";

function formatShortDate(datum: string) {
  const d = new Date(datum + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("de-DE", { weekday: "short" }),
    dayMonth: d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
  };
}

function Logo({ src, alt, size }: { src: string | null | undefined; alt: string; size: number }) {
  if (!src) return null;
  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}

function SlideGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link href="/termine" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity px-4 py-3">
      <div className="flex items-center gap-2">
        <Logo src={VFB.logo} alt="VfB" size={32} />
        <div className="text-center leading-none">
          <p className="text-[10px] font-bold text-white">{dayMonth}</p>
          <p className="text-[9px] text-white/70">{weekday} {termin.uhrzeit}</p>
        </div>
        {termin.wettbewerbLogo && (
          <Logo src={termin.wettbewerbLogo} alt={termin.wettbewerb ?? ""} size={18} />
        )}
        <Logo src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"} alt={termin.gegner} size={32} />
      </div>
      <p className="text-[9px] text-white/60 truncate max-w-full">{termin.gegner}</p>
    </Link>
  );
}

export function MiniGameSlider({ termine }: { termine: Termin[] }) {
  const [index, setIndex] = useState(0);

  if (termine.length === 0) return null;

  const current = termine[index];

  return (
    <div className="flex flex-col flex-1 bg-[#6b1010] min-w-0">
      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <SlideGame termin={current} />
      </div>

      {/* Dots + arrows */}
      <div className="flex items-center justify-center gap-2 pb-2 px-2">
        <button
          onClick={() => setIndex((i) => (i - 1 + termine.length) % termine.length)}
          className="text-white/50 hover:text-white transition-colors p-1"
          aria-label="Vorheriges Spiel"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 6 10">
            <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>

        {termine.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/30"}`}
            aria-label={`Spiel ${i + 1}`}
          />
        ))}

        <button
          onClick={() => setIndex((i) => (i + 1) % termine.length)}
          className="text-white/50 hover:text-white transition-colors p-1"
          aria-label="Nächstes Spiel"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 6 10">
            <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
