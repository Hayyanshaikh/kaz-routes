"use client";
import { Check, Star, Users } from "lucide-react";
import CommonBadge from "../Common/CommonBadge";
import CommonButton from "../Common/CommonButton";

interface RestaurantCardProps {
  image: string;
  label: string;
  rating: number;
  title: string;
  description: string;
  seats: number;
  price: number;
  features: string[];
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  image,
  label,
  rating,
  title,
  description,
  seats,
  price,
  features,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-50 w-full">
        <img
          src={image}
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex items-center justify-between">
          <CommonBadge label={label} />
          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-full text-yellow-500 text-sm font-semibold">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            {rating.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <Users size={14} /> {seats} Seats
          </span>
          <span className="ml-auto font-semibold text-gray-800">
            ${price} /person
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-1">
              <Check size={16} className="text-green-500 font-bold" /> {feature}
            </div>
          ))}
        </div>

        <CommonButton label="Book Now" className="w-full mt-4" />
      </div>
    </div>
  );
};

export default RestaurantCard;
