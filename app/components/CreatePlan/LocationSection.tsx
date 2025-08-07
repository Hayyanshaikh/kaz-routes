"use client";
import React, { useEffect } from "react";
import CommonSelect from "../common/CommonSelect";
import {
  useControllerGetFindAllCities,
  useControllerGetFindAllCountries,
} from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";

type Fields = {
  country?: string;
  city?: string;
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: string) => void;
  errors: Fields;
};

const LocationSection = ({ formData, handleChange, errors }: Props) => {
  const { data: countriesResponse } = useControllerGetFindAllCountries();

  const { data: citiesResponse } = useControllerGetFindAllCities({
    params: { countryId: formData?.country || "" },
    enabled: !!formData?.country,
  });

  const countryOptions = dropdownManipulator(countriesResponse?.data || []);
  const cityOptions = dropdownManipulator(citiesResponse?.data || []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonSelect
        label="Select Country"
        value={formData?.country || ""}
        onValueChange={(value) => handleChange("country", value)}
        options={countryOptions}
        placeholder="Choose your country"
        error={errors.country}
      />
      <CommonSelect
        label="Select City"
        value={formData?.city || ""}
        onValueChange={(value) => handleChange("city", value)}
        options={cityOptions}
        placeholder="Choose your city"
        error={errors.city}
      />
    </div>
  );
};

export default LocationSection;
