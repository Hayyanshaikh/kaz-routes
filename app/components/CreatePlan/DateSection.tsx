"use client";
import React from "react";
import CommonInput from "../common/CommonInput";
import usePackageData from "@/app/store/usePackageData";
import dayjs from "dayjs";

type Fields = {
  [key: string]: { startTime?: string; endTime?: string };
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: string) => void;
  errors: Fields;
  date: string; // currently active date
};

const DateSection = ({ formData, handleChange, errors, date }: Props) => {
  const { packageData } = usePackageData();

  const duration = Number(packageData?.duration) || 0;

  const arrivalDate = dayjs(packageData?.arrivalDate).format("YYYY-MM-DD");
  const departureDate = dayjs(packageData?.arrivalDate)
    .add(duration - 1, "day")
    .format("YYYY-MM-DD");

  if (!date) return null;

  const isArrivalDay = date === arrivalDate;
  const isDepartureDay = date === departureDate;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Start Time */}
        <CommonInput
          type="time"
          value={
            isArrivalDay
              ? packageData?.flightArrivalTime
              : formData?.startTime || ""
          }
          disabled={isArrivalDay}
          onChange={(e) => handleChange("startTime", e.target.value)}
          error={errors?.startTime}
        />

        {/* End Time */}
        <CommonInput
          type="time"
          value={
            isDepartureDay
              ? packageData?.flightDepartureTime
              : formData?.endTime || ""
          }
          disabled={isDepartureDay}
          onChange={(e) => handleChange("endTime", e.target.value)}
          error={errors?.endTime}
        />
      </div>
    </div>
  );
};

export default DateSection;
