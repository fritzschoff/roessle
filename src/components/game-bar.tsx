"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { findTeam, VFB } from "@/lib/teams";
import { competitionLabel } from "@/lib/competitions";
import type { Termin } from "@/lib/schema";

/** „Samstag“ + „04. APR“ für den großen Datumsblock. */
function formatFeaturedDate(datum: string) {
  const d = new Date(datum + "T12:00:00");
  const month = d
    .toLocaleDateString("de-DE", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  return {
    weekday: d.toLocaleDateString("de-DE", { weekday: "long" }),
    dayMonth: `${d.toLocaleDateString("de-DE", { day: "2-digit" })}. ${month}`,
  };
}

/** Heimspiel: VfB steht links. Auswärts dreht sich die Paarung um. */
function paarung(termin: Termin) {
  const gegner = findTeam(termin.gegner);
  return termin.heim ? ([VFB, gegner] as const) : ([gegner, VFB] as const);
}

/** Solange die DFL nicht terminiert hat, ist `uhrzeit` leer. */
function anstoss(termin: Termin) {
  return termin.uhrzeit || "offen";
}

/** „04.04.“ + „Sa“ für die kleinen Spielkacheln. */
function formatShortDate(datum: string) {
  const d = new Date(datum + "T12:00:00");
  return {
    weekday: d.toLocaleDateString("de-DE", { weekday: "short" }),
    dayMonth: d.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }),
  };
}

/**
 * Die große rote Paarung: VfB — Datum/Anstoß — Gegner.
 * Identisch auf Mobil und Desktop, nur die Höhe unterscheidet sich.
 */
function FeaturedGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatFeaturedDate(termin.datum);
  const wettbewerb = competitionLabel(termin.wettbewerb);
  const [links, rechts] = paarung(termin);

  return (
    <div className="flex h-full items-center justify-center gap-3 px-4 text-white">
      <span className="font-rajdhani font-bold leading-none text-[clamp(34px,13vw,55px)] lg:text-[55px]">
        {links.abbr}
      </span>

      <div className="flex shrink-0 flex-col items-center leading-none">
        <span className="font-rajdhani text-[12px] uppercase leading-[14px]">
          {weekday}
        </span>
        <span className="font-rajdhani text-[15px] font-bold uppercase leading-[16px]">
          {dayMonth}
        </span>
        <span className="mt-1 rounded-[8.5px] bg-white px-3 py-[3px] font-rajdhani text-[20px] font-bold leading-none text-ckb-red">
          {anstoss(termin)}
        </span>
        {wettbewerb && (
          <span className="mt-1.5 text-[9.5px] font-bold uppercase tracking-wide">
            {wettbewerb}
          </span>
        )}
      </div>

      <span className="font-rajdhani font-bold leading-none text-[clamp(34px,13vw,55px)] lg:text-[55px]">
        {rechts.abbr}
      </span>
    </div>
  );
}

/** Weißer Reiter über dem roten Balken, rechte Kante angeschrägt. */
function BarLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p
      className={`text-[12px] uppercase text-black ${className}`}
      style={{ letterSpacing: "0.01em" }}
    >
      <span className="font-normal">{text} </span>
      <span className="font-bold">Live im Rössle</span>
    </p>
  );
}

/**
 * Mobil: alle kommenden Spiele nebeneinander, per Wischen durchblätterbar.
 * Nutzt natives Scroll-Snapping — echtes Touch-Swipen ohne zusätzliche Library.
 */
function MobileGameCarousel({ termine }: { termine: Termin[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const current = Math.min(index, termine.length - 1);

  return (
    <div className="lg:hidden">
      {/* Mobil läuft der Reiter über die volle Breite — so ist er im Figma. */}
      <div className="bg-white px-6 py-1.5">
        <BarLabel
          text={termine.length > 1 ? "Die nächsten Spiele" : "Das nächste Spiel"}
          className="text-center"
        />
      </div>

      <div className="relative bg-ckb-red">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex h-[101px] snap-x snap-mandatory overflow-x-auto scrollbar-none"
          role="group"
          aria-roledescription="Karussell"
          aria-label="Kommende Spiele"
        >
          {termine.map((t) => (
            <Link
              key={t.id}
              href="/termine"
              className="w-full shrink-0 snap-center snap-always"
              aria-label={`${paarung(t)[0].name} gegen ${paarung(t)[1].name}, ${
                t.uhrzeit ? `Anstoß ${t.uhrzeit} Uhr` : "Anstoßzeit offen"
              }`}
            >
              <FeaturedGame termin={t} />
            </Link>
          ))}
        </div>

        {termine.length > 1 && (
          <div className="absolute inset-x-0 bottom-1.5 flex items-center justify-center gap-1">
            {termine.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Spiel ${i + 1} von ${termine.length}`}
                aria-current={i === current}
                className={`size-1.5 rounded-full transition-colors ${
                  i === current ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* === Desktop rechts: kleine Spielkacheln === */
function SmallGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  const wettbewerb = competitionLabel(termin.wettbewerb);
  const [links, rechts] = paarung(termin);

  return (
    <Link
      href="/termine"
      className="flex shrink-0 flex-col items-center text-black transition-opacity hover:opacity-70"
    >
      <p className="text-[10px] leading-none">
        <span className="font-bold">{dayMonth}.</span> {weekday}:{" "}
        <span className="font-bold">{anstoss(termin)}</span>
      </p>
      <p className="font-rajdhani text-[21px] font-bold leading-tight">
        {links.abbr} : {rechts.abbr}
      </p>
      {wettbewerb && (
        <p className="text-[10px] leading-none">{wettbewerb}</p>
      )}
    </Link>
  );
}

function SmallGamesRow({ termine }: { termine: Termin[] }) {
  if (termine.length === 0) return null;
  return (
    <div className="flex flex-1 items-center gap-10 overflow-x-auto scrollbar-none px-10">
      {termine.map((t) => (
        <SmallGame key={t.id} termin={t} />
      ))}
    </div>
  );
}

/* === Container === */
export function GameBar({ termine }: { termine: Termin[] }) {
  if (termine.length === 0) return null;
  const featured = termine[0];
  const others = termine.slice(1, 5);

  return (
    <div className="relative z-20 shrink-0">
      {/* Mobil & Tablet: wischbares Karussell */}
      <MobileGameCarousel termine={termine.slice(0, 5)} />

      {/* Desktop: Reiter über rotem Panel, rechts die kleinen Spiele */}
      <div className="hidden lg:block">
        {/*
          Eigener weißer Reiter mit schräg abgeschnittener Kante — parallel zum
          roten Panel darunter. Rechts davon bleibt es transparent, damit das
          Hintergrundfoto durchscheint statt einer durchgehenden weißen Linie.
        */}
        <div
          className="flex h-[35px] w-[341px] items-center bg-white pl-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, calc(100% - 11px) 100%, 0 100%)",
          }}
        >
          <BarLabel text="Die nächsten Spiele" />
        </div>

        <div className="flex bg-white">
          <Link
            href="/termine"
            className="block h-[92px] w-[365px] shrink-0 bg-ckb-red transition-colors hover:bg-ckb-red-light [clip-path:polygon(0_0,100%_0,calc(100%-28px)_100%,0_100%)]"
          >
            <FeaturedGame termin={featured} />
          </Link>

          <div className="flex min-w-0 flex-1 items-center lg:mr-[38%] xl:mr-[33%] 2xl:mr-[30%]">
            <SmallGamesRow termine={others} />
          </div>
        </div>
      </div>
    </div>
  );
}
