"use client";
import React from "react";
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";
import CommonButton from "../common/CommonButton";
import LocaleSwitcher from "../common/LocaleSwitcher";
import { useTranslations } from "next-intl";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string; key: string }[];
};

const NavigationDesktop = ({ className, navigationLinks = [] }: Props) => {
  const t = useTranslations("header");
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

      {/* CTA Button & Language Switcher */}
      <div className="md:flex hidden items-center gap-4">
        <LocaleSwitcher />
        <CommonButton
          label={t("action")}
          className="md:flex hidden"
          link="/plan/create "
        />
      </div>
    </div>
  );
};

export default NavigationDesktop;
