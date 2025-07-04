import { ReactNode } from "react";

export interface VariantProps {
  variant: "success" | "warning" | "error";
}

// Common Alert Props
export interface CommonAlertProps {
  title: string;
  color?: VariantProps["variant"];
  className?: string;
}

// Common Button Props
export interface CommonButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  link?: string;
  icon?: React.ReactNode;
}

// Common Input Props
export interface CommonInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// Common Textarea Props
export interface CommonTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// Common Select Props
export interface CommonSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
  label?: string;
}

// Common Checkbox Props
export interface CommonCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

// Common Switch Props
export interface CommonSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  label?: string;
}

// Common Badge Props
export interface CommonBadgeProps {
  label: string;
  color?: VariantProps["variant"];
  className?: string;
}

// Common Modal Props
export interface CommonModalProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: boolean;
  className?: string;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

// Container Wrapper Props
export interface ContainerProps {
  children: ReactNode;
  className?: string;
}
