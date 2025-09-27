"use client";

import useDestinationStore from "@/app/store/destinationStore";
import { getDestinationDates } from "@/lib/utils";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React from "react";
import { start } from "repl";

type Props = {
  destination: any;
};

const DestinationLabel = ({ destination }: Props) => {
  const { addNight, removeNight, updateDestination } = useDestinationStore();
  const router = useRouter();

  const { startDate, endDate } = getDestinationDates(destination);
  const nights = destination.nights || 0;

  console.log({ startDate, endDate });

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
            removeNight(destination.id, 1);
            updateDestination(destination.id, {
              startDate: dayjs(startDate).add(1, "day").format("YYYY-MM-DD"),
              endDate: dayjs(endDate).format("YYYY-MM-DD"),
            });
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
            updateDestination(destination.id, {
              startDate: dayjs(startDate).add(1, "day").format("YYYY-MM-DD"),
              endDate: dayjs(endDate).format("YYYY-MM-DD"),
            });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DestinationLabel;
