"use client";

import { DestinationCardProps } from "@/app/types/CommonType";
import { ArrowUpRight } from "lucide-react";
import React from "react";

// DestinationCard component now accepts props
const DestinationCard: React.FC<DestinationCardProps> = ({
  imageUrl,
  imageAlt,
  buttonText,
}) => {
  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Image section, using props for src and alt */}
      <img
        src={imageUrl}
        alt={imageAlt}
        className="w-full h-60 md:h-72 object-cover rounded-t-xl"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
        }}
      />

      {/* Overlay for the button */}
      <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5">
        <div className="flex items-center justify-between gap-2 w-full p-4 py-3 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          {/* Button text, using buttonText prop */}
          <span className="font-semibold text-stone-900 text-sm md:text-base text-ellipsis overflow-hidden whitespace-nowrap">
            {buttonText}
          </span>
          <div className="bg-primary p-1 md:p-2 rounded-full shadow-md">
            <ArrowUpRight className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
