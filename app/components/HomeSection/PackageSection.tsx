import React from "react";
import CommonHeading from "../Common/CommonHeading";
import Container from "../Container";
import Section from "../Container/Section";
import PackageCard from "../Packages/PackageCard";

type Props = {};

const PackageSection = (props: Props) => {
  return (
    <Section>
      <Container>
        <div>
          <CommonHeading
            title="Ready Made Tour Packages"
            subtitle="Choose from our carefully curated selection of premium tour packages, each designed to provide unforgettable experiences."
          />
          <div className="mt-8">
            <PackageCard
              imageUrl="https://placehold.co/600x400/87CEEB/FFFFFF?text=Desert+Safari" // Replace with your actual image URL
              rating={4.8}
              title="Desert Safari Experience"
              description="Explore the golden dunes with camel rides, traditional cuisine, and starlit camping."
              duration="3 Days"
              maxParticipants={12}
              highlights={[
                "Camel Riding",
                "Desert Camping",
                "Cultural Show",
                "4WD Adventure",
              ]}
              price={449}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PackageSection;
