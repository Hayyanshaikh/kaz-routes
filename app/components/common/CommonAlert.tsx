import { CommonAlertProps } from "@/app/types/CommonType";
import { Alert, AlertTitle } from "@/shadcn/components/ui/alert";

const CommonAlert: React.FC<CommonAlertProps> = ({
  title,
  color,
  className = "",
}) => {
  let colorClass = "";

  if (color === "success")
    colorClass = "bg-green-100 text-green-800 border border-green-300";
  else if (color === "warning")
    colorClass = "bg-yellow-100 text-yellow-800 border border-yellow-300";
  else if (color === "error")
    colorClass = "bg-red-100 text-red-800 border border-red-300";

  return (
    <Alert className={`${colorClass} ${className}`}>
      <AlertTitle>{title}</AlertTitle>
    </Alert>
  );
};

export default CommonAlert;
