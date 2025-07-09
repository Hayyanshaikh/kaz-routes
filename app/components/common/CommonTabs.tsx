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
    <Tabs defaultValue={defaultValue} className={className}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
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
