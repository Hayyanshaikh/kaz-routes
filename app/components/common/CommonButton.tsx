import { CommonButtonProps } from "@/app/types/CommonType";
import { Button } from "@/shadcn/components/ui/button";
import * as React from "react";

const CommonButton: React.FC<CommonButtonProps> = ({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => (
  <Button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`rounded-sm cursor-pointer ${className}`}
  >
    {label}
  </Button>
);

export default CommonButton;
