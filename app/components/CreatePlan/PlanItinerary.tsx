"use client";
import useForm from "@/app/hooks/useForm";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";
import CommonSelect from "../common/CommonSelect";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import usePackageData from "@/app/store/usePackageData";
import { useState, useMemo } from "react";
import {
  useControllerGetAgentPackageItemsByPackageId,
  useControllerPostCreateItinerary,
} from "@/app/hooks/api";
import dayjs from "dayjs";
import { showError, showSuccess } from "../common/CommonSonner";

const PlanItinerary = ({ setSubmited, onFinish }) => {
  const { packageData } = usePackageData();
  const { data: packageItems, isLoading: isPackageItemsLoading } =
    useControllerGetAgentPackageItemsByPackageId(packageData?.id || 0);

  const { mutateAsync: createPlanItinerary, isPending: isLoading } =
    useControllerPostCreateItinerary();

  // Calculate duration from arrivalDate and flightDepartureDate
  const duration =
    packageData?.arrivalDate && packageData?.flightDepartureDate
      ? dayjs(packageData.flightDepartureDate).diff(
          dayjs(packageData.arrivalDate),
          "day"
        ) + 1
      : 1;

  const itemOptions = useMemo(() => {
    if (!packageItems?.data) return [];
    return packageItems.data.map((item) => ({
      label: `${dayjs(item.item_date).format("DD MMM, YYYY")} (${
        item.start_time
      } - ${item.end_time})`,
      value: String(item?.id),
      item_date: item.item_date,
    }));
  }, [packageItems?.data]);

  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    {
      name: "itineraryTitle",
      required: true,
      value: packageData?.packageName,
    },
    {
      name: "startDate",
      required: true,
      value: packageData?.arrivalDate,
    },
    { name: "notes", required: false, value: "" },
  ]);

  const [dayData, setDayData] = useState(() =>
    Array.from({ length: duration }, () => ({
      dayTitle: "",
      packageItem: "",
      customNotes: "",
    }))
  );

  useMemo(() => {
    if (itemOptions.length > 0) {
      const startDate = packageData?.arrivalDate || "";
      const updatedDayData = Array.from({ length: duration }, (_, i) => {
        const dayDate = dayjs(startDate).add(i, "day").format("YYYY-MM-DD");
        const matchedItem = itemOptions.find(
          (opt) => dayjs(opt.item_date).format("YYYY-MM-DD") === dayDate
        );
        return {
          dayTitle: dayData[i]?.dayTitle || "",
          packageItem: matchedItem?.value || dayData[i]?.packageItem || "",
          customNotes: dayData[i]?.customNotes || "",
        };
      });
      setDayData(updatedDayData);
    }
  }, [itemOptions, duration, packageData?.arrivalDate]);

  const handleDayChange = (index: number, field: string, value: string) => {
    const newDayData = [...dayData];
    newDayData[index][field] = value;
    setDayData(newDayData);
  };

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      days: dayData,
    };

    createPlanItinerary(finalData)
      .then(() => {
        showSuccess({
          message: "Itinerary Created",
          description: "Your itinerary has been successfully saved!",
        });
        resetForm();
        setDayData(
          Array.from({ length: duration }, () => ({
            dayTitle: "",
            packageItem: "",
            customNotes: "",
          }))
        );
        setSubmited(true);
        if (onFinish) onFinish(true, finalData);
      })
      .catch((error) => {
        console.error("Error:", error);
        showError({
          message: "Error Creating Itinerary",
          description:
            error.message || "An error occurred while saving the itinerary.",
        });
        if (onFinish) onFinish(false, error);
      });
  };

  return (
    <div>
      <CommonHeading className="text-left !mb-6" title="Itinerary Planner" />
      {isPackageItemsLoading ? (
        <div>Loading package items...</div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}
          className="space-y-4"
        >
          <div className="flex space-x-4">
            <CommonInput
              label="Itinerary Title"
              value={
                packageData?.packageName
                  ? packageData?.packageName
                  : formData.itineraryTitle
              }
              onChange={(e) => handleChange("itineraryTitle", e.target.value)}
              placeholder="e.g. Summer Vacation 2025"
              error={errors.itineraryTitle}
            />
            <CommonInput
              label="Start Date (Arrival)"
              type="date"
              disabled
              value={
                packageData?.arrivalDate
                  ? packageData.arrivalDate
                  : formData.startDate
              }
              onChange={(e) => handleChange("startDate", e.target.value)}
              error={errors.startDate}
            />
          </div>
          <CommonTextarea
            label="Notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="Any important notes..."
            error={errors.notes}
          />
          <h3 className="text-lg font-semibold mt-6">
            Assign Package Items to Each Day
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dayData.map((day, index) => (
              <div
                key={index}
                className="border p-4 rounded-md bg-white space-y-4"
              >
                <h3 className="font-medium text-base">Day {index + 1}</h3>
                <CommonInput
                  label={`Day ${index + 1} Title (optional)`}
                  value={day.dayTitle}
                  onChange={(e) =>
                    handleDayChange(index, "dayTitle", e.target.value)
                  }
                  placeholder="e.g. Swat Valley Exploration"
                  error={errors.dayTitle}
                />
                <CommonSelect
                  label="Select Package Item"
                  value={day.packageItem}
                  onValueChange={(value) =>
                    handleDayChange(index, "packageItem", value)
                  }
                  options={itemOptions}
                  error={errors.packageItem}
                />
                <CommonTextarea
                  label="Custom Notes (optional)"
                  value={day.customNotes}
                  onChange={(e) =>
                    handleDayChange(index, "customNotes", e.target.value)
                  }
                  placeholder="e.g. Confirm pickup, add lunch stop..."
                  error={errors.customNotes}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <CommonButton
              loading={isLoading}
              label="Save Itinerary"
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default PlanItinerary;
