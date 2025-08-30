import React from "react";
import CommonButton from "../common/CommonButton";
import {
  UserOutlined,
  RestOutlined,
  HomeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  FireOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/lib/utils";

interface Props {
  item: any;
  packageDetail: any;
}

const Item = ({ item, packageDetail }: Props) => {
  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* Example usage of icons */}
          <UserOutlined className="text-primary text-lg" />
          <CalendarOutlined className="text-primary text-lg" />
        </div>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(item.price)}
        </p>
      </div>

      <p className="text-sm text-gray-700">{item?.description}</p>

      <div className="flex items-start gap-16 border-b border-gray-200 pb-5">
        {/* Example facilities with icons */}
        {/* 
        <div>
          <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <RestOutlined /> Bath Facility
            </li>
            <li className="flex items-center gap-2">
              <HomeOutlined /> Bed Facility
            </li>
            <li className="flex items-center gap-2">
              <TeamOutlined /> Family Room
            </li>
          </ul>
        </div>
        */}
      </div>

      <CommonButton label="Book Now" className="h-10 rounded-full w-full" />
    </div>
  );
};

export default Item;
