import { CommonSelectProps } from "@/app/types/CommonType";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

const CommonSelect: React.FC<CommonSelectProps> = ({
  value,
  onValueChange,
  options,
  label = "",
  className = "",
  placeholder = "Select",
  disabled = false,
  error = "",
}) => (
  <div className="text-left w-full">
    {label && (
      <label className="mb-2 block text-xs text-gray-600">{label}</label>
    )}
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger
        className={`cursor-pointer bg-white w-full text-black ${
          error ? "border-red-500" : ""
        } ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            className="cursor-pointer"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
  </div>
);

export default CommonSelect;
