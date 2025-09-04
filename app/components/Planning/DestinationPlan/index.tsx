"use client";
import React, { useState } from "react";
import { AutoComplete, Empty } from "antd";
import usePlanStore from "@/app/store/planStore";
import { generateUUID } from "@/lib/utils";
import CommonSlider from "../../common/CommonSlider";
import DestinationCard from "./DestinationCard";
import { useControllerGetFindAllCities } from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import Link from "next/link";
import useDestinationStore from "@/app/store/destinationStore";

const DestinationPlan = () => {
  const { plan } = usePlanStore();
  const { addDestination, destinations, removeDestination } =
    useDestinationStore();
  const [searchValue, setSearchValue] = useState("");
  const { data: citiesRes } = useControllerGetFindAllCities();
  const citiesOption = dropdownManipulator(citiesRes?.data || []);
  console.table(plan);

  const handleSelect = (_: string, option: any) => {
    const newDest = {
      id: generateUUID(),
      name: option?.label,
      image: option?.image,
    };
    addDestination(newDest);
    setSearchValue("");
  };

  // Prepare slider items with DestinationCard
  const sliderItems =
    destinations?.map((d) => (
      <Link href={`/plan/${plan?.id}/${d.id}`}>
        <DestinationCard
          key={d.id}
          name={d.name}
          image={d.image}
          sitesCount={d?.sites?.length || 0}
          carsCount={d?.cars?.length || 0}
          onDelete={() => removeDestination(d.id)}
          restaurantsCount={d?.restaurants?.length || 0}
          hotelsCount={d?.hotels?.length || 0}
        />
      </Link>
    )) || [];

  return (
    <div className="">
      <label className="block text-xs text-gray-600 mb-2 font-medium">
        Add Destination:
      </label>
      <AutoComplete
        className="w-full"
        options={citiesOption}
        placeholder="Search Destination"
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        onSelect={handleSelect}
        filterOption={(inputValue: any, option: any) =>
          option?.value.toLowerCase().includes(inputValue.toLowerCase())
        }
      />

      {/* Slider of destinations */}
      {sliderItems.length > 0 ? (
        <div className="mt-6">
          <CommonSlider
            items={sliderItems}
            slidesPerView={4}
            spaceBetween={20}
            autoplay={false}
            loop={false}
            showNavigation={true}
            breakpoints={{
              1024: { slidesPerView: 4 },
              768: { slidesPerView: 3 },
              640: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          />
        </div>
      ) : (
        <div className="py-5">
          <Empty description="No Destination Selected" />
        </div>
      )}
    </div>
  );
};

export default DestinationPlan;
