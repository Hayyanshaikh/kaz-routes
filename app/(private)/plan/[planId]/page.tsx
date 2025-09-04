"use client";
import React, { ReactNode, useEffect } from "react";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";
import Section from "@/app/components/Container/Section";
import Container from "@/app/components/Container";
import DestinationPlan from "@/app/components/Planning/DestinationPlan";

const page = () => {
  const router = useRouter();
  const plan = usePlanStore((state) => state.plan);

  useEffect(() => {
    if (!plan?.id) {
      router.push("/plan/create");
    }
  }, [plan, router]);

  return (
    <Section>
      <Container>
        <DestinationPlan />
      </Container>
    </Section>
  );
};

export default page;
