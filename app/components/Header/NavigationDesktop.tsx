"use client";
import React from "react";
import { Tooltip } from "antd";
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";
import CommonButton from "../common/CommonButton";
import LocaleSwitcher from "../common/LocaleSwitcher";
import { useTranslations } from "next-intl";
import usePlanStore from "@/app/store/planStore";
import useDestinationStore from "@/app/store/destinationStore";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string; key: string }[];
};

const NavigationDesktop = ({ className, navigationLinks = [] }: Props) => {
  const t = useTranslations("header");
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();

  const firstDestinationId = destinations?.[0]?.id;
  const planLink = plan?.id
    ? firstDestinationId
      ? `/plan/${plan.id}?destination=${firstDestinationId}`
      : `/plan/${plan.id}`
    : "#";

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

      <div className="md:flex hidden items-center gap-4">
        {/* <LocaleSwitcher /> */}
        {plan ? (
          <Tooltip title={plan.planName} placement="bottom">
            <CommonButton
              label={plan.planName}
              link={planLink}
              className="text-sm!"
              labelClassName="truncate! block! max-w-[150px]"
            />
          </Tooltip>
        ) : (
          <CommonButton
            label={t("action")}
            className="md:flex hidden"
            link="/plan/create "
          />
        )}
      </div>
    </div>
  );
};

export default NavigationDesktop;
