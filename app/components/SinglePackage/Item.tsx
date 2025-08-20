import React from "react";
import CommonButton from "../common/CommonButton";
import {
  Baby,
  Bath,
  Bed,
  Calendar,
  Clock,
  CookingPot,
  Users,
} from "lucide-react";
import { PropertyDetailProps } from "@/app/types/CommonType";
import CommonBadge from "../common/CommonBadge";
import { formatCurrency } from "@/lib/utils";

interface Props {
  item: any;
  packageDetail: any;
}

const Item = ({ item, packageDetail }: Props) => {
  return (
    <div className="w-full mt-5 pb-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {/* <h3 className="text-xl font-bold">{item.name} item</h3> */}
          {/* <CommonBadge color="success" label={item?.status} /> */}
        </div>
        <p className="text-lg font-semibold text-gray-900">
          {formatCurrency(item.price)}
        </p>
      </div>

      <p className="text-sm text-gray-700">{item?.description}</p>

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
                : item.pricing.double && formatCurrency(item.pricing.double)}
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
