"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import CommonTabs from "../common/CommonTabs";
import { RoomType } from "@/app/types/CommonType";
import Item from "./Item";

type Hotel = {
  name: string;
  description: string;
  services: string[];
  items: RoomType[];
};

type Props = {
  packageDetail: Hotel;
};

const PackageDetails = ({ packageDetail }: Props) => {
  const [showFull, setShowFull] = useState(false);

  const tabs = packageDetail.items.map((item, index) => ({
    value: `Item ${index + 1}`,
    label: `Item ${index + 1}`,
    content: <Item item={item} key={index} />,
  }));

  return (
    <section className="flex flex-col items-start flex-1 lg:w-1/2">
      <CommonHeading
        className="text-left !mb-0"
        title={packageDetail.name}
        subtitle={
          showFull
            ? packageDetail.description
            : `${packageDetail.description.slice(0, 300)}...`
        }
      />
      <div className="mb-6 text-gray-700">
        <CommonButton
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 underline"
          onClick={() => setShowFull(!showFull)}
          label={showFull ? "Show less" : "Show more"}
        />
      </div>

      {/* Services */}
      {/* <Services services={packageDetail.services} /> */}

      <CommonTabs tabs={tabs} className="w-full mt-8" />
    </section>
  );
};

export default PackageDetails;
