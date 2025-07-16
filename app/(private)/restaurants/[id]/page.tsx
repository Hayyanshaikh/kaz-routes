"use client";

import React from "react";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import { useControllerGetFindOneRestaurant } from "@/app/hooks/api";
import PageLoading from "@/app/components/common/PageLoading";
import RestaurantDetails from "@/app/components/SingleRestaurat/RestaurantDetails";
import ImagesGallery from "@/app/components/SingleHotel/ImagesGallery";

const SingleRestaurant = () => {
  const params = useParams();
  const { id } = params;

  const { data: restaurantRes, isLoading } = useControllerGetFindOneRestaurant(
    String(id)
  );
  const restaurant = restaurantRes?.data;

  if (isLoading || !restaurant) {
    return <PageLoading />;
  }

  return (
    <Section>
      <Container className="flex-start">
        <main className="flex flex-col lg:flex-row gap-16">
          <RestaurantDetails restaurant={restaurant} />
          <ImagesGallery images={restaurant.images} />
        </main>
      </Container>
    </Section>
  );
};

export default SingleRestaurant;
