import { CommonBadgeProps } from "@/app/types/CommonType";
import { Badge } from "@/shadcn/components/ui/badge";

const CommonBadge: React.FC<CommonBadgeProps> = ({
  label,
  className = "",
  color,
}) => {
  let colorClass = "";

  if (color === "success") colorClass = "bg-green-200 text-green-800";
  else if (color === "warning") colorClass = "bg-yellow-200 text-yellow-800";
  else if (color === "error") colorClass = "bg-red-200 text-red-800";

  return (
    <Badge
      className={`border-0 rounded-full leading-none py-1 pb-1.5 px-3 ${className} ${colorClass}`}
    >
      {label}
    </Badge>
  );
};

export default CommonBadge;
