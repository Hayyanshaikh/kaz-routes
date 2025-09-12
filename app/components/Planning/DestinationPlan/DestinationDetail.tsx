"use client";

import React from "react";
import DestinationHotels from "../DestinationHotels";
import CommonTabs from "../../common/CommonTabs";
import PlanSites from "../PlanSites";
import PlanRestaurants from "../PlanRestaurants";
import PlanCars from "../PlanCars";

const DestinationDetail = ({ destinationData }: { destinationData: any }) => {
  const links = [
    {
      label: "Hotels",
      value: "hotels",
      content: <DestinationHotels destination={destinationData} />,
    },
    {
      label: "Sites",
      value: "sites",
      content: <PlanSites destination={destinationData} />,
    },
    {
      label: "Restaurants",
      value: "restaurants",
      content: <PlanRestaurants destination={destinationData} />,
    },
    {
      label: "Cars",
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
