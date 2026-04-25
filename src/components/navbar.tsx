"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/das-roessle", label: "Das Rössle" },
  { href: "/aktuelles", label: "Aktuelles (Blog)" },
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
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav className="relative shrink-0 z-30">
        {/* ===== Desktop navbar (lg+) ===== */}
        <div className="hidden lg:flex items-center h-[105px] bg-ckb-gray px-10 xl:px-16">
          {/* Logo + brand name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo-ckb.svg"
              alt="CKB Wappen"
              width={56}
              height={57}
              className="h-14 w-14"
            />
            <span className="hidden xl:inline font-poplar text-[26px] text-black uppercase tracking-wide leading-tight">
              Cannstatter Kurve Berlin 08
            </span>
          </Link>

          {/* Nav links — stay left of the red stripe area */}
          <div className="flex-1" />
          <div className="flex items-center gap-5 mr-[40%] xl:mr-[35%] 2xl:mr-[32%]">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isActive(link.href)}
              />
            ))}
          </div>
        </div>

        {/* ===== Tablet navbar (md – lg) ===== */}
        <div className="hidden md:flex lg:hidden flex-col bg-ckb-gray px-6 py-5 relative overflow-hidden min-h-[130px]">
          {/* Brand text */}
          <Link href="/" className="relative z-10">
            <span className="font-poplar text-[28px] text-black uppercase tracking-wide leading-tight">
              Cannstatter Kurve Berlin 08
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

          {/* Red diagonal triangle — top right */}
          <div
            className="absolute top-0 right-0 w-[180px] h-[180px]"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 25% 0)" }}
          >
            <div className="absolute inset-0 bg-ckb-red" />
          </div>
          <div className="absolute top-[8px] right-[8px] w-[95px] h-[95px] z-10">
            <Image
              src="/images/ckb-wappen.svg"
              alt=""
              fill
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* ===== Mobile navbar (<md) ===== */}
        <div className="md:hidden relative h-[100px] bg-ckb-gray overflow-hidden">
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

            {/* Brand text */}
            <div className="flex-1 text-center relative z-10 px-2">
              <p className="font-poplar text-xl text-black uppercase leading-tight">
                Cannstatter Kurve
              </p>
              <p className="font-poplar text-xl text-black uppercase leading-tight">
                Berlin 08
              </p>
            </div>

            {/* Red diagonal triangle — top right, constant angle */}
            <div
              className="absolute top-0 right-0 w-[45%] sm:w-[40%] h-full"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 40% 0)" }}
            >
              <div className="absolute inset-0 bg-ckb-red" />
            </div>
            {/* Wappen — fixed size */}
            <div className="absolute top-[10px] right-[10px] w-[60px] h-[60px] z-10">
              <Image
                src="/images/ckb-wappen.svg"
                alt=""
                fill
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu links={navLinks} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
