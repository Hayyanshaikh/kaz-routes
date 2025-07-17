import React from "react";
import CommonButton from "../common/CommonButton";
import { Bath, Bed, Calendar, CookingPot } from "lucide-react";
import { PropertyDetailProps } from "@/app/types/CommonType";
import CommonBadge from "../common/CommonBadge";
import { formatCurrencyPKR } from "@/lib/utils";

interface Props {
  item: any;
}

const Item = ({ item }: Props) => {
  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* <h3 className="text-xl font-bold">{item.name} item</h3> */}
          {/* <CommonBadge color="success" label={item?.status} /> */}
        </div>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrencyPKR(item.price)}
        </p>
      </div>

      <p className="text-sm text-gray-700">{item?.description}</p>

      <div className="flex items-center space-x-6 text-gray-700 border-y py-5">
        <div className="flex items-start flex-col gap-2">
          <CookingPot size={20} />
          <span className="text-sm">
            <strong className="font-medium">Meal:</strong> {item.meal_plan}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bed size={20} />
          <span className="text-sm">
            <strong className="font-medium">Bed:</strong> {item.bed_type}
          </span>
        </div>
        <div className="flex items-start flex-col gap-2">
          <Bath size={20} />
          <span className="text-sm">
            <strong className="font-medium">Attached Bath:</strong>{" "}
            {item.has_attached_bath ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-16 border-b pb-5">
        {/* <div className="">
          <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {item.facilities.map((facility: string, i: number) => (
              <li key={i}>{facility}</li>
            ))}
          </ul>
        </div> */}

        {/* <div className="">
          <p className="font-semibold text-gray-900 mb-3">Pricing List:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>
              <strong className="font-semibold">Double:</strong>{" "}
              {item.pricing.double === 0
                ? "Free"
                : item.pricing.double && formatCurrencyPKR(item.pricing.double)}
            </li>

            <li>
              <strong className="font-semibold">Extra Bed:</strong>{" "}
              {item.pricing.extra_bed === 0
                ? "Free"
                : item.pricing.extra_bed &&
                  Number(item.pricing.extra_bed).toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    minimumFractionDigits: 2,
                  })}
            </li>

            <li>
              <strong className="font-semibold">Child (No Bed):</strong>{" "}
              {item.pricing.child_no_bed === 0
                ? "Free"
                : item.pricing.child_no_bed &&
                  Number(item.pricing.child_no_bed).toLocaleString("en-PK", {
                    style: "currency",
                    currency: "PKR",
                    minimumFractionDigits: 2,
                  })}
            </li>
          </ul>
        </div> */}
      </div>

      <CommonButton label="Book Now" className="h-10 rounded-full w-full" />
    </div>
  );
};

export default Item;
