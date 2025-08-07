import React from "react";
import CommonSelect from "../common/CommonSelect";
import {
  useControllerGetFindAllCars,
  useControllerGetFindAllTravelGuides,
} from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";

type Fields = {
  car?: string;
  guide?: string;
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: string) => void;
  errors: Fields;
};

const CarSection = ({ formData, handleChange, errors }: Props) => {
  const { data: carDataRes } = useControllerGetFindAllCars();
  const { data: guideDataRes } = useControllerGetFindAllTravelGuides();
  const carOptions = dropdownManipulator(carDataRes?.data || []);
  const guideOptions = dropdownManipulator(guideDataRes?.data || []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonSelect
        label="Select Car"
        value={formData?.car || ""}
        onValueChange={(value) => handleChange("car", value)}
        options={carOptions}
        placeholder="Choose your car"
        error={errors.car}
      />
      <CommonSelect
        label="Select Travel Guide"
        value={formData?.guide || ""}
        onValueChange={(value) => handleChange("guide", value)}
        options={guideOptions}
        placeholder="Choose your travel guide"
        error={errors.guide}
      />
    </div>
  );
};

export default CarSection;
