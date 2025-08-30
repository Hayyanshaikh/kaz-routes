"use client";

import React, { useEffect, useState } from "react";
import CommonMultiSelect from "../common/CommonMultiSelect";
import CommonSelect from "../common/CommonSelect";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import {
  useControllerGetFindAllRestaurants,
  useControllerGetFindAllSites,
} from "@/app/hooks/api";

type RestaurantData = {
  restaurantId: string;
  mealType: string;
  dishes: string[];
  variants: string[];
};

type Site = {
  id: string;
  name: string;
  duration_hours: number;
};

type Fields = {
  sites: string[];
  restaurants: string[];
  restaurantData: RestaurantData[];
  startTime: string;
  endTime: string;
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: any) => void;
  errors: Partial<Record<keyof Fields, string>>;
};

const RestaurantSection: React.FC<Props> = ({
  formData,
  handleChange,
  errors,
}) => {
  const { data: siteData } = useControllerGetFindAllSites();
  const { data: restaurantDataRes } = useControllerGetFindAllRestaurants();

  const sites: Site[] = siteData?.data || [];
  const restaurantOptions = dropdownManipulator(restaurantDataRes?.data || []);
  const [selectedRestaurants, setSelectedRestaurants] = useState<
    RestaurantData[]
  >([]);

  useEffect(() => {
    const restaurantList = formData?.restaurantData || [];
    if (restaurantList.length && !selectedRestaurants.length) {
      setSelectedRestaurants(restaurantList);
    }
  }, [formData?.restaurantData, selectedRestaurants.length]);

  // Helper: total hours between start and end time
  const getAvailableHours = () => {
    const start = formData.startTime
      ? parseInt(formData.startTime.split(":")[0])
      : 0;
    const end = formData.endTime ? parseInt(formData.endTime.split(":")[0]) : 0;
    return end - start;
  };

  // Helper: total duration of selected sites
  const selectedSitesDuration = (selectedIds: string[]) =>
    selectedIds.reduce((acc, id) => {
      const site = sites.find((s) => s.id === id);
      return acc + (site?.duration_hours || 0);
    }, 0);

  // Filter sites based on remaining hours
  const getAvailableSites = () => {
    const remainingHours =
      getAvailableHours() - selectedSitesDuration(formData.sites);
    return sites.filter((s) => s.duration_hours <= remainingHours);
  };

  const handleSiteChange = (selectedIds: string[]) => {
    let remainingHours = getAvailableHours();
    const validSelection: string[] = [];

    selectedIds.forEach((id) => {
      const site = sites.find((s) => s.id === id);
      if (site && site.duration_hours <= remainingHours) {
        validSelection.push(id);
        remainingHours -= site.duration_hours;
      } else if (formData.sites.includes(id)) {
        // keep already selected site even if remainingHours < duration
        validSelection.push(id);
      }
    });

    handleChange("sites", validSelection);
  };

  const sanitizeArray = (arr: string[] | undefined) =>
    Array.isArray(arr) ? arr.filter((item) => item !== "") : [];

  const safeHandleChange = (field: string, value: any) => {
    const cleaned = Array.isArray(value) ? sanitizeArray(value) : value;
    handleChange(field, cleaned);
  };

  const handleRestaurantChange = (value: string[]) => {
    const cleanedValue = sanitizeArray(value);
    safeHandleChange("restaurants", cleanedValue);

    const filtered = selectedRestaurants?.filter((r) =>
      cleanedValue.includes(r.restaurantId)
    );

    const newOnes = cleanedValue
      .filter((id) => !filtered.find((r) => r.restaurantId === id))
      .map((id) => ({
        restaurantId: id,
        mealType: "",
        dishes: [],
        variants: [],
      }));

    const updated = [...filtered, ...newOnes];
    setSelectedRestaurants(updated);
    handleChange("restaurantData", updated);
  };

  const updateRestaurantField = (
    id: string,
    field: keyof RestaurantData,
    value: any
  ) => {
    setSelectedRestaurants((prev) => {
      const updated = prev.map((rest) =>
        rest.restaurantId === id ? { ...rest, [field]: value } : rest
      );
      handleChange("restaurantData", updated);
      return updated;
    });
  };

  const generateVariantOptions = (dishIds: string[], restaurant: any) => {
    if (!restaurant?.dishes) return [];
    let variants: { label: string; value: string }[] = [];
    dishIds?.forEach((id) => {
      const dish = restaurant.dishes.find((d: any) => String(d.id) === id);
      if (dish?.variants) {
        variants.push(
          ...dish.variants.map((v: any) => ({
            label: v.size,
            value: String(v.id),
          }))
        );
      }
    });
    return variants;
  };

  const mealTypeOptions = [
    { label: "Breakfast", value: "breakfast" },
    { label: "Brunch", value: "brunch" },
    { label: "Lunch", value: "lunch" },
    { label: "Tea", value: "tea" },
    { label: "Dinner", value: "dinner" },
    { label: "Supper", value: "supper" },
    { label: "Snack", value: "snack" },
  ];

  // Combine already selected + available new sites
  const dropdownSites = [
    ...sites.filter((s) => formData.sites.includes(s.id)), // always include selected
    ...getAvailableSites().filter((s) => !formData.sites.includes(s.id)), // only remaining hours fit
  ];

  return (
    <div className="flex flex-col gap-6">
      <CommonMultiSelect
        label="Select Sites"
        value={formData.sites}
        onValueChange={handleSiteChange}
        options={dropdownSites.map((s) => ({ label: s.name, value: s.id }))}
        error={errors.sites}
      />
      <CommonMultiSelect
        label="Select Restaurants"
        value={formData.restaurants}
        onValueChange={handleRestaurantChange}
        options={restaurantOptions}
        error={errors.restaurants}
      />

      {selectedRestaurants
        .filter((rest) =>
          restaurantDataRes?.data?.some(
            (r) => String(r.id) === rest.restaurantId
          )
        )
        .map((rest) => {
          const restaurantDetails = restaurantDataRes?.data?.find(
            (r) => String(r.id) === rest.restaurantId
          );

          const dishOptions =
            restaurantDetails?.dishes?.map((d: any) => ({
              label: d.name,
              value: String(d.id),
            })) || [];

          const variantOptions = generateVariantOptions(
            rest.dishes,
            restaurantDetails
          );

          const selectedMealTypes = selectedRestaurants
            .filter((r) => r.restaurantId !== rest.restaurantId)
            .map((r) => r.mealType)
            .filter(Boolean);

          const filteredMealOptions = mealTypeOptions.filter(
            (option) => !selectedMealTypes.includes(option.value)
          );

          return (
            <div
              key={rest.restaurantId}
              className="border p-4 rounded-md shadow bg-white space-y-4"
            >
              <h3 className="font-semibold text-lg mb-2">
                Restaurant: {restaurantDetails?.restaurant_name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CommonSelect
                  label="Meal Type"
                  value={rest.mealType}
                  onValueChange={(val) =>
                    updateRestaurantField(rest.restaurantId, "mealType", val)
                  }
                  options={filteredMealOptions}
                />

                <CommonMultiSelect
                  label="Dishes"
                  value={rest.dishes}
                  onValueChange={(val) =>
                    updateRestaurantField(rest.restaurantId, "dishes", val)
                  }
                  options={dishOptions}
                />

                <CommonMultiSelect
                  label="Variants"
                  value={rest.variants}
                  onValueChange={(val) =>
                    updateRestaurantField(rest.restaurantId, "variants", val)
                  }
                  options={variantOptions}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default RestaurantSection;
