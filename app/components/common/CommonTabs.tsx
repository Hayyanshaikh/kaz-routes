"use client";

import React, { useState } from "react";
import { Tabs } from "antd";

interface TabItem {
  value: string; // unique key
  label: string; // tab name
  content: React.ReactNode; // tab content
}

interface CommonTabsProps {
  tabs: TabItem[];
  className?: string;
  tabPosition?: "top" | "left" | "right" | "bottom";
}

const CommonTabs: React.FC<CommonTabsProps> = ({
  tabs,
  className = "",
  tabPosition = "top",
}) => {
  const [activeKey, setActiveKey] = useState(tabs[0]?.value);

  return (
    <div className={`${className}`}>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={tabs.map((tab) => ({
          key: tab.value,
          label: tab.label,
          children: tab.content,
        }))}
        tabPosition={tabPosition}
      />
    </div>
  );
};

export default CommonTabs;
