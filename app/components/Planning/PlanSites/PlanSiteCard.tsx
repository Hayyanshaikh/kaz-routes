"use client";

import React from "react";
import { Card } from "antd";
import { ClockCircleOutlined, HourglassOutlined } from "@ant-design/icons";
import CommonButton from "../../common/CommonButton";
import dayjs from "dayjs";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";

interface PlanSiteCardProps {
  imageSrc: string;
  imageAlt?: string;
  price: number | string; // currency format hook handle karega
  title: string;
  city: string;
  startTime: string; // format "HH:mm"
  endTime: string; // format "HH:mm"
  duration: string;
  buttonText?: string;
  isBooked?: boolean;
  onBook?: () => void;
  onRemove?: () => void;
}

const PlanSiteCard: React.FC<PlanSiteCardProps> = ({
  imageSrc,
  imageAlt,
  price,
  title,
  city,
  startTime,
  endTime,
  duration,
  buttonText = "Book Now",
  isBooked = false,
  onBook,
  onRemove,
}) => {
  const { format } = useFormatCurrency();

  // Dummy date ke sath time attach karo
  const startDate = dayjs(`1970-01-01 ${startTime}`, "YYYY-MM-DD HH:mm");
  const endDate = dayjs(`1970-01-01 ${endTime}`, "YYYY-MM-DD HH:mm");

  const formattedStart = startDate.isValid()
    ? startDate.format("h:mm A")
    : startTime;
  const formattedEnd = endDate.isValid() ? endDate.format("h:mm A") : endTime;

  return (
    <Card
      cover={
        <img
          src={imageSrc}
          alt={imageAlt || "Tour image"}
          className="h-40 w-full object-cover rounded-t-lg"
        />
      }
      className="rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition"
    >
      {/* Title */}
      <h2 className="text-base font-semibold text-gray-900 truncate">
        {title}
      </h2>
      <p className="text-xs text-gray-500 mb-2">{city}</p>

      {/* Details */}
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-3">
        <div className="flex items-center gap-1">
          <ClockCircleOutlined className="!text-primary" /> {formattedStart} –{" "}
          {formattedEnd}
        </div>
        <div className="flex items-center gap-1">
          <HourglassOutlined className="!text-primary" /> {duration}
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex flex-wrap gap-2 items-center justify-between mt-3">
        <span className="text-sm text-gray-600 font-semibold">
          {format(price)}
        </span>
        {isBooked ? (
          <CommonButton
            label="Remove"
            onClick={onRemove}
            className="!bg-red-500 !px-3 !h-6 !py-1"
          />
        ) : (
          <CommonButton
            label={buttonText}
            onClick={onBook}
            className="!px-3 !h-6 !py-1"
          />
        )}
      </div>
    </Card>
  );
};

export default PlanSiteCard;
