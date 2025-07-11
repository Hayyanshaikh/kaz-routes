// components/SearchCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import CommonButton from "../common/CommonButton";

type SearchCardProps = {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  onDetailClick: () => void;
};

const SearchCard = ({
  title,
  description,
  price,
  imageUrl,
  onDetailClick,
}: SearchCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
      {/* 🖼️ Image Wrapper */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      {/* 📄 Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* 💵 Price + Button */}
      <div className="flex justify-between items-center">
        <div className="text-gray-800 text-lg font-bold">
          ${price.toFixed(2)}
        </div>
        <CommonButton label="Book Now" onClick={onDetailClick} />
      </div>
    </div>
  );
};

export default SearchCard;
