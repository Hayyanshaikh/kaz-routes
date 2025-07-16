"use client";

import React from "react";
import { useParams } from "next/navigation";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import { useControllerGetFindOneSite } from "@/app/hooks/api";
import PageLoading from "@/app/components/common/PageLoading";
import SitesDetail from "@/app/components/SingleSite/SitesDetail";
import ImagesGallery from "@/app/components/SingleHotel/ImagesGallery";

const SingleSite = () => {
  const params = useParams();
  const { id } = params;

  const { data: siteRes, isLoading } = useControllerGetFindOneSite(String(id));
  const site = siteRes?.data;

  if (isLoading || !site) {
    return <PageLoading />;
  }

  return (
    <Section>
      <Container className="flex-start">
        <main className="flex flex-col lg:flex-row gap-16">
          <SitesDetail site={site} />
          <ImagesGallery images={site.media?.images || []} />
        </main>
      </Container>
    </Section>
  );
};

export default SingleSite;
