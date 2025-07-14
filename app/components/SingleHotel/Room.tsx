import React from "react";
import CommonButton from "../common/CommonButton";
import { Bath, Bed, Calendar, CookingPot } from "lucide-react";
import { PropertyDetailProps } from "@/app/types/CommonType";

const Room = ({ room }: PropertyDetailProps) => {
  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold">{room.type} Room</h3>
        <p className="text-lg font-semibold text-gray-900">
          {room.pricing.single.toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
            minimumFractionDigits: 2,
          })}
          <span className="text-gray-500 text-sm font-normal"> / Single</span>
        </p>
      </div>

      <p className="text-sm text-gray-700">{room?.description}</p>

      <div className="flex items-center space-x-6 text-gray-700 border-y py-5">
        <div className="flex items-start flex-col gap-2">
          <CookingPot size={20} />
          <span className="text-sm">
            <strong className="font-medium">Meal:</strong> {room.meal_plan}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bed size={20} />
          <span className="text-sm">
            <strong className="font-medium">Bed:</strong> {room.bed_type}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bath size={20} />
          <span className="text-sm">
            <strong className="font-medium">Attached Bath:</strong>{" "}
            {room.attached_bath ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-16 border-b pb-5">
        <div className="">
          <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {room.facilities.map((facility: string, i: number) => (
              <li key={i}>{facility}</li>
            ))}
          </ul>
        </div>

        <div className="">
          <p className="font-semibold text-gray-900 mb-3">Pricing List:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong className="font-semibold">Double:</strong>{" "}
              {room.pricing.double === 0
                ? "Free"
                : room.pricing.double.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    minimumFractionDigits: 2,
                  })}
            </li>

            <li>
              <strong className="font-semibold">Extra Bed:</strong>{" "}
              {room.pricing.extra_bed === 0
                ? "Free"
                : room.pricing.extra_bed.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    minimumFractionDigits: 2,
                  })}
            </li>

            <li>
              <strong className="font-semibold">Child (No Bed):</strong>{" "}
              {room.pricing.child_no_bed === 0
                ? "Free"
                : room.pricing.child_no_bed.toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    minimumFractionDigits: 2,
                  })}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex self-stretch items-start gap-4 border border-gray-300 p-2 rounded-full">
        <CommonButton
          label="Check Availability"
          className="justify-start flex-1 !pl-4 bg-transparent p-0 min-h-0 text-gray-900 hover:bg-transparent"
        />
        <CommonButton icon={<Calendar />} className="rounded-full" />
      </div>
    </div>
  );
};

export default Room;
