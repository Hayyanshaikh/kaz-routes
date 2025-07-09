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
}) => (
  <div className="text-left w-full">
    <Select value={value} onValueChange={onValueChange}>
      {label && (
        <label className="mb-2 block text-xs text-gray-600">{label}</label>
      )}
      <SelectTrigger
        className={`cursor-pointer w-full text-black ${className}`}
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
  </div>
);

export default CommonSelect;
