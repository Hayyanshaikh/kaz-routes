"use client";

import { SearchIcon } from "lucide-react";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import {
  useControllerGetFindAllCities,
  useControllerGetFindAllCountries,
} from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import useForm from "@/app/hooks/useForm";
import { CATEGORIES } from "@/lib/constant";

const AdvancedSearchBar = () => {
  const { formData, handleChange, handleSubmit, errors } = useForm([
    "country",
    "city",
    "category",
  ]);

  const { data: countriesResponse } = useControllerGetFindAllCountries();
  const { data: citiesResponse, isLoading: isCitiesLoading } =
    useControllerGetFindAllCities({
      params: { countryId: formData?.country || "" },
      enabled: !!formData?.country,
    });

  const countryOptions = dropdownManipulator(countriesResponse?.data || []);
  const cityOptions = dropdownManipulator(citiesResponse?.data || []);

  const onSubmit = (data: any) => {
    console.log("Search Payload:", data);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-end gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-1">
        <CommonSelect
          label="Category"
          options={CATEGORIES}
          value={formData.category}
          onValueChange={(val) => handleChange("category", val)}
          error={errors.category}
        />

        <CommonSelect
          label="Country"
          options={countryOptions}
          value={formData.country}
          onValueChange={(val) => handleChange("country", val)}
          error={errors.country}
        />

        <CommonSelect
          label="City"
          options={cityOptions}
          value={formData.city}
          onValueChange={(val) => handleChange("city", val)}
          error={errors.city}
          placeholder={isCitiesLoading ? "Loading..." : "Select City"}
        />
      </div>

      <CommonButton
        icon={<SearchIcon size={14} />}
        label="Search"
        onClick={() => handleSubmit(onSubmit)}
        className="flex items-center gap-1 h-fit mt-auto"
      />
    </div>
  );
};

export default AdvancedSearchBar;
