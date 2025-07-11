"use client";

import { useState } from "react";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import { SearchIcon } from "lucide-react";
import { CITY_OPTIONS, COUNTRY_OPTIONS } from "@/lib/constant";

const AdvancedSearchBar = () => {
  // state city options
  const [cityOptions, setCityOptions] = useState<any[]>([]);

  const [form, setForm] = useState({
    country: "",
    city: "",
  });

  const handleChange = (key: string, value: string) => {
    if (key === "country") {
      // Filter cities based on selected country
      const cities = CITY_OPTIONS.filter((city) => city.country === value);
      setCityOptions(cities);
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "country" && { city: "" }),
    }));
  };

  return (
    <div className="flex items-center gap-2 bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full">
      <div className="grid grid-cols-2 gap-4 flex-1">
        <CommonSelect
          label="Country"
          options={COUNTRY_OPTIONS}
          value={form.country}
          onValueChange={(val) => handleChange("country", val)}
        />

        <CommonSelect
          label="City"
          options={cityOptions || []}
          value={form.city}
          onValueChange={(val) => handleChange("city", val)}
        />
      </div>
      <CommonButton
        icon={<SearchIcon size={14} />}
        label="Search"
        onClick={() => console.log("Search Payload: ", form)}
        className="flex items-center gap-1 h-fit mt-auto"
      />
    </div>
  );
};

export default AdvancedSearchBar;
