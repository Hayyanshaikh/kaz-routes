"use client";
import React from "react";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import VehicleCard from "../Cards/VehicleCard";
import { FILE_BASE_URL, VEHICLE_DATA } from "@/lib/constant";
import { useControllerGetFindAllCars } from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";

type Props = {};

const VehicleSection = (props: Props) => {
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
            <CommonHeading
              title="Rent a Car for Your Journey"
              subtitle="Choose from our diverse collection of well-maintained, comfortable vehicles suitable for any type of journey or adventure."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cars?.map((car, index) => {
                const features = [
                  car.fuel_type,
                  car.transmission,
                  `${car.seating_capacity} Seating`,
                  car.category.name,
                ];
                return (
                  <VehicleCard
                    key={index}
                    carBrand={car?.brand?.name}
                    carModel={`${car?.model} - ${car?.year}`}
                    features={features}
                    imageUrl={`${FILE_BASE_URL}/${
                      car.images.find((img) => img.is_featured).image_path
                    }`}
                    location=""
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
