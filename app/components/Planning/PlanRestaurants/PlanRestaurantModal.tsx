"use client";

import React, { useState, useEffect } from "react";
import CommonModal from "../../common/CommonModal";
import CommonTabs from "../../common/CommonTabs";
import { TabItem } from "@/app/types/CommonType";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";
import { PlusOutlined } from "@ant-design/icons";
import useDestinationStore from "@/app/store/destinationStore";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import { message, Form } from "antd";
import CommonDatePicker from "../../common/CommonDatePicker";
import CommonSelect from "../../common/CommonSelect";
import dayjs from "dayjs";

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
  const [messageApi, contextHolder] = message.useMessage();
  const { format } = useFormatCurrency();
  const { addRestaurant, removeRestaurant } = useDestinationStore();

  const [form] = Form.useForm();
  const [quantities, setQuantities] = useState<Record<string | number, number>>(
    {},
  );

  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  // ✅ Reset local state jab modal open ho
  useEffect(() => {
    if (open && restaurant) {
      const initial: Record<string | number, number> = {};
      const firstVariantBooking = destination?.restaurants?.find(
        (r: any) => r.restaurantId === restaurant.id
      );
      
      const bookedDates = firstVariantBooking?.selectedDate?.map((d: any) => dayjs(d)) || [];
      const mealType = firstVariantBooking?.mealType;

      form.setFieldsValue({
        selectedDate: bookedDates,
        mealType: mealType,
      });

      destination?.restaurants?.forEach((r: any) => {
        if (r.restaurantId === restaurant.id) {
          initial[r.variant.id] = r.quantity;
        }
      });
      setQuantities(initial);
    }
  }, [open, destination, restaurant, form]);

  const handleUpdateQuantity = (
    variantId: string | number,
    quantity: number,
  ) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) delete updated[variantId];
      else updated[variantId] = quantity;
      return updated;
    });
  };

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
            <ul className="list-disc flex flex-col list-inside text-xs text-gray-600 space-y-1 mb-3">
              {items.map((i: string, idx: number) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-auto gap-2 border-t border-dashed border-gray-300 pt-3">
              <span className="text-sm font-medium text-gray-800">
                {format(v?.price)}
              </span>

              {qty > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="bg-gray-200 text-gray-800 h-6 w-6 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateQuantity(v.id, qty - 1)}
                  >
                    –
                  </button>
                  <span className="w-6 text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="bg-primary text-white h-6 w-6 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateQuantity(v.id, qty + 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  type="button"
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

  const mealTypeOptions = [
    { value: "breakfast", label: "Breakfast" },
    { value: "brunch", label: "Brunch" },
    { value: "lunch", label: "Lunch" },
    { value: "snack", label: "Snack" },
    { value: "dinner", label: "Dinner" },
  ];

  // ✅ Form Submit Handler
  const handleFinish = (values: any) => {
    const { selectedDate, mealType } = values;

    if (!selectedDate || selectedDate.length === 0) {
      messageApi.error("Please select at least one date before booking.");
      return;
    }

    if (!mealType) {
      messageApi.error("Please select a meal type.");
      return;
    }

    // Purane items remove
    destination?.restaurants?.forEach((r: any) => {
      if (r.restaurantId === restaurant.id) {
        const currentQty = quantities[r.variant.id];
        if (!currentQty || currentQty <= 0) {
          removeRestaurant(destination?.id, r.variant.id);
        }
      }
    });

    // Naye items add
    Object.entries(quantities).forEach(([variantId, qty]) => {
      const dish = restaurant.dishes.find((d: any) =>
        d.variants.some((v: any) => v.id == variantId),
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
          mealType,
          selectedDate: selectedDate,
          quantity: qty,
        };
        addRestaurant(destination?.id, payload);
      }
    });

    messageApi.success("Booking saved successfully!");
    setOpen(false);
  };

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      destroyOnClose={false}
      centered
      title={restaurant?.restaurant_name || "Menu"}
      confirmText="Book"
      width={768}
      onConfirm={() => form.submit()} // ✅ trigger antd form submit
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-4"
      >
        <div className="flex items-start gap-4">
          <CommonDatePicker
            label="Please select a date for your booking:"
            name="selectedDate"
            multiple
            allowedDates={allowedDates}
          />

          <CommonSelect
            name="mealType"
            label="Meal Type"
            isRequired
            options={mealTypeOptions}
            className="w-full"
          />
        </div>

        <CommonTabs tabs={tabItems} />
      </Form>
    </CommonModal>
  );
};

export default PlanRestaurantModal;
