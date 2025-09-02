"use client";
import GoogleMapModern from "../Cards/CustomMap";
import CommonDatePicker from "../common/CommonDatePicker";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Empty, Form, Input } from "antd";
import { formatCurrency } from "@/lib/utils";
import CommonCollapse from "../common/CommonCollapse";
import CommonSelect from "../common/CommonSelect";
import CommonButton from "../common/CommonButton";
import {
  useControllerGetFindAllHotels,
  useControllerGetFindAllRestaurants,
  useControllerGetFindAllSites,
} from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";
import CommonCheckbox from "../common/CommonCheckbox";
import CommonMultiSelect from "../common/CommonMultiSelect";
import { MEALTYPE_DROPDOWN } from "@/lib/constant";

interface Props {
  form: any;
  price: number; // price per day
}

const VehicleBookingForm = ({ form, price }: Props) => {
  const [difference, setDifference] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedHotels, setSelectedHotels] = useState<{
    [key: number]: any;
  }>({});
  const [selectedRestaurants, setSelectedRestaurants] = useState<{
    [key: number]: any;
  }>({});
  const [selectedDishes, setSelectedDishes] = useState<{ [key: number]: any }>(
    {}
  );

  const { data: hotels } = useControllerGetFindAllHotels();
  const { data: sites } = useControllerGetFindAllSites();
  const { data: restaurants } = useControllerGetFindAllRestaurants();
  const hotelsList = dropdownManipulator(hotels?.data || []);
  const sitesList = dropdownManipulator(sites?.data || []);
  const restaurantsList = dropdownManipulator(restaurants?.data || []);

  const pickupDate = Form?.useWatch("pickupDate", form);
  const dropOffDate = Form?.useWatch("dropOffDate", form);

  useEffect(() => {
    if (pickupDate && dropOffDate) {
      const start = dayjs(pickupDate);
      const end = dayjs(dropOffDate);

      let diff = end.diff(start, "day");
      if (diff < 0) diff = 0;

      setDifference(diff);
      setTotalPrice(diff * price);
      form.setFieldsValue({ estimated_total: totalPrice });

      // prepare days array
      const totalDays = diff;
      const daysArray = Array.from({ length: totalDays }, (_, i) => {
        const currentDate = start.add(i, "day");
        return {
          date: dayjs(currentDate).format("YYYY-MM-DD"),
          hotelRoom: undefined,
          site: undefined,
          restaurant: undefined,
          notes: "",
        };
      });

      form.setFieldsValue({ days: daysArray });
    }
  }, [pickupDate, dropOffDate, price]);

  // function for copy from previous
  // function for copy from previous
  const handleCopyFromPrevious = (index: number) => {
    if (index === 0) return;

    const allDays = form.getFieldValue("days") || [];
    const prevDay = allDays[index - 1];

    if (prevDay) {
      const updated = [...allDays];

      updated[index] = {
        ...updated[index],
        hotel: prevDay.hotel,
        hotelRoom: prevDay.hotelRoom,
        hotelRoomQty: prevDay.hotelRoomQty,
        site: prevDay.site,
        restaurant: prevDay.restaurant,
        dishes: prevDay.dishes || [],
        variants: prevDay.variants || [],
        notes: prevDay.notes,
        outOfCity: prevDay.outOfCity,
        mealType: prevDay.mealType,
      };

      form.setFieldsValue({ days: updated });

      // ✅ keep restaurant + dishes + variants synced in state
      if (prevDay.restaurant) {
        const restaurant = findData(restaurants?.data, prevDay.restaurant);
        if (restaurant) {
          setSelectedRestaurants((prev) => ({
            ...prev,
            [index]: restaurant,
          }));
        }
      }

      if (prevDay.dishes?.length > 0) {
        setSelectedDishes((prev) => ({
          ...prev,
          [index]: prevDay.dishes,
        }));
      }

      if (prevDay.hotel) {
        const hotel = findData(hotels?.data, prevDay.hotel);
        if (hotel) {
          setSelectedHotels((prev) => ({
            ...prev,
            [index]: hotel,
          }));
        }
      }
    }
  };

  const findData = (list: any[], id: string | number) => {
    return list.find((item) => item.id == id);
  };

  const handleHotelSelect = (value: string | number, dayIndex: number) => {
    const hotel = findData(hotels?.data, value);
    setSelectedHotels((prev) => ({
      ...prev,
      [dayIndex]: hotel,
    }));
  };

  const handleRestaurantSelect = (value: string | number, dayIndex: number) => {
    const restaurant = findData(restaurants?.data, value);
    setSelectedRestaurants((prev) => ({
      ...prev,
      [dayIndex]: restaurant,
    }));
  };

  // const handleDishSelect = (value: number | string, fieldName: number) => {
  //   const dish = selectedRestaurants[fieldName]?.dishes?.find(
  //     (d: any) => d.id === value
  //   );
  //   setSelectedDishes((prev) => ({
  //     ...prev,
  //     [fieldName]: dish,
  //   }));
  // };

  const renderContent = (field: any, index: number, currentDate: Dayjs) => (
    <div className="p-4 bg-white rounded-md border border-gray-200">
      {/* Top section: Copy from previous and Out of City checkbox */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        {index !== 0 && (
          <CommonButton
            label="Copy from previous"
            onClick={() => handleCopyFromPrevious(index)}
          />
        )}
        <CommonCheckbox
          name={[String(field.name), "outOfCity"]}
          label="Out of City"
        />
      </div>

      {/* Select components for Hotel Room, Site, Restaurant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {/* Hotel & Room */}
        <div className="flex flex-col gap-2">
          <CommonSelect
            label="Hotel"
            name={[field.name, "hotel"]}
            options={hotelsList}
            placeholder="- Select -"
            onSelect={(value) => handleHotelSelect(value, index)}
          />
          {selectedHotels[field.name]?.rooms?.length > 0 && (
            <>
              <CommonSelect
                label="Hotel Room"
                name={[field.name, "hotelRoom"]}
                options={selectedHotels[field.name].rooms.map((room: any) => ({
                  label: `${room.room_name}`,
                  value: room.id,
                }))}
                placeholder="- Select Room -"
              />
              <CommonInput
                label="Qty"
                isRequired={false}
                name={[field.name, "hotelRoomQty"]}
                placeholder="Room Number"
              />
            </>
          )}
        </div>

        {/* Site */}
        <div className="flex flex-col gap-2">
          <CommonSelect
            label="Site"
            name={[field.name, "site"]}
            options={sitesList}
            placeholder="- Select -"
          />
        </div>

        {/* Restaurant */}
        <div className="flex flex-col gap-2">
          <CommonSelect
            label="Restaurant"
            name={[field.name, "restaurant"]}
            options={restaurantsList}
            placeholder="- Select -"
            onSelect={(value) => {
              handleRestaurantSelect(value, index);
              form.setFieldValue([field.name, "dishes"], []);
              form.setFieldValue([field.name, "variants"], []);
            }}
          />
          {selectedRestaurants[field.name]?.dishes?.length > 0 && (
            <>
              <CommonSelect
                label="Meal Type"
                name={[field.name, "mealType"]}
                options={MEALTYPE_DROPDOWN}
                placeholder="- Select -"
              />
              <CommonMultiSelect
                label="Dishes"
                name={[field.name, "dishes"]}
                options={selectedRestaurants[field.name].dishes.map(
                  (dish: any) => ({
                    label: dish.name,
                    value: dish.id,
                  })
                )}
                placeholder="- Select Dishes -"
                onValueChange={(dishIds: string[]) => {
                  setSelectedDishes((prev: any) => ({
                    ...prev,
                    [field.name]: dishIds,
                  }));
                  form.setFieldValue([field.name, "variants"], []);
                }}
              />
              {selectedDishes?.[field.name]?.length > 0 && (
                <CommonMultiSelect
                  label="Variants"
                  name={[field.name, "variants"]}
                  placeholder="- Select Variants -"
                  options={selectedDishes[field.name]
                    .map((dishId: number) => {
                      const dish = selectedRestaurants[
                        field.name
                      ]?.dishes?.find((d: any) => d.id === dishId);
                      if (!dish?.variants?.length) return null;
                      return {
                        label: dish.name,
                        options: dish.variants.map((variant: any) => ({
                          label: `${variant.size} - Rs.${variant.price}`,
                          value: variant.id,
                        })),
                      };
                    })
                    .filter(Boolean)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Notes Textarea */}
      <div className="flex flex-col gap-2">
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <CommonTextarea
          name={[field.name, "notes"]}
          placeholder="e.g., leave early for out-of-city, late check-in"
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left Column */}
      <div className="flex flex-col gap-4 w-full md:max-w-[400px]">
        <CommonInput
          name="customerName"
          label="Customer Name"
          placeholder="Your Name"
        />

        <CommonInput
          type="email"
          name="email"
          label="Customer Email"
          placeholder="Email"
        />

        <CommonInput
          type="tel"
          name="phone"
          label="Customer Phone"
          placeholder="Contact Number"
        />

        <CommonDatePicker
          name="pickupDate"
          label="Pickup Date"
          placeholder="Select Pickup Date"
        />

        <CommonDatePicker
          name="dropOffDate"
          label="Drop-off Date"
          placeholder="Select Drop-off Date"
        />

        <div className="p-4 bg-gray-100 rounded-md border border-gray-300">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Days</span>
              <span>{difference}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium">Rate / day</span>
              <span>{formatCurrency(price)}</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center">
              <span className="text-gray-800">Estimated Total</span>
              {formatCurrency(totalPrice)}

              <Form.Item name="estimated_total" hidden>
                <Input type="hidden" />
              </Form.Item>
            </div>
          </div>
        </div>

        <div className="w-full">
          <CommonTextarea
            name="specialRequests"
            label="Special Requests"
            placeholder="Additional Message"
          />
        </div>

        <GoogleMapModern form={form} height="300px" />

        <Form.Item name="pickup_location" hidden>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="dropoff_location" hidden>
          <Input type="hidden" />
        </Form.Item>
      </div>

      {/* Right Column */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Trip Days</h3>
          <span className="text-gray-800">
            {difference} days | {formatCurrency(totalPrice)}
          </span>
        </div>
        <Form.List name="days">
          {(fields) =>
            fields.length > 0 ? (
              <CommonCollapse
                items={fields.map((field, i) => {
                  const currentDate = dayjs(
                    form.getFieldValue(["days", i, "date"])
                  );
                  return {
                    key: String(i),
                    header: `Day ${i + 1} • ${currentDate.format(
                      "ddd, DD MMM YYYY"
                    )}`,
                    content: renderContent(field, i, currentDate),
                  };
                })}
              />
            ) : (
              <Empty description="No trip days available" />
            )
          }
        </Form.List>
      </div>
    </div>
  );
};

export default VehicleBookingForm;
