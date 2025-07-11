"use client";
import React from "react";
import Image from "next/image";
import {
  DESTINATION_OPTIONS,
  HERO_SLIDES_DATA,
  HOTEL_PREFERENCE_OPTIONS,
} from "@/lib/constant";
import { SearchIcon } from "lucide-react";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import SearchBar from "../SearchBar";

type Props = {
  imageUrl?: string;
  heading?: string;
  description?: string;
  className?: string;
  headingClass?: string;
  descriptionClass?: string;
  showSearchBar?: boolean;
};

const HeroSection = ({
  imageUrl = HERO_SLIDES_DATA.imageUrl,
  heading = HERO_SLIDES_DATA.heading,
  description = HERO_SLIDES_DATA.description,
  className = "",
  headingClass = "",
  descriptionClass = "",
  showSearchBar = true,
}: Props) => {
  return (
    <div
      className={`relative w-full h-screen overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Background Image using next/image */}
      <Image
        src={imageUrl}
        alt={heading}
        layout="fill"
        objectFit="cover"
        onError={(e) => {
          e.currentTarget.src = `https://placehold.co/1920x1080/4a5568/ffffff?text=Image+Error`;
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
        <div className="text-white max-w-4xl w-full text-center z-10">
          {/* Heading */}
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight rounded-md ${headingClass}`}
          >
            {heading}
          </h1>
          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl font-light opacity-90 rounded-md mb-8 ${descriptionClass}`}
          >
            {description}
          </p>

          {/* Search Bar */}
          {showSearchBar && <SearchBar />}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
