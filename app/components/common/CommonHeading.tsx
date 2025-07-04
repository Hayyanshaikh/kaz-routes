import { CommonHeadingProps } from "@/app/types/CommonType";
import React from "react";

const CommonHeading = ({ title, subtitle, className }: CommonHeadingProps) => {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-stone-600 text-sm max-w-2xl mx-auto">{subtitle}</h2>
      )}
    </div>
  );
};

export default CommonHeading;
