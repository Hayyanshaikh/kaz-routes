import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import ImagesGallery from "@/app/components/SingleHotel/ImagesGallery";
import PropertyDetails from "@/app/components/SingleHotel/PropertyDetails";
import { SINGLE_HOTEL } from "@/lib/constant";
import React from "react";

type Props = {};

const SingleHotel = (props: Props) => {
  return (
    <Section>
      <Container className="flex-start">
        <main className="flex flex-col lg:flex-row gap-16">
          <PropertyDetails hotel={SINGLE_HOTEL} />
          <ImagesGallery images={SINGLE_HOTEL?.images} />
        </main>
      </Container>
    </Section>
  );
};

export default SingleHotel;
