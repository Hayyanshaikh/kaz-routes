import PlanOverview from "@/app/components/Planning/PlanOverview";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Plan Overview",
  description: "Plan Overview",
};

const Overview = () => {
  return <PlanOverview />;
};

export default Overview;
