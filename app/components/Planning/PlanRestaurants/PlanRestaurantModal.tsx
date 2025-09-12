"use client";

import React, { useState, useEffect } from "react";
import CommonModal from "../../common/CommonModal";
import CommonTabs from "../../common/CommonTabs";
import { TabItem } from "@/app/types/CommonType";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";
import { PlusOutlined } from "@ant-design/icons";
import useDestinationStore from "@/app/store/destinationStore";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  restaurant: any;
  destination: any;
};

const PlanRestaurantModal = ({
  open,
  setOpen,
  restaurant,
  destination,
}: Props) => {
  const { format } = useFormatCurrency();
  const { addRestaurant, removeRestaurant } = useDestinationStore();

  // ✅ Local state (variantId -> quantity)
  const [quantities, setQuantities] = useState<Record<string | number, number>>(
    {}
  );

  // ✅ Reset local state jab modal open ho
  useEffect(() => {
    if (open) {
      const initial: Record<string | number, number> = {};
      destination?.restaurants?.forEach((r: any) => {
        if (r.restaurantId === restaurant.id) {
          initial[r.variant.id] = r.quantity;
        }
      });
      setQuantities(initial);
    }
  }, [open, destination, restaurant]);

  // ✅ Update local state only
  const handleUpdateQuantity = (
    variantId: string | number,
    quantity: number
  ) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[variantId];
      } else {
        updated[variantId] = quantity;
      }
      return updated;
    });
  };

  // ✅ Render Variants
  const renderVariant = (dish: any, variants: any[]) => (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
      {variants?.map((v: any) => {
        const items = v.size.split(",").map((item: string) => item.trim());
        const qty = quantities[v.id] || 0;

        return (
          <div
            key={v.id}
            className={`flex flex-col border rounded-lg px-3 pb-2 pt-3 transition ${
              qty > 0
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

              {qty > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-200 text-gray-800 h-6 w-6 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateQuantity(v.id, qty - 1)}
                  >
                    –
                  </button>
                  <span className="w-6 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateQuantity(v.id, qty + 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-primary h-6 w-6 rounded-full flex items-center justify-center text-white"
                  onClick={() => handleUpdateQuantity(v.id, 1)}
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

  const tabItems: TabItem[] =
    restaurant?.dishes?.map((dish: any) => ({
      label: dish?.name,
      value: dish?.id,
      content: renderVariant(dish, dish.variants || []),
    })) || [];

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      centered
      onConfirm={() => {
        // 1) Purane items ko check karo
        destination?.restaurants?.forEach((r: any) => {
          const currentQty = quantities[r.variant.id];
          if (!currentQty || currentQty <= 0) {
            removeRestaurant(destination?.id, r.variant.id); // ✅ remove old
          }
        });

        // 2) Ab naye quantities save karo
        Object.entries(quantities).forEach(([variantId, qty]) => {
          const dish = restaurant.dishes.find((d: any) =>
            d.variants.some((v: any) => v.id == variantId)
          );
          const variant = dish?.variants.find((v: any) => v.id == variantId);

          if (dish && variant && qty > 0) {
            const payload = {
              id: variant.id,
              restaurant,
              dish,
              name: restaurant.restaurant_name,
              dishId: dish?.id,
              restaurantId: restaurant.id,
              variant,
              quantity: qty,
            };
            addRestaurant(destination?.id, payload); // ✅ update/add
          }
        });

        console.log("Saved Items:", destination?.restaurants);
      }}
      title={restaurant?.restaurant_name || "Menu"}
      confirmText="Book"
      width={768}
    >
      <CommonTabs tabs={tabItems} />
    </CommonModal>
  );
};

export default PlanRestaurantModal;
