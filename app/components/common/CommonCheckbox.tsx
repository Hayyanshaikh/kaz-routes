import { CommonCheckboxProps } from "@/app/types/CommonType";
import { Checkbox, Form } from "antd";

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  name,
  label,
  value,
  checked,
  onChange,
  rules,
  className = "",
}) => {
  return (
    <Form.Item name={name} rules={rules} valuePropName="checked" noStyle>
      <Checkbox
        value={value}
        checked={checked}
        onChange={(e) => onChange && onChange(e.target.checked)}
        className={className + " text-sm text-gray-600"}
      >
        {label}
      </Checkbox>
    </Form.Item>
  );
};

export default CommonCheckbox;
