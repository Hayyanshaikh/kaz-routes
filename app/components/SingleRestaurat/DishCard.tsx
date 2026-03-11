import Image from "next/image";
import { useState } from "react";
import CommonModal from "../common/CommonModal";
import { showError, showSuccess } from "../common/CommonSonner";
import CommonButton from "../common/CommonButton";
import { useControllerPostCreateRestaurantBooking } from "@/app/hooks/api";
import { RestaurantBookingPayload } from "@/app/types/CommonType";
import { Form, Input, DatePicker, TimePicker, InputNumber } from "antd";
import RestaurantForm from "../RestaurantForm";
import { formatCurrency } from "@/lib/utils";
import { useTranslations } from "next-intl";

type DishCardProps = {
  dish: any;
  restaurantDetail?: any;
};

const DishCard = ({ dish, restaurantDetail }: DishCardProps) => {
  const t = useTranslations("cards");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Mutation hook
  const { mutateAsync: createBooking, isPending } =
    useControllerPostCreateRestaurantBooking();

  const onFinish = async (values: any) => {
    const payload: RestaurantBookingPayload = {
      restaurant_id: restaurantDetail?.id || undefined,
      booking_date: values.bookingDate?.format("YYYY-MM-DD"),
      booking_time: values.bookingTime?.format("HH:mm"),
      guests: values.guestCount || 1,
      special_request: values.specialRequest || "None",
      customer_name: values.name,
      customer_email: values.email,
      customer_phone: values.phone,
      variant_ids: dish.variants.map(
        (v: any) => parseInt(v.id as any, 10) || 1,
      ),
    };

    createBooking(payload)
      .then(() => {
        showSuccess({
          message: t("booking.confirm"),
          description:
            "Your booking request has been successfully submitted. We will get back to you shortly.",
        });
        setOpen(false);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Booking Error:", error);
        showError({
          message: t("booking.discard"),
          description:
            error?.response?.data?.message ||
            "Something went wrong while processing your booking.",
        });
      });
  };

  const image =
    dish.images?.[0] || "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Dish Image */}
      <div className="w-full h-60 rounded-lg overflow-hidden shadow relative">
        <Image
          fill
          src={image}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex sm:flex-row flex-col gap-4">
        {/* Variants */}
        {dish.variants.map((v: any, i: number) => (
          <div
            key={i}
            className="p-4 border border-gray-300 rounded-lg flex-1 bg-gray-50"
          >
            <p className="text-sm text-primary font-medium mb-2">
              {v.price && formatCurrency(v.price)}
            </p>
            <h4 className="font-semibold">{v.size}</h4>
          </div>
        ))}
      </div>

      <CommonButton label={t("bookNow")} onClick={() => setOpen(true)} />

      <CommonModal
        open={open}
        setOpen={setOpen}
        title={t("booking.restaurantTitle", { name: dish.name })}
        confirmText={t("booking.submit")}
        onClose={() => form.resetFields()}
        destroyOnClose={false}
        loading={isPending}
        width={766}
        onConfirm={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ guestCount: 1 }}
        >
          <RestaurantForm dishItems={dish.variants} />
        </Form>
      </CommonModal>
    </div>
  );
};

export default DishCard;
