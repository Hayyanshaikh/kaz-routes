import React from "react";
import CommonHeading from "../Common/CommonHeading";
import Container from "../Container";
import Section from "../Container/Section";
import PackageCard from "../Cards/PackageCard";
import CommonSlider from "../Common/CommonSlider";
import { PACKAGES } from "@/lib/constant";

type Props = {};

const PackageSection = (props: Props) => {
  const packageCards = PACKAGES.map((pkg, index) => (
    <PackageCard
      key={index}
      imageUrl={pkg.imageUrl}
      rating={pkg.rating}
      title={pkg.title}
      description={pkg.description}
      duration={pkg.duration}
      maxParticipants={pkg.maxParticipants}
      highlights={pkg.highlights}
      price={pkg.price}
    />
  ));

  return (
    <Section className="bg-stone-100">
      <Container>
        <div>
          <CommonHeading
            title="Ready Made Tour Packages"
            subtitle="Choose from our carefully curated selection of premium tour packages, each designed to provide unforgettable experiences."
          />
          <CommonSlider
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={30}
            items={packageCards}
          />
        </div>
      </Container>
    </Section>
  );
};

export default PackageSection;
