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
import { message, Alert } from "antd";
import { useTranslations } from "next-intl";

const PlanOverview = () => {
  const t = useTranslations("planning");
  const { plan, resetPlan, hasHydrated } = usePlanStore();
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

  const requiredSeats = (plan?.adults || 0) + (plan?.childrens || 0);
  const totalCarSeats = (destinations as any[])?.reduce(
    (acc: number, dest: any) => {
      const carSeats = (dest?.cars || []).reduce(
        (sum: number, car: any) => sum + Number(car?.seating_capacity || 0),
        0,
      );
      return acc + carSeats;
    },
    0,
  );

  const totalPackagePrice = convertToDaywise?.reduce((acc: number, day: any) => {
    const hotelTotal = day?.hotelBookings?.reduce(
      (sum: number, h: any) => sum + Number(h.price || 0),
      0,
    );
    const carTotal = day?.carBookings?.reduce(
      (sum: number, c: any) => sum + Number(c.price || 0),
      0,
    );
    const siteTotal = day?.siteBookings?.reduce(
      (sum: number, s: any) =>
        sum +
        (Number(s.price_adult || 0) * (plan?.adults || 0) +
          Number(s.price_child || 0) * (plan?.childrens || 0)),
      0,
    );
    const restaurantTotal = day?.restaurantBookings?.reduce(
      (sum: number, r: any) => sum + Number(r.price || 0) * Number(r.quantity || 0),
      0,
    );

    return acc + hotelTotal + carTotal + siteTotal + restaurantTotal;
  }, 0);

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
    if (hasHydrated && !plan) {
      router.push("/plan/create");
    }
  }, [hasHydrated, plan, router]);

  if (!hasHydrated) return null;
  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto border border-gray-300">
      <div ref={contentRef} id="plan-summary">
        {totalCarSeats > 0 && totalCarSeats < requiredSeats && (
          <div className="p-4">
            <Alert
              type="error"
              showIcon
              message={t("carCapacityWarning", {
                passengers: requiredSeats,
                seats: totalCarSeats,
              })}
            />
          </div>
        )}
        <PlanDetail
          plan={plan}
          isPending={isPending}
          isRedirecting={isRedirecting}
          totalPrice={totalPackagePrice}
          destinationsCount={destinations?.length}
          handleCreateTravelPlan={handleCreateTravelPlan}
        />
        <PlanDestinationDetail days={convertToDaywise} />
        <div className="flex items-center justify-center gap-4 pb-10 bg-gray-50">
          <CommonButton
            label={t("back")}
            onClick={() => router.back()}
            className="bg-transparent! hover:bg-primary! hover:text-white! border-primary! text-primary!"
          />
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
