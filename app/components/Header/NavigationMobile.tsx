"use client";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { MenuOutlined } from "@ant-design/icons"; // ✅ AntD Icon
import { Drawer } from "antd"; // ✅ AntD Drawer
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string }[];
};

const NavigationMobile = ({ className, navigationLinks = [] }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className={`md:hidden ${className}`}>
      {/* Trigger Button */}
      <MenuOutlined
        className="!text-white text-xl cursor-pointer"
        onClick={() => setOpen(true)}
      />

      {/* Drawer for Mobile Navigation */}
      <Drawer
        title={<Logo className="!text-black" />}
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
            itemClass="px-4 py-2 !text-black"
            onItemClick={handleClose} // Auto-close on click
          />

          {/* CTA Button */}
          <CommonButton
            label="Create Plan"
            link="/plan/create"
            className="w-full mt-auto px-4 mb-4"
          />
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationMobile;
