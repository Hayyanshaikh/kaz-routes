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

interface CreatePlanFormProps {
  onCreated?: (pkg: Package) => void; // ✅ callback support
}

const CreatePlanForm = ({ onCreated }: CreatePlanFormProps) => {
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

  const { formData, errors, handleChange, handleSubmit } = useForm(
    [
      { name: "country", required: true, value: packageData?.country },
      { name: "city", required: true, value: packageData?.city },
      { name: "arrivalDate", required: true, value: packageData?.arrivalDate },
      {
        name: "flightArrivalTime",
        required: true,
        value: packageData?.flightArrivalTime,
      },
      {
        name: "flightDepartureTime",
        required: true,
        value: packageData?.flightDepartureTime,
      },
      {
        name: "flightDepartureDate",
        required: true,
        value: packageData?.flightDepartureDate,
      },
      { name: "packageName", required: true, value: packageData?.packageName },
      { name: "adults", required: true, value: packageData?.adults ?? 1 },
      { name: "infants", required: false, value: packageData?.infants ?? 0 },
      { name: "children", required: false, value: packageData?.children ?? 0 },
      { name: "description", required: false, value: packageData?.description },
    ],
    packageData || {}
  );

  const handleFinish = (formData: any) => {
    const payload: CreatePackagePayload = {
      name: formData.packageName,
      description: formData.description,
      arrival_date: formData.arrivalDate,
      flight_arrival: formData.flightArrivalTime,
      flight_departure: formData.flightDepartureTime,
      flight_departure_date: formData.flightDepartureDate,
      adults: formData.adults,
      duration: 0, // remove after backend work
      children: formData.children || 0,
      infants: formData.infants || 0,
      city_ids: formData.city,
      country_ids: formData.country,
    };

    createPackage(payload)
      .then((res) => {
        const pkg: Package = {
          id: res?.data?.id,
          packageName: res.data.name,
          description: res.data.description,
          arrivalDate: dayjs(res.data.arrival_date).format("YYYY-MM-DD"),
          flightArrivalTime: dayjs(res.data.flight_arrival).format("HH:mm"),
          flightDepartureTime: dayjs(res.data.flight_departure).format("HH:mm"),
          flightDepartureDate: dayjs(formData.flightDepartureDate).format(
            "YYYY-MM-DD"
          ),
          adults: res.data.adults,
          children: res.data.children,
          infants: res.data.infants,
          country: formData.country,
          city: formData.city,
        };

        setPackageData(pkg);

        // ✅ Parent callback trigger
        if (onCreated) {
          onCreated(pkg);
        }

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
    const cleanVal = value.filter(Boolean); // ✅ "" remove
    setSelectedCountry(cleanVal);
    handleChange("country", cleanVal);
    handleChange("city", []); // Reset city on country change
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
        {/* Country & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonMultiSelect
            label="Country"
            options={countryOptions}
            value={formData.country}
            onValueChange={(val) => {
              const cleanVal = val.filter(Boolean); // ✅ "" remove
              handleCountryChange(cleanVal);
            }}
            placeholder="Select Country"
            error={errors.country}
          />

          <CommonMultiSelect
            label="City"
            options={cityOptions}
            value={formData.city}
            onValueChange={(val) => {
              const cleanVal = val.filter(Boolean); // ✅ "" remove
              handleChange("city", cleanVal);
            }}
            placeholder="Select City"
            error={errors.city}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonInput
            label="Arrival Date"
            type="date"
            value={formData.arrivalDate}
            onChange={(e) => handleChange("arrivalDate", e.target.value)}
            error={errors.arrivalDate}
          />
          <CommonInput
            label="Flight Departure Date"
            type="date"
            value={formData.flightDepartureDate}
            onChange={(e) =>
              handleChange("flightDepartureDate", e.target.value)
            }
            error={errors.flightDepartureDate}
          />
        </div>

        {/* Times */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CommonInput
            label="Flight Arrival Time"
            type="time"
            value={formData.flightArrivalTime}
            onChange={(e) => handleChange("flightArrivalTime", e.target.value)}
            error={errors.flightArrivalTime}
          />
          <CommonInput
            label="Flight Departure Time"
            type="time"
            value={formData.flightDepartureTime}
            onChange={(e) =>
              handleChange("flightDepartureTime", e.target.value)
            }
            error={errors.flightDepartureTime}
          />
        </div>

        {/* Package Name */}
        <CommonInput
          label="Package Name"
          type="text"
          value={formData.packageName}
          onChange={(e) => handleChange("packageName", e.target.value)}
          placeholder="Enter Package Name"
          error={errors.packageName}
        />

        {/* Passengers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CommonInput
            label="Adults"
            type="number"
            value={formData.adults}
            onChange={(e) => handleChange("adults", e.target.value)}
            error={errors.adults}
          />
          <CommonInput
            label="Infants (0-6)"
            type="number"
            value={formData.infants}
            onChange={(e) => handleChange("infants", e.target.value)}
            error={errors.infants}
          />
          <CommonInput
            label="Children (7-18)"
            type="number"
            value={formData.children}
            onChange={(e) => handleChange("children", e.target.value)}
            error={errors.children}
          />
        </div>

        {/* Description */}
        <CommonTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter description..."
          error={errors.description}
        />

        {/* Buttons */}
        <div className="flex justify-end">
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
