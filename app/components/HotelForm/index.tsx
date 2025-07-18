import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

interface HotelBookingFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (key: string, value: string) => void;
}

const HotelBookingForm: React.FC<HotelBookingFormProps> = ({
  formData,
  errors,
  handleChange,
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
        label="Check-in Date"
        value={formData.checkInDate}
        error={errors.checkInDate}
        onChange={(e) => handleChange("checkInDate", e.target.value)}
      />

      <CommonInput
        type="date"
        label="Check-out Date"
        value={formData.checkOutDate}
        error={errors.checkOutDate}
        onChange={(e) => handleChange("checkOutDate", e.target.value)}
      />

      <CommonInput
        label="City"
        placeholder="City Name"
        value={formData.city}
        error={errors.city}
        onChange={(e) => handleChange("city", e.target.value)}
      />

      <CommonInput
        label="Hotel Name"
        placeholder="Hotel Name"
        value={formData.hotelName}
        error={errors.hotelName}
        onChange={(e) => handleChange("hotelName", e.target.value)}
      />

      <CommonInput
        label="Room Type"
        placeholder="Room Name or Type"
        value={formData.roomName}
        error={errors.roomName}
        onChange={(e) => handleChange("roomName", e.target.value)}
      />

      <CommonInput
        label="Bed Type"
        placeholder="e.g. Double, Twin, King"
        value={formData.bedType}
        error={errors.bedType}
        onChange={(e) => handleChange("bedType", e.target.value)}
      />

      <CommonInput
        label="Meal Plan"
        placeholder="e.g. Breakfast Only, Half Board"
        value={formData.mealPlan}
        error={errors.mealPlan}
        onChange={(e) => handleChange("mealPlan", e.target.value)}
      />

      <CommonInput
        type="number"
        label="Number of Rooms"
        placeholder="1"
        value={formData.roomCount}
        error={errors.roomCount}
        onChange={(e) => handleChange("roomCount", e.target.value)}
      />

      <CommonInput
        type="number"
        label="Number of Guests"
        placeholder="Total Guests"
        value={formData.guestCount}
        error={errors.guestCount}
        onChange={(e) => handleChange("guestCount", e.target.value)}
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          label="Special Requests"
          placeholder="Any additional requests?"
          value={formData.specialRequests}
          error={errors.specialRequests}
          onChange={(e) => handleChange("specialRequests", e.target.value)}
        />
      </div>
    </div>
  );
};

export default HotelBookingForm;
