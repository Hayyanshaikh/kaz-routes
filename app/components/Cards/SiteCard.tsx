import { FILE_BASE_URL } from "@/lib/constant";
import Image from "next/image";
import React from "react";

interface SiteCardProps {
  imageUrl: string;
  countryName: string;
}

const SiteCard: React.FC<SiteCardProps> = ({ imageUrl, countryName }) => {
  return (
    <div className="relative w-full h-40 sm:h-52 md:h-60 rounded-xl overflow-hidden shadow-md group">
      <Image
        fill
        src={`${FILE_BASE_URL}/${imageUrl}`}
        alt={countryName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          e.currentTarget.src =
            "https://placehold.co/400x300/E5E5E5/333?text=Image+Not+Found";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4">
        <h3 className="text-white text-lg font-semibold text-center">
          {countryName}
        </h3>
      </div>
    </div>
  );
};

export default SiteCard;
