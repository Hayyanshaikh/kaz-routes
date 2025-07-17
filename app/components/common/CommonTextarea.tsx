import { CommonTextareaProps } from "@/app/types/CommonType";
import { Textarea } from "@/shadcn/components/ui/textarea";

const CommonTextarea: React.FC<CommonTextareaProps> = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  label = "",
  error,
}) => (
  <div className="text-left w-full">
    {label && (
      <label className="mb-1 block text-xs text-gray-600">{label}</label>
    )}
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${className} text-sm ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default CommonTextarea;
