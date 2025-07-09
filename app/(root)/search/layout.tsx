"use client";
import HeroSection from "@/app/components/HomeSection/HeroSection";
import React from "react";
import { useSearchParams } from "next/navigation";
import CommonButton from "@/app/components/Common/CommonButton";
import { CATEGORIES } from "@/lib/constant";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="">
      <HeroSection
        className="!h-[200px]"
        headingClass="!text-4xl"
        heading="Find Your Dream Destination"
        description=""
        showSearchBar={false}
      />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Search
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <CommonButton
                key={cat.value}
                label={cat.label}
                className={`${
                  cat.value === category
                    ? ""
                    : "border bg-transparent text-black hover:text-white hover:border-primary"
                }`}
              />
            ))}
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};
``;

export default Layout;
