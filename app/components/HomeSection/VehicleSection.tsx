"use client";
import React from "react";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import VehicleCard from "../Cards/VehicleCard";
import { FILE_BASE_URL, VEHICLE_DATA } from "@/lib/constant";
import { useControllerGetFindAllCars } from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";
import { useTranslations } from "next-intl";

type Props = {};

const VehicleSection = (props: Props) => {
  const t = useTranslations("home.cars");
  const { data, isLoading } = useControllerGetFindAllCars();
  const cars = data?.data;

  if (isLoading) {
    return <PageLoading />;
  }
  return (
    cars?.length > 0 && (
      <Section>
        <Container>
          <div>
            <CommonHeading title={t("title")} subtitle={t("description")} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cars?.map((car: any, index: number) => {
                const features = [
                  car.fuel_type,
                  car.transmission,
                  `${car.seating_capacity} Seating`,
                  car.category.name,
                ];
                return (
                  <VehicleCard
                    key={index}
                    id={car?.id}
                    carBrand={car?.brand?.name}
                    carModel={`${car?.model} - ${car?.year}`}
                    features={features}
                    imageUrl={
                      car.images[0]?.image_path
                        ? `${FILE_BASE_URL}/${car.images[0]?.image_path}`
                        : "https://placehold.co/600x400?text=No+Image"
                    }
                    isAvailable={car?.availability?.status}
                    price={car?.daily_rate}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    )
  );
};

export default VehicleSection;
