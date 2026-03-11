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
import ListOfDays from "./ListOfDays";
import CommonModal from "../../common/CommonModal";
import { Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { getDestinationDates } from "@/lib/utils";
import dayjs from "dayjs";

import { useTranslations } from "next-intl";

const DestinationPlan = () => {
  const t = useTranslations("planning");
  const router = useRouter();
  const { plan, dayCount, usedDays } = usePlanStore();
  const { addDestination, destinations, addNight, updateDestination } =
    useDestinationStore();
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [nights, setNights] = useState(1);

  const { data: citiesRes } = useControllerGetFindAllCities();
  const citiesOption = dropdownManipulator(citiesRes?.data || []);

  const handleSelect = (_: string, option: any) => {
    setSelectedOption(option);
    setNights(1);
    setIsModalOpen(true);
  };

  const handleConfirmAddition = () => {
    if (!selectedOption || nights < 1) return;

    const id = generateUUID();
    const newDest = {
      id,
      name: selectedOption?.label,
      image: selectedOption?.image,
      nights: 0, // Initial for store calculation
    };

    addDestination(newDest);
    addNight(id, nights);

    // Calculate dates correctly
    const { startDate } = getDestinationDates(newDest, plan, [
      ...destinations,
      newDest,
    ]);

    if (startDate) {
      const endDate = dayjs(startDate).add(nights - 1, "day");
      updateDestination(id, {
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      });
    }

    setIsModalOpen(false);
    setSelectedOption(null);
    setSearchValue("");
  };

  const remainingNights = dayCount - usedDays;

  return (
    <div className="h-full flex flex-col">
      {/* Search / Add Destination */}
      <label className="block text-xs text-gray-600 mb-2 font-medium">
        {t("addDestination")}
      </label>
      <AutoComplete
        className="w-full"
        options={citiesOption}
        placeholder={t("searchDestination")}
        value={searchValue}
        onChange={(val) => setSearchValue(val)}
        onSelect={handleSelect}
        disabled={remainingNights < 1}
        filterOption={(inputValue: any, option: any) =>
          option?.label.toLowerCase().includes(inputValue.toLowerCase())
        }
      />
      {remainingNights < 1 && (
        <p className="text-[10px] text-red-500 mt-1">
          {t("noNightsRemaining")}
        </p>
      )}

      {/* List of Destination Cards */}
      <div className="mt-3 mb-10 overflow-auto">
        {destinations?.length > 0 && (
          <div className="flex justify-between gap-2 text-xs text-gray-800 font-light px-2">
            <span>{t("destination")}</span>
            <span>{t("nights")}</span>
          </div>
        )}
        <DestinationList destinations={destinations} />
      </div>

      <ListOfDays />

      {/* Night Selection Modal */}
      <CommonModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        title={t("selectNights")}
        confirmText={t("addDestination")}
        onConfirm={handleConfirmAddition}
      >
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            {t("stayQuestion", { name: selectedOption?.label })}
          </p>
          <div className="flex items-center justify-center gap-6">
            <Button
              shape="circle"
              icon={<MinusOutlined />}
              disabled={nights <= 1}
              onClick={() => setNights((prev) => Math.max(1, prev - 1))}
            />
            <span className="text-2xl font-bold w-12 text-center">
              {nights}
            </span>
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              disabled={nights >= remainingNights}
              onClick={() =>
                setNights((prev) => Math.min(remainingNights, prev + 1))
              }
            />
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            {remainingNights > 0
              ? remainingNights === 1
                ? t("oneNightRemaining")
                : t("nightsRemaining", { count: remainingNights })
              : t("noNightsLeft")}
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            {t("atLeastOneNight")}
          </p>
        </div>
      </CommonModal>
    </div>
  );
};

export default DestinationPlan;
