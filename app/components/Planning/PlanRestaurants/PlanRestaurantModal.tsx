"use client";

import React from "react";
import CommonModal from "../../common/CommonModal";
import CommonTabs from "../../common/CommonTabs";
import { TabItem } from "@/app/types/CommonType";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import useDestinationStore from "@/app/store/destinationStore";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  restaurant: any;
  destination: any; // ✅ jahan add/remove karna ho
};

const PlanRestaurantModal = ({
  open,
  setOpen,
  restaurant,
  destination,
}: Props) => {
  const { format } = useFormatCurrency();
  const { addRestaurant, removeRestaurant } = useDestinationStore();

  console.log({ add: destination });

  // ✅ Add Variant
  const handleSelectVariant = (dishId: string | number, variant: any) => {
    const payload = {
      id: variant.id,
      name: restaurant.restaurant_name,
      dishId: dishId,
      restaurantId: restaurant.id,
      variant: variant,
    };

    addRestaurant(destination?.id, payload);
  };

  // ✅ Remove Variant
  const handleRemoveVariant = (variantId: string | number) => {
    removeRestaurant(destination?.id, variantId);
  };

  // ✅ Check if variant is already added
  const isVariantAdded = (variantId: string | number) => {
    return destination?.restaurants?.some(
      (r: any) => r.variant.id === variantId
    );
  };

  // Render Variants of a Dish
  const renderVariant = (dishId: string | number, variants: any[]) => {
    return (
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
        {variants?.map((v: any) => {
          const items = v.size.split(",").map((item: string) => item.trim());
          const added = isVariantAdded(v.id);

          return (
            <div
              key={v.id}
              className={`flex flex-col border rounded-lg px-3 pb-2 pt-3 transition ${
                added
                  ? "border-primary bg-primary/5"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {/* Items List */}
              <ul className="list-disc flex flex-col list-inside text-xs text-gray-600 space-y-1 mb-3">
                {items.map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>

              {/* Price + Action */}
              <div className="flex items-center justify-between mt-auto gap-2 border-t border-dashed border-gray-300 pt-3">
                <span className="text-sm font-medium text-gray-800">
                  {format(v?.price)}
                </span>
                {added ? (
                  <button
                    className="bg-red-500 h-6 w-6 rounded-full flex items-center justify-center text-white"
                    onClick={() => handleRemoveVariant(v.id)}
                  >
                    <CloseOutlined />
                  </button>
                ) : (
                  <button
                    className="bg-primary h-6 w-6 rounded-full flex items-center justify-center text-white"
                    onClick={() => handleSelectVariant(dishId, v)}
                  >
                    <PlusOutlined />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Tabs for each Dish
  const tabItems: TabItem[] =
    restaurant?.dishes?.map((dish: any) => ({
      label: dish?.name,
      value: dish?.id,
      content: renderVariant(dish.id, dish.variants || []),
    })) || [];

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      centered
      title={restaurant?.restaurant_name || "Menu"}
      confirmText="Book"
      width={768}
    >
      <CommonTabs tabs={tabItems} />
    </CommonModal>
  );
};

export default PlanRestaurantModal;
