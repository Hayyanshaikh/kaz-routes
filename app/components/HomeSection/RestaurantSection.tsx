"use client";
import React from "react";
import RestaurantCard from "../Cards/RestaurantCard";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../Common/CommonHeading";

type Props = {};

const RestaurantSection = (props: Props) => {
  return (
    <Section>
      <Container>
        <CommonHeading
          title="Explore Our Top Restaurants"
          subtitle="Discover the best dining experiences with our curated selection of top-rated restaurants."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RestaurantCard
            image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80"
            label="Restaurant"
            rating={4.7}
            title="Family Dine Plus"
            description="Family-friendly restaurant with kid zones and healthy menu options."
            seats={80}
            price={30}
            features={[
              "Kids Play Area",
              "Healthy Meals",
              "Free Wi-Fi",
              "Outdoor Seating",
            ]}
          />
          <RestaurantCard
            image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
            label="Restaurant"
            rating={4.5}
            title="Urban Eats"
            description="Trendy spot with a modern menu and cozy ambiance."
            seats={60}
            price={25}
            features={[
              "Live Music",
              "Vegan Options",
              "Pet Friendly",
              "Rooftop Seating",
            ]}
          />
          <RestaurantCard
            image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
            label="Restaurant"
            rating={4.8}
            title="Classic Grill"
            description="Traditional grill house with premium steaks and fine wines."
            seats={100}
            price={40}
            features={[
              "Steakhouse",
              "Wine Selection",
              "Private Dining",
              "Valet Parking",
            ]}
          />
        </div>
      </Container>
    </Section>
  );
};

export default RestaurantSection;
