"use client";

import React, { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import CommonButton from "../common/CommonButton";
import CommonBadge from "../common/CommonBadge";
import CommonModal from "../common/CommonModal";
import Image from "next/image";
import useForm from "@/app/hooks/useForm";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";
import VehicleBookingForm from "../VehicleBookingForm";
import { formatCurrencyPKR } from "@/lib/utils";
import { useControllerPostCreateCarBooking } from "@/app/hooks/api";
import { showError, showSuccess } from "../common/CommonSonner";

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
  const { formData, errors, handleChange, resetForm, handleSubmit } = useForm([
    "name",
    "email",
    "phone",
    "pickupDate",
    "dropOffDate",
    "pickupLocation",
    "dropOffLocation",
    "specialRequests",
  ]);

  const { mutateAsync: carBooking, isPending } =
    useControllerPostCreateCarBooking();

  const onSubmit = () => {
    const payload = {
      car_id: id || "",
      customer_name: formData?.name || "",
      customer_email: formData?.email || "",
      customer_phone: formData?.phone || "",
      start_date: formData?.pickupDate || "",
      end_date: formData?.dropOffDate || "",
      pickup_location: formData?.pickupLocation || "",
      dropoff_location: formData?.dropOffLocation || "",
      special_requests: formData?.specialRequests || "",
    };

    carBooking(payload)
      .then(() => {
        console.log("Submit");
        showSuccess({
          message: "Booking done!",
          description: "Your booking has been confirmed successfully.",
        });
      })
      .catch((error) => {
        console.error(error);
        showError({
          message: "Failed",
          description: "Server did not respond.",
        });
      })
      .finally(() => {
        resetForm();
        setIsBookingModal(false);
      });

    // Success action
  };

  return (
    <>
      {/* Card */}
      <div
        className={`group bg-white rounded-lg shadow-sm overflow-hidden w-full border border-gray-200 hover:border-primary transition
        ${isVertical ? "flex flex-col" : "flex flex-col md:flex-row"}`}
      >
        {/* Image */}
        <div
          className={`relative ${
            isVertical
              ? "w-full h-60 border-b"
              : "w-full md:w-2/4 h-60 border-r"
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
          className={`p-4 flex flex-col justify-between text-gray-800 flex-1 ${
            isVertical ? "w-full" : "w-full md:w-2/3"
          }`}
        >
          {/* Location */}
          {isAvailable && (
            <CommonBadge
              className="capitalize mb-2"
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
          <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-200">
            <div className="text-gray-500 font-semibold">
              {formatCurrencyPKR(price)}
            </div>
            <CommonButton
              iconPosition="right"
              icon={<ArrowRight className="w-4 h-4" />}
              label="Book Now"
              onClick={() => setIsBookingModal(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <CommonModal
        className="!max-w-3xl"
        open={isBookingModal}
        onOpenChange={setIsBookingModal}
        title={`Book ${carBrand} ${carModel}`}
        loading={isPending}
        cancelText="Discard"
        confirmText="Book"
        destroyOnClose={false}
        onConfirm={() => {
          setIsBookingModal(true);
          handleSubmit(onSubmit);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <VehicleBookingForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        </form>
      </CommonModal>
    </>
  );
};

export default VehicleCard;
