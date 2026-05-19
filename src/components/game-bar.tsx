"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VFB } from "@/lib/teams";
import type { BlogPost, Termin } from "@/lib/schema";

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
      <Image src={src} alt={alt} fill className="object-contain" />
    </div>
  );
}

/* === Left red panel: featured next game === */
function FeaturedGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="relative shrink-0 bg-ckb-red text-white hover:bg-ckb-red-light transition-colors
                 p-2 lg:pr-10
                 flex flex-col items-center justify-center gap-2 w-full lg:w-[280px] h-full
                 lg:[clip-path:polygon(0_0,100%_0,calc(100%-28px)_100%,0_100%)]"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-90 text-center leading-tight">
        Die nächsten Spiele live im Rössle
      </p>
      <div className="flex items-center justify-center gap-3">
        <TeamLogo src={VFB.logo} alt="VfB Stuttgart" size={58} />

        <div className="flex flex-col items-center bg-black/15 rounded px-3 py-2 min-w-[88px]">
          <p className="font-bold text-lg leading-none">{dayMonth}</p>
          <p className="text-[11px] leading-tight mt-0.5">
            {weekday}: {termin.uhrzeit}
          </p>
          {termin.wettbewerbLogo && (
            <div className="mt-1.5">
              <TeamLogo
                src={termin.wettbewerbLogo}
                alt={termin.wettbewerb ?? ""}
                size={30}
              />
            </div>
          )}
        </div>

        <TeamLogo
          src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"}
          alt={termin.gegner}
          size={58}
        />
      </div>
    </Link>
  );
}

/* === Right top: blog-post slider === */
function BlogSlider({ posts }: { posts: BlogPost[] }) {
  const [index, setIndex] = useState(0);
  if (posts.length === 0) {
    return <div className="flex-1" />;
  }
  const post = posts[Math.min(index, posts.length - 1)];

  const plain = (post.excerpt || post.content.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  const snippet = plain.length > 180 ? plain.slice(0, 180).trim() + "…" : plain;

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIndex((i) => (i + 1) % posts.length);
  };

  return (
    <div className="relative flex-1 px-6 lg:px-10 pt-2.5 pb-4 min-w-0">
      <Link
        href={`/aktuelles/${post.slug}`}
        className="block text-black hover:opacity-80"
      >
        <h3 className="font-bold text-[15px] underline leading-tight">
          {post.title}
        </h3>
      </Link>
      <p className="text-[13px] text-black/85 mt-1 leading-snug">
        {snippet}{" "}
        <Link
          href={`/aktuelles/${post.slug}`}
          className="italic underline whitespace-nowrap"
        >
          Mehr lesen
        </Link>
      </p>

      {posts.length > 1 && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {posts.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              aria-label={`Beitrag ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-black/70" : "bg-black/25"
              }`}
            />
          ))}
        </div>
      )}

      {posts.length > 1 && (
        <button
          type="button"
          onClick={goNext}
          aria-label="Nächster Beitrag"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black/50 hover:text-black/80 p-1"
        >
          <svg
            viewBox="0 0 10 16"
            className="w-3 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 1l6 7-6 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* === Right bottom: small game cards row === */
function SmallGame({ termin }: { termin: Termin }) {
  const { weekday, dayMonth } = formatShortDate(termin.datum);
  return (
    <Link
      href="/termine"
      className="flex items-center gap-2 shrink-0 hover:opacity-70 transition-opacity"
    >
      <TeamLogo src={VFB.logo} alt="VfB Stuttgart" size={28} />
      <div className="flex flex-col items-center text-black leading-none">
        {termin.wettbewerbLogo && (
          <TeamLogo
            src={termin.wettbewerbLogo}
            alt={termin.wettbewerb ?? ""}
            size={14}
          />
        )}
        <p className="font-bold text-[13px] mt-0.5">{dayMonth}</p>
        <p className="text-[10px] text-black/60 mt-0.5">
          {weekday}: {termin.uhrzeit}
        </p>
      </div>
      <TeamLogo
        src={termin.gegnerLogo ?? "/images/teams/placeholder.svg"}
        alt={termin.gegner}
        size={28}
      />
    </Link>
  );
}

function SmallGamesRow({ termine }: { termine: Termin[] }) {
  if (termine.length === 0) return null;
  return (
    <div className="flex items-center gap-8 px-6 lg:px-10 py-2 border-t border-black/10 overflow-x-auto scrollbar-none">
      {termine.map((t) => (
        <SmallGame key={t.id} termin={t} />
      ))}
    </div>
  );
}

/* === Container === */
export function GameBar({
  termine,
  blogPosts,
}: {
  termine: Termin[];
  blogPosts: BlogPost[];
}) {
  if (termine.length === 0) return null;
  const featured = termine[0];
  const others = termine.slice(1, 5);

  return (
    <div className="flex bg-ckb-gray">
      {/* Left: featured game card (always visible) */}
      <FeaturedGame termin={featured} />

      {/* Right: blog slider + small games — desktop only */}
      <div className="hidden lg:flex flex-1 flex-col min-w-0 lg:mr-[38%] xl:mr-[33%] 2xl:mr-[30%]">
        <BlogSlider posts={blogPosts} />
        <SmallGamesRow termine={others} />
      </div>
    </div>
  );
}
