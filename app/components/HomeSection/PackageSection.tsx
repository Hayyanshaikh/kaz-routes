"use client";
import React from "react";
import CommonHeading from "../common/CommonHeading";
import Container from "../Container";
import Section from "../Container/Section";
import PackageCard from "../Cards/PackageCard";
import CommonSlider from "../common/CommonSlider";
import { FILE_BASE_URL, PACKAGES } from "@/lib/constant";
import { useControllerGetFindAllPackages } from "@/app/hooks/api";
import PageLoading from "../common/PageLoading";

type Props = {};

const PackageSection = (props: Props) => {
  const { data, isLoading } = useControllerGetFindAllPackages();
  const packages = data?.data;

  if (isLoading) {
    return <PageLoading />;
  }

  const packageCards = packages.map((pkg: any, index: number) => (
    <PackageCard
      id={pkg.id}
      key={index}
      imageUrl={`${FILE_BASE_URL}/${pkg.images[0]}`}
      rating={pkg.rating}
      title={pkg.name}
      description={pkg.description}
      duration={pkg.days}
      maxParticipants={
        Number(pkg.adults) + Number(pkg.children) + Number(pkg.infants)
      }
      highlights={pkg.highlights}
      price={pkg.price}
    />
  ));

  return packages?.length > 0 ? (
    <Section className="bg-gray-100">
      <Container>
        <div>
          <CommonHeading
            title="Find Your Perfect Tour Package"
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
  ) : null;
};

export default PackageSection;
