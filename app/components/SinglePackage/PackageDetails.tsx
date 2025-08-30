"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import CommonTabs from "../common/CommonTabs";
import { RoomType } from "@/app/types/CommonType";
import Item from "./Item";

// ✅ Ant Design Icons import
import {
  ClockCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/lib/utils";

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
    content: <Item item={item} key={index} packageDetail={packageDetail} />,
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
        <button
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 w-auto underline text-sm"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Show less" : "Show more"}
        </button>
      </div>
      <h1 className={`text-xl sm:text-2xl font-bold mb-2`}>
        {formatCurrency(packageDetail?.price)}
      </h1>

      {/* Services */}
      {/* <Services services={packageDetail.services} /> */}
      <div className="flex items-center space-x-6 text-gray-700 border-y border-gray-200 py-5 w-full">
        <div className="flex items-start flex-col gap-2">
          <ClockCircleOutlined style={{ fontSize: 20 }} />
          <span className="text-sm">
            <strong className="font-medium">Days:</strong>{" "}
            {packageDetail?.duration?.days}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <TeamOutlined style={{ fontSize: 20 }} />
          <span className="text-sm">
            <strong className="font-medium">Adults:</strong>{" "}
            {packageDetail?.duration?.adults}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <UserOutlined style={{ fontSize: 20 }} />
          <span className="text-sm">
            <strong className="font-medium">Children:</strong>{" "}
            {packageDetail?.duration?.children}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <UserOutlined style={{ fontSize: 20 }} />
          <span className="text-sm">
            <strong className="font-medium">Infants:</strong>{" "}
            {packageDetail?.duration?.infants}
          </span>
        </div>
      </div>

      <CommonTabs tabs={tabs} className="w-full mt-8" />
    </section>
  );
};

export default PackageDetails;
