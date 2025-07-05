"use client";
import React from "react";
import HeroSection from "../components/HomeSection/HeroSection";
import PackageSection from "../components/HomeSection/PackageSection";
import DestinationSection from "../components/HomeSection/DestinationSection";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <HeroSection />
      <DestinationSection />
      <PackageSection />
    </div>
  );
};

export default Home;
