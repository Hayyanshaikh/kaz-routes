"use client";

import { useControllerGetFindAllRestaurants } from "@/app/hooks/api";
import React, { useState } from "react";
import PlanRestaurantCard from "./PlanRestaurantCard";
import { Spin } from "antd";
import CommonPagination from "../../common/CommonPagination";

type Props = {
  destination: any;
};

const PlanRestaurants = ({ destination }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useControllerGetFindAllRestaurants({
    params: { page: currentPage },
  });
  const totalPages = data?.meta?.last_page || 1;
  const restaurantsData = data?.data || [];

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantsData?.map((restaurant: any) => (
          <PlanRestaurantCard
            destination={destination}
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
      {/* Pagination */}
      <div className="mt-8">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default PlanRestaurants;
