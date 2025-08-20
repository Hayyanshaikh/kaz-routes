"use client";

import React, { useState } from "react";
import CommonButton from "../common/CommonButton";
import { Bath, Bed, CookingPot } from "lucide-react";
import { PropertyDetailProps } from "@/app/types/CommonType";
import CommonBadge from "../common/CommonBadge";
import { formatCurrency } from "@/lib/utils";
import CommonModal from "../common/CommonModal";
import HotelBookingForm from "../HotelForm";
import { useControllerPostCreateHotelBooking } from "@/app/hooks/api";
import useForm from "@/app/hooks/useForm";
import { showError, showSuccess } from "../common/CommonSonner";
import dayjs from "dayjs";

const Room = ({ room, hotelDetail }: PropertyDetailProps) => {
  const [open, setOpen] = useState(false);

  // Initialize form with pre-filled values from room and hotelDetail, including adults, infants, and children
  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    { name: "name", required: true },
    { name: "email", required: true },
    { name: "phone", required: true },
    { name: "checkInDate", required: true },
    { name: "nights", value: 1 },
    { name: "roomCount", value: 1 },
    { name: "specialRequests" },
    { name: "adults", value: 1 },
    { name: "children", value: 0 },
    { name: "infants", value: 0 },
  ]);

  // Use the hotel booking mutation hook
  const { mutateAsync: createHotelBooking, isPending } =
    useControllerPostCreateHotelBooking();

  // Handle form submission
  const onSubmit = () => {
    const payload = {
      customer_name: formData.name || "",
      customer_email: formData.email || "",
      customer_phone: formData.phone || "",
      hotel_id: hotelDetail?.id || "",
      room_id: room?.id || "",
      check_in: formData.checkInDate || "",
      nights: Number(formData.nights) || 0,
      total_rooms: Number(formData.roomCount) || 1,
      total_adults: Number(formData.adults) || 0,
      total_children: Number(formData.children) || 0,
      total_infants: Number(formData.infants) || 0,
      special_request: formData.specialRequests || "",
      meal_preference: formData.mealPlan || room?.meal_plan || "",
    };

    createHotelBooking(payload, {
      onSuccess: (response) => {
        showSuccess({
          message: "Booking Successful",
          description: "Your hotel booking has been successfully created.",
        });
        resetForm();
        setOpen(false);
      },
      onError: (error: any) => {
        showError({
          message: "Booking Failed",
          description:
            error?.response?.data?.message || "Something went wrong!",
        });
      },
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
          {room.pricing.single && formatCurrency(room.pricing.single)}
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
        <div>
          <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {room.facilities.map((facility: string, i: number) => (
              <li key={i}>{facility}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">Pricing List:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong className="font-semibold">Double:</strong>{" "}
              {room.pricing.double === 0
                ? "Free"
                : room.pricing.double && formatCurrency(room.pricing.double)}
            </li>
            <li>
              <strong className="font-semibold">Extra Bed:</strong>{" "}
              {room.pricing.extra_bed === 0
                ? "Free"
                : room.pricing.extra_bed &&
                  formatCurrency(room.pricing.extra_bed)}
            </li>
            <li>
              <strong className="font-semibold">Child (No Bed):</strong>{" "}
              {room.pricing.child_no_bed === 0
                ? "Free"
                : room.pricing.child_no_bed &&
                  formatCurrency(room.pricing.child_no_bed)}
            </li>
          </ul>
        </div>
      </div>

      <CommonButton
        label={isPending ? "Submitting..." : "Book Now"}
        className="h-10 rounded-full w-full"
        onClick={() => setOpen(true)}
        disabled={isPending}
      />

      {/* ✅ Modal With Form */}
      <CommonModal
        open={open}
        onOpenChange={setOpen}
        title={`Hotel Booking ${
          room.name.charAt(0).toUpperCase() + room.name.slice(1)
        } Room`}
        confirmText={isPending ? "Submitting..." : "Submit Booking"}
        className="!max-w-3xl"
        destroyOnClose={false}
        onConfirm={() => {
          handleSubmit(onSubmit);
        }}
        loading={isPending}
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
