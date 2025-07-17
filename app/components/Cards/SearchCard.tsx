// components/SearchCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import CommonButton from "../common/CommonButton";
import { formatCurrencyPKR } from "@/lib/utils";
import { Baby, User } from "lucide-react";

type SearchCardProps = {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  adultPrice: string;
  childPrice: string;
};

const SearchCard = ({
  name,
  description,
  imageUrl,
  link,
  adultPrice,
  childPrice,
}: SearchCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 p-4 flex flex-col gap-4">
      {/* 🖼️ Image Wrapper */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={name || "image found"}
          fill
          className="object-cover"
        />
      </div>

      {/* 📄 Content */}
      <div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-4">{description}</p>
        </div>
      </div>

      {/* 💵 Price + Button */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 text-sm justify-between font-medium mb-2 text-gray-500">
          <span className="flex items-center gap-2">
            <User size={16} />
            {formatCurrencyPKR(Number(adultPrice))}
          </span>
          <span className="flex items-center gap-2">
            <Baby size={16} />
            {formatCurrencyPKR(Number(childPrice))}
          </span>
        </div>
        <CommonButton link={link} label="View Details" className="w-full" />
      </div>
    </div>
  );
};

export default SearchCard;
