"use client";
import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { MenuOutlined } from "@ant-design/icons"; // ✅ AntD Icon
import { Drawer, Tooltip } from "antd"; // ✅ AntD Drawer & Tooltip
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "../common/LocaleSwitcher";
import usePlanStore from "@/app/store/planStore";
import useDestinationStore from "@/app/store/destinationStore";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string; key: string }[];
};

const NavigationMobile = ({ className, navigationLinks = [] }: Props) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("header");
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();

  const handleClose = () => setOpen(false);

  const firstDestinationId = destinations?.[0]?.id;
  const planLink = plan?.id
    ? firstDestinationId
      ? `/plan/${plan.id}?destination=${firstDestinationId}`
      : `/plan/${plan.id}`
    : "#";

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
            {plan ? (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold text-gray-400">
                  Current Plan
                </span>
                <Tooltip title={plan.planName} placement="top">
                  <div className="w-full">
                    <CommonButton
                      label={plan.planName}
                      link={planLink}
                      onClick={handleClose}
                      className="w-full text-sm font-bold"
                      labelClassName="truncate! block! max-w-[200px]"
                    />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <CommonButton
                label={t("action")}
                link="/plan/create"
                className="w-full"
                onClick={handleClose}
              />
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationMobile;
