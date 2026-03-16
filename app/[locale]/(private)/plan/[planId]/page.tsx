"use client";
import Container from "@/app/components/Container";
import DestinationDetail from "@/app/components/Planning/DestinationPlan/DestinationDetail";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { FILE_BASE_URL } from "@/lib/constant";
import { getDestinationDates } from "@/lib/utils";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Empty, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { useDestinationDates } from "@/app/hooks/useDestinationDates";

const Page = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { plan } = usePlanStore();
  const { destinations, removeDestination } = useDestinationStore();
  const searchParams = useSearchParams();
  const destinationId = searchParams.get("destination");
  const destinationData = destinations?.find(
    (des) => String(des.id) === String(destinationId),
  );

  const { startDate, endDate } = useDestinationDates(destinationData);

  useEffect(() => {
    if (!plan) {
      router.push(`/plan/create`);
    }
  }, [plan]);

  if (!destinationId || !destinationData) {
    return (
      <div className="flex-1 self-stretch flex items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="px-0! lg:px-4 flex-1 w-full">
      {contextHolder}
      <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg overflow-hidden p-3 mb-6">
        <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden bg-gray-100">
          {destinationData?.image ? (
            <img
              src={`${FILE_BASE_URL}/${destinationData?.image}`}
              alt={destinationData?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
        </div>

        <div className="flex-1 px-4">
          <h2 className="text-base font-semibold text-gray-800">
            {destinationData.name}
          </h2>
          {startDate && endDate ? (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarOutlined className="!text-primary" />
              {`${dayjs(startDate).format("MMM DD")} - ${dayjs(endDate).format(
                "MMM DD",
              )}`}
            </p>
          ) : (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              Select days for this destination
            </p>
          )}
        </div>

        <Popconfirm
          placement="bottomRight"
          title="Are you sure you want to delete?"
          onConfirm={() => {
            removeDestination(destinationData?.id);
            messageApi.success("Destination deleted");
          }}
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
    </div>
  );
};

export default Page;
