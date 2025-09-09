"use client";

import { useControllerGetFindAllRestaurants } from "@/app/hooks/api";
import React from "react";
import PlanRestaurantCard from "./PlanRestaurantCard";
import { Spin } from "antd";

type Props = {
  destination: any;
};

const PlanRestaurants = ({ destination }: Props) => {
  const { data, isLoading } = useControllerGetFindAllRestaurants();
  const restaurantsData = data?.data || [];

  if (isLoading) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurantsData?.map((restaurant: any) => (
        <PlanRestaurantCard
          destination={destination}
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  );
};

export default PlanRestaurants;
