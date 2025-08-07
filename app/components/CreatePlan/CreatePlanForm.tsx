"use client";

import useForm from "@/app/hooks/useForm";
import { useState } from "react";
import CommonSelect from "../common/CommonSelect";
import CommonInput from "../common/CommonInput";
import CommonButton from "../common/CommonButton";
import CommonHeading from "../common/CommonHeading";
import {
  useControllerGetFindAllCountries,
  useControllerGetFindAllCities,
  useControllerPostCreatePackage,
} from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import CommonMultiSelect from "../common/CommonMultiSelect";
import CommonTextarea from "../common/CommonTextarea";
import { CreatePackagePayload, Package } from "@/app/types/CommonType";
import usePackageData from "@/app/store/usePackageData";
import { showError, showSuccess } from "../common/CommonSonner";
import dayjs from "dayjs";

const CreatePlanForm = () => {
  const { setPackageData, packageData } = usePackageData();

  const [selectedCountry, setSelectedCountry] = useState<string[] | null>(null);
  const { data: countriesResponse, isLoading: isCountriesLoading } =
    useControllerGetFindAllCountries();
  const { data: citiesResponse, isLoading: isCitiesLoading } =
    useControllerGetFindAllCities({
      params: { countryId: selectedCountry || packageData?.country || "" },
      enabled: !!selectedCountry,
    });

  const { mutateAsync: createPackage, isPending } =
    useControllerPostCreatePackage();
  const countryOptions = dropdownManipulator(countriesResponse?.data || []);
  const cityOptions = dropdownManipulator(citiesResponse?.data || []);
  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
    [
      "country",
      "city",
      "arrivalDate",
      "flightArrivalTime",
      "flightDepartureTime",
      "packageName",
      "tagline",
      "duration",
      "adults",
      "infants",
      "children",
      "description",
    ],
    packageData! || {}
  );

  console.log({ packageData });

  const handleFinish = (formData: any) => {
    const payload: CreatePackagePayload = {
      name: formData.packageName,
      tagline: formData.tagline,
      description: formData.description,
      duration: formData.duration,
      arrival_date: formData.arrivalDate,
      flight_arrival: formData.flightArrivalTime,
      flight_departure: formData.flightDepartureTime,
      adults: formData.adults,
      children: formData.children,
      infants: formData.infants,
      city_ids: formData.city,
      country_ids: formData.country,
    };

    createPackage(payload)
      .then((res) => {
        const payload: Package = {
          id: res?.data?.id,
          packageName: res.data.name,
          tagline: res.data.tagline,
          description: res.data.description,
          duration: res.data.duration,
          arrivalDate: dayjs(res.data.arrival_date).format("YYYY-MM-DD"),
          flightArrivalTime: dayjs(res.data.flight_arrival).format("HH:mm"),
          flightDepartureTime: dayjs(res.data.flight_departure).format("HH:mm"),
          adults: res.data.adults,
          children: res.data.children,
          infants: res.data.infants,
          country: formData.country,
          city: formData.city,
        };

        setPackageData(payload);
        showSuccess({
          message: "Package Created Successfully",
          description: "You can now add items to your package.",
        });
      })
      .catch((error) => {
        console.error("Error creating package:", error);
        showError({
          message: "Package Creation Failed",
          description:
            error.response?.data?.message ||
            "An error occurred while creating the package.",
        });
      });
  };

  const handleCountryChange = (value: string[]) => {
    setSelectedCountry(value);
    handleChange("country", value);
    handleChange("city", ""); // Reset city when country changes
  };

  const handleCityChange = (value: string[]) => {
    handleChange("city", value);
  };

  return (
    <div>
      <CommonHeading className="text-left !mb-6" title="Create Custom Plan" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleFinish);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonMultiSelect
            label="Select Tags"
            value={
              Array.isArray(formData.country)
                ? formData.country
                : formData.country
                ? [formData.country]
                : []
            }
            onValueChange={handleCountryChange}
            placeholder={isCountriesLoading ? "Loading..." : "Select Country"}
            disabled={isCountriesLoading}
            options={countryOptions}
            error={errors.country}
          />

          <CommonMultiSelect
            label="Select Tags"
            value={
              Array.isArray(formData.city)
                ? formData.city
                : formData.city
                ? [formData.city]
                : []
            }
            onValueChange={handleCityChange}
            placeholder={isCitiesLoading ? "Loading..." : "Select City"}
            disabled={isCitiesLoading}
            options={cityOptions}
            error={errors.city}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonInput
            label="Arrival Date"
            type="date"
            value={formData.arrivalDate}
            onChange={(e) => handleChange("arrivalDate", e.target.value)}
            placeholder="mm/dd/yyyy"
            error={errors.arrivalDate}
          />
          <CommonInput
            label="Flight Arrival Time"
            type="time"
            value={String(formData.flightArrivalTime) || ""}
            onChange={(e) => handleChange("flightArrivalTime", e.target.value)}
            placeholder="--:--"
            error={errors.flightArrivalTime}
          />
          <CommonInput
            label="Flight Departure Time"
            type="time"
            value={formData.flightDepartureTime}
            onChange={(e) =>
              handleChange("flightDepartureTime", e.target.value)
            }
            placeholder="--:--"
            error={errors.flightDepartureTime}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonInput
            label="Package Name"
            value={formData.packageName}
            onChange={(e) => handleChange("packageName", e.target.value)}
            placeholder="Package Name"
            error={errors.packageName}
          />
          <CommonInput
            label="Tagline"
            value={formData.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
            placeholder="Tagline"
            error={errors.tagline}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonInput
            label="Duration (Days)"
            type="number"
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="Duration (Days)"
            error={errors.duration}
          />
          <CommonInput
            label="Number of Adults"
            type="number"
            value={formData.adults}
            onChange={(e) => handleChange("adults", e.target.value)}
            placeholder="Number of Adults"
            error={errors.adults}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonInput
            label="Infants (Ages 0-6)"
            type="number"
            value={formData.infants}
            onChange={(e) => handleChange("infants", e.target.value)}
            placeholder="Infants (Ages 0-6)"
            error={errors.infants}
          />
          <CommonInput
            label="Children (Ages 7-18)"
            type="number"
            value={formData.children}
            onChange={(e) => handleChange("children", e.target.value)}
            placeholder="Children (Ages 7-18)"
            error={errors.children}
          />
        </div>

        <CommonTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Description"
          error={errors.description}
        />

        <div className="flex justify-end space-x-4">
          <CommonButton
            loading={isPending}
            label="Save Package"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePlanForm;
