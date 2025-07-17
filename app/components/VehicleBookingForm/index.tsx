import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

interface VehicleBookingFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (key: string, value: string) => void;
}

const VehicleBookingForm: React.FC<VehicleBookingFormProps> = ({
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
        label="Pickup Date"
        placeholder="mm/dd/yyyy"
        value={formData.pickupDate}
        error={errors.pickupDate}
        onChange={(e) => handleChange("pickupDate", e.target.value)}
      />

      <CommonInput
        type="date"
        label="Drop-off Date"
        placeholder="mm/dd/yyyy"
        value={formData.dropOffDate}
        error={errors.dropOffDate}
        onChange={(e) => handleChange("dropOffDate", e.target.value)}
      />

      <CommonInput
        label="Pickup Location"
        placeholder="Pickup Location"
        value={formData.pickupLocation}
        error={errors.pickupLocation}
        onChange={(e) => handleChange("pickupLocation", e.target.value)}
      />

      <CommonInput
        label="Drop-off Location"
        placeholder="Drop-off Location"
        value={formData.dropOffLocation}
        error={errors.dropOffLocation}
        onChange={(e) => handleChange("dropOffLocation", e.target.value)}
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          label="Special Requests"
          placeholder="Additional Message"
          value={formData.specialRequests}
          error={errors.specialRequests}
          onChange={(e) => handleChange("specialRequests", e.target.value)}
        />
      </div>
    </div>
  );
};

export default VehicleBookingForm;
