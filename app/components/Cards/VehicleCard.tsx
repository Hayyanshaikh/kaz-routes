"use client";

import React, { useState } from "react";
import { EnvironmentOutlined, ArrowRightOutlined } from "@ant-design/icons"; // ⬅️ AntD Icons
import CommonButton from "../common/CommonButton";
import CommonBadge from "../common/CommonBadge";
import CommonModal from "../common/CommonModal";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { useControllerPostCreateCarBooking } from "@/app/hooks/api";
import { showError, showSuccess } from "../common/CommonSonner";
import { Form, Input, DatePicker } from "antd";
import VehicleBookingForm from "../VehicleBookingForm";

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

  const { mutateAsync: carBooking, isPending } =
    useControllerPostCreateCarBooking();

  const onSubmit = (values: any) => {
    const payload = {
      car_id: id || "",
      customer_name: values.name || "",
      customer_email: values.email || "",
      customer_phone: values.phone || "",
      start_date: values.pickupDate?.format("YYYY-MM-DD") || "",
      end_date: values.dropOffDate?.format("YYYY-MM-DD") || "",
      pickup_location: values.pickupLocation || "",
      dropoff_location: values.dropOffLocation || "",
      special_requests: values.specialRequests || "",
    };

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
        onOpenChange={setIsBookingModal}
        title={`Book ${carBrand} ${carModel}`}
        loading={isPending}
        cancelText="Discard"
        confirmText="Book"
        destroyOnClose={false}
        onConfirm={() => {
          form.submit();
        }}
      >
        <Form form={form} layout="vertical">
          <VehicleBookingForm />
        </Form>
      </CommonModal>
    </>
  );
};

export default VehicleCard;
