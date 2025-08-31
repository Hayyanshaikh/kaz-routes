import { ReactNode } from "react";
import { Hotel } from "../components/SingleHotel/PropertyDetails";
import { Rule } from "antd/es/form";
import { Dayjs } from "dayjs";

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
  name: string | string[];
  label?: string;
  rules?: Rule[];
  formItemClassName?: string;
  isRequired?: boolean;
  value?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  allowClear?: boolean;
  type?: "text" | "password" | "email" | "number" | "tel";
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
}

export interface CommonDatePickerProps {
  name: string | string[];
  label?: string;
  rules?: Rule[];
  formItemClassName?: string;
  mode?: "date" | "time" | "datetime";
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  allowClear?: boolean;
  type?: "text" | "password" | "email" | "number" | "tel";
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: Dayjs;
  onChange?: (date: Dayjs | null) => void;
  disabledDate?: (currentDate: Dayjs) => boolean;
}

// Common Textarea Props
export interface CommonTextareaProps {
  name: string | string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// Common Select Props
export interface CommonSelectProps {
  name: string | string[];
  onValueChange?: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  onSelect?: (_value: string) => void;
}

export interface CommonMultiSelectProps {
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  options: DropdownOption[];
  name: string | string[];
  onValueChange?: (_values: string[]) => void;
  onSelect?: (_value: string) => void;
}

// Common Checkbox Props
export interface CommonCheckboxProps {
  name?: string | string[];
  value?: string | number;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  rules?: any[];
  label?: string | ReactNode;
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
  width?: number | string;
  cancelText?: string;
  onClose?: () => void;
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
  id: string;
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
  hotelDetail: Hotel;
}

// Type definition for the booking payload
export interface RestaurantBookingPayload {
  restaurant_id: number | string | undefined;
  booking_date: string;
  booking_time: string;
  guests: number;
  special_request: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  variant_ids: number[];
}

export interface SiteBookingPayload {
  site_id: string;
  booking_date: string;
  booking_time: string;
  boy_count: number;
  child_count: number;
  adult_count: number;
  special_request: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

// types/CommonType.ts (assuming you have a types file, adding Country type for clarity)
export interface DropdownOption {
  label: string;
  value: string;
}
export interface Country {
  id: number;
  code: string;
  name: string;
  timezone: string;
  image: string;
  created_at: string;
  updated_at: string;
}

// City type based on the provided response
export interface City {
  id: number;
  country_id: string | number;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
  country: Country;
}
// Step interface for multi-step forms
export interface Step {
  title: string;
  content: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Package {
  id?: string;
  country: string;
  city: string;
  arrivalDate: string; // ISO format date
  flightArrivalTime: string; // HH:mm
  flightDepartureTime: string; // HH:mm
  packageName: string;
  flightDepartureDate: string;
  adults: string;
  infants: string;
  children: string;
  description: string;
}

export interface CreatePackagePayload {
  name: string;
  description: string;
  arrival_date: string;
  flight_arrival: string;
  flight_departure: string;
  adults: number;
  flight_departure_date: string;
  children: number;
  infants: number;
  city_ids: number[];
  country_ids: number[];
}

export interface PackageItemPayload {
  agent_package_id: number;
  travel_guide_id: number;
  guide: string | number;
  hotels: number[];
  rooms: number[];
  sites: number[];
  restaurants: number[];
  restaurant_mealTypes: string[];
  dishes: number[];
  variant_ids: number[];
  car_id: number;
  city_ids: number[];
  country_ids: number[];
  description: string;
  start_time: string;
  end_time: string;
  item_date: string;
  key: string;
}
