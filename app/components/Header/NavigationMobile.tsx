"use client";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { MenuOutlined } from "@ant-design/icons"; // ✅ AntD Icon
import { Drawer } from "antd"; // ✅ AntD Drawer
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "../common/LocaleSwitcher";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string; key: string }[];
};

const NavigationMobile = ({ className, navigationLinks = [] }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");

  const handleClose = () => setOpen(false);

  return (
    <div className={`md:hidden flex items-center gap-2 ${className}`}>
      {/* Language Switcher (Visible on small screens beside trigger) */}
      <LocaleSwitcher />

      {/* Trigger Button */}
      <MenuOutlined
        className="text-white! text-xl cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {/* Drawer for Mobile Navigation */}
      <Drawer
        title={<Logo className="text-black!" />}
        placement="right"
        closable
        classNames={{
          body: "!p-2",
          header: "!p-2",
          footer: "!p-2",
        }}
        onClose={handleClose}
        open={open}
        width={320}
      >
        <div className="flex flex-col gap-2 h-full">
          {/* Navigation Links */}
          <NavigationLinksList
            links={navigationLinks}
            wrapperClass="flex-col gap-3"
            itemClass="px-4 py-2 text-black!"
            onItemClick={handleClose} // Auto-close on click
          />

          <div className="mt-auto px-4 mb-4 flex flex-col gap-4">
            {/* CTA Button */}
            <CommonButton
              label={t("action")}
              link="/plan/create"
              className="w-full"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationMobile;
