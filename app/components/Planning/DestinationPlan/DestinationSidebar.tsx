"use client";

import React, { useState } from "react";
import { Tabs } from "antd";
import DestinationHotels from "../DestinationHotels";

const DestinationSidebar = ({ destinationData }: { destinationData: any }) => {
  const links = [
    {
      name: "Hotels",
      slug: "hotels",
      content: <DestinationHotels destination={destinationData} />,
    },
    { name: "Sites", slug: "sites", content: <div>Sites Content</div> },
    {
      name: "Restaurants",
      slug: "restaurants",
      content: <div>Restaurants Content</div>,
    },
    { name: "Cars", slug: "cars", content: <div>Cars Content</div> },
  ];

  const [activeKey, setActiveKey] = useState(links[0].slug);

  return (
    <div className="px-4 pb-4 border border-gray-300 rounded-lg">
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={links.map((link) => ({
          key: link.slug,
          label: link.name,
          children: link.content,
        }))}
      />
    </div>
  );
};

export default DestinationSidebar;
