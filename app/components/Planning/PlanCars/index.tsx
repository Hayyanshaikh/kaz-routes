"use client";

import { useControllerGetFindAllCars } from "@/app/hooks/api";
import React, { useState } from "react";
import PlanCarCard from "./PlanCarCard";
import CommonPagination from "../../common/CommonPagination";
import { Spin } from "antd";

type Props = {
  destination: any;
};

const PlanCars = ({ destination }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useControllerGetFindAllCars({
    params: { page: currentPage },
  });
  const totalPages = data?.meta?.last_page || 1;
  const carData = data?.data || [];

  return isLoading ? (
    <div className="h-[300px] flex items-center justify-center">
      <Spin />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {carData.map((car: any) => (
          <PlanCarCard destination={destination} key={car.id} car={car} />
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

export default PlanCars;
