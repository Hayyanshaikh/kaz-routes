"use client";
import React, { useEffect } from "react";
import StartPlanForm from "./StartPlanForm";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";

type Props = {};

const PlanningDetail = (props: Props) => {
  const router = useRouter();
  const plan = usePlanStore((state) => state.plan);

  useEffect(() => {
    console.table(plan);
    if (plan && plan.id) router.push(`${plan.id}`);
  }, [plan]);
  return (
    <>
      <StartPlanForm />
    </>
  );
};

export default PlanningDetail;
