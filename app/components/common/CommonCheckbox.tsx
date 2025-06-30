import { CommonCheckboxProps } from "@/app/types/CommonType";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
  className = "",
}) => (
  <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
    <Checkbox
      className="cursor-pointer"
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
    {label && <span className="user-select-none">{label}</span>}
  </label>
);

export default CommonCheckbox;
