"use client";
import React, { useState } from "react";
import { AutoComplete, Empty } from "antd";
import usePlanStore from "@/app/store/planStore";
import { generateUUID } from "@/lib/utils";
import { useControllerGetFindAllCities } from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import useDestinationStore from "@/app/store/destinationStore";
import { useRouter } from "next/navigation";
import DestinationList from "./DestinationList";

const DestinationPlan = () => {
  const router = useRouter();
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

  return (
    <div className="">
      {/* Search / Add Destination */}
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
          option?.label.toLowerCase().includes(inputValue.toLowerCase())
        }
      />

      {/* List of Destination Cards */}
      <div className="mt-3">
        {destinations?.length > 0 && (
          <div className="flex justify-between gap-2 text-xs text-gray-800 font-light px-2">
            <span>Destnation</span>
            <span>Nights</span>
          </div>
        )}

        <DestinationList destinations={destinations} />
      </div>
    </div>
  );
};

export default DestinationPlan;
