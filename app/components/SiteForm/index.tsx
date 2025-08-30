"use client";
import CommonDatePicker from "../common/CommonDatePicker";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

const SiteForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput
        name="customerName"
        label="Customer Name"
        placeholder="Enter customer name"
      />

      <CommonInput
        name="customerPhone"
        label="Customer Phone"
        placeholder="Enter phone number"
      />

      <CommonInput
        type="email"
        name="customerEmail"
        label="Customer Email"
        placeholder="Enter email address"
      />

      <CommonDatePicker
        name="bookingDate"
        label="Booking Date"
        placeholder="Select booking date"
      />

      <CommonDatePicker name="bookingTime" label="Booking Time" mode="time" />

      <CommonInput
        type="number"
        name="numberOfAdults"
        label="Number of Adults (Age 13+)"
        placeholder="Enter number of adults"
      />

      <CommonInput
        type="number"
        isRequired={false}
        name="numberOfBoys"
        label="Number of Boys (Age 0 - 7)"
        placeholder="Enter number of boys"
      />

      <CommonInput
        type="number"
        name="numberOfChildren"
        isRequired={false}
        label="Number of Children (Age 8 - 12)"
        placeholder="Enter number of children"
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          name="specialRequest"
          label="Special Request"
          placeholder="Write any special requests here"
        />
      </div>
    </div>
  );
};

export default SiteForm;
