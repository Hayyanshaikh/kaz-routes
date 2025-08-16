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
  isArrivalDay: boolean;
  isDepartureDay: boolean;
};

const DateSection = ({
  formData,
  handleChange,
  errors,
  isArrivalDay,
  isDepartureDay,
}: Props) => {
  const { packageData } = usePackageData();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Start Time */}
        <CommonInput
          type="time"
          value={
            isArrivalDay
              ? packageData?.flightArrivalTime
              : formData?.startTime || "10:00"
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
              : formData?.endTime || "21:30"
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
