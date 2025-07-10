// components/SearchCard.tsx
"use client";

import React from "react";
import { MapPin, Star, Clock, Users, ArrowRight } from "lucide-react";
import CommonButton from "../Common/CommonButton";
import CommonBadge from "../Common/CommonBadge";

type SearchCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  rating: number;
  duration: string;
  maxParticipants: number;
  highlights: string[];
  onDetailClick: () => void;
};

const SearchCard = ({
  title,
  description,
  imageUrl,
  price,
  rating,
  duration,
  maxParticipants,
  highlights,
  onDetailClick,
}: SearchCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-300 overflow-hidden flex flex-col lg:flex-row p-4">
      <div className="relative w-full lg:w-2/5 h-50 sm:h-64 lg:h-auto">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full rounded-lg"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
          }}
        />
      </div>
      <div className="flex flex-col justify-between flex-1 gap-3 py-4 sm:p-5 lg:p-6 pb-0 lg:pr-0">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-gray-500 text-xs sm:text-sm">
              <MapPin size={16} className="mr-1 text-blue-500" /> Bali,
              Indonesia
            </div>
            <div className="flex items-center text-yellow-500 text-xs sm:text-sm">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < rating ? "currentColor" : "none"}
                  stroke={i < rating ? "currentColor" : "currentColor"}
                  className="mr-0.5"
                />
              ))}
            </div>
          </div>
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center text-gray-700 text-xs sm:text-sm">
            <div className="flex items-center gap-1 mr-4">
              <Clock size={16} className="mr-1 text-gray-600" />
              <span className="mr-4">{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={16} className="mr-1 text-gray-600" />
              <span>{maxParticipants} guest</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {highlights.map((highlight, index) => (
              <CommonBadge
                className="bg-primary/15 text-primary text-xs sm:text-sm"
                key={index}
                label={highlight}
              />
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <div className="font-semibold text-gray-800 text-lg sm:text-xl">
              ${price.toFixed(2)}
              <span className="font-normal capitalize text-xs sm:text-sm text-gray-600">
                /person
              </span>
            </div>
            <CommonButton
              label="Book Now"
              onClick={onDetailClick}
              iconPosition="right"
              icon={<ArrowRight size={20} className="ml-2" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
