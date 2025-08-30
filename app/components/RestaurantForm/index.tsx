import { Checkbox, Form } from "antd";
import CommonCheckbox from "../common/CommonCheckbox";
import CommonDatePicker from "../common/CommonDatePicker";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

interface RestaurantFormProps {
  dishItems: any[];
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({ dishItems = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput label="Customer Name" placeholder="Your Name" name="name" />

      <CommonInput
        type="email"
        name="email"
        label="Customer Email"
        placeholder="Email"
      />

      <CommonInput
        type="tel"
        label="Customer Phone"
        placeholder="Contact Number"
        name="phone"
      />

      <CommonDatePicker label="Booking Date" name="bookingDate" mode="date" />

      <CommonDatePicker label="Booking Time" name="bookingTime" mode="time" />

      <CommonInput
        type="number"
        name="guestCount"
        label="Number of Guests"
        placeholder="Total Guests"
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          name="specialRequest"
          label="Special Request"
          placeholder="Any additional requests?"
        />
      </div>

      {dishItems.length > 0 && (
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-semibold">Select Dishes</label>
          <Form.Item name="selectedDishes">
            <Checkbox.Group className="!flex !flex-nowrap sm:!flex-row !flex-col gap-4">
              {dishItems.map((dish) => (
                <CommonCheckbox
                  key={dish.id}
                  value={dish.id}
                  label={<span>{dish.size}</span>}
                />
              ))}
            </Checkbox.Group>
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
