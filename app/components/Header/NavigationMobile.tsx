"use client";
import React from "react";
import CommonButton from "../Common/CommonButton";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shadcn/components/ui/sheet";
import NavigationLinksList from "./NavigationLinksList";
import Logo from "./Logo";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string }[];
};

const NavigationMobile = ({ className, navigationLinks = [] }: Props) => {
  return (
    <div className={`md:hidden ${className}`}>
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white gap-0">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>

          {/* Shared navigation links */}
          <div className="flex flex-col gap-2 flex-1">
            <NavigationLinksList
              links={navigationLinks}
              wrapperClass="flex-col gap-3"
              itemClass="px-4 py-2"
              onItemClick={() => document.body.click()} // auto-close
            />
            <CommonButton
              label="Get Started"
              link="/get-started"
              className="w-full mt-auto px-4 mb-4"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationMobile;
