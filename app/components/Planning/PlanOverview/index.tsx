"use client";

import React, { useEffect, useRef } from "react";
import PlanDetail from "./PlanDetail";
import PlanDestinationDetail from "./PlanDestinationDetail";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { useRouter } from "next/navigation";
import { overviewData, overviewData2 } from "@/lib/constant";
import { useControllerPostCreateTravelPlan } from "@/app/hooks/api";
import CommonButton from "../../common/CommonButton";
import { transformToDayWise } from "@/app/manipulators/planManipulator";
import dayjs from "dayjs";
import { message } from "antd";
import { useTranslations } from "next-intl";

const PlanOverview = () => {
  const t = useTranslations("planning");
  const { plan, resetPlan } = usePlanStore();
  const { destinations, resetDestinations } = useDestinationStore();
  const router = useRouter();
  const { mutateAsync: createPlan, isPending } =
    useControllerPostCreateTravelPlan();
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  // const plan = overviewData2?.plan;
  // const destinations = overviewData2?.destinations;
  const data = { plan, destinations: destinations as any };
  console.log({ destinations });

  const convertToDaywise = transformToDayWise(data);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCreateTravelPlan = () => {
    if (!plan) return;

    const formattedPlan = {
      ...plan,
      planDateRange: plan.planDateRange?.map((d: any) =>
        dayjs(d).format("YYYY-MM-DD"),
      ),
    };

    const payload = { plan: formattedPlan, days: convertToDaywise };

    createPlan(payload, {
      onSuccess: (response) => {
        console.log("Travel plan created:", response);
        setIsRedirecting(true);

        const pdfUrl = response?.pdf_url;

        if (pdfUrl) {
          window.location.assign(pdfUrl);
        }

        router.push("/");
        setTimeout(() => {
          resetDestinations();
          resetPlan();
        }, 300);
      },
      onError: (error: any) => {
        console.error(
          "Error creating travel plan:",
          error?.response?.data || error,
        );
        message.error(error?.response?.data?.message || t("createError"));
      },
    });
  };

  useEffect(() => {
    if (!plan) {
      router.push("/plan/create");
    }
  }, [plan, router]);

  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto border border-gray-300">
      <div ref={contentRef} id="plan-summary">
        <PlanDetail
          plan={plan}
          isPending={isPending}
          isRedirecting={isRedirecting}
          destinationsCount={destinations?.length}
          handleCreateTravelPlan={handleCreateTravelPlan}
        />
        <PlanDestinationDetail days={convertToDaywise} />
        <div className="flex items-center justify-center pb-10 bg-gray-50">
          <CommonButton
            label={t("confirmPlan")}
            onClick={handleCreateTravelPlan}
            loading={isPending || isRedirecting}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanOverview;
