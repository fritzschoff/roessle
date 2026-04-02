"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "\u{1F4CA}" },
  { href: "/admin/blog", label: "Blog-Posts", icon: "\u{1F4DD}" },
  { href: "/admin/termine", label: "Termine", icon: "\u{1F4C5}" },
  { href: "/admin/kontakt", label: "Nachrichten", icon: "\u{2709}\u{FE0F}" },
  { href: "/admin/users", label: "Benutzer", icon: "\u{1F464}" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-ckb-dark text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3">
          <img src="/images/logo-ckb.svg" alt="CKB" className="h-10 w-10" />
          <span className="font-lobster text-xl">CKB Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-ckb-red"
                  : "hover:bg-white/10"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-white/10 transition-colors"
        >
          Zur Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-white/10 transition-colors text-left"
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}
