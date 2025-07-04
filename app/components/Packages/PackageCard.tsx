"use client";
import React from "react";
import { Star, Clock, Users, Plus } from "lucide-react"; // Icons ke liye
import CommonBadge from "../Common/CommonBadge";
import CommonButton from "../Common/CommonButton";

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
    <div className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transform duration-300 h-full">
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden w-full">
        <img
          src={imageUrl}
          alt={title}
          className="rounded-t-xl w-full h-full object-cover duration-300 "
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x200/cccccc/333333?text=Image+Not+Found`;
          }}
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white text-stone-800 px-3 py-1 rounded-full flex items-center shadow-md">
          <Star
            size={16}
            fill="currentColor"
            className="text-yellow-400 mr-1"
          />
          <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-semibold text-stone-800 mb-2">{title}</h3>
        {/* Description */}
        <p className="text-stone-600 text-sm mb-4">{description}</p>

        {/* Duration & Participants */}
        <div className="flex items-center justify-between text-stone-500 text-sm mb-4">
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
          <h4 className="text-stone-900 font-semibold text-sm mb-2">
            Highlights:
          </h4>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <CommonBadge
                className="bg-primary/15 text-primary"
                key={index}
                label={highlight}
              />
            ))}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto">
          <div className="text-stone-900 text-xl font-semibold">
            ${price}
            <span className="text-sm font-normal text-stone-500">/ person</span>
          </div>
          <CommonButton label="Add to Cart" icon={<Plus size={18} />} />
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
