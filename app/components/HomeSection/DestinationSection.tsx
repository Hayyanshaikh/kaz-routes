"use client";
import React from "react";
import DestinationCard from "../Cards/DestinationCard";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import { FILE_BASE_URL } from "@/lib/constant";
import CommonSlider from "../common/CommonSlider";
import { useControllerGetFindAllCountries } from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";

type Props = {};

const DestinationSection = (props: Props) => {
  const { data, isLoading } = useControllerGetFindAllCountries();
  const destinations = data?.data;

  if (isLoading) {
    return <PageLoading />;
  }

  const items = destinations?.map((destination: any, index: number) => (
    <DestinationCard
      key={index}
      imageUrl={`${FILE_BASE_URL}/${destination?.image}`}
      imageAlt={destination.name}
      buttonText={destination.name}
    />
  ));

  return destinations?.length > 0 ? (
    <Section>
      <Container>
        <CommonHeading
          subtitle="Browse our curated destinations and start planning your journey today."
          title="Explore Our Destinations"
        />
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {destinations?.map((destination: any, index: number) => (
            <DestinationCard
              key={index}
              imageUrl={`${FILE_BASE_URL}/${destination?.image}`}
              imageAlt={destination?.name}
              buttonText={destination?.name}
            />
          ))}
        </div>
        <div className="md:hidden block">
          <CommonSlider
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              500: {
                slidesPerView: 2,
              },
              650: {
                slidesPerView: 3,
              },
            }}
            items={items}
          />
        </div>
      </Container>
    </Section>
  ) : null;
};

export default DestinationSection;
