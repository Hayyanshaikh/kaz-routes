"use client";
import React, { ReactNode, useEffect } from "react";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";
import Section from "@/app/components/Container/Section";
import Container from "@/app/components/Container";
import DestinationPlan from "@/app/components/Planning/DestinationPlan";
import useDestinationStore from "@/app/store/destinationStore";
import PlanSummary from "@/app/components/Planning/PlanSummary";

const layout = ({ children }) => {
  const router = useRouter();
  const plan = usePlanStore((state) => state.plan);
  const { destinations } = useDestinationStore();

  useEffect(() => {
    if (!plan?.id) {
      router.push("/plan/create");
    }
  }, [plan, router]);

  console.log({ plan, destinations });

  return (
    <Section>
      <Container>
        <PlanSummary />
        <div className="flex items-start gap-3">
          <div className="flex-[0_0_250px]">
            <DestinationPlan />
          </div>
          {children}
        </div>
      </Container>
    </Section>
  );
};

export default layout;
