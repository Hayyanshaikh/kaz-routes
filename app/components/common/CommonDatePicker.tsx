"use client";
import React from "react";
import { Form, DatePicker, TimePicker } from "antd";
import { CommonDatePickerProps } from "@/app/types/CommonType";

const CommonDatePicker: React.FC<CommonDatePickerProps> = ({
  name,
  label,
  rules,
  formItemClassName,
  isRequired = true,
  value,
  className,
  placeholder = "Select Date",
  disabled,
  onChange,
  disabledDate,
  mode = "date",
}) => {
  const appliedRules =
    rules && rules.length > 0
      ? rules
      : isRequired
      ? [{ required: true, message: `${label || name} is required` }]
      : [];

  const renderPicker = () => {
    if (mode === "time") {
      return (
        <TimePicker
          value={value}
          placeholder={placeholder || "Select Time"}
          disabled={disabled}
          className={className || "w-full"}
          onChange={onChange}
          format="HH:mm"
        />
      );
    }

    if (mode === "datetime") {
      return (
        <DatePicker
          showTime
          value={value}
          placeholder={placeholder || "Select Date & Time"}
          disabled={disabled}
          className={className || "w-full"}
          onChange={onChange}
          disabledDate={disabledDate}
        />
      );
    }

    return (
      <DatePicker
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        className={className || "w-full"}
        onChange={onChange}
        disabledDate={disabledDate}
      />
    );
  };

  return (
    <Form.Item
      name={name}
      label={label}
      layout="vertical"
      rules={appliedRules}
      required={isRequired}
      className={formItemClassName || "w-full !mb-0 block"}
    >
      {renderPicker()}
    </Form.Item>
  );
};

export default CommonDatePicker;
