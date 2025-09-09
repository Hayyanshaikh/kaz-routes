"use client";

import React, { useState } from "react";
import Image from "next/image";
import CommonButton from "../../common/CommonButton";
import CommonBadge from "../../common/CommonBadge";
import { FILE_BASE_URL } from "@/lib/constant";
import PlanRestaurantModal from "./PlanRestaurantModal";

type Restaurant = {
  id: number | string;
  restaurant_name: string;
  description: string;
  address: string;
  type: string[];
  images: string[];
};

type Props = {
  restaurant: Restaurant;
  destination: any;
};

const PlanRestaurantCard: React.FC<Props> = ({ restaurant, destination }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  return (
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Cover Image (Fill Layout) */}
      <div className="relative w-full h-40">
        <Image
          src={
            FILE_BASE_URL + "/" + restaurant.images?.[0] || "/placeholder.png"
          }
          alt={restaurant.restaurant_name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-800">
          {restaurant.restaurant_name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {restaurant.description}
        </p>

        {/* Types as Badges */}
        {restaurant.type?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {restaurant.type.map((tag, idx) => (
              <CommonBadge
                key={idx}
                label={tag}
                className="capitalize text-[11px]"
              />
            ))}
          </div>
        )}

        {/* Button */}
        <div className="pt-2 mt-auto">
          <CommonButton
            label="Book Now"
            className="!w-full"
            onClick={() => {
              setSelectedRestaurant(restaurant);
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>
      <PlanRestaurantModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        restaurant={selectedRestaurant}
        destination={destination}
      />
    </div>
  );
};

export default PlanRestaurantCard;
