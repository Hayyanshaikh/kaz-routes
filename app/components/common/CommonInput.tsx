import { CommonInputProps } from "@/app/types/CommonType";
import { Input } from "@/shadcn/components/ui/input";

const CommonInput: React.FC<CommonInputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  max = 30,
  min = 1,
  label = "",
  error,
}) => (
  <div className="text-left w-full">
    {label && (
      <label className="mb-2 block text-xs text-gray-600">{label}</label>
    )}
    <Input
      type={type}
      max={max}
      min={min}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`text-black block bg-white text-sm ${
        error ? "border-red-500" : ""
      } ${className}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default CommonInput;
