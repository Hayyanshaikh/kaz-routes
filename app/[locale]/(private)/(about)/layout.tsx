"use client";
import AboutNav from "@/app/components/About/AboutNav";
import AboutSidebar from "@/app/components/About/Sidebar";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <Section className="min-h-screen">
      <Container>
        <div className="flex flex-col  md:flex-row ">
          <AboutSidebar />
          <main className="flex-1">{children}</main>
        </div>
      </Container>
    </Section>
  );
};

export default layout;
