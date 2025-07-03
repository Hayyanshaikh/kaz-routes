"use client";

import { NAVIGATION_LINKS } from "@/lib/constant";
import Link from "next/link";
import Container from "../Container";
import NavigationDesktop from "./NavigationDesktop";
import NavigationMobile from "./NavigationMobile";

const Header = () => {
  return (
    <header className="py-4 fixed w-full top-0 z-50 bg-white">
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg">Kaz Routes</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationDesktop navigationLinks={NAVIGATION_LINKS} />

        {/* Mobile Navigation (Sheet) */}
        <NavigationMobile navigationLinks={NAVIGATION_LINKS} />
      </Container>
    </header>
  );
};

export default Header;
