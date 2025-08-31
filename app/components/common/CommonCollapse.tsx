import React from 'react';
import { Collapse } from 'antd';

interface CollapseProps {
  items: Array<{
    header: React.ReactNode;
    content: React.ReactNode;
    key: string;
  }>;
  defaultActiveKey?: string | string[];
}

const CommonCollapse = ({ items, defaultActiveKey }: CollapseProps) => {
  const panelItems = items.map((item) => ({
    key: item.key,
    label: item.header,
    children: item.content,
  }));

  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      items={panelItems}
      className="w-full"
    />
  );
};

export default CommonCollapse;