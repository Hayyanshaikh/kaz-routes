import { CommonSwitchProps } from "@/app/types/CommonType";
import { Switch } from "@/shadcn/components/ui/switch";

const CommonSwitch: React.FC<CommonSwitchProps> = ({
  checked,
  onCheckedChange,
  className = "",
  label = "",
}) => (
  <label
    className={`flex items-center gap-2 cursor-pointer user-select-none ${className}`}
  >
    <Switch
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={`cursor-pointer`}
    />
    {label && <span className="user-select-none">{label}</span>}
  </label>
);

export default CommonSwitch;
