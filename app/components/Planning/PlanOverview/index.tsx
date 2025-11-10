"use client";

import React, { useEffect, useRef } from "react";
import PlanDetail from "./PlanDetail";
import PlanDestinationDetail from "./PlanDestinationDetail";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";
import { overviewData, overviewData2 } from "@/lib/constant";
import { useControllerPostCreateTravelPlan } from "@/app/hooks/api";
import CommonButton from "../../common/CommonButton";
import { transformToDayWise } from "@/app/manipulators/planManipulator";

const Index = () => {
  const { plan, resetPlan } = usePlanStore();
  const { destinations, resetDestinations } = useDestinationStore();
  const router = useRouter();
  const { mutateAsync: createPlan, isPending } =
    useControllerPostCreateTravelPlan();

  // const plan = overviewData2?.plan;
  // const destinations = overviewData2?.destinations;
  const data = { plan, destinations };
  console.log({ destinations });

  const convertToDaywise = transformToDayWise(data);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCreateTravelPlan = () => {
    const payload = { plan, days: convertToDaywise };

    createPlan(payload, {
      onSuccess: (response) => {
        console.log("Travel plan created:", response);

        const pdfUrl = response?.pdf_url;

        if (pdfUrl) {
          window.location.assign(pdfUrl);
        }

        router.push("/");
        setTimeout(() => {
          resetDestinations();
          resetPlan();
        }, 300);
      },
      onError: (error) => {
        console.error("Error creating travel plan:", error);
      },
    });
  };

  if (!plan) {
    router.push("/plan/create");
  }

  return (
    <div className="max-w-4xl mx-auto border border-gray-300">
      <div ref={contentRef} id="plan-summary">
        <PlanDetail plan={plan} destinationsCount={destinations?.length} />
        <PlanDestinationDetail days={convertToDaywise} />
        <div className="flex items-center justify-center pb-10 bg-gray-50">
          <CommonButton
            label="Confirm Plan"
            onClick={handleCreateTravelPlan}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
