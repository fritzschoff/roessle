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
      <nav className="bg-ckb-gray h-[105px] flex items-center px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo-ckb.svg"
            alt="CKB Wappen"
            width={56}
            height={57}
            className="h-14 w-14"
          />
          <span className="font-lobster text-xl text-black hidden sm:inline">
            Cannstatter Kurve Berlin 08
          </span>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-normal text-black hover:text-ckb-red transition-colors relative pb-1 ${
                  isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-black" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <button
          className="md:hidden p-2"
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
      </nav>

      {mobileOpen && (
        <MobileMenu
          links={navLinks}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
