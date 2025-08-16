import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shadcn/components/ui/tabs";
import { CommonTabsProps } from "@/app/types/CommonType";

type Props = CommonTabsProps & {
  value?: string;
  onValueChange?: (value: string) => void; // controlled tab
};

const CommonTabs: React.FC<Props> = ({
  tabs,
  value,
  onValueChange,
  className = "",
}) => {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <div className="tabs overflow-auto overflow-y-hidden">
        <TabsList className="rounded-sm h-10 justify-start">
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
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CommonTabs;
