"use client";
import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../common/CommonHeading";
import { useControllerGetFindAllRestaurants } from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";
import { FILE_BASE_URL } from "@/lib/constant";

const RestaurantSection = () => {
  const { data, isLoading } = useControllerGetFindAllRestaurants();

  if (isLoading) return <PageLoading />;

  const restaurants = data?.data || []; // yahan extract kiya

  console.log({ restaurants });

  return (
    <Section>
      <Container>
        <CommonHeading
          title="Explore Our Top Restaurants"
          subtitle="Discover the best dining experiences with our curated selection of top-rated restaurants."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default RestaurantSection;
