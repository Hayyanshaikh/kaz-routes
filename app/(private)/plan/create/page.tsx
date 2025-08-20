"use client";

import CommonTabs from "@/app/components/common/CommonTabs";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import CreatePlanForm from "@/app/components/CreatePlan/CreatePlanForm";
import PlanItemForm from "@/app/components/CreatePlan/PlanItemForm";
import PlanItinerary from "@/app/components/CreatePlan/PlanItinerary";
import { useControllerGetFindPackageItinerariesByPackageId } from "@/app/hooks/api";
import usePackageData from "@/app/store/usePackageData";
import { Step } from "@/app/types/CommonType";
import { useRouter } from "next/navigation";
import useHtmlToPdf from "@/hooks/useHtmlToPdf";
import dayjs from "dayjs";
import React, { useState } from "react";
import CommonMultiStep from "@/app/components/common/CommonMultiStep";
import PackageSummary from "@/app/components/CreatePlan/PackageSummary";

const CreatePlan = () => {
  const router = useRouter();
  const { packageData, packageItemData, setPackageData, setPackageItemData } =
    usePackageData();
  const { generatePdf } = useHtmlToPdf();
  const [submited, setSubmited] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { data: summaryData } =
    useControllerGetFindPackageItinerariesByPackageId(
      packageData?.id,
      submited
    );
  const { data, error, isLoading } =
    useControllerGetFindPackageItinerariesByPackageId(
      packageData?.id,
      Boolean(packageData)
    );

  // Multi-step next
  const handleFormCreated = () => {
    setCurrentStep((prev) => prev + 1);
  };

  console.table(packageData);

  // Tabs generation
  const tabs = packageData
    ? (() => {
        const arrival = dayjs(packageData.arrivalDate);
        const departure = dayjs(packageData.flightDepartureDate);
        if (!arrival.isValid() || !departure.isValid()) return [];

        const totalDays = departure.diff(arrival, "day") + 1;
        return [...Array(totalDays)].map((_, index) => {
          const date = arrival.add(index, "day").format("DD MMM, YYYY");
          return {
            label: date,
            value: date,
            content: <PlanItemForm date={date} />,
          };
        });
      })()
    : [];

  // State to control active tab
  const [activeTab, setActiveTab] = useState(0);

  const handleTabComplete = (tabIndex: number) => {
    if (tabIndex < tabs.length - 1) {
      setActiveTab(tabIndex + 1);
    } else {
      // Last tab complete → multi-step next step
      handleFormCreated();
    }
  };

  // Steps
  const steps: Step[] = [
    {
      title: "Create Package",
      content: <CreatePlanForm onCreated={handleFormCreated} />,
      disabled: !packageData,
    },
    {
      title: "Create Items",
      content: (
        <CommonTabs
          tabs={tabs.map((tab, index) => ({
            ...tab,
            content: (
              <PlanItemForm
                date={tab.label}
                onCreated={() => handleTabComplete(index)}
              />
            ),
          }))}
          value={tabs[activeTab]?.value}
          onValueChange={(val) => {
            const index = tabs.findIndex((t) => t.value === val);
            if (index !== -1) setActiveTab(index);
          }}
        />
      ),
      disabled: !packageItemData,
    },
    {
      title: "Plan Itinerary",
      content: (
        <PlanItinerary
          onFinish={(success) => {
            if (success) setCurrentStep((prev) => prev + 1); // move to Summary step
          }}
          data={summaryData?.data}
          setSubmited={setSubmited}
          submited={submited}
          isLoading={isLoading}
          error={error}
        />
      ),
    },
    {
      title: "Summary",
      content: <PackageSummary data={summaryData?.data} />,
    },
  ];

  const handleFinish = () => {
    generatePdf("myContent");
    // setPackageData(null);
    // setPackageItemData(null);
    // setTimeout(() => router.push("/"), 1000);
  };

  return (
    <Section className="bg-gray-100">
      <Container>
        <CommonMultiStep
          steps={steps}
          onFinish={handleFinish}
          currentStepExternal={currentStep}
          setCurrentStepExternal={setCurrentStep}
        />
      </Container>
    </Section>
  );
};

export default CreatePlan;
