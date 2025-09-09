"use client";

import React, { useState } from "react";
import { ArrowRightOutlined } from "@ant-design/icons"; // ⬅️ AntD Icons
import CommonButton from "../common/CommonButton";
import CommonBadge from "../common/CommonBadge";
import CommonModal from "../common/CommonModal";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useControllerPostCreateCarBooking } from "@/app/hooks/api";
import { showError, showSuccess } from "../common/CommonSonner";
import { Form, Input } from "antd";
import VehicleBookingForm from "../VehicleBookingForm";
import dayjs from "dayjs";

const { TextArea } = Input;

interface VehicleCardProps {
  imageUrl: string;
  isAvailable: string;
  carBrand: string;
  id: string;
  carModel: string;
  features: string[];
  price: number;
  layout?: "vertical" | "horizontal";
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  imageUrl,
  isAvailable,
  carBrand,
  carModel,
  features,
  id,
  price,
  layout = "horizontal",
}) => {
  const isVertical = layout === "vertical";
  const [isBookingModal, setIsBookingModal] = useState(false);
  const [form] = Form.useForm();
  // todo: this task pending
  const { mutateAsync: carBooking, isPending } =
    useControllerPostCreateCarBooking();

  const onSubmit = (values: any) => {
    console.log({ values });

    const payload = {
      day_plan_json: values.days?.map((d: any) => ({
        date: d.date,
        outOfCity: d.outOfCity || false,
        notes: d.notes || "",
        hotelId: d.hotel ? Number(d.hotel) : null,
        hotelRoomId: d.hotelRoom ? Number(d.hotelRoom) : null,
        hotelRoomQty: d.hotelRoomQty ? Number(d.hotelRoomQty) : null,
        siteId: d.site ? Number(d.site) : null,
        restaurantId: d.restaurant ? Number(d.restaurant) : null,
        mealType: d.mealType || null,
        dishIds: d.dishes || [],
        variantIds: d.variants || [],
      })),
      car_id: Number(id),

      pickup_date: dayjs(values.pickupDate).format("YYYY-MM-DD") || "",
      dropoff_date: dayjs(values.dropOffDate).format("YYYY-MM-DD") || "",

      customer_name: values.customerName || "",
      customer_email: values.email || "",
      customer_phone: values.phone || "",

      pickup_address: values.pickup_location || "",
      pickup_lat: "",
      pickup_lng: "",

      dropoff_address: values.dropoff_location || "",
      dropoff_lat: "",
      dropoff_lng: "",

      special_requests: values.specialRequests || "",

      estimated_days: values.days?.length || 0,
      estimated_total: values.estimated_total,
    };

    console.log("Final Payload:", payload);

    // ab backend call karo
    carBooking(payload)
      .then(() => {
        showSuccess({
          message: "Booking done!",
          description: "Your booking has been confirmed successfully.",
        });
      })
      .catch((error) => {
        showError({
          message: "Failed",
          description:
            error?.response?.data?.message || "Server did not respond.",
        });
      })
      .finally(() => {
        form.resetFields();
        setIsBookingModal(false);
      });
  };

  return (
    <>
      {/* Card */}
      <div
        className={`group bg-white rounded-lg shadow-sm overflow-hidden w-full border border-gray-200 hover:border-primary transition
        ${isVertical ? "flex flex-col" : "flex flex-col sm:flex-row"}`}
      >
        {/* Image */}
        <div
          className={`relative border-gray-300 ${
            isVertical
              ? "w-full h-full border-b"
              : "w-full sm:w-2/4 sm:border-r"
          } flex items-center justify-center p-4 group-hover:bg-primary/10 group-hover:border-primary transition`}
        >
          <Image
            fill
            src={imageUrl}
            alt={`${carBrand} ${carModel}`}
            className="!relative w-full h-full object-contain group-hover:scale-105 transition"
          />
        </div>

        {/* Details */}
        <div
          className={`p-4 flex flex-col items-start justify-between text-gray-800 flex-1 ${
            isVertical ? "w-full" : "w-full md:w-2/3"
          }`}
        >
          {/* Availability */}
          {isAvailable && (
            <CommonBadge
              className="capitalize !mb-2"
              label={isAvailable}
              color={
                isAvailable === "available"
                  ? "success"
                  : isAvailable === "booked"
                  ? "error"
                  : "warning"
              }
            />
          )}

          {/* Brand & Model */}
          <div>
            <h3 className="text-xl font-semibold text-stone-800 mb-2">
              {carBrand}
            </h3>
            <h3 className="text-sm text-gray-600 mb-2">{carModel}</h3>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {features.map((feature, index) => (
              <CommonBadge
                className="bg-gray-200 text-stone-800"
                key={index}
                label={feature}
              />
            ))}
          </div>

          {/* Price & Button */}
          <div className="flex items-center w-full justify-between pt-2 mt-auto border-t border-gray-200">
            <div className="text-gray-500 font-semibold">
              {formatCurrency(price)}
            </div>
            <CommonButton
              iconPosition="right"
              icon={<ArrowRightOutlined className="text-primary" />} // ✅ AntD icon
              label="Book Now"
              onClick={() => setIsBookingModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <CommonModal
        open={isBookingModal}
        setOpen={setIsBookingModal}
        title={`Book ${carBrand} ${carModel}`}
        loading={isPending}
        cancelText="Discard"
        confirmText="Book"
        destroyOnClose={false}
        onClose={() => form.resetFields()}
        width={`100%`}
        onConfirm={() => {
          form.submit();
        }}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <div className="flex items-start gap-4">
            <VehicleBookingForm price={price} form={form} />
          </div>
        </Form>
      </CommonModal>
    </>
  );
};

export default VehicleCard;
