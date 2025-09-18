import React from "react";
import { Form, Input } from "antd";
import { CommonTextareaProps } from "@/app/types/CommonType";

const { TextArea } = Input;

const CommonTextarea: React.FC<CommonTextareaProps> = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  name,
  className = "",
  label = "",
}) => {
  return (
    <Form.Item
      layout="vertical"
      label={label}
      className="w-full !mb-0"
      name={name}
    >
      <TextArea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={className}
        rows={4} // default height (customizable)
      />
    </Form.Item>
  );
};

export default CommonTextarea;
