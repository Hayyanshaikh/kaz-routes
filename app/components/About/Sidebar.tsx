"use client";

import { Sidebar, SidebarContent } from "@/shadcn/components/ui/sidebar";
import React from "react";
import AboutNav from "./AboutNav";

type Props = {};

const AboutSidebar = (props: Props) => {
  return (
    <Sidebar className="sticky top-10 pr-3">
      <SidebarContent className="bg-white">
        <AboutNav />
      </SidebarContent>
    </Sidebar>
  );
};

export default AboutSidebar;
