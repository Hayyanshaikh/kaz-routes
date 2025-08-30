import CommonDatePicker from "../common/CommonDatePicker";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

const VehicleBookingForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <CommonInput
        name="pickupLocation"
        label="Pickup Location"
        placeholder="Pickup Location"
      />

      <CommonInput
        name="dropOffLocation"
        label="Drop-off Location"
        placeholder="Drop-off Location"
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          name="specialRequests"
          label="Special Requests"
          placeholder="Additional Message"
        />
      </div>
    </div>
  );
};

export default VehicleBookingForm;
