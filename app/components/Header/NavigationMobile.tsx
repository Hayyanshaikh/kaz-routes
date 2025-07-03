import React from "react";
import CommonButton from "../Common/CommonButton";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/shadcn/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  className?: string;
  navigationLinks?: { href: string; label: string }[];
};

const NavigationMobile = ({ className, navigationLinks }: Props) => {
  const pathname = usePathname();
  return (
    <div className={`md:hidden ${className}`}>
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-white gap-0">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-2 pb-4 flex-1">
            {navigationLinks?.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link
                  href={link.href}
                  className={`py-2 md:px-3 px-4 md:rounded-md text-sm font-medium hover:bg-stone-900 hover:text-white ${
                    pathname === link.href ? "bg-stone-900 text-white" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </SheetClose>
            ))}
            <CommonButton
              label="Get Started"
              link="/get-started"
              className="w-full mt-auto px-4"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavigationMobile;
