import React from "react";
import { Tabs } from "antd";
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
    <Tabs
      className={className}
      activeKey={value}
      onChange={onValueChange}
      items={tabs.map((tab) => ({
        key: tab.value,
        label: tab.label,
        children: tab.content,
      }))}
    />
  );
};

export default CommonTabs;
