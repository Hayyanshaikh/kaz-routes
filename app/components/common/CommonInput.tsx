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
  error,
}) => (
  <div className="text-left w-full">
    {label && (
      <label className="mb-1 block text-xs text-gray-600">{label}</label>
    )}
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`text-black text-sm ${
        error ? "border-red-500" : ""
      } ${className}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default CommonInput;
