"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const links = [
  { href: "/about", key: "about" },
  { href: "/privacy-policy", key: "privacy" },
  { href: "/terms-conditions", key: "terms" },
  { href: "/contact", key: "contact" },
];

const AboutNav = () => {
  const pathname = usePathname();
  const t = useTranslations("footer.links");

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
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );
};

export default AboutNav;
