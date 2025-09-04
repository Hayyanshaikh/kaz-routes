"use client";
import { FILE_BASE_URL } from "@/lib/constant";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Image from "next/image";
import React, { useState } from "react";

interface DestinationCardProps {
  name: string;
  image: string;
  sitesCount: number;
  carsCount: number;
  restaurantsCount: number;
  hotelsCount: number;
  onDelete?: () => void;
}

const DEFAULT_IMAGE = "/images/fallback.jpg"; // placeholder image

const DestinationCard = ({
  name,
  image,
  sitesCount,
  carsCount,
  restaurantsCount,
  hotelsCount,
  onDelete,
}: DestinationCardProps) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <div className="relative w-full h-40">
        <Image
          src={`${FILE_BASE_URL}/${imgSrc}`}
          alt={name}
          fill
          className="object-cover rounded-t-lg"
          onError={() => setImgSrc(DEFAULT_IMAGE)} // fallback
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>Sites: {sitesCount}</div>
            <div>Cars: {carsCount}</div>
            <div>Restaurants: {restaurantsCount}</div>
            <div>Hotels: {hotelsCount}</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button
            type="primary"
            className="!bg-red-500 hover:!bg-red-500 py-1 rounded !w-full"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
