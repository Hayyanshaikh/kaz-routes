import CommonCheckbox from "../common/CommonCheckbox";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

interface RestaurantFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (key: string, value: string) => void;
  dishItems: any[];
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  formData,
  errors,
  handleChange,
  dishItems = [],
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput
        label="Customer Name"
        placeholder="Your Name"
        value={formData.name}
        error={errors.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <CommonInput
        type="email"
        label="Customer Email"
        placeholder="Email"
        value={formData.email}
        error={errors.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <CommonInput
        type="tel"
        label="Customer Phone"
        placeholder="Contact Number"
        value={formData.phone}
        error={errors.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <CommonInput
        type="date"
        label="Booking Date"
        value={formData.bookingDate}
        error={errors.bookingDate}
        onChange={(e) => handleChange("bookingDate", e.target.value)}
      />
      <CommonInput
        type="time"
        label="Booking Time"
        value={formData.bookingTime}
        error={errors.bookingTime}
        onChange={(e) => handleChange("bookingTime", e.target.value)}
      />
      <CommonInput
        label="Number of Guests"
        type="number"
        placeholder="Total Guests"
        value={formData.guestCount}
        error={errors.guestCount}
        onChange={(e) => handleChange("guestCount", e.target.value)}
      />
      <CommonInput
        label="Reference Number"
        placeholder="Reference Number"
        value={formData.referenceNumber}
        error={errors.referenceNumber}
        onChange={(e) => handleChange("referenceNumber", e.target.value)}
      />
      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          label="Special Request"
          placeholder="Any additional requests?"
          value={formData.specialRequest}
          error={errors.specialRequest}
          onChange={(e) => handleChange("specialRequest", e.target.value)}
        />
      </div>
      {dishItems.length > 0 && (
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-semibold">Select Dishes</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dishItems.map((dish) => (
              <CommonCheckbox
                key={dish.id}
                label={dish.size}
                checked={formData.selectedDishes?.includes(dish.id)}
                onChange={(checked) => {
                  const selectedDishes = formData.selectedDishes
                    ? [...formData.selectedDishes]
                    : [];

                  if (checked) {
                    if (!selectedDishes.includes(dish.id)) {
                      selectedDishes.push(dish.id);
                    }
                  } else {
                    const index = selectedDishes.indexOf(dish.id);
                    if (index > -1) {
                      selectedDishes.splice(index, 1);
                    }
                  }

                  handleChange("selectedDishes", selectedDishes.join(", "));
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantForm;
