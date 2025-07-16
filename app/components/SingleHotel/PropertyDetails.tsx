"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import Services from "./Services";
import CommonTabs from "../common/CommonTabs";
import Room from "./Room";
import { RoomType } from "@/app/types/CommonType";

type Hotel = {
  name: string;
  description: string;
  services: string[];
  rooms: RoomType[];
};

type Props = {
  hotel: Hotel;
};

const PropertyDetails = ({ hotel }: Props) => {
  const [showFull, setShowFull] = useState(false);

  const tabs = hotel.rooms.map((room, index) => ({
    value: room?.name,
    label: room?.name,
    content: <Room room={room} key={index} />,
  }));

  return (
    <section className="flex flex-col items-start flex-1 lg:w-1/2">
      <CommonHeading
        className="text-left !mb-0"
        title={hotel.name}
        subtitle={
          showFull ? hotel.description : `${hotel.description.slice(0, 300)}...`
        }
      />
      <div className="mb-6 text-gray-700">
        <CommonButton
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 underline"
          onClick={() => setShowFull(!showFull)}
          label={showFull ? "Show less" : "Show more"}
        />
      </div>

      {/* Services */}
      <Services services={hotel.services} />

      <CommonTabs tabs={tabs} className="w-full mt-8" />
    </section>
  );
};

export default PropertyDetails;
