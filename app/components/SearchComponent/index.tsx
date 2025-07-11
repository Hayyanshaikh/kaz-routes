"use client";
import React from "react";
import SearchCard from "../Cards/SearchCard";
import { CATEGORIES, FILTERS, PACKAGES } from "@/lib/constant";
import CommonButton from "../Common/CommonButton";
import SidebarFilter from "../SidebarFilter";
import { useSearchParams } from "next/navigation";

type Props = {};

const SearchComponent = (props: Props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  return (
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
  );
};

export default SearchComponent;
