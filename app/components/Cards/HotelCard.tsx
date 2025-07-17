import React from "react";
import CommonButton from "../common/CommonButton";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FILE_BASE_URL } from "@/lib/constant";
import CommonBadge from "../common/CommonBadge";

const HotelCard = ({ hotelData }: any) => {
  if (!hotelData) {
    return (
      <div className="p-4 text-center text-red-500">
        Hotel data available nahi hai.
      </div>
    );
  }

  const { hotel_name, description, city, images, rooms, id } = hotelData;

  console.log({ city });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Hotel Image Section */}
      <div className="relative h-48 w-full">
        <Image
          fill
          src={`${FILE_BASE_URL}/${images[0]}`}
          alt={hotel_name || "Not found"}
          className="!relative w-full h-full object-cover group-hover:scale-105 transition"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/300x200/E5E5E5/333?text=Image+Not+Found";
          }}
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex items-center justify-between">
          <CommonBadge label={`Total Rooms: ${rooms?.length}`} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Hotel Name and Rating */}
        <h3 className="text-xl font-semibold text-stone-800 mb-2">
          {hotel_name}
        </h3>

        {/* City and Tag */}
        {/* <p className="text-gray-600 text-sm mb-4">
          {city?.name}, {city?.country_id}
          {tag && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {tag}
            </span>
          )}
        </p> */}

        {/* Description */}
        <div className="text-gray-700 text-sm mb-4">
          <p className="line-clamp-3">{description}</p>
        </div>

        <CommonButton
          link={`hotels/${id}`}
          className="w-full mt-auto"
          label="View Details"
          iconPosition="right"
          icon={<ArrowRight />}
        />
      </div>
    </div>
  );
};

export default HotelCard;
