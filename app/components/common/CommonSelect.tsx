import React from "react";
import { Form, Select } from "antd";
import { CommonSelectProps } from "@/app/types/CommonType";

const CommonSelect: React.FC<CommonSelectProps> = ({
  onValueChange,
  options,
  label = "",
  className = "",
  name,
  onSelect,
  placeholder = "Select",
  disabled = false,
}) => {
  return (
    <Form.Item
      layout="vertical"
      label={label}
      name={name}
      className="w-full !mb-0 text-left"
    >
      <Select
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        options={options}
        onSelect={onSelect}
        onChange={onValueChange}
      />
    </Form.Item>
  );
};

export default CommonSelect;
