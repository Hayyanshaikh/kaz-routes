"use client";

import React, { useEffect, useState } from "react";
import CommonMultiSelect from "../common/CommonMultiSelect";
import CommonSelect from "../common/CommonSelect";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import {
  useControllerGetFindAllRestaurants,
  useControllerGetFindAllSites,
} from "@/app/hooks/api";

const RestaurantSection = ({ formData, handleChange, errors }) => {
  const { data: siteData } = useControllerGetFindAllSites();
  const { data: restaurantDataRes } = useControllerGetFindAllRestaurants();

  const siteOptions = dropdownManipulator(siteData?.data || []);
  const restaurantOptions = dropdownManipulator(restaurantDataRes?.data || []);

  const [selectedRestaurants, setSelectedRestaurants] = useState([]);

  useEffect(() => {
    const restaurantList = formData?.restaurantData || [];
    if (restaurantList.length && !selectedRestaurants.length) {
      setSelectedRestaurants(restaurantList);
    }
  }, [formData?.restaurantData]);

  // ✅ Clean array: remove "" values
  const sanitizeArray = (arr) =>
    Array.isArray(arr) ? arr.filter((item) => item !== "") : arr;

  // ✅ Safe handler for all fields
  const safeHandleChange = (field, value) => {
    const cleaned = sanitizeArray(value);
    handleChange(field, cleaned);
  };

  const handleRestaurantChange = (value) => {
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

  const updateRestaurantField = (id, field, value) => {
    setSelectedRestaurants((prev) => {
      const updated = prev.map((rest) =>
        rest.restaurantId === id ? { ...rest, [field]: value } : rest
      );
      handleChange("restaurantData", updated);
      return updated;
    });
  };

  const generateVariantOptions = (dishIds, restaurant) => {
    let variants = [];
    if (!restaurant?.dishes) return [];

    dishIds?.forEach((id) => {
      const dish = restaurant.dishes.find((d) => String(d.id) === id);
      if (dish?.variants) {
        variants.push(
          ...dish.variants.map((v) => ({
            id: String(v.id),
            name: v.size,
          }))
        );
      }
    });

    return variants.map((v) => ({ label: v.name, value: v.id }));
  };

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
            restaurantDetails?.dishes.map((d) => ({
              label: d.name,
              value: String(d.id),
            })) || [];

          const variantOptions = generateVariantOptions(
            rest.dishes,
            restaurantDetails
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
                  options={[
                    { label: "Breakfast", value: "breakfast" },
                    { label: "Brunch", value: "brunch" },
                    { label: "Lunch", value: "lunch" },
                    { label: "Tea", value: "tea" },
                    { label: "Dinner", value: "dinner" },
                    { label: "Supper", value: "supper" },
                    { label: "Snack", value: "snack" },
                  ]}
                />

                <CommonMultiSelect
                  label="Dishes"
                  value={Array.isArray(rest.dishes) ? rest.dishes : []}
                  onValueChange={(val) =>
                    updateRestaurantField(rest.restaurantId, "dishes", val)
                  }
                  options={dishOptions}
                />

                <CommonMultiSelect
                  label="Variants"
                  value={Array.isArray(rest.variants) ? rest.variants : []}
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
