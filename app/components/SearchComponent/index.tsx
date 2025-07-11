"use client";
import React from "react";
import SearchCard from "../Cards/SearchCard";
import { CATEGORIES, FILTERS, PACKAGES, SEARCH_DATA } from "@/lib/constant";
import CommonButton from "../common/CommonButton";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEARCH_DATA.map((item, index) => (
              <SearchCard
                key={index}
                title={item.title}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                onDetailClick={() => {}}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchComponent;
