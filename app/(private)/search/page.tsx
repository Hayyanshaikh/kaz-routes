// app/search/page.tsx
import React, { Suspense } from "react";
import HeroSection from "@/app/components/HomeSection/HeroSection";
import SearchComponent from "@/app/components/SearchComponent";

const Search = () => {
  return (
    <div>
      <HeroSection
        className="!h-[200px]"
        headingClass="!text-4xl"
        heading="Find Your Dream Destination"
        description=""
        showSearchBar={false}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent />
      </Suspense>
    </div>
  );
};

export default Search;
