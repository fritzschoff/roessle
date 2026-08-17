"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  // „Über uns“ hat keine eigene Seite mehr — der Text steht auf der Startseite.
  { href: "/", label: "Über uns" },
  { href: "/das-roessle", label: "Das Rössle" },
  { href: "/aktuelles", label: "Aktuelles" },
  { href: "/termine", label: "Termine" },
  { href: "/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/kontakt", label: "Kontakt" },
];

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`text-xs font-normal text-black hover:text-ckb-red transition-colors relative pb-1 whitespace-nowrap ${
        isActive
          ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="relative shrink-0 z-30">
        {/* ===== Desktop navbar (lg+) ===== */}
        <div className="hidden lg:flex items-center h-[87px] bg-white shadow-bar-top relative">
          {/* Roter Keil links, Kante oben breiter als unten — Wappen darin weiß */}
          <Link
            href="/"
            aria-label="Zur Startseite"
            className="absolute top-0 left-0 h-full w-[122px] z-10"
            style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 20px) 100%, 0 100%)" }}
          >
            <span className="absolute inset-0 bg-ckb-red" />
            <span className="absolute left-[20px] top-[11px] block w-[67px] h-[68px]">
              <Image
                src="/images/ckb-wappen.svg"
                alt=""
                fill
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                aria-hidden="true"
                priority
              />
            </span>
          </Link>

          <Link
            href="/"
            className="ml-[144px] shrink-0 font-lobster text-[20px] font-normal text-black leading-none tracking-normal whitespace-nowrap"
          >
            Cannstatter Kurve Berlin e.V.
          </Link>

          {/* Nav links direkt rechts vom Schriftzug, klar vor dem roten Keil rechts */}
          <div className="flex items-center gap-5 ml-[54px]">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
              />
            ))}
          </div>
          <div className="flex-1" />
        </div>

        {/* ===== Tablet navbar (md – lg) ===== */}
        <div className="hidden md:flex lg:hidden flex-col justify-center bg-white shadow-bar-top px-6 py-3 relative overflow-hidden min-h-[120px]">
          {/* Wappen in Farbe + Schriftzug — immer Link zur Startseite */}
          <Link href="/" className="relative z-10 flex w-fit items-center gap-2.5">
            <Image
              src="/images/logo-ckb.svg"
              alt="Cannstatter Kurve Berlin e.V. — zur Startseite"
              width={44}
              height={45}
              priority
            />
            <span className="font-lobster text-[20px] font-normal text-black leading-none tracking-normal whitespace-nowrap">
              Cannstatter Kurve Berlin e.V.
            </span>
          </Link>

          {/* Nav links below brand */}
          <div className="flex items-center gap-4 mt-3 relative z-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
              />
            ))}
          </div>

          {/* Red diagonal — same angle direction as desktop & mobile, wappen clipped by the polygon */}
          <Link
            href="/"
            aria-label="Zur Startseite"
            className="absolute top-0 right-0 w-[130px] h-full z-20"
            style={{
              clipPath: "polygon(100% 0, 100% 100%, 0 100%, 28px 0)",
            }}
          >
            <span className="absolute inset-0 bg-ckb-red" />
            <span className="absolute top-0 -left-[20px] w-[150px] h-full z-10 block">
              <Image
                src="/images/ckb-wappen.svg"
                alt=""
                fill
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        {/* ===== Mobile navbar (<md) ===== */}
        <div className="md:hidden relative h-[84px] bg-white shadow-bar-top overflow-hidden">
          <div className="flex items-center h-full px-4 relative">
            {/* Hamburger */}
            <button
              className="relative z-10 p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="#8d1812"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <div className="flex flex-col gap-[5px]">
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                </div>
              )}
            </button>

            {/* Brand — gray wappen removed on mobile, allow text to wrap so red can be bigger */}
            <div className="flex-1 flex items-center justify-center relative z-10 px-2">
              {/* 24px bei 390px Viewport (Figma), schrumpft auf schmalen Geräten mit */}
              <p className="font-lobster text-[clamp(18px,6.15vw,24px)] font-normal text-black leading-[1.1] tracking-normal text-center">
                Cannstatter Kurve
                <br />
                Berlin e.V.
              </p>
            </div>

            {/* Red diagonal — wraps a larger wappen, same angle as desktop stripe */}
            <Link
              href="/"
              aria-label="Zur Startseite"
              className="absolute top-0 right-0 w-[70px] h-full z-20"
              style={{
                clipPath: "polygon(100% 0, 100% 100%, 0 100%, 18px 0)",
              }}
            >
              <span className="absolute inset-0 bg-ckb-red" />
              {/* Wappen — bigger than the red and shifted left; clipped by the polygon */}
              <span className="absolute top-0 -left-[22px] w-[92px] h-full z-10 block">
                <Image
                  src="/images/ckb-wappen.svg"
                  alt=""
                  fill
                  priority
                  className="object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu links={navLinks} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
