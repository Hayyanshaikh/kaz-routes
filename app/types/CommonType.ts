import { ReactNode } from "react";

export interface CommonButtonProps {
  label: ReactNode | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}
