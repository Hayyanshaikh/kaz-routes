"use client";
import React from "react";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import HotelCard from "../Cards/HotelCard";
import PageLoading from "../common/PageLoading";
import { useControllerGetFindAllHotels } from "@/app/hooks/api";
import CommonSlider from "../common/CommonSlider";

const SiteSection = () => {
  const { data, isLoading } = useControllerGetFindAllHotels();
  const hotels = data?.data || [];

  if (isLoading) return <PageLoading />;

  const hotelSlides = hotels.map((hotel: any) => (
    <HotelCard hotelData={hotel} />
  ));

  return (
    <Section className="bg-gray-100">
      <Container>
        <div>
          <CommonHeading
            title="Explore Our Global Sites"
            subtitle="Discover the diverse range of places we operate in, each offering unique experiences."
          />

          <CommonSlider
            items={hotelSlides}
            slidesPerView={4}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          />
        </div>
      </Container>
    </Section>
  );
};

export default SiteSection;
