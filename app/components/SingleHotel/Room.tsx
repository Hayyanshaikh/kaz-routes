"use client";

import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { Bath, Bed, CookingPot } from "lucide-react";
import { PropertyDetailProps } from "@/app/types/CommonType";
import CommonBadge from "../common/CommonBadge";
import { formatCurrencyPKR } from "@/lib/utils";
import CommonModal from "../common/CommonModal";
import HotelBookingForm from "../HotelForm";
import useForm from "@/app/hooks/useForm";
import { showError, showSuccess } from "../common/CommonSonner";

const Room = ({ room }: PropertyDetailProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    "name",
    "email",
    "phone",
    "checkInDate",
    "checkOutDate",
    "city",
    "hotelName",
    "roomName",
    "bedType",
    "mealPlan",
    "roomCount",
    "guestCount",
    "specialRequests",
  ]);

  const handleConfirm = () => {
    handleSubmit(async (data) => {
      setLoading(true);

      const message = "Booking Confirmed";
      const description =
        "Your booking request has been successfully submitted. We will get back to you shortly.";

      try {
        console.log("Booking Data:", data);
        // ✅ API call ya processing yahan kro
        showSuccess({
          message,
          description,
        });
        setOpen(false);
        resetForm();
      } catch (err) {
        console.error("Booking Error:", err);
        showError({
          message: "Booking Failed",
          description:
            "Something went wrong while processing your booking. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{room.name} Room</h3>
          <CommonBadge color="success" label={room?.status} />
        </div>
        <p className="text-lg font-semibold text-gray-900">
          {room.pricing.single &&
            Number(room.pricing.single).toLocaleString("en-PK", {
              style: "currency",
              currency: "PKR",
              minimumFractionDigits: 2,
            })}
          <span className="text-gray-500 text-sm font-normal"> / Single</span>
        </p>
      </div>

      <p className="text-sm text-gray-700">{room?.description}</p>

      <div className="flex items-center space-x-6 text-gray-700 border-y py-5">
        <div className="flex items-start flex-col gap-2">
          <CookingPot size={20} />
          <span className="text-sm">
            <strong className="font-medium">Meal:</strong> {room.meal_plan}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bed size={20} />
          <span className="text-sm">
            <strong className="font-medium">Bed:</strong> {room.bed_type}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bath size={20} />
          <span className="text-sm">
            <strong className="font-medium">Attached Bath:</strong>{" "}
            {room.has_attached_bath ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-16 border-b pb-5">
        <div className="">
          <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {room.facilities.map((facility: string, i: number) => (
              <li key={i}>{facility}</li>
            ))}
          </ul>
        </div>

        <div className="">
          <p className="font-semibold text-gray-900 mb-3">Pricing List:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong className="font-semibold">Double:</strong>{" "}
              {room.pricing.double === 0
                ? "Free"
                : room.pricing.double && formatCurrencyPKR(room.pricing.double)}
            </li>
            <li>
              <strong className="font-semibold">Extra Bed:</strong>{" "}
              {room.pricing.extra_bed === 0
                ? "Free"
                : room.pricing.extra_bed &&
                  formatCurrencyPKR(room.pricing.extra_bed)}
            </li>
            <li>
              <strong className="font-semibold">Child (No Bed):</strong>{" "}
              {room.pricing.child_no_bed === 0
                ? "Free"
                : room.pricing.child_no_bed &&
                  formatCurrencyPKR(room.pricing.child_no_bed)}
            </li>
          </ul>
        </div>
      </div>

      <CommonButton
        label="Book Now"
        className="h-10 rounded-full w-full"
        onClick={() => setOpen(true)}
      />

      {/* ✅ Modal With Form */}
      <CommonModal
        open={open}
        onOpenChange={setOpen}
        title="Hotel Booking"
        confirmText="Submit Booking"
        className="!max-w-3xl"
        loading={loading}
        onConfirm={handleConfirm}
      >
        <HotelBookingForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      </CommonModal>
    </div>
  );
};

export default Room;
