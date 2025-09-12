"use client";
import React from "react";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";
import Section from "@/app/components/Container/Section";
import Container from "@/app/components/Container";
import DestinationPlan from "@/app/components/Planning/DestinationPlan";
import useDestinationStore from "@/app/store/destinationStore";
import PlanSummary from "@/app/components/Planning/PlanSummary";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const plan = usePlanStore((state) => state.plan);
  const { destinations } = useDestinationStore();

  React.useEffect(() => {
    if (!plan?.id) {
      router.push("/plan/create");
    }
  }, [plan, router]);

  return (
    <Section>
      <Container>
        <PlanSummary />
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Sidebar */}
          <div className="w-full lg:w-[250px]">
            <DestinationPlan />
          </div>

          {/* Main Content */}
          <div className="flex-1">{children}</div>
        </div>
      </Container>
    </Section>
  );
};

export default Layout;
