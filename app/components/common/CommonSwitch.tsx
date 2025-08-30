import { CommonSwitchProps } from "@/app/types/CommonType";
import { Switch, Form } from "antd";

const CommonSwitch: React.FC<CommonSwitchProps> = ({
  checked,
  onCheckedChange,
  className = "",
  label = "",
}) => (
  <Form.Item
    label={label}
    className={className}
    valuePropName="checked" // Switch ke liye zaroori
  >
    <Switch
      checked={checked}
      onChange={onCheckedChange} // Antd me "onChange" hota hai
    />
  </Form.Item>
);

export default CommonSwitch;
