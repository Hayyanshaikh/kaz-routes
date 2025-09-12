"use client";

import { FILE_BASE_URL } from "@/lib/constant";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import CommonButton from "../../common/CommonButton";
import PlanCarModal from "./PlanCarModal";
import useDestinationStore from "@/app/store/destinationStore";

type PlanCarCardProps = {
  car: any;
  destination: any;
};

const PlanCarCard = ({ car, destination }: PlanCarCardProps) => {
  const [open, setOpen] = useState(false);

  // ✅ Store se removeCar nikalo
  const removeCar = useDestinationStore((state) => state.removeCar);

  // ✅ Check karo car already booked hai ya nahi
  const isBooked = useMemo(() => {
    return destination?.cars?.some((c: any) => c.id === car.id);
  }, [destination?.cars, car.id]);

  const handleRemove = () => {
    if (destination?.id && car?.id) {
      removeCar(destination.id, car.id);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        {/* Car Image */}
        {car.images?.length > 0 ? (
          <div className="relative w-full h-44">
            <Image
              src={`${FILE_BASE_URL}/${car.images[0].image_path}`}
              alt={car.model}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Car Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold text-gray-900">
            {car.brand?.name} {car.model}
          </h3>
          <p className="text-sm text-gray-500">
            {car.year} • {car.category?.name}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
            <span>Fuel: {car.fuel_type}</span>
            <span>Trans: {car.transmission}</span>
            <span>Seats: {car.seating_capacity}</span>
            <span className="font-semibold text-primary">
              {car.daily_rate ? `PKR ${car.daily_rate}/day` : "On Request"}
            </span>
          </div>

          {isBooked ? (
            <CommonButton
              onClick={handleRemove}
              className="!w-full !bg-red-500 hover:!bg-red-600"
              label="Delete Booking"
            />
          ) : (
            <CommonButton
              onClick={() => setOpen(true)}
              className="!w-full"
              label="Book Now"
            />
          )}
        </div>
      </div>

      {/* Modal sirf tab open hoga jab Book Now dabao */}
      {!isBooked && (
        <PlanCarModal
          destination={destination}
          car={car}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default PlanCarCard;
