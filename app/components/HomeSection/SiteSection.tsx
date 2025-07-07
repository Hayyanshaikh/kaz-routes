"use client";
import React from "react";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../Common/CommonHeading";
import SiteCard from "../Cards/SiteCard";
import { COUNTRIES_DATA } from "@/lib/constant";

type Props = {};

const SiteSection = (props: Props) => {
  return (
    <Section className="bg-stone-100">
      <Container>
        <div>
          <CommonHeading
            title="Explore Our Global Sites"
            subtitle="Discover the diverse range of countries we operate in, each offering unique experiences and opportunities."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {COUNTRIES_DATA.map((country, index) => (
              <SiteCard key={index} {...country} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SiteSection;
