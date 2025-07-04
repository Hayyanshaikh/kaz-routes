"use client";
import React from "react";
import HeroSection from "../components/HomeSection/HeroSection";
import PackageSection from "../components/HomeSection/PackageSection";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <HeroSection />
      <PackageSection />
    </div>
  );
};

export default Home;
