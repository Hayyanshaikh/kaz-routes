"use client";
import React from "react";
import { Form, Select, Tag } from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { CommonMultiSelectProps } from "@/app/types/CommonType";

const CommonMultiSelect: React.FC<CommonMultiSelectProps> = ({
  label = "",
  placeholder = "Select...",
  disabled = false,
  options,
  name,
  onValueChange,
  className = "",
  onSelect,
  isRequired = true,
  rules,
}) => {
  const appliedRules =
    rules && rules.length > 0
      ? rules
      : isRequired
        ? [{ required: true, message: `${name} is required` }]
        : [];

  return (
    <Form.Item
      layout="vertical"
      name={name}
      label={label}
      rules={appliedRules}
      required={isRequired}
      className={`${className} !mb-0`}
    >
      <Select
        mode="multiple"
        allowClear
        disabled={disabled}
        placeholder={placeholder}
        options={options}
        onSelect={onSelect}
        onChange={onValueChange}
        className="w-full"
        suffixIcon={<DownOutlined />}
      />
    </Form.Item>
  );
};

export default CommonMultiSelect;