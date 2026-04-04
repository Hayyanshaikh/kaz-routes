"use client";

import { FILE_BASE_URL } from "@/lib/constant";
import Image from "next/image";
import React, { useEffect } from "react";
import { Form, Input, DatePicker, message } from "antd";
import CommonModal from "../../common/CommonModal";
import GoogleMapModern from "../../Cards/CustomMap";
import useDestinationStore from "@/app/store/destinationStore";
import CommonDatePicker from "../../common/CommonDatePicker";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import dayjs from "dayjs";

type PlanCarModalProps = {
  car: any;
  open: boolean;
  setOpen: (val: boolean) => void;
  destination: any;
};

const PlanCarModal = ({
  car,
  open,
  setOpen,
  destination,
}: PlanCarModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);
  // ✅ store se addCar nikal lo
  const addCar = useDestinationStore((state) => state.addCar);
  const removeCar = useDestinationStore((state) => state.removeCar);

  const handleFinish = (values: any) => {
    const payload = {
      ...car,
      ...values,
      bookingDates: values.bookingDates?.map((date: any) =>
        date.format("YYYY-MM-DD"),
      ),
    };

    // ✅ Destination ID ke sath store me save karo
    if (destination?.id) {
      if (values.bookingDates?.length === 0) {
        removeCar(destination.id, car.id);
        messageApi.success("Car booking removed!");
      } else {
        addCar(destination.id, payload);
        messageApi.success("Car booked successfully!");
      }
    }

    setOpen(false); // modal band karne ke liye
  };

  const existingBooking = destination?.cars?.find((c: any) => c.id === car.id);
  const selectedDates =
    existingBooking?.bookingDates?.map((date: any) => dayjs(date)) ||
    allowedDates?.map((date: any) => dayjs(date));

  useEffect(() => {
    if (open) {
      form.setFieldValue("bookingDates", selectedDates);
    }
  }, [open, form]);

  console.log({ selectedDates });

  if (!car) return null;

  return (
    <CommonModal
      open={open}
      setOpen={setOpen}
      title={`${car.brand?.name} ${car.model} (${car.year})`}
      description={`Category: ${car.category?.name}`}
      confirmText="Confirm Booking"
      centered
      onConfirm={() => form?.submit()}
    >
      {contextHolder}
      {/* Booking Form */}
      <Form form={form} className="min-h-[300px]" onFinish={handleFinish}>
        <Form.Item noStyle name="pickup_location" initialValue="">
          <Input type="hidden" />
        </Form.Item>

        <Form.Item noStyle name="dropoff_location" initialValue="">
          <Input type="hidden" />
        </Form.Item>
        <GoogleMapModern showMap={false} form={form} />

        <CommonDatePicker
          name={"bookingDates"}
          // isNotFormItem={false}
          className="w-full"
          multiple
          allowedDates={allowedDates}
          label="Please select a date for your booking:"
        />
      </Form>
    </CommonModal>
  );
};

export default PlanCarModal;
