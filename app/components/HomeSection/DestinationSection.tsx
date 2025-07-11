"use client";
import React from "react";
import DestinationCard from "../Cards/DestinationCard";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import { DESTINATION_DATA } from "@/lib/constant";
import CommonSlider from "../common/CommonSlider";

type Props = {};

const DestinationSection = (props: Props) => {
  // Items for slider
  const items = DESTINATION_DATA.map((destination, index) => (
    <DestinationCard
      key={index}
      imageUrl={destination.imageUrl}
      imageAlt={destination.imageAlt}
      buttonText={destination.buttonText}
    />
  ));

  return (
    <Section>
      <Container>
        <CommonHeading
          subtitle="Browse our curated destinations and start planning your journey today."
          title="Explore Our Destinations"
        />
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {DESTINATION_DATA.map((destination, index) => (
            <DestinationCard
              key={index}
              imageUrl={destination.imageUrl}
              imageAlt={destination.imageAlt}
              buttonText={destination.buttonText}
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
  );
};

export default DestinationSection;
