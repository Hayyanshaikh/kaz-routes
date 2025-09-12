"use client";

import React, { useEffect, useRef } from "react";
import PlanDetail from "./PlanDetail";
import PlanDestinationDetail from "./PlanDestinationDetail";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";

const Index = () => {
  const { plan } = usePlanStore();
  const { destinations } = useDestinationStore();
  const router = useRouter();

  console.log({ payload: { plan, destinations } });

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!plan) {
      router.push("/plan/create");
    }
  }, [plan, router]);

  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto border border-gray-300">
      <div ref={contentRef} id="plan-summary">
        <PlanDetail plan={plan} destinationsCount={destinations?.length} />
        <PlanDestinationDetail destinations={destinations} />
      </div>
    </div>
  );
};

export default Index;
