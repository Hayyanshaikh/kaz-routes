import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import PlanningDetail from "@/app/components/Planning";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Create Plan",
  description: "Create plan",
};

const page = (props: Props) => {
  return (
    <Section className="min-h-screen">
      <Container>
        <PlanningDetail />
      </Container>
    </Section>
  );
};

export default page;
