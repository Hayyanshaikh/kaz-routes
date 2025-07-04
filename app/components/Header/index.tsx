"use client";

import { useEffect, useState } from "react";
import { NAVIGATION_LINKS } from "@/lib/constant";
import Container from "../Container";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 50);
      setLastScrollY(currentScrollY);
      setScrolled(currentScrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`py-4 fixed w-full top-0 z-50 transition duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled ? "bg-black/70 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
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
