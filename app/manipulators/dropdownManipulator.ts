import { DropdownOption } from "../types/CommonType";

const dropdownManipulator = (list: any[]): DropdownOption[] => {
  return list.map((item) => ({
    label:
      item.name ||
      item?.hotel_name ||
      item?.restaurant_name ||
      `${item?.brand?.name} - ${item?.model}`,
    value: String(item.id),
  }));
};

export default dropdownManipulator;
