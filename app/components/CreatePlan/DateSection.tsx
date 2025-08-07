"use client";
import React from "react";
import CommonInput from "../common/CommonInput";
import usePackageData from "@/app/store/usePackageData";
import dayjs from "dayjs";

type Fields = {
  startTime?: string;
  endTime?: string;
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: string) => void;
  errors: Fields;
};

const DateSection = ({ formData, handleChange, errors }: Props) => {
  const { packageData } = usePackageData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput
        type="time"
        label="Start Time"
        value={formData?.startTime || ""}
        onChange={(e) => handleChange("startTime", e.target.value)}
        error={errors.startTime}
      />
      <CommonInput
        type="time"
        label="End Time"
        value={formData?.endTime || ""}
        onChange={(e) => handleChange("endTime", e.target.value)}
        error={errors.endTime}
      />
    </div>
  );
};

export default DateSection;
