// components/SearchCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import CommonButton from "../common/CommonButton";

type SearchCardProps = {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
};

const SearchCard = ({
  title,
  description,
  imageUrl,
  link,
}: SearchCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
      {/* 🖼️ Image Wrapper */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title || "image found"}
          fill
          className="object-cover"
        />
      </div>

      {/* 📄 Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
      </div>

      {/* 💵 Price + Button */}
      <div className="flex justify-between items-center mt-auto">
        <CommonButton link={link} label="View Details" />
      </div>
    </div>
  );
};

export default SearchCard;
