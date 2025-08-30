"use client";

import { DestinationCardProps } from "@/app/types/CommonType";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import React from "react";

const DestinationCard: React.FC<DestinationCardProps> = ({
  imageUrl,
  imageAlt,
  buttonText,
}) => {
  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg h-full overflow-hidden">
      {/* Image section */}
      <div className="w-full h-60 md:h-72 relative">
        <Image
          fill
          src={imageUrl || "https://placehold.co/400x300?text=No+Image"}
          alt={imageAlt || "Image"}
          className="object-cover rounded-t-xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Overlay for the button */}
      <div className="absolute bottom-3 md:bottom-5 left-3 md:left-5 right-3 md:right-5">
        <div className="flex items-center justify-between gap-2 w-full p-4 py-3 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          <span className="font-semibold text-stone-900 text-sm md:text-base text-ellipsis overflow-hidden whitespace-nowrap">
            {buttonText}
          </span>
          <div className="bg-primary h-10 w-10 flex items-center justify-center p-1 md:p-2 rounded-full shadow-md flex-[0_0_auto]">
            <ArrowRightOutlined className="!text-white text-base md:text-lg -rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
