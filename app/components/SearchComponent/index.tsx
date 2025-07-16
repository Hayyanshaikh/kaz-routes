"use client";
import React from "react";
import SearchCard from "../Cards/SearchCard";
import { CATEGORIES, FILE_BASE_URL } from "@/lib/constant";
import CommonButton from "../common/CommonButton";
import SidebarFilter from "../SidebarFilter";
import { useSearchParams } from "next/navigation";
import {
  useControllerGetFindAllHotels,
  useControllerGetFindAllRestaurants,
  useControllerGetFindAllPackages,
  useControllerGetFindAllCars,
  useControllerGetFindAllSites,
} from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";
import { convertFiltersToArray } from "@/lib/utils";
import RestaurantCard from "../Cards/RestaurantCard";
import PackageCard from "../Cards/PackageCard";
import VehicleCard from "../Cards/VehicleCard";
import HotelCard from "../Cards/HotelCard";

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const queries = {
    hotels: useControllerGetFindAllHotels({ enabled: category === "hotels" }),
    restaurants: useControllerGetFindAllRestaurants({
      enabled: category === "restaurants",
    }),
    packages: useControllerGetFindAllPackages({
      enabled: category === "packages",
    }),
    cars: useControllerGetFindAllCars({ enabled: category === "cars" }),
    sites: useControllerGetFindAllSites({ enabled: category === "sites" }),
  };

  const activeQuery = queries[category as keyof typeof queries];
  const list = activeQuery?.data?.data || [];
  const filters = activeQuery?.data?.filters || {};
  const isLoading = activeQuery?.isLoading || false;

  const formattedFilters = convertFiltersToArray(filters);

  if (isLoading) return <PageLoading />;

  // ✅ Render per category-specific card
  const getCardByCategory = (item: any, index: number) => {
    const image = item.images?.[0]
      ? `${FILE_BASE_URL}/${item.images[0]}`
      : "https://placehold.co/600x400?text=No+Image";

    switch (category) {
      case "hotels":
        return <HotelCard hotelData={item} key={index} />;

      case "restaurants":
        return <RestaurantCard key={index} restaurant={item} />;

      case "packages":
        return (
          <PackageCard
            key={index}
            imageUrl={`${FILE_BASE_URL}/${item.images[0]}`}
            rating={item.rating}
            title={item.name}
            description={item.description}
            duration={item.days}
            maxParticipants={
              Number(item.adults) + Number(item.children) + Number(item.infants)
            }
            highlights={item.highlights}
            price={item.price}
          />
        );

      case "cars":
        const features = [
          item.fuel_type,
          item.transmission,
          `${item.seating_capacity} Seating`,
          item.category.name,
        ];
        return (
          <VehicleCard
            key={index}
            id={item?.id}
            layout="vertical"
            carBrand={item?.brand?.name}
            carModel={`${item?.model} - ${item?.year}`}
            features={features}
            imageUrl={`${FILE_BASE_URL}/${
              item.images.find((img: any) => img.is_featured).image_path
            }`}
            location=""
            price={item?.daily_rate}
          />
        );

      case "sites":
        return <SearchCard key={index} {...item} />;

      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col items-start md:flex-row p-6 gap-8">
      <aside className="flex-[0_0_300px] hidden md:block sticky top-6">
        {/* <SidebarFilter
          filters={formattedFilters}
          initialValues={{}}
          onChange={(data) => console.log("Active Filters:", data)}
        /> */}
      </aside>

      <main className="flex-1 space-y-6">
        {/* Categories Tab */}
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <CommonButton
              key={cat.value}
              link={`search?category=${cat.value}`}
              label={cat.label}
              className={`${
                cat.value === category
                  ? ""
                  : "*:border *:bg-transparent *:text-black *:hover:text-white *:hover:border-primary"
              }`}
            />
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((item, index) => getCardByCategory(item, index))}
        </div>
      </main>
    </div>
  );
};

export default SearchComponent;
