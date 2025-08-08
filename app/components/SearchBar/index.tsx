"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import { CATEGORIES } from "@/lib/constant";

const AdvancedSearchBar = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");

  const handleCategoryChange = (val: string) => {
    setCategory(val);
  };

  const handleSearch = () => {
    if (category) {
      router.push(`/search?category=${encodeURIComponent(category)}`);
    } else {
      alert("Category select karo pehle");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 flex-1">
        <CommonSelect
          label="Category"
          options={CATEGORIES}
          value={category}
          onValueChange={handleCategoryChange}
          error={undefined}
          placeholder="Select Category"
        />
      </div>

      <CommonButton
        label="Search"
        onClick={handleSearch}
        className="flex items-center gap-1 h-fit mt-auto"
      />
    </div>
  );
};

export default AdvancedSearchBar;
