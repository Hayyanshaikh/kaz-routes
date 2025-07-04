"use client";
import React from "react";
import { Star, Clock, Users, Plus } from "lucide-react"; // Icons ke liye

type PackageCardProps = {
  imageUrl: string;
  rating: number;
  title: string;
  description: string;
  duration: string;
  maxParticipants: number;
  highlights: string[];
  price: number;
};

const PackageCard: React.FC<PackageCardProps> = ({
  imageUrl,
  rating,
  title,
  description,
  duration,
  maxParticipants,
  highlights,
  price,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm mx-auto my-4 transform transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden w-full">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
          }}
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white text-gray-800 px-3 py-1 rounded-full flex items-center shadow-md">
          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-400 mr-1"
          />
          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {/* Duration & Participants */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>Max {maxParticipants}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-4">
          <h4 className="text-gray-700 font-semibold text-sm mb-2">
            Highlights:
          </h4>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-gray-900 text-2xl font-bold">
            ${price}
            <span className="text-base font-normal text-gray-500">
              {" "}
              / person
            </span>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full flex items-center space-x-2 shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
            <Plus size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
