import { CommonAlertProps } from "@/app/types/CommonType";
import { Alert } from "antd";

const CommonAlert: React.FC<CommonAlertProps> = ({
  title,
  color,
  className = "",
}) => {
  let type: "success" | "warning" | "error" | "info" = "info";

  if (color === "success") type = "success";
  else if (color === "warning") type = "warning";
  else if (color === "error") type = "error";

  return <Alert message={title} type={type} className={className} showIcon />;
};

export default CommonAlert;
