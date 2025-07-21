import Image from "next/image";
import { useState } from "react";
import CommonModal from "../common/CommonModal";
import RestaurantForm from "../RestaurantForm";
import useForm from "@/app/hooks/useForm";
import { showError, showSuccess } from "../common/CommonSonner";
import CommonButton from "../common/CommonButton";

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

const DishCard = ({ dish }: DishCardProps | any) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onSubmit = () => {
    try {
      // create payload
      const payload = {
        ...formData,
        selectedDishes:
          (formData.selectedDishes?.length > 0 &&
            formData.selectedDishes.split(", ")) ||
          [],
      };
      showSuccess({
        message: "Booking Confirmed",
        description:
          "Your booking request has been successfully submitted. We will get back to you shortly.",
      });
      setOpen(false);
      resetForm();
      console.log("Booking Data:", payload);
    } catch (error) {
      console.error("Booking Error:", error);
      showError({
        message: "Booking Failed",
        description: "Something went wrong while processing your booking.",
      });
    }
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
        loading={loading}
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
