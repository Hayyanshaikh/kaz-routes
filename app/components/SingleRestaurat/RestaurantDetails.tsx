"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import CommonTabs from "../common/CommonTabs";
import DishCard from "./DishCard";

type Restaurant = {
  name: string;
  description: string;
  types: string[];
  dishes: {
    id: number;
    name: string;
    description: string | null;
    variants: {
      id: number;
      size: string;
      price: string;
    }[];
  }[];
};

type Props = {
  restaurant: Restaurant;
};

const RestaurantDetails = ({ restaurant }: Props) => {
  const [showFull, setShowFull] = useState(false);

  const tabs = restaurant.dishes.map((dish) => ({
    value: String(dish.id),
    label: dish.name,
    content: <DishCard dish={dish} />,
  }));

  return (
    <section className="flex flex-col items-start flex-1 lg:w-1/2">
      <CommonHeading
        className="text-left !mb-0"
        title={restaurant.name}
        subtitle={
          showFull
            ? restaurant.description
            : `${restaurant.description?.slice(0, 300)}...`
        }
      />
      <div className="mb-6 text-gray-700">
        <CommonButton
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 underline"
          onClick={() => setShowFull(!showFull)}
          label={showFull ? "Show less" : "Show more"}
        />
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {restaurant.types?.map((type, i) => (
          <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
            {type}
          </span>
        ))}
      </div>

      <CommonTabs tabs={tabs} className="w-full mt-8" />
    </section>
  );
};

export default RestaurantDetails;
