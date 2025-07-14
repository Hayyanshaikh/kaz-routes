import React from "react";
import HeroSection from "../components/HomeSection/HeroSection";
import PackageSection from "../components/HomeSection/PackageSection";
import DestinationSection from "../components/HomeSection/DestinationSection";
import VehicleSection from "../components/HomeSection/VehicleSection";
import SiteSection from "../components/HomeSection/SiteSection";
import CTASection from "../components/HomeSection/CTASection";
import RestaurantSection from "../components/HomeSection/RestaurantSection";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <HeroSection />
      <DestinationSection />
      <PackageSection />
      <VehicleSection />
      <SiteSection />
      <RestaurantSection />
      <CTASection />
    </div>
  );
};

export default Home;
