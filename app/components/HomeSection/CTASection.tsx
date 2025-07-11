"use client";

import React from "react";
import Container from "../Container";
import Section from "../Container/Section";
import CommonButton from "../common/CommonButton";

const CTASection = () => {
  return (
    <Section
      className="relative bg-cover bg-center bg-no-repeat py-20"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Content */}
      <Container>
        <div className="relative z-10 text-center max-w-2xl mx-auto text-white">
          <h2 className="text-3xl font-bold mb-4">
            Discover Tailored Travel Packages
          </h2>
          <p className="mb-6">
            Explore curated trips, luxury stays, and adventure experiences — all
            ready to book in just a few clicks.
          </p>
          <CommonButton label="Explore Packages" />
        </div>
      </Container>
    </Section>
  );
};

export default CTASection;
