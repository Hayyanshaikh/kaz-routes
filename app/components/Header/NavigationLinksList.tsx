"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinksListProps = {
  links: { href: string; label: string; key: string }[];
  wrapperClass?: string;
  itemClass?: string;
  onItemClick?: () => void;
};

const NavigationLinksList = ({
  links,
  wrapperClass = "",
  itemClass = "",
  onItemClick,
}: NavigationLinksListProps) => {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <div className={`flex flex-col md:flex-row ${wrapperClass}`}>
      {links.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={`nav-link text-white ${
              isActive ? "nav-link--active" : ""
            } ${itemClass}`}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </div>
  );
};

export default NavigationLinksList;
