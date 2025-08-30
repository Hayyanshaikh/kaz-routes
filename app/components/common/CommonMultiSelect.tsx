"use client";

import React from "react";
import { Form, Select, Tag } from "antd";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { CommonMultiSelectProps } from "@/app/types/CommonType";

const { Option } = Select;

const CommonMultiSelect: React.FC<CommonMultiSelectProps> = ({
  label = "",
  placeholder = "Select...",
  disabled = false,
  error = "",
  options,
  value = [],
  onValueChange,
  className = "",
}) => {
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : ""}
      help={error || ""}
      className={className}
    >
      <Select
        mode="multiple"
        allowClear
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
        className="w-full"
        suffixIcon={<DownOutlined />}
        tagRender={(props) => {
          const { label, closable, onClose } = props;
          return (
            <Tag
              color="blue"
              closable={closable}
              onClose={onClose}
              closeIcon={<CloseOutlined />}
              style={{ marginRight: 3 }}
            >
              {label}
            </Tag>
          );
        }}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CommonMultiSelect;
