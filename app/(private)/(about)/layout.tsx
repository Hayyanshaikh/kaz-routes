"use client";
import AboutNav from "@/app/components/About/AboutNav";
import AboutSidebar from "@/app/components/About/Sidebar";
import Container from "@/app/components/Container";
import Section from "@/app/components/Container/Section";
import { SidebarProvider } from "@/shadcn/components/ui/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <Section>
      <Container>
        <SidebarProvider>
          <AboutSidebar />
          <main className="flex-1">
            <div className="md:hidden block">
              <AboutNav />
            </div>
            {children}
          </main>
        </SidebarProvider>
      </Container>
    </Section>
  );
};

export default layout;
