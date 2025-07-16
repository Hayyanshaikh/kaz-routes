"use client";

import React from "react";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import ImagesGallery from "@/app/components/SingleHotel/ImagesGallery";
import PropertyDetails from "@/app/components/SingleHotel/PropertyDetails";
import { useControllerGetFindOneHotel } from "@/app/hooks/api";
import PageLoading from "@/app/components/common/PageLoading";

const SingleHotel = () => {
  const params = useParams();
  const { id } = params;

  const { data: hotelRes, isLoading } = useControllerGetFindOneHotel(
    String(id)
  );
  const hotel = hotelRes?.data;
  if (isLoading || !hotel) {
    return <PageLoading />;
  }

  return (
    <Section>
      <Container className="flex-start">
        <main className="flex flex-col lg:flex-row gap-16">
          <PropertyDetails hotel={hotel} />
          <ImagesGallery images={hotel?.images} />
        </main>
      </Container>
    </Section>
  );
};

export default SingleHotel;
