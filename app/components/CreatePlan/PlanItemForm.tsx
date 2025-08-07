"use client";
import React from "react";
import CommonHeading from "../common/CommonHeading";
import DateSection from "./DateSection";
import useForm from "@/app/hooks/useForm";
import LocationSection from "./LocationSection";
import HotelSection from "./HotelSection";
import RestaurantSection from "./RestaurantSection";
import CommonButton from "../common/CommonButton";
import { PackageItemPayload } from "@/app/types/CommonType";
import {
  useControllerCreatePackageItem,
  useControllerGetFindAllAgentPackageItems,
} from "@/app/hooks/api";
import { showError, showSuccess } from "../common/CommonSonner";
import usePackageData from "@/app/store/usePackageData";
import CarSection from "./CarSection";
import dayjs from "dayjs";

type Props = {
  date: string;
};

const transformFindOneResponse = (
  apiResponse: any
): Partial<PackageItemPayload> => {
  const {
    agent_package_id,
    travel_guide_id,
    hotels,
    rooms,
    sites,
    restaurants,
    car_id,
    city_ids,
    country_ids,
    description,
    start_time,
    end_time,
    item_date,
  } = apiResponse;

  const restaurantData =
    restaurants?.map((rest: any) => ({
      restaurantId: rest?.restaurantId || "",
      mealType: rest?.mealType || "",
      dishes: rest?.dishes || [],
      variants: rest?.variants || [],
    })) || [];

  return {
    agent_package_id: Number(agent_package_id),
    guide: travel_guide_id || "",
    hotels: hotels || [],
    hotelRooms: rooms || [],
    restaurantData,
    sites: sites || [],
    restaurants: restaurantData.map((r) => r.restaurantId),
    car: car_id || "",
    city: city_ids?.[0] || "",
    country: country_ids?.[0] || "",
    description: description || "",
    startTime: start_time,
    endTime: end_time,
    item_date,
    key: "",
  };
};

const PlanItemForm = ({ date }: Props) => {
  const { packageData, setPackageItemData } = usePackageData();
  const { data: packageItemRes } = useControllerGetFindAllAgentPackageItems({
    package_id: packageData?.id || "",
    item_date: dayjs(date).format("YYYY-MM-DD") || "",
  });
  const transformed = transformFindOneResponse(packageItemRes?.data[0] || {});

  const { formData, handleChange, handleSubmit, errors } = useForm(
    [
      "startTime",
      "endTime",
      "country",
      "city",
      "hotels",
      "sites",
      "restaurants",
      "car",
      "hotelRooms",
      "restaurantData",
      "guide",
    ],
    transformed
  );

  const { mutateAsync: packageItemCreate } = useControllerCreatePackageItem();

  const onFinish = (data: any) => {
    console.log("Form submitted with data:", data);
    const payload: PackageItemPayload = {
      agent_package_id: packageData?.id,
      travel_guide_id: formData.guide,
      hotels: formData.hotels,
      rooms: formData.hotelRooms,
      sites: formData.sites,
      restaurants: formData.restaurantData,
      car_id: formData.car || "",
      city_ids: [formData.city],
      country_ids: [formData.country],
      description: formData.description || "",
      start_time: formData.startTime,
      end_time: formData.endTime,
      item_date: dayjs(date).format("YYYY-MM-DD"),
      key: formData.key || "",
    };

    setPackageItemData(payload);

    packageItemCreate(payload)
      .then(() => {
        showSuccess({
          message: "",
          description: "",
        });
      })
      .catch((error) => {
        showError({
          message: "",
          description: error.response.data.message,
        });
      });
  };

  return (
    <div>
      <CommonHeading
        className="text-left !my-6"
        title={`Add Item for ${date}`}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onFinish);
        }}
        action=""
        className="space-y-4"
      >
        <DateSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <LocationSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <HotelSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <RestaurantSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <CarSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <div className="flex justify-end space-x-4">
          <CommonButton loading={false} label="Save Item" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PlanItemForm;
