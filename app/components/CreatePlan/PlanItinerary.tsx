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

const PlanItinerary = () => {
  const { packageData } = usePackageData();
  const { data: packageItems, isLoading: isPackageItemsLoading } =
    useControllerGetAgentPackageItemsByPackageId(packageData?.id || 0);

  // Initialize mutation hook for POST /itineraries
  const { mutateAsync: createPlanItinerary, isPending: isLoading } =
    useControllerPostCreateItinerary();

  // Memoize itemOptions to prevent recalculation on every render
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

  const initialFields = ["itineraryTitle", "startDate", "notes"];

  const { formData, errors, handleChange, handleSubmit, resetForm } =
    useForm(initialFields);

  // Initialize day data as an array of objects
  const [dayData, setDayData] = useState(() => {
    const duration = Number(packageData?.duration || 1);
    const startDate = packageData?.arrivalDate || "";
    return Array.from({ length: duration }, () => ({
      dayTitle: "",
      packageItem: "",
      customNotes: "",
    }));
  });

  // Update dayData with matched package items once itemOptions is available
  useMemo(() => {
    if (itemOptions.length > 0) {
      const duration = Number(packageData?.duration || 1);
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
  }, [itemOptions, packageData?.duration, packageData?.arrivalDate]);

  const handleDayChange = (index: number, field: string, value: string) => {
    const newDayData: any = [...dayData];
    newDayData[index][field] = value;
    setDayData(newDayData);
  };

  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      days: dayData,
    };

    // Use createPlanItinerary with then/catch for API call
    createPlanItinerary(finalData)
      .then((response) => {
        showSuccess({
          message: "Itinerary Created",
          description: "Your itinerary has been successfully saved!",
        });
        resetForm(); // Reset form fields
        setDayData(
          Array.from({ length: Number(packageData?.duration || 1) }, () => ({
            dayTitle: "",
            packageItem: "",
            customNotes: "",
          }))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
        showError({
          message: "Error Creating Itinerary",
          description:
            error.message || "An error occurred while saving the itinerary.",
        });
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
              value={formData.itineraryTitle}
              onChange={(e) => handleChange("itineraryTitle", e.target.value)}
              placeholder="e.g. Summer Vacation 2025"
              error={errors.itineraryTitle}
            />
            <CommonInput
              label="Start Date (Arrival)"
              type="date"
              value={formData.startDate}
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
                  value={day.packageItem} // Treat as string
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
