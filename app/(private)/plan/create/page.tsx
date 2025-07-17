"use client";
import React from "react";
import ComingSoon from "@/app/components/ComingSoon";
import Maintenance from "../../maintenance/page";

const CreatePlan = () => {
  const isMaintenance = false;

  if (isMaintenance) return <Maintenance />;
  return <ComingSoon />;
};

export default CreatePlan;
