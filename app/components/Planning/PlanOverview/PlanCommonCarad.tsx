"use client";
import React from "react";
import { Image } from "antd";
import { FILE_BASE_URL } from "@/lib/constant";
import CommonBadge from "../../common/CommonBadge";

interface CommonCardProps {
  id: string | number;
  name: string;
  image: string;
  label: string;
  description?: string;
}

const CommonCard: React.FC<CommonCardProps> = ({
  id,
  name,
  image,
  label,
  description,
}) => {
  return (
    <div
      key={id}
      className="bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-36 w-full">
        <Image
          src={`${FILE_BASE_URL}/${image}`}
          alt={name}
          wrapperClassName="h-full w-full"
          className="absolute w-full !h-full object-cover"
          fallback="https://placehold.co/600/CCCCCC/000000?text=Image+Not+Found"
          preview={false}
        />
        <div className="absolute top-3 left-3">
          <CommonBadge color="success" label={label} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
        {description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonCard;
