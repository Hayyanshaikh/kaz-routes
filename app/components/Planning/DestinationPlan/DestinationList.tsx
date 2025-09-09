"use client";
import { FC } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Empty, Menu } from "antd";
import useDestinationStore from "@/app/store/destinationStore";

type DestinationListProps = {
  destinations: any[];
};

const DestinationList: FC<DestinationListProps> = ({ destinations }) => {
  const { addNight, removeNight } = useDestinationStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = searchParams.get("destination") || "";

  const renderLabel = (d: any) => {
    const nights = d.nights || 0;

    return (
      <div className="flex justify-between items-center">
        <span
          className="cursor-pointer flex-1 font-medium text-gray-800"
          onClick={() => router.push(`?destination=${d.id}`)}
        >
          {d.name}
        </span>

        {/* Nights counter */}
        <div className="flex items-center gap-2">
          <button
            className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              removeNight(d.id, 1);
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
              addNight(d.id, 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  if (!destinations || destinations.length === 0) {
    return (
      <div className="py-5 flex justify-center">
        <Empty description="No Destination Selected" />
      </div>
    );
  }

  return (
    <Menu
      selectedKeys={[selectedId]}
      items={destinations.map((d) => ({
        key: d.id,
        label: renderLabel(d),
      }))}
    />
  );
};

export default DestinationList;
