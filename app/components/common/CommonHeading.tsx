import { CommonHeadingProps } from "@/app/types/CommonType";
import React from "react";

const CommonHeading = ({
  title,
  subtitle,
  className,
  mode = "light",
}: CommonHeadingProps) => {
  const isDark = mode === "dark";

  return (
    <div className={`text-center ${className} mb-10`}>
      <h1
        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
          isDark ? "text-stone-100" : "text-stone-900"
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <h2
          className={`text-sm max-w-2xl mx-auto ${
            isDark ? "text-stone-400" : "text-stone-600"
          }`}
        >
          {subtitle}
        </h2>
      )}
    </div>
  );
};

export default CommonHeading;
