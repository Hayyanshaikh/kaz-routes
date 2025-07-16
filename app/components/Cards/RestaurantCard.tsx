import { Check, Cookie, CookingPot, Star, Users } from "lucide-react";
import CommonBadge from "../common/CommonBadge";
import CommonButton from "../common/CommonButton";
import Image from "next/image";
import { FILE_BASE_URL } from "@/lib/constant";

interface RestaurantCardProps {
  restaurant: {
    id: number;
    restaurant_name: string;
    description: string;
    address: string;
    images: string[];
    type: string[];
    dishes?: {
      variants?: {
        price: string;
      }[];
    }[];
    seats?: number;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const {
    restaurant_name,
    description,
    images,
    address,
    type,
    id,
    dishes = [],
    seats = 108,
  } = restaurant;

  const image = images?.[0]
    ? `${FILE_BASE_URL}/${images[0]}`
    : "https://placehold.co/800x600";

  // Format dishes count with leading 0
  const dishCount = dishes.length < 10 ? `0${dishes.length}` : dishes.length;

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative h-52 w-full">
        <Image
          fill
          src={image}
          alt={restaurant_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-4 flex items-center justify-between">
          <CommonBadge label={address || "Restaurant"} />
          <div className="flex items-center text-xs gap-1 bg-white px-2 py-1 rounded-full text-gray-600 font-semibold">
            <CookingPot size={16} />
            {dishCount} Dishes
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {restaurant_name}
        </h2>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>

        <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
          <span className="flex items-center gap-2">
            <Users size={14} /> {seats} Seats
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
          {type.map((type: string, index: number) => (
            <div key={index} className="flex items-center gap-1">
              <Check size={16} className="text-green-500 font-bold" />
              {type}
            </div>
          ))}
        </div>

        <CommonButton
          link={`restaurants/${id}`}
          label="View Details"
          className="w-full mt-auto"
        />
      </div>
    </div>
  );
};

export default RestaurantCard;
