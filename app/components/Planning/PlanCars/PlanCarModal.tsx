"use client";

import { FILE_BASE_URL } from "@/lib/constant";
import Image from "next/image";
import React from "react";
import { Form, Input, DatePicker } from "antd";
import CommonModal from "../../common/CommonModal";
import GoogleMapModern from "../../Cards/CustomMap";
import useDestinationStore from "@/app/store/destinationStore";

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
  const [form] = Form.useForm();

  // ✅ store se addCar nikal lo
  const addCar = useDestinationStore((state) => state.addCar);

  const handleFinish = (values: any) => {
    const payload = {
      ...car,
      ...values,
    };

    // ✅ Destination ID ke sath store me save karo
    if (destination?.id) {
      addCar(destination.id, payload);
    }

    setOpen(false); // modal band karne ke liye
  };

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
      {/* Booking Form */}
      <Form form={form} className="min-h-[300px]" onFinish={handleFinish}>
        <Form.Item noStyle name="pickup_location" initialValue="">
          <Input type="hidden" />
        </Form.Item>

        <Form.Item noStyle name="dropoff_location" initialValue="">
          <Input type="hidden" />
        </Form.Item>

        <GoogleMapModern showMap={false} form={form} />
      </Form>
    </CommonModal>
  );
};

export default PlanCarModal;
