"use client";
import CommonMultiStep from "@/app/components/common/CommonMultiStep";
import CommonTabs from "@/app/components/common/CommonTabs";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import CreatePlanForm from "@/app/components/CreatePlan/CreatePlanForm";
import PlanItemForm from "@/app/components/CreatePlan/PlanItemForm";
import PlanItinerary from "@/app/components/CreatePlan/PlanItinerary";
import usePackageData from "@/app/store/usePackageData";
import { Step } from "@/app/types/CommonType";
import dayjs from "dayjs";
import React from "react";

const CreatePlan = () => {
  const { packageData, packageItemData } = usePackageData();

  const tabs = packageData
    ? [...Array(Number(packageData?.duration))].map((_, index: number) => {
        const date = dayjs(packageData.arrivalDate)
          .add(index, "day")
          .format("MMM DD, YYYY");
        return {
          label: date,
          value: date,
          content: <PlanItemForm date={date} />,
        };
      })
    : [];

  const steps: Step[] = [
    {
      title: "Create Package",
      content: <CreatePlanForm />,
      disabled: packageData ? false : true,
    },
    {
      title: "Create Items",
      content: <CommonTabs tabs={tabs} />,
      disabled: packageItemData ? false : true,
    },
    {
      title: "Plan Itinerary",
      content: <PlanItinerary />,
    },
  ];

  const handleFinish = () => {
    alert("Form completed!");
  };
  return (
    <Section className="bg-gray-100">
      <Container>
        <CommonMultiStep steps={steps} onFinish={handleFinish} />
      </Container>
    </Section>
  );
};

export default CreatePlan;
