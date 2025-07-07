"use client";
import React from "react";
import Section from "../Container/Section";
import Container from "../Container";
import CommonHeading from "../Common/CommonHeading";
import VehicleCard from "../Cards/VehicleCard";
import { VEHICLE_DATA } from "@/lib/constant";
import CommonButton from "../Common/CommonButton";

type Props = {};

const VehicleSection = (props: Props) => {
  return (
    <Section>
      <Container>
        <div>
          <CommonHeading
            title="Our Premium Vehicle Fleet"
            subtitle="Choose from our diverse collection of well-maintained, comfortable vehicles suitable for any type of journey or adventure."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {VEHICLE_DATA.map((vehicle, index) => (
              <VehicleCard key={index} {...vehicle} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default VehicleSection;
