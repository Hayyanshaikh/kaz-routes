"use client";
import CommonMultiStep from "@/app/components/common/CommonMultiStep";
import CommonTabs from "@/app/components/common/CommonTabs";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import CreatePlanForm from "@/app/components/CreatePlan/CreatePlanForm";
import PackageSummary from "@/app/components/CreatePlan/PackageSummary";
import PlanItemForm from "@/app/components/CreatePlan/PlanItemForm";
import PlanItinerary from "@/app/components/CreatePlan/PlanItinerary";
import { useControllerGetFindPackageItinerariesByPackageId } from "@/app/hooks/api";
import usePackageData from "@/app/store/usePackageData";
import { Step } from "@/app/types/CommonType";
import { useRouter } from "next/navigation";
import useHtmlToPdf from "@/hooks/useHtmlToPdf";
import dayjs from "dayjs";
import React, { useState } from "react";

const CreatePlan = () => {
  const router = useRouter();
  const [packageId, setPackageId] = useState<string | number>("");
  const { packageData, packageItemData, setPackageData, setPackageItemData } =
    usePackageData();

  const { generatePdf } = useHtmlToPdf();

  const [submited, setSubmited] = useState<boolean>(false);

  const { data: suumaryData } =
    useControllerGetFindPackageItinerariesByPackageId(1, true);

  const { data, error, isLoading } =
    useControllerGetFindPackageItinerariesByPackageId(
      packageId as number,
      Boolean(packageId)
    );

  const tabs = packageData
    ? [...Array(Number(packageData?.duration))].map((_, index: number) => {
        const date = dayjs(packageData.arrivalDate)
          .add(index, "day")
          .format("DD MMM, YYYY");
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
      disabled: !packageData,
    },
    {
      title: "Create Items",
      content: <CommonTabs tabs={tabs} />,
      disabled: !packageItemData,
    },
    {
      title: "Plan Itinerary",
      content: (
        <PlanItinerary
          data={data}
          setSubmited={setSubmited}
          submited={submited}
          isLoading={isLoading}
          error={error}
        />
      ),
    },
    {
      title: "Summary",
      content: <PackageSummary data={suumaryData?.data} />,
    },
  ];

  const handleFinish = () => {
    generatePdf("myContent");
    setPackageData(null);
    setPackageItemData(null);
    setTimeout(() => {
      router.push("/"); // yahan home page ka path hai, change karo agar zarurat ho
    }, 1000);
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
