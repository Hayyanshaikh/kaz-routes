"use client";
import React from "react";
import Link from "next/link";
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";
import CommonButton from "../Common/CommonButton";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string }[];
};

const NavigationDesktop = ({ className, navigationLinks = [] }: Props) => {
  return (
    <div className={`flex items-center justify-between w-full ${className}`}>
      {/* Logo */}
      <Logo />

      {/* Navigation Links */}
      <NavigationLinksList
        links={navigationLinks}
        wrapperClass="items-center gap-3 hidden md:flex"
        itemClass="py-1 px-3"
      />

      {/* CTA Button */}
      <CommonButton
        className="hidden md:flex"
        label="Get Started"
        link="/get-started"
      />
    </div>
  );
};

export default NavigationDesktop;
