"use client";

import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import CommonButton from "../common/CommonButton";
import CommonBadge from "../common/CommonBadge";
import Image from "next/image";

interface VehicleCardProps {
  imageUrl: string;
  location: string;
  carBrand: string;
  id: string;
  carModel: string;
  features: string[];
  price: number;
  layout?: "vertical" | "horizontal"; // 🔥 New prop
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  imageUrl,
  location,
  carBrand,
  carModel,
  features,
  id,
  price,
  layout = "horizontal", // default layout
}) => {
  const isVertical = layout === "vertical";

  return (
    <div
      className={`group bg-white rounded-lg shadow-sm overflow-hidden w-full border border-gray-200 hover:border-primary transition
      ${isVertical ? "flex flex-col" : "flex flex-col md:flex-row"}`}
    >
      {/* Image Section */}
      <div
        className={`relative ${
          isVertical ? "w-full h-60 border-b" : "w-full md:w-2/4 h-60 border-r"
        }  flex items-center justify-center p-4 group-hover:bg-primary/10 group-hover:border-primary transition`}
      >
        <Image
          fill
          src={imageUrl}
          alt={`${carBrand} ${carModel}`}
          className="!relative w-full h-full object-contain group-hover:scale-105 transition"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x200/E5E5E5/333?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Details Section */}
      <div
        className={`p-4 flex flex-col justify-between text-gray-800 ${
          isVertical ? "w-full" : "w-full md:w-2/3"
        }`}
      >
        {/* Location */}
        <div className="flex items-center text-gray-500 text-xs mb-1">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{location}</span>
        </div>

        {/* Car Brand and Model */}
        <div>
          <h3 className="text-xl font-semibold text-stone-800 mb-2">
            {carBrand}
          </h3>
          <h3 className="text-sm text-gray-600 mb-2">{carModel}</h3>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <CommonBadge
              className="bg-gray-200 text-stone-800"
              key={index}
              label={feature}
            />
          ))}
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="text-orange-500 font-semibold text-lg">
            {Number(price).toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
              minimumFractionDigits: 2,
            })}
            <span className="text-xs text-gray-500 ml-1 font-normal">/Day</span>
          </div>
          <CommonButton
            iconPosition="right"
            icon={<ArrowRight className="w-4 h-4" />}
            label="Details"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
