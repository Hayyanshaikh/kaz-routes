"use client";
import React from "react";
import { Form, DatePicker, TimePicker } from "antd";
import { CommonDatePickerProps } from "@/app/types/CommonType";
import dayjs, { Dayjs } from "dayjs";

interface ExtendedProps extends CommonDatePickerProps {
  isNotFormItem?: boolean;
  multiple?: boolean;
  allowedDates?: string[]; // ✅ trip dates
}

const CommonDatePicker: React.FC<ExtendedProps> = ({
  name,
  label,
  rules,
  formItemClassName,
  multiple,
  isRequired = true,
  value,
  className,
  placeholder = "Select Date",
  disabled,
  onChange,
  disabledDate,
  mode = "date",
  isNotFormItem = false,
  allowedDates,
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
    // first allowed date for calendar open
    const defaultTripDate =
      allowedDates && allowedDates.length > 0
        ? dayjs(allowedDates[0])
        : undefined;
    const lastTripDate =
      allowedDates && allowedDates.length > 0
        ? dayjs(allowedDates[allowedDates.length - 1])
        : undefined;

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
          value={value || null} // selection disabled
          defaultPickerValue={defaultTripDate} // calendar month open
          placeholder={placeholder || "Select Date & Time"}
          disabled={disabled}
          allowClear={false}
          className={className || "w-full"}
          onChange={() => {}} // disable selection
          disabledDate={handleDisabledDate}
        />
      );
    }

    if (mode === "range") {
      return (
        <DatePicker.RangePicker
          value={value || null} // selected dates show honge
          defaultPickerValue={
            allowedDates && allowedDates.length > 0
              ? [
                  dayjs(allowedDates[0]),
                  dayjs(allowedDates[allowedDates.length - 1]),
                ]
              : undefined
          } // calendar initial month
          onChange={onChange} // parent update kare
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
        value={value || null} // selection disabled
        defaultPickerValue={defaultTripDate} // calendar month open
        placement="topLeft"
        placeholder={placeholder}
        disabled={disabled}
        multiple={multiple}
        allowClear={false}
        className={className || "w-full"}
        onChange={() => {}} // disable selection
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
