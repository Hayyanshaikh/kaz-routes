import React from "react";
import HeroSection from "../components/HomeSection/HeroSection";
import PackageSection from "../components/HomeSection/PackageSection";
import DestinationSection from "../components/HomeSection/DestinationSection";
import VehicleSection from "../components/HomeSection/VehicleSection";
import CTASection from "../components/HomeSection/CTASection";
import RestaurantSection from "../components/HomeSection/RestaurantSection";
import HotelSection from "../components/HomeSection/HotelSection";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <HeroSection />
      <DestinationSection />
      <PackageSection />
      <VehicleSection />
      <HotelSection />
      <RestaurantSection />
      <CTASection />
    </div>
  );
};

export default Home;
