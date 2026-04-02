"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/das-roessle", label: "Das Rössle" },
  { href: "/aktuelles", label: "Aktuelles" },
  { href: "/termine", label: "Termine" },
  { href: "/mitgliedschaft", label: "Mitgliedschaft" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-ckb-red text-white h-16 flex items-center px-4 sm:px-6">
        <div className="flex items-center gap-3 flex-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-ckb.svg"
              alt="CKB Wappen"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="font-lobster text-xl hidden sm:inline">
              Cannstatter Kurve Berlin
            </span>
            <span className="font-lobster text-xl sm:hidden">CKB&apos;08</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-white/80 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü öffnen"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
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
