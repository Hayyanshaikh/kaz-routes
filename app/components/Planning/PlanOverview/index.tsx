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

const apiPayload = (data: any) => {
  console.log({ data });
  return {
    plan: {
      planName: data.plan.planName,
      countries: data.plan.countries,
      adults: data.plan.adults,
      startDate: data.plan.planDateRange[0],
      endDate: data.plan.planDateRange[1],
      childrens: data.plan.childrens,
      infants: data.plan.infants,
    },
    destinations: data.destinations.map((dest) => ({
      name: dest.name,
      nights: dest.nights,
      image: dest.image,
      hotelBookings: dest.hotels.map((hotel) => ({
        hotel_id: hotel.hotel_id,
        room_id: hotel.id,
      })),
      carBookings: dest.cars.map((car) => ({
        id: car.id,
        pickup_location: car.pickup_location,
        dropoff_location: car.dropoff_location,
      })),
      siteBookings: dest.sites.map((site) => ({
        id: site.id,
        date: site.bookingDates,
      })),
      restaurantBookings: dest.restaurants.map((res) => ({
        restaurantId: res.restaurant.id,
        dishId: res.dishId,
        variantId: res.variant.id,
        quantity: res.quantity,
      })),
    })),
  };
};

const Index = () => {
  const { plan, resetPlan } = usePlanStore();
  const { destinations, resetDestinations } = useDestinationStore();
  const router = useRouter();
  const { mutateAsync: createPlan, isPending } =
    useControllerPostCreateTravelPlan();

  // const plan = overviewData2?.plan;
  // const destinations = overviewData2?.destinations;
  const data = { plan, destinations };

  const convertToDaywise = transformToDayWise(data);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleCreateTravelPlan = () => {
    const payload = { plan, days: convertToDaywise };
    console.log({ payload, data });

    createPlan(payload, {
      onSuccess: (response) => {
        console.log("Travel plan created:", response);

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
      onError: (error) => {
        console.error("Error creating travel plan:", error);
      },
    });
  };

  if (!plan) return null;

  return (
    <div className="max-w-4xl mx-auto border border-gray-300">
      <div ref={contentRef} id="plan-summary">
        <PlanDetail plan={plan} destinationsCount={destinations?.length} />
        <PlanDestinationDetail days={convertToDaywise} />
        <div className="flex items-center justify-center pb-10 bg-gray-50">
          <CommonButton
            label="Confirm Plan"
            onClick={handleCreateTravelPlan}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
