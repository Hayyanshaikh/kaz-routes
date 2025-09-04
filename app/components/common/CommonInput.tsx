"use client";
import React from "react";
import { Form, Input, InputNumber } from "antd";
import { CommonInputProps } from "@/app/types/CommonType";

const CommonInput: React.FC<CommonInputProps> = ({
  name,
  label,
  rules,
  formItemClassName,
  isRequired = true,
  value,
  className,
  placeholder = "Type Here",
  disabled,
  maxLength,
  allowClear = true,
  type = "text",
  prefix,
  suffix,
  onChange,
  min,
  max,
  step = 1,
}) => {
  const handleChange = (val: any) => onChange?.(val);

  const appliedRules =
    rules && rules.length > 0
      ? rules
      : isRequired
      ? [{ required: true, message: `${label || name} is required` }]
      : [];

  const renderInputText = () => (
    <Input
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={className}
      allowClear={allowClear}
      type="text"
      prefix={prefix}
      suffix={suffix}
      onChange={(e) => handleChange(e.target.value)}
    />
  );

  const renderInputPassword = () => (
    <Input.Password
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      allowClear={allowClear}
      className={className}
      prefix={prefix}
      suffix={suffix}
      onChange={(e) => handleChange(e.target.value)}
    />
  );

  const renderInputNumber = () => (
    <InputNumber
      placeholder={placeholder}
      disabled={disabled}
      className={`!w-full ${className || ""}`}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
    />
  );

  const renderField = () => {
    switch (type) {
      case "password":
        return renderInputPassword();
      case "number":
        return renderInputNumber();
      default:
        return renderInputText();
    }
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={appliedRules}
      required={isRequired}
      layout="vertical"
      className={formItemClassName || "w-full !mb-0 block"}>
      {renderField()}
    </Form.Item>
  );
};

export default CommonInput;
