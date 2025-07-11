"use client";
import HeroSection from "@/app/components/HomeSection/HeroSection";
import React from "react";
import { useSearchParams } from "next/navigation";
import CommonButton from "@/app/components/Common/CommonButton";
import {
  CATEGORIES,
  DESTINATION_DATA,
  FILTERS,
  PACKAGES,
  VEHICLE_DATA,
} from "@/lib/constant";
import SidebarFilter from "@/app/components/SidebarFilter";
import SearchCard from "@/app/components/Cards/SearchCard";

type Props = {};

const Search = ({}: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const handleFilterChange = (data: Record<string, string | string[]>) => {
    console.log("Filter data to send in API: ", data);
  };

  return (
    <div className="">
      <HeroSection
        className="!h-[200px]"
        headingClass="!text-4xl"
        heading="Find Your Dream Destination"
        description=""
        showSearchBar={false}
      />

      <div className="flex flex-col items-start md:flex-row p-6 gap-8">
        {/* Sidebar */}
        <aside className="flex-[0_0_300px] hidden md:block sticky top-6">
          <SidebarFilter
            filters={FILTERS}
            initialValues={{
              destination: "sites",
              category: ["beach", "mountain"],
              budget: ["1000-3000", "3001-6000"],
              services: ["wifi", "gym"],
              facilities: ["tv", "safe"],
            }}
            onChange={(data) => console.log(data)}
          />
        </aside>
        {/* Main Content */}
        <main className="flex-1 space-y-6">
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
          <div>
            {/* Here you can map through your search results */}
            <div className=" space-y-4">
              {PACKAGES.map((pkg, index) => (
                <SearchCard
                  key={index}
                  title={pkg.title}
                  description={pkg.description}
                  imageUrl={pkg.imageUrl}
                  price={pkg.price}
                  rating={pkg.rating}
                  duration={pkg.duration}
                  maxParticipants={pkg.maxParticipants}
                  highlights={pkg.highlights}
                  onDetailClick={() => console.log(pkg.title)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
``;

export default Search;
