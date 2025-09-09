"use client";
import React from "react";
import { Form, DatePicker, TimePicker } from "antd";
import { CommonDatePickerProps } from "@/app/types/CommonType";
import dayjs, { Dayjs } from "dayjs";

interface ExtendedProps extends CommonDatePickerProps {
  isNotFormItem?: boolean;
  allowedDates?: string[]; // ✅ new prop
}

const CommonDatePicker: React.FC<ExtendedProps> = ({
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
  isNotFormItem = false, // ✅ new prop
  allowedDates, // ✅ new prop
}) => {
  const appliedRules =
    rules && rules.length > 0
      ? rules
      : isRequired
      ? [{ required: true, message: `${label || name} is required` }]
      : [];

  // ✅ Custom disabledDate logic with allowedDates
  const handleDisabledDate = (current: Dayjs) => {
    if (allowedDates && allowedDates.length > 0) {
      return !allowedDates.some((d) => current.isSame(dayjs(d), "day"));
    }
    return disabledDate ? disabledDate(current) : false;
  };

  const renderPicker = () => {
    if (mode === "time") {
      return (
        <TimePicker
          value={value}
          placeholder={placeholder || "Select Time"}
          disabled={disabled}
          className={className || "w-full"}
          onChange={onChange}
          allowClear={false}
          format="HH:mm"
        />
      );
    }

    if (mode === "datetime") {
      return (
        <DatePicker
          placement="topLeft"
          showTime
          value={value}
          placeholder={placeholder || "Select Date & Time"}
          disabled={disabled}
          allowClear={false}
          className={className || "w-full"}
          onChange={onChange}
          disabledDate={handleDisabledDate}
        />
      );
    }

    if (mode === "range") {
      return (
        <DatePicker.RangePicker
          value={value}
          onChange={onChange}
          placement="topLeft"
          placeholder={["Start Date", "End Date"]}
          disabled={disabled}
          allowClear={false}
          className={className || "w-full"}
          disabledDate={handleDisabledDate}
        />
      );
    }

    return (
      <DatePicker
        value={value}
        placement="topLeft"
        placeholder={placeholder}
        disabled={disabled}
        allowClear={false}
        className={className || "w-full"}
        onChange={onChange}
        disabledDate={handleDisabledDate}
      />
    );
  };

  if (isNotFormItem) {
    return renderPicker();
  }

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
