"use client";

import React from "react";
import DestinationHotels from "../DestinationHotels";
import CommonTabs from "../../common/CommonTabs";
import PlanSites from "../PlanSites";
import PlanRestaurants from "../PlanRestaurants";
import PlanCars from "../PlanCars";

import { useTranslations } from "next-intl";

const DestinationDetail = ({ destinationData }: { destinationData: any }) => {
  const t = useTranslations("planning");
  const links = [
    {
      label: t("hotels"),
      value: "hotels",
      content: <DestinationHotels destination={destinationData} />,
    },
    {
      label: t("activities"),
      value: "sites",
      content: <PlanSites destination={destinationData} />,
    },
    {
      label: t("meals"),
      value: "restaurants",
      content: <PlanRestaurants destination={destinationData} />,
    },
    {
      label: t("vehicle"),
      value: "cars",
      content: <PlanCars destination={destinationData} />,
    },
  ];

  return (
    <div className="px-4 pb-4 border border-gray-300 rounded-lg">
      <CommonTabs tabs={links} />
    </div>
  );
};

export default DestinationDetail;
