import { CommonTextareaProps } from "@/app/types/CommonType";
import { Textarea } from "@/shadcn/components/ui/textarea";

const CommonTextarea: React.FC<CommonTextareaProps> = ({
  value,
  onChange,
  placeholder = "",
  disabled = false,
  className = "",
  label = "",
}) => (
  <>
    {label && <label className="mb-2 text-sm text-gray-600">{label}</label>}
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  </>
);

export default CommonTextarea;
