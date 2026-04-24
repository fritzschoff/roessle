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

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="relative overflow-hidden">
        {/* ===== Desktop navbar ===== */}
        <div className="hidden md:flex items-center h-[105px] bg-ckb-gray px-10 lg:px-16">
          {/* Logo + brand name */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo-ckb.svg"
              alt="CKB Wappen"
              width={64}
              height={65}
              className="h-16 w-16"
            />
            <span className="hidden xl:inline font-poplar text-[26px] text-black uppercase tracking-wide leading-tight">
              Cannstatter Kurve Berlin 08
            </span>
          </Link>

          {/* Right-aligned nav (md–xl) */}
          <div className="flex-1 xl:hidden" />
          <div className="flex items-center gap-5 xl:hidden">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-normal text-black hover:text-ckb-red transition-colors relative pb-1 ${
                    isActive
                      ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Centered nav (xl+) */}
          <div className="hidden xl:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-6 pointer-events-auto">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-normal text-black hover:text-ckb-red transition-colors relative pb-1 ${
                      isActive
                        ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== Mobile navbar ===== */}
        <div className="md:hidden relative h-[121px] bg-ckb-gray overflow-hidden">
          <div className="flex items-center h-full px-6 relative">
            <button
              className="relative z-10 p-2 -ml-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü öffnen"
            >
              {mobileOpen ? (
                <svg className="h-7 w-7" fill="none" stroke="#8d1812" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <div className="flex flex-col gap-[5px]">
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                  <span className="block w-7 h-[3.5px] bg-ckb-red rounded-sm" />
                </div>
              )}
            </button>

            <div className="flex-1 text-center relative z-10 pr-8">
              <p className="font-lobster text-xs text-black leading-tight">
                Offizielle Website der
              </p>
              <p className="font-poplar text-xl text-black uppercase leading-tight">
                Cannstatter Kurve
              </p>
              <p className="font-poplar text-xl text-black uppercase leading-tight">
                Berlin 08
              </p>
            </div>

            <div
              className="absolute top-0 right-0 w-[140px] h-[140px]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 22% 0)" }}
            >
              <div className="absolute inset-0 bg-ckb-red" />
              <div className="absolute top-[5px] right-[5px] w-[110px] h-[110px]">
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
        </div>
      </nav>

      {mobileOpen && (
        <MobileMenu links={navLinks} onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}
