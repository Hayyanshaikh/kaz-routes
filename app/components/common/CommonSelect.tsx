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
  placeholder = "Select...",
}) => (
  <Select value={value} onValueChange={onValueChange}>
    {label && <label className="mb-2 text-sm text-gray-600">{label}</label>}
    <SelectTrigger className={`cursor-pointer w-full ${className}`}>
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
);

export default CommonSelect;
