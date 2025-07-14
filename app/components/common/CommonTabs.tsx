import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn/components/ui/tabs";
import { CommonTabsProps } from "@/app/types/CommonType";

const CommonTabs: React.FC<CommonTabsProps> = ({
  tabs,
  defaultValue,
  className = "",
}) => {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className={className}>
      <TabsList className="rounded-sm">
        {tabs.map((tab) => (
          <TabsTrigger
            className="rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-white"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CommonTabs;
