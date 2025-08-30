import React from "react";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";
import CommonDatePicker from "../common/CommonDatePicker";

const HotelBookingForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Required Fields */}
      <CommonInput name="name" label="Customer Name" placeholder="Your Name" />

      <CommonInput
        name="email"
        type="email"
        label="Customer Email"
        placeholder="Email"
      />

      <CommonInput
        name="phone"
        type="tel"
        label="Customer Phone"
        placeholder="Contact Number"
      />

      <CommonDatePicker name="checkInDate" mode="date" label="Check-in Date" />

      {/* Optional Fields */}
      <CommonInput
        name="nights"
        type="number"
        label="Nights"
        placeholder="1"
        isRequired={false}
      />

      <CommonInput
        name="roomCount"
        type="number"
        label="Number of Rooms"
        placeholder="1"
        isRequired={false}
      />

      <CommonInput
        name="adults"
        type="number"
        label="Adults"
        placeholder="Number of Adults"
        isRequired={false}
      />

      <CommonInput
        name="children"
        type="number"
        label="Children"
        placeholder="Number of Children"
        isRequired={false}
      />

      <CommonInput
        name="infants"
        type="number"
        label="Infants"
        placeholder="Number of Infants"
        isRequired={false}
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          name="specialRequests"
          label="Special Requests"
          placeholder="Any additional requests?"
          isRequired={false}
        />
      </div>
    </div>
  );
};

export default HotelBookingForm;
