"use client";
import CommonInput from "../common/CommonInput";
import CommonTextarea from "../common/CommonTextarea";

interface SiteFormProps {
  formData: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (key: string, value: string) => void;
}

const SiteForm: React.FC<SiteFormProps> = ({
  formData,
  errors,
  handleChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CommonInput
        label="Customer Name"
        placeholder=""
        value={formData.customerName}
        error={errors.customerName}
        onChange={(e) => handleChange("customerName", e.target.value)}
      />

      <CommonInput
        label="Customer Phone"
        placeholder=""
        value={formData.customerPhone}
        error={errors.customerPhone}
        onChange={(e) => handleChange("customerPhone", e.target.value)}
      />

      <CommonInput
        type="email"
        label="Customer Email"
        placeholder=""
        value={formData.customerEmail}
        error={errors.customerEmail}
        onChange={(e) => handleChange("customerEmail", e.target.value)}
      />
      <CommonInput
        type="date"
        label="Booking Date"
        placeholder="mm/dd/yyyy"
        value={formData.bookingDate}
        error={errors.bookingDate}
        onChange={(e) => handleChange("bookingDate", e.target.value)}
      />

      <CommonInput
        type="time"
        label="Booking Time"
        placeholder="--:--"
        value={formData.bookingTime}
        error={errors.bookingTime}
        onChange={(e) => handleChange("bookingTime", e.target.value)}
      />
      <CommonInput
        type="number"
        label="Number of Adults (Age 13+)"
        placeholder="0"
        value={formData.numberOfAdults}
        error={errors.numberOfAdults}
        onChange={(e) => handleChange("numberOfAdults", e.target.value)}
      />

      <CommonInput
        type="number"
        label="Number of Boys (Age 0 - 7)"
        placeholder="0"
        value={formData.numberOfBoys}
        error={errors.numberOfBoys}
        onChange={(e) => handleChange("numberOfBoys", e.target.value)}
      />

      <CommonInput
        type="number"
        label="Number of Children (Age 8 - 12)"
        placeholder="0"
        value={formData.numberOfChildren}
        error={errors.numberOfChildren}
        onChange={(e) => handleChange("numberOfChildren", e.target.value)}
      />

      <div className="col-span-1 md:col-span-2">
        <CommonTextarea
          label="Special Request"
          placeholder=""
          value={formData.specialRequest}
          error={errors.specialRequest}
          onChange={(e) => handleChange("specialRequest", e.target.value)}
        />
      </div>
    </div>
  );
};

export default SiteForm;
