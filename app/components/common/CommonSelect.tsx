import React from "react";
import { Form, Select } from "antd";
import { CommonSelectProps } from "@/app/types/CommonType";

interface ExtendedCommonSelectProps extends CommonSelectProps {
  rules?: any[];
  isRequired?: boolean;
}

const CommonSelect: React.FC<ExtendedCommonSelectProps> = ({
  onValueChange,
  options,
  label = "",
  className = "",
  name,
  onSelect,
  placeholder = "Select",
  disabled = false,
  rules,
  isRequired = false,
}) => {
  // Agar rules diye gaye hain to wo use honge, warna agar isRequired true hai to default rule
  const formRules =
    rules ||
    (isRequired
      ? [{ required: true, message: `${label || "This field"} is required` }]
      : []);

  return (
    <Form.Item
      layout="vertical"
      label={label}
      name={name}
      className="w-full !mb-0 text-left"
      rules={formRules}
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
