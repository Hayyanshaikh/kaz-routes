"use client";
import React, { useEffect } from "react";
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
  onCreated?: () => void;
};

type RoomCount = { id: string; count: number };

type HotelRooms = {
  hotelId: string;
  rooms: string[];
  roomCounts: RoomCount[];
};

type RestaurantData = {
  restaurantId: string;
  mealType: string;
  dishes: string[];
  variants: string[];
};

type PackageItemPayload = {
  agent_package_id: number;
  travel_guide_id: string;
  hotels: string[];
  hotelRooms: HotelRooms[];
  sites: string[];
  restaurants: string[];
  restaurantData: RestaurantData[];
  car: string;
  city: string;
  country: string;
  description: string;
  startTime: string;
  endTime: string;
  item_date: string;
  key: string;
};

const transformFindOneResponse = (
  apiResponse: any
): Partial<PackageItemPayload> => {
  const {
    agent_package_id,
    travel_guide_id,
    hotels_ids,
    rooms_raw,
    sites_ids,
    restaurants_raw,
    car,
    city_ids,
    country_ids,
    description,
    start_time,
    end_time,
    item_date,
  } = apiResponse;

  // Transform hotels
  const hotels = Array.isArray(hotels_ids) ? hotels_ids.map(String) : [];

  // Transform hotelRooms from rooms_raw
  const hotelRooms: HotelRooms[] = Array.isArray(rooms_raw)
    ? rooms_raw.map((roomEntry: any) => ({
        hotelId: String(roomEntry.hotelId),
        rooms: Array.isArray(roomEntry.rooms)
          ? roomEntry.rooms.map(String)
          : [],
        roomCounts: Array.isArray(roomEntry.roomCounts)
          ? roomEntry.roomCounts.map((rc: any) => ({
              id: String(rc.id),
              count: Number(rc.count || 1),
            }))
          : [],
      }))
    : [];

  // Transform restaurantData from restaurants_raw
  const restaurantData: RestaurantData[] = Array.isArray(restaurants_raw)
    ? restaurants_raw.map((rest: any) => ({
        restaurantId: String(rest.restaurantId),
        mealType: rest.mealType || "",
        dishes: Array.isArray(rest.dishes) ? rest.dishes.map(String) : [],
        variants: Array.isArray(rest.variants) ? rest.variants.map(String) : [],
      }))
    : [];

  // Extract restaurant IDs
  const restaurants = restaurantData.map((r) => r.restaurantId);

  // Extract sites
  const sites = Array.isArray(sites_ids) ? sites_ids.map(String) : [];

  // Extract car ID
  const carId = car && typeof car === "object" ? String(car.id) : "";

  // Extract city and country IDs (first element, as per PlanItemForm)
  const city =
    Array.isArray(city_ids) && city_ids.length > 0 ? String(city_ids[0]) : "";
  const country =
    Array.isArray(country_ids) && country_ids.length > 0
      ? String(country_ids[0])
      : "";

  return {
    agent_package_id: Number(agent_package_id) || 0,
    guide: String(travel_guide_id),
    hotels,
    hotelRooms,
    sites,
    restaurants,
    restaurantData,
    car: carId,
    city,
    country,
    description: description,
    startTime: start_time || "10:00",
    endTime: end_time || "21:30",
    item_date: item_date,
    key: "", // Default empty as per PlanItemForm
  };
};

const PlanItemForm = ({ date, onCreated }: Props) => {
  const { packageData, setPackageItemData } = usePackageData();
  const { data: packageItemRes, isLoading } =
    useControllerGetFindAllAgentPackageItems(
      {
        package_id: packageData?.id || 0, // number expected
        item_date: date ? dayjs(date).format("YYYY-MM-DD") : "",
      },
      !!date
    );
  const transformed = transformFindOneResponse(packageItemRes?.data[0] || {});

  const arrivalDate = dayjs(packageData?.arrivalDate);
  const departureDate = dayjs(packageData?.flightDepartureDate);

  const isArrivalDay = dayjs(date).isSame(arrivalDate, "day");
  const isDepartureDay = dayjs(date).isSame(departureDate, "day");

  const { formData, handleChange, handleSubmit, errors, setFormData } = useForm(
    [
      {
        name: "startTime",
        value: isArrivalDay
          ? packageData?.flightArrivalTime
          : transformed?.startTime || "10:00",
        required: true,
      },
      {
        name: "endTime",
        value: isDepartureDay
          ? packageData?.flightDepartureTime
          : transformed?.endTime || "21:30",
        required: true,
      },
      { name: "country", value: transformed?.country || "", required: true },
      { name: "city", value: transformed?.city || "", required: true },
      {
        name: "hotels",
        value: transformed?.hotels || [],
        required: isDepartureDay ? false : true,
      },
      { name: "sites", value: transformed?.sites || [], required: false },
      {
        name: "restaurants",
        value: transformed?.restaurants || [],
        required: false,
      },
      { name: "car", value: transformed?.car || "", required: false },
      {
        name: "hotelRooms",
        value: transformed?.hotelRooms || [],
        required: false,
      },
      {
        name: "restaurantData",
        value: transformed?.restaurantData || [],
        required: false,
      },
      { name: "guide", value: transformed?.guide || "", required: false },
    ]
  );

  useEffect(() => {
    if (!isLoading) setFormData(transformed);
  }, [isLoading]);
  const { mutateAsync: packageItemCreate, isPending } =
    useControllerCreatePackageItem();

  const onFinish = (data: any) => {
    const duration = Number(packageData?.duration) || 0;

    const arrivalDate = dayjs(packageData?.arrivalDate).format("YYYY-MM-DD");
    const departureDate = dayjs(packageData?.arrivalDate)
      .add(duration - 1, "day")
      .format("YYYY-MM-DD");

    const isArrivalDay = dayjs(date).format("YYYY-MM-DD") === arrivalDate;
    const isDepartureDay = dayjs(date).format("YYYY-MM-DD") === departureDate;

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
      start_time: isArrivalDay
        ? packageData?.flightArrivalTime
        : formData.startTime,
      end_time: isDepartureDay
        ? packageData?.flightDepartureTime
        : formData.endTime,
      item_date: dayjs(date).format("YYYY-MM-DD"),
      key: formData.key || "",
    };

    setPackageItemData(payload);

    packageItemCreate(payload)
      .then((res) => {
        showSuccess({
          message: "Item Created",
          description: "The item has been successfully created.",
        });

        if (onCreated) onCreated();
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
          isArrivalDay={isArrivalDay}
          isDepartureDay={isDepartureDay}
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
          <CommonButton loading={isPending} label="Save Item" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PlanItemForm;
