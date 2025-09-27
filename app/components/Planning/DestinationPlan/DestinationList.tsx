"use client";
import { FC } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Empty, Menu } from "antd";
import useDestinationStore from "@/app/store/destinationStore";
import { getDestinationDates } from "@/lib/utils";
import DestinationLabel from "./DestinationLabel";

type DestinationListProps = {
  destinations: any[];
};

const DestinationList: FC<DestinationListProps> = ({ destinations }) => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("destination") || "";

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
        label: <DestinationLabel destination={d} />,
      }))}
    />
  );
};

export default DestinationList;
