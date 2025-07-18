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
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  link?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  ref?: React.Ref<HTMLButtonElement>;
  loading?: boolean;
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
  error?: string;
}

// Common Textarea Props
export interface CommonTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
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
  onChange: (checked: boolean) => void;
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
  destroyOnClose?: boolean;
  confirmText?: string;
  cancelText?: string;
  open: boolean;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

// Container Wrapper Props
export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export interface CommonHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  mode?: "light" | "dark";
}

export interface CommonSliderProps {
  items: React.ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  loop?: boolean;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  breakpoints?: Record<number, any>;
}

// Define the props interface for DestinationCard
export interface DestinationCardProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
}

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

export interface CommonTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  id: string;
  label: string;
  type: "checkbox" | "select" | "custom";
  options?: FilterOption[];
  customRender?: () => React.ReactNode;
}

export interface SidebarFilterProps {
  filters: FilterConfig[] | [];
  onChange?: (data: Record<string, string | string[]>) => void;
  initialValues?: Record<string, string | string[]>;
}

export interface RoomType {
  name: string;
  size: number;
  bed_type: string;
  meal_plan: string;
  description: string;
  status: string;
  has_attached_bath: boolean;
  facilities: string[];
  pricing: {
    single: number;
    double: number;
    extra_bed: number;
    child_no_bed: number;
  };
}

export interface PropertyDetailProps {
  room: RoomType;
}
