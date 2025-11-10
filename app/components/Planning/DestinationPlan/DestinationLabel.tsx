"use client";

import useDestinationStore from "@/app/store/destinationStore";
import { getDestinationDates } from "@/lib/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  destination: any;
};

const DestinationLabel = ({ destination }: Props) => {
  const { addNight, removeNight, updateDestination } = useDestinationStore();
  const router = useRouter();

  const { startDate, endDate } = getDestinationDates(destination);
  const nights = destination.nights || 0;

  console.log({ destination });

  const handleUpdateDates = (destinationId: string, newNights: number) => {
    if (newNights <= 0) return; // ✅ Skip if nights are 0

    const newStart = dayjs(startDate);
    const newEnd = newStart.add(newNights - 1, "day");

    updateDestination(destinationId, {
      startDate: newStart.format("YYYY-MM-DD"),
      endDate: newEnd.format("YYYY-MM-DD"),
    });
  };

  return (
    <div className="flex justify-between items-center">
      <span
        className="cursor-pointer flex-1 font-medium text-gray-800"
        onClick={() => router.push(`?destination=${destination.id}`)}
      >
        {destination.name}
      </span>

      {/* Nights counter */}
      <div className="flex items-center gap-2">
        <button
          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            if (nights > 0) {
              removeNight(destination.id, 1);
              handleUpdateDates(destination.id, nights - 1);
            }
          }}
        >
          -
        </button>

        <span className="w-6 text-center text-sm font-semibold text-gray-700">
          {nights}
        </span>

        <button
          className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            addNight(destination.id, 1);
            handleUpdateDates(destination.id, nights + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DestinationLabel;
