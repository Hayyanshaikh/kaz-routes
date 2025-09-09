"use client";

import React from "react";
import DestinationHotels from "../DestinationHotels";
import CommonTabs from "../../common/CommonTabs";
import PlanSites from "../PlanSites";

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
      content: <div>Restaurants Content</div>,
    },
    { label: "Cars", value: "cars", content: <div>Cars Content</div> },
  ];

  return (
    <div className="px-4 pb-4 border border-gray-300 rounded-lg">
      <CommonTabs tabs={links} />
    </div>
  );
};

export default DestinationDetail;
