"use client";
import Container from "@/app/components/Container";
import DestinationDetail from "@/app/components/Planning/DestinationPlan/DestinationDetail";
import PlanSummary from "@/app/components/Planning/PlanSummary";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { FILE_BASE_URL } from "@/lib/constant";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const layout = () => {
  const router = useRouter();
  const { plan } = usePlanStore();
  const { destinations, removeDestination } = useDestinationStore();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");

  const destinationData = destinations?.find(
    (des) => String(des.id) === String(destination)
  );

  if (!destinationData) return;
  useEffect(() => {
    if (!plan) {
      router.push(`/plan/create`);
    }
  }, [plan, router]);
  return (
    <Container>
      <PlanSummary />
      <div className="flex items-center justify-between bg-white shadow rounded-lg overflow-hidden p-4 mb-6">
        {/* Left: Image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={`${FILE_BASE_URL}/${destinationData?.image}`}
            alt={destinationData?.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Middle: Details */}
        <div className="flex-1 px-4">
          <h1 className="text-lg font-semibold text-gray-800">
            {destinationData?.name}
          </h1>
          {/* Add more details if needed */}
        </div>

        {/* Right: Delete button */}
        <div>
          <button
            className="text-red-500 border border-red-300 px-2 py-1 rounded hover:bg-red-50"
            onClick={() => removeDestination(destinationData?.id)}
          >
            🗑 Delete
          </button>
        </div>
      </div>

      <DestinationDetail destinationData={destinationData} />
    </Container>
  );
};

export default layout;
