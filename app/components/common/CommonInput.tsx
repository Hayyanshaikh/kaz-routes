import { CommonInputProps } from "@/app/types/CommonType";
import { Input } from "@/shadcn/components/ui/input";

const CommonInput: React.FC<CommonInputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  label = "",
}) => (
  <>
    {label && <label className="mb-2 text-sm text-gray-600">{label}</label>}
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  </>
);

export default CommonInput;
