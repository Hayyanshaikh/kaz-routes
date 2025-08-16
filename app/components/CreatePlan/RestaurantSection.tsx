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

type Fields = {
  sites: string[];
  restaurants: string[];
  restaurantData: RestaurantData[];
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

  const siteOptions = dropdownManipulator(siteData?.data || []);
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

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommonMultiSelect
          label="Select Sites"
          value={formData.sites}
          onValueChange={(value) => safeHandleChange("sites", value)}
          options={siteOptions}
          error={errors.sites}
        />

        <CommonMultiSelect
          label="Select Restaurants"
          value={formData.restaurants}
          onValueChange={handleRestaurantChange}
          options={restaurantOptions}
          error={errors.restaurants}
        />
      </div>

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

          // Filter meal types to remove already selected types in other restaurants
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
