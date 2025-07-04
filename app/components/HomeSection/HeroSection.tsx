import React from "react";
import Image from "next/image";
import {
  DESTINATION_OPTIONS,
  HERO_SLIDES_DATA,
  HOTEL_PREFERENCE_OPTIONS,
} from "@/lib/constant";
import { SearchIcon } from "lucide-react";
import CommonSelect from "../Common/CommonSelect";
import CommonButton from "../Common/CommonButton";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image using next/image */}
      <Image
        src={HERO_SLIDES_DATA.imageUrl}
        alt={HERO_SLIDES_DATA.heading}
        layout="fill"
        objectFit="cover"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1920x1080/4a5568/ffffff?text=Image+Error`;
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
        {/* Content Container */}
        <div className="text-white max-w-4xl w-full text-center z-10">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight rounded-md">
            {HERO_SLIDES_DATA.heading}
          </h1>
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl font-light opacity-90 rounded-md mb-8">
            {HERO_SLIDES_DATA.description}
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 sm:p-4 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row items-end justify-between space-y-4 md:space-y-0 md:space-x-4">
              {/* Dropdowns/Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <CommonSelect
                  options={DESTINATION_OPTIONS}
                  onValueChange={() => {}}
                  value=""
                  label="Destination"
                />
                <CommonSelect
                  options={HOTEL_PREFERENCE_OPTIONS}
                  onValueChange={() => {}}
                  value=""
                  label="Hotel Preference"
                />
              </div>
              {/* Search Button */}
              <CommonButton
                icon={<SearchIcon size={12} />}
                label="Search Tours"
                className="flex items-center gap-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
