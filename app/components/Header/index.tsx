"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAVIGATION_LINKS } from "@/lib/constant";
import Container from "../Container";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isHome]);

  return (
    <header
      className={`py-4 w-full top-0 z-50 transition duration-300
        ${isHome ? "fixed" : "relative bg-gray-900"}
        ${isHome && hidden ? "-translate-y-full" : "translate-y-0"}
        ${
          isHome && scrolled
            ? "bg-black/70 backdrop-blur-lg shadow-lg"
            : isHome
            ? "bg-transparent"
            : "bg-gray-900"
        }
      `}
    >
      <Container className="flex items-center justify-between">
        {/* Desktop Navigation */}
        <NavigationDesktop navigationLinks={NAVIGATION_LINKS} />

        {/* Mobile Navigation (Sheet) */}
        <NavigationMobile navigationLinks={NAVIGATION_LINKS} />
      </Container>
    </header>
  );
};

export default Header;
