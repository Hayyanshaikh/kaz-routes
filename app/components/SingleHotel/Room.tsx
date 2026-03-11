"use client";

import React, { useState } from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";
import CommonButton from "../common/CommonButton";
import { CoffeeOutlined, HomeOutlined, RestOutlined } from "@ant-design/icons";
import { PropertyDetailProps } from "@/app/types/CommonType";
import CommonBadge from "../common/CommonBadge";
import { formatCurrency } from "@/lib/utils";
import CommonModal from "../common/CommonModal";
import { useControllerPostCreateHotelBooking } from "@/app/hooks/api";
import HotelBookingForm from "../HotelForm"; // Ab isko AntD compatible bana lena
import { showError, showSuccess } from "../common/CommonSonner";
import { useTranslations } from "next-intl";

const Room = ({ room, hotelDetail }: PropertyDetailProps) => {
  const t = useTranslations("cards");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { mutateAsync: createHotelBooking, isPending } =
    useControllerPostCreateHotelBooking();

  const onFinish = async (values: any) => {
    const payload = {
      customer_name: values.name || "",
      customer_email: values.email || "",
      customer_phone: values.phone || "",
      hotel_id: hotelDetail?.id || "",
      room_id: room?.id || "",
      check_in: values.checkInDate?.format("YYYY-MM-DD") || "",
      nights: Number(values.nights) || 0,
      total_rooms: Number(values.roomCount) || 1,
      total_adults: Number(values.adults) || 0,
      total_children: Number(values.children) || 0,
      total_infants: Number(values.infants) || 0,
      special_request: values.specialRequests || "",
      meal_preference: values.mealPlan || room?.meal_plan || "",
    };

    try {
      await createHotelBooking(payload);
      setOpen(false);
      form.resetFields();
      showSuccess({
        message: t("booking.success"),
        description: t("booking.hotelSuccessDesc"),
      });
    } catch (error: any) {
      showError({
        message: t("booking.failed"),
        description:
          error?.response?.data?.message || t("messages.errorDesc"),
      });
    }
  };

  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold">{room.name} {t("bed")}</h3>
          <CommonBadge color="success" label={room?.status} />
        </div>
        <p className="text-lg font-semibold text-gray-900">
          {room.pricing.single && formatCurrency(room.pricing.single)}
          <span className="text-gray-500 text-sm font-normal"> / {t("adult")}</span>
        </p>
      </div>

      <p className="text-sm text-gray-700">{room?.description}</p>

      <div className="flex items-center space-x-6 text-gray-700 border-y border-gray-300 py-5">
        <div className="flex items-start flex-col gap-2">
          <CoffeeOutlined className="text-lg" />
          <span className="text-sm">
            <strong className="font-medium">{t("meal")}:</strong> {room.meal_plan}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <HomeOutlined className="text-lg" />
          <span className="text-sm">
            <strong className="font-medium">{t("bed")}:</strong> {room.bed_type}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <RestOutlined className="text-lg" />
          <span className="text-sm">
            <strong className="font-medium">{t("bath")}:</strong>{" "}
            {room.has_attached_bath ? t("yes") : t("no")}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-16 border-b border-gray-300 pb-5">
        <div>
          <p className="font-semibold text-gray-900 mb-3">{t("facilities")}:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {room.facilities.map((facility: string, i: number) => (
              <li key={i}>{facility}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-900 mb-3">{t("pricing")} List:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong className="font-semibold">{t("double")}:</strong>{" "}
              {room.pricing.double === 0
                ? "Free"
                : room.pricing.double && formatCurrency(room.pricing.double)}
            </li>
            <li>
              <strong className="font-semibold">{t("extraBed")}:</strong>{" "}
              {room.pricing.extra_bed === 0
                ? "Free"
                : room.pricing.extra_bed &&
                  formatCurrency(room.pricing.extra_bed)}
            </li>
            <li>
              <strong className="font-semibold">{t("childNoBed")}:</strong>{" "}
              {room.pricing.child_no_bed === 0
                ? "Free"
                : room.pricing.child_no_bed &&
                  formatCurrency(room.pricing.child_no_bed)}
            </li>
          </ul>
        </div>
      </div>

      <CommonButton
        label={isPending ? t("submitting") : t("bookNow")}
        className="h-10 rounded-full w-full"
        onClick={() => setOpen(true)}
        disabled={isPending}
      />

      <CommonModal
        open={open}
        setOpen={setOpen}
        title={t("booking.hotelTitle", { name: room.name })}
        confirmText={isPending ? t("submitting") : t("booking.submit")}
        width={766}
        destroyOnClose={false}
        onClose={() => form.resetFields()}
        onConfirm={() => form.submit()}
        loading={isPending}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            nights: 1,
            adults: 1,
          }}
        >
          <HotelBookingForm />
        </Form>
      </CommonModal>
    </div>
  );
};

export default Room;
