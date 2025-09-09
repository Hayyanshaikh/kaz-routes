"use client";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import DestinationDetail from "@/app/components/Planning/DestinationPlan/DestinationDetail";
import PlanSummary from "@/app/components/Planning/PlanSummary";
import useDestinationStore, { Destination } from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { FILE_BASE_URL } from "@/lib/constant";
import { getDestinationDates } from "@/lib/utils";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Empty, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const page = () => {
  const { destinations, removeDestination } = useDestinationStore();
  const { plan } = usePlanStore();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const destinationData = destinations?.find(
    (des) => String(des.id) === String(destination)
  );
  const { startDate, endDate } = getDestinationDates(destinationData!);

  if (!destination || !destinationData) {
    return (
      <div className="flex-1 self-stretch flex items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <Container className="flex-1">
      {/* <PlanSummary /> */}
      <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden p-3 mb-6">
        {/* Left: Image */}
        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gray-100">
          <img
            src={`${FILE_BASE_URL}/${destinationData?.image}`}
            alt={destinationData?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Middle: Details */}
        <div className="flex-1 px-4">
          <h2 className="text-base font-semibold text-gray-800">
            {destinationData.name}
          </h2>
          {/* Add more details if needed */}
          {destinationData?.nights && destinationData?.nights > 0 ? (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarOutlined className="!text-primary" />
              {`${dayjs(startDate).format("MMM DD")} - ${dayjs(endDate).format(
                "MMM DD"
              )}`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              Select days for this destination
            </p>
          )}
        </div>

        {/* Right: Delete button */}
        <Popconfirm
          placement="bottomRight"
          title="Are you sure you want to delete?"
          onConfirm={() => removeDestination(destinationData?.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            className="!bg-red-500 border px-2 py-1 rounded hover:bg-red-50"
          >
            Delete
          </Button>
        </Popconfirm>
      </div>
      <DestinationDetail destinationData={destinationData} />
    </Container>
  );
};

export default page;
