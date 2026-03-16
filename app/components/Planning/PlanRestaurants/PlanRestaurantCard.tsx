"use client";

import React, { useState } from "react";
import Image from "next/image";
import CommonButton from "../../common/CommonButton";
import CommonBadge from "../../common/CommonBadge";
import { FILE_BASE_URL } from "@/lib/constant";
import PlanRestaurantModal from "./PlanRestaurantModal";
import useDestinationStore from "@/app/store/destinationStore";
import { message } from "antd";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import { useTranslations } from "next-intl";

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
  buttonText?: string;
};

const PlanRestaurantCard: React.FC<Props> = ({
  restaurant,
  destination,
  buttonText,
}) => {
  const t = useTranslations("search");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const { removeRestaurant } = useDestinationStore();
  const [messageApi, contextHolder] = message.useMessage();
  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  const isBooked = destination?.restaurants?.some(
    (r: any) => r.restaurantId === restaurant.id,
  );

  const handleDelete = () => {
    if (destination?.restaurants) {
      const variantsToRemove = destination.restaurants.filter(
        (r: any) => r.restaurantId === restaurant.id,
      );

      if (variantsToRemove.length > 0) {
        variantsToRemove.forEach((v: any) => {
          removeRestaurant(destination.id, v.variant.id);
        });
        messageApi.success(t("restaurantBookingRemoved"));
      }
    }
  };

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg overflow-hidden bg-white">
      {contextHolder}
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
      <div className="p-3 flex flex-col gap-2 flex-1">
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
          {isBooked ? (
            <CommonButton
              label={t("deleteBooking")}
              className="w-full! bg-red-500! hover:bg-red-600!"
              onClick={handleDelete}
            />
          ) : (
            <div
              title={allowedDates.length === 0 ? t("addNightsToBook") : ""}
              className="w-full"
            >
              <CommonButton
                label={buttonText || t("button")}
                className="w-full!"
                disabled={allowedDates.length === 0}
                onClick={() => {
                  setSelectedRestaurant(restaurant);
                  setIsModalOpen(true);
                }}
              />
            </div>
          )}
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
