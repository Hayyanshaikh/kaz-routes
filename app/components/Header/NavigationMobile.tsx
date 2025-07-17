"use client";
import React from "react";
import CommonButton from "../common/CommonButton";
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
          <Menu className="w-6 h-6 cursor-pointer text-white" />
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white gap-0">
          <SheetHeader>
            <SheetTitle>
              <Logo className="!text-black" />
            </SheetTitle>
          </SheetHeader>

          {/* Shared navigation links */}
          <div className="flex flex-col gap-2 flex-1">
            <NavigationLinksList
              links={navigationLinks}
              wrapperClass="flex-col gap-3"
              itemClass="px-4 py-2 !text-black"
              onItemClick={() => document.body.click()} // auto-close
            />
            <CommonButton
              label="Create Plan"
              link="/plan/create"
              className="w-full mt-auto px-4 mb-4"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationMobile;
