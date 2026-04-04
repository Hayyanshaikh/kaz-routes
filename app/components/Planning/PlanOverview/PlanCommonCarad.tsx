"use client";
import React from "react";
import { Image } from "antd";
import { FILE_BASE_URL } from "@/lib/constant";
import CommonBadge from "../../common/CommonBadge";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";

interface CommonCardProps {
  id: string | number;
  name: string;
  image: string;
  label: string;
  description?: string | React.ReactNode;
  price?: number | string;
}

const CommonCard: React.FC<CommonCardProps> = ({
  id,
  name,
  image,
  label,
  description,
  price,
}) => {
  const { format } = useFormatCurrency();

  return (
    <div
      key={id}
      className="bg-white rounded-lg border border-gray-300 overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative h-30 w-full">
        <Image
          src={`${FILE_BASE_URL}/${image}`}
          alt={name}
          wrapperClassName="h-full w-full"
          className="absolute w-full h-full! object-cover"
          fallback="https://placehold.co/600/CCCCCC/000000?text=Image+Not+Found"
          preview={false}
        />
        <div className="absolute top-3 left-3">
          <CommonBadge color="success" label={label} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-1">
            {name}
          </h3>
          {price !== undefined && (
            <span className="text-xs font-bold text-primary shrink-0">
              {format(price)}
            </span>
          )}
        </div>
        {description && (
          <div className="text-xs text-gray-500 mt-1 line-clamp-2">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonCard;
