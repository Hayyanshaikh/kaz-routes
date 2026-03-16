"use client";

import { FILE_BASE_URL } from "@/lib/constant";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import CommonButton from "../../common/CommonButton";
import PlanCarModal from "./PlanCarModal";
import useDestinationStore from "@/app/store/destinationStore";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import { useTranslations } from "next-intl";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";
import usePlanStore from "@/app/store/planStore";

type PlanCarCardProps = {
  car: any;
  destination: any;
  buttonText?: string;
};

const PlanCarCard = ({ car, destination, buttonText }: PlanCarCardProps) => {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);

  const { format } = useFormatCurrency();

  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  const removeCar = useDestinationStore((state) => state.removeCar);

  const plan = usePlanStore((state) => state.plan);
  const requiredSeats = (plan?.adults || 0) + (plan?.childrens || 0);
  const hasEnoughSeats = Number(car?.seating_capacity) >= requiredSeats;

  const isBooked = useMemo(() => {
    return destination?.cars?.some((c: any) => c?.id === car?.id);
  }, [destination?.cars, car?.id]);

  const handleRemove = () => {
    if (destination?.id && car?.id) {
      removeCar(destination?.id, car?.id);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        {/* Car Image */}
        {car?.images?.length > 0 ? (
          <div className="relative w-full h-44">
            <Image
              src={`${FILE_BASE_URL}/${car?.images?.[0]?.image_path}`}
              alt={car?.model || "car"}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            {t("noImage")}
          </div>
        )}

        {/* Car Info */}
        <div className="p-4 space-y-2">
          <h3 className="text-base font-semibold text-gray-900">
            {car?.brand?.name} {car?.model}
          </h3>

          <p className="text-sm text-gray-500">
            {car?.year} • {car?.category?.name}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
            <span>Fuel: {car?.fuel_type}</span>
            <span>Trans: {car?.transmission}</span>
            <span>Seats: {car?.seating_capacity}</span>
            <span className="font-semibold text-primary">
              {Number(car?.daily_rate) > 0
                ? t("ratePerDay", { rate: format(car?.daily_rate) })
                : t("onRequest")}
            </span>
          </div>

          {isBooked ? (
            <CommonButton
              onClick={handleRemove}
              className="w-full! bg-red-500! hover:bg-red-600!"
              label={t("deleteBooking")}
            />
          ) : (
            <div
              title={
                allowedDates?.length === 0
                  ? t("addNightsToBook")
                  : !hasEnoughSeats
                  ? `Requires at least ${requiredSeats} seats`
                  : ""
              }
              className="w-full"
            >
              <CommonButton
                onClick={() => setOpen(true)}
                className="w-full!"
                label={buttonText || t("button")}
                disabled={allowedDates?.length === 0 || !hasEnoughSeats}
              />
            </div>
          )}
        </div>
      </div>

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
