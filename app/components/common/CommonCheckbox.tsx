import { CommonCheckboxProps } from "@/app/types/CommonType";
import { Checkbox } from "@/shadcn/components/ui/checkbox";

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = "",
}) => (
  <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
    <Checkbox
      className="cursor-pointer"
      checked={checked}
      onCheckedChange={onChange}
    />
    {label && (
      <span className="user-select-none text-sm text-gray-600">{label}</span>
    )}
  </label>
);

export default CommonCheckbox;
