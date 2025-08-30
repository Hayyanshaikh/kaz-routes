"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
];

const AboutNav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex md:flex-col min-w-[250px] gap-2 md:gap-0 space-y-2 mb-8">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block text-sm md:text-base py-2 px-3 rounded-md transition ${
              isActive
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AboutNav;
