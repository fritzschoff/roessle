import Link from "next/link";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="flex flex-col py-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-6 py-3 text-sm text-black hover:bg-ckb-gray transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
