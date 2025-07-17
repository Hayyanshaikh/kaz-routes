"use client";

import React from "react";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import ImagesGallery from "@/app/components/SingleHotel/ImagesGallery";
import {
  useControllerGetFindOneHotel,
  useControllerGetFindOnePackage,
} from "@/app/hooks/api";
import PageLoading from "@/app/components/common/PageLoading";
import PackageDetails from "@/app/components/SinglePackage/PackageDetails";

const SingleHotel = () => {
  const params = useParams();
  const { id } = params;

  const { data: packageRes, isLoading } = useControllerGetFindOnePackage(
    String(id)
  );
  const packageDetail = packageRes?.data;
  if (isLoading || !packageDetail) {
    return <PageLoading />;
  }

  return (
    <Section>
      <Container className="flex-start">
        <main className="flex flex-col lg:flex-row gap-16">
          <PackageDetails packageDetail={packageDetail} />
          <ImagesGallery images={packageDetail?.media?.images} />
        </main>
      </Container>
    </Section>
  );
};

export default SingleHotel;
