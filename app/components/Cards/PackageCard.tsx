"use client";
import React from "react";
import {
  StarFilled,
  ClockCircleOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons"; // Antd icons
import CommonBadge from "../common/CommonBadge";
import CommonButton from "../common/CommonButton";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

type PackageCardProps = {
  imageUrl: string;
  rating: number;
  title: string;
  id: string;
  description: string;
  duration: string;
  maxParticipants: number;
  highlights: string[];
  price: number;
};

const PackageCard: React.FC<PackageCardProps> = ({
  imageUrl,
  rating,
  title,
  description,
  duration,
  maxParticipants,
  highlights,
  id,
  price,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transform duration-300 h-full">
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden w-full">
        <Image
          fill
          src={imageUrl}
          alt={title}
          className="rounded-t-xl w-full h-full object-cover duration-300 "
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
          }}
        />
        {/* Rating Badge */}
        {/* <div className="absolute top-3 right-3 bg-white text-stone-800 px-3 py-1 rounded-full flex items-center shadow-md">
          <StarFilled className="text-yellow-400 mr-1 text-sm" />
          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
        </div> */}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-stone-800 mb-2">{title}</h3>
        {/* Description */}
        <p className="text-stone-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Duration & Participants */}
        <div className="flex items-center justify-between text-stone-500 text-sm mb-4">
          <div className="flex items-center space-x-1">
            <ClockCircleOutlined />
            <span>{duration} Days</span>
          </div>
          <div className="flex items-center space-x-1">
            <UserOutlined />
            <span>Max {maxParticipants}</span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto border-t border-gray-300 pt-5">
          <div className="text-stone-900 font-semibold">
            {formatCurrency(price)}
          </div>
          <CommonButton
            link={`packages/${id}`}
            label="Details"
            iconPosition="right"
            icon={<ArrowRightOutlined />}
          />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
