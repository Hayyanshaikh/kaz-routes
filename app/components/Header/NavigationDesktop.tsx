"use client";
import React from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/shadcn/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CommonButton from "../Common/CommonButton";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string }[];
};

const NavigationDesktop = ({ className, navigationLinks }: Props) => {
  const pathname = usePathname();
  return (
    <div className={`hidden md:flex items-center gap-10 ${className}`}>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-2">
          {navigationLinks?.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink
                  asChild
                  className={`py-1 px-3 rounded-sm hover:bg-stone-900 hover:text-white focus:bg-stone-900 focus:text-white ${
                    isActive ? "bg-stone-900 text-white" : ""
                  }`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
      <CommonButton label="Get Started" link="/get-started" />
    </div>
  );
};

export default NavigationDesktop;
