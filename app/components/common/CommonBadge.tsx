import React from "react";
import { CommonBadgeProps } from "@/app/types/CommonType";

const CommonBadge: React.FC<CommonBadgeProps> = ({
  label,
  className = "",
  color,
  icon,
}) => {
  let bgColor: string;
  let textColor: string;

  if (color === "success") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (color === "warning") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (color === "error") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  } else {
    bgColor = "bg-gray-200";
    textColor = "text-black";
  }

  return (
    <span
      className={`${bgColor} ${textColor} ${className} py-0.5 w-auto font-medium rounded-full px-3 text-xs leading-5 flex items-center gap-1`}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {label}
    </span>
  );
};

export default CommonBadge;
