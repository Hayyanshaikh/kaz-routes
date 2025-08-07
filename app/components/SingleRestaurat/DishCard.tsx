import Image from "next/image";
import { useState } from "react";
import CommonModal from "../common/CommonModal";
import RestaurantForm from "../RestaurantForm";
import useForm from "@/app/hooks/useForm";
import { showError, showSuccess } from "../common/CommonSonner";
import CommonButton from "../common/CommonButton";
import { useControllerPostCreateRestaurantBooking } from "@/app/hooks/api";
import { RestaurantBookingPayload } from "@/app/types/CommonType";

type DishCardProps = {
  dish: {
    name: string;
    description: string | null;
    images: string[];
    variants: {
      size: string;
      price: string;
    }[];
  };
};

const DishCard = ({ dish, restaurantDetail }: DishCardProps | any) => {
  const [open, setOpen] = useState(false);

  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm([
    "name",
    "email",
    "phone",
    "bookingDate",
    "bookingTime",
    "guestCount",
    "referenceNumber",
    "specialRequest",
  ]);

  // Use the mutation hook
  const { mutateAsync: createBooking, isPending } =
    useControllerPostCreateRestaurantBooking();

  const onSubmit = async () => {
    // Create payload with required fields matching the API structure
    const payload: RestaurantBookingPayload = {
      restaurant_id: restaurantDetail?.id, // Replace with dynamic restaurant ID if available
      booking_date: formData.bookingDate,
      booking_time: formData.bookingTime,
      guests: parseInt(formData.guestCount, 10) || 1,
      special_request: formData.specialRequest || "None",
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      variant_ids: dish.variants.map((v: any) => parseInt(v.id, 10) || 1), // Adjust based on your variant IDs logic
    };

    // Call the mutation and handle success/error
    createBooking(payload)
      .then(() => {
        showSuccess({
          message: "Booking Confirmed",
          description:
            "Your booking request has been successfully submitted. We will get back to you shortly.",
        });
        setOpen(false);
        resetForm();
      })
      .catch((error) => {
        console.error("Booking Error:", error);
        showError({
          message: "Booking Failed",
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
      <div className="w-full h-60 rounded-lg overflow-hidden shadow">
        <Image
          layout="fill"
          src={image}
          alt={dish.name}
          className="w-full h-full object-cover !relative"
        />
      </div>

      <div className="flex sm:flex-row flex-col gap-4">
        {/* Variants */}
        {dish.variants.map((v: any, i: number) => (
          <div key={i} className="p-4 border rounded-lg flex-1 bg-gray-50">
            <p className="text-sm text-primary font-medium mb-2">
              {v.price &&
                Number(v.price).toLocaleString("en-PK", {
                  style: "currency",
                  currency: "PKR",
                  minimumFractionDigits: 2,
                })}
            </p>
            <h4 className="font-semibold">{v.size}</h4>
          </div>
        ))}
      </div>
      <CommonButton label="Book Now" onClick={() => setOpen(true)} />
      <CommonModal
        open={open}
        onOpenChange={setOpen}
        title={`Restaurant Booking ${dish.name}`}
        confirmText="Submit Booking"
        className="!max-w-3xl"
        destroyOnClose={false}
        loading={isPending} // Reflect mutation loading state
        onConfirm={() => {
          handleSubmit(onSubmit);
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <RestaurantForm
            dishItems={dish.variants}
            errors={errors}
            formData={formData}
            handleChange={handleChange}
          />
        </form>
      </CommonModal>
    </div>
  );
};

export default DishCard;
