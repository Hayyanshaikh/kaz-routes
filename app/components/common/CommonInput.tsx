"use client";
import React from "react";
import { Form, Input } from "antd";
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
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange?.(e.target.value);

  const appliedRules =
    rules && rules.length > 0
      ? rules
      : isRequired
      ? [{ required: true, message: `${label || name} is required` }]
      : [];

  const renderInputText = () => (
    <Input
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      className={className}
      allowClear={allowClear}
      type={type}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
    />
  );

  const renderInputPassword = () => (
    <Input.Password
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      allowClear={allowClear}
      className={className}
      prefix={prefix}
      suffix={suffix}
      onChange={handleChange}
    />
  );

  const renderField = () => {
    switch (type) {
      case "password":
        return renderInputPassword();
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
      className={formItemClassName || "w-full !mb-0 block"}
    >
      {renderField()}
    </Form.Item>
  );
};

export default CommonInput;
