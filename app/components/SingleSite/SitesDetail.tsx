"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import Services from "./Services";
import dayjs from "dayjs";
import { DISPLAY_DATE } from "@/lib/constant";
import CommonModal from "../common/CommonModal";
import useForm from "@/app/hooks/useForm";
import SiteForm from "../SiteForm";
import { showError, showSuccess } from "../common/CommonSonner";

type SiteType = {
  name: string;
  description: string;
  categories: string[];
  timings?: {
    start: string;
    end: string;
    duration_hours: string;
    closed_days: string[];
  };
  pricing: {
    adult: string;
    child: string | null;
    boy: string;
    vehicle_extra_costs: any[];
  };
  media: {
    images: string[];
    videos: string[];
    youtube: string | null;
  };
  activities?: any[];
};

type Props = {
  site: SiteType;
};

const SitesDetail = ({ site }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const { formData, errors, handleChange, resetForm, handleSubmit } = useForm([
    "bookingDate",
    "bookingTime",
    "referenceNumber",
    "numberOfBoys",
    "numberOfChildren",
    "numberOfAdults",
    "specialRequest",
    "customerName",
    "customerPhone",
    "customerEmail",
  ]);

  const hasActivities = site.activities && site.activities.length > 0;

  const onSubmit = () => {
    try {
      const payload = {
        site_id: site.name, // Assuming site.name is the unique identifier
        booking_date: formData.bookingDate,
        booking_time: formData.bookingTime,
        reference_number: formData.referenceNumber,
        number_of_boys: formData.numberOfBoys,
        number_of_children: formData.numberOfChildren,
        number_of_adults: formData.numberOfAdults,
        special_request: formData.specialRequest,
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
      };

      // Here you would typically call an API to submit the booking
      console.log("Booking payload:", payload);

      // Simulating a successful submission
      setIsModalOpen(false);
      resetForm();
      showSuccess({
        message: "Booking Successful",
        description: "Your booking has been confirmed successfully.",
      });
    } catch (error) {
      showError({
        message: "Submission Error",
        description: "Error submitting form. Please try again later.",
      });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section className="flex flex-col items-start flex-1 lg:w-1/2">
      <CommonHeading
        className="text-left !mb-0"
        title={site.name}
        subtitle={
          showFull ? site.description : `${site.description.slice(0, 300)}...`
        }
      />
      <div className="mb-6 text-gray-700">
        <CommonButton
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 underline"
          onClick={() => setShowFull(!showFull)}
          label={showFull ? "Show less" : "Show more"}
        />
      </div>

      {/* Categories as services */}
      <Services services={site.categories} />

      <div className="flex items-center justify-between w-full gap-6 flex-wrap mb-8">
        {site.timings && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Timings:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong>Start:</strong>{" "}
                {dayjs(site.timings.start).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong>End:</strong>{" "}
                {dayjs(site.timings.end).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong>Duration:</strong> {site.timings.duration_hours} hrs
              </li>
            </ul>
          </div>
        )}

        {site.pricing && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Pricing:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong>Adult:</strong> PKR {site.pricing.adult}
              </li>
              <li>
                <strong>Boy:</strong> PKR {site.pricing.boy}
              </li>
              {site.pricing.child && (
                <li>
                  <strong>Child:</strong> PKR {site.pricing.child}
                </li>
              )}
            </ul>
          </div>
        )}

        {site?.activities && site?.activities?.length > 0 && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Facilities:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {site?.activities?.map((facility: string, i: number) => (
                <li key={i}>{facility}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <CommonButton
        onClick={() => setIsModalOpen(true)}
        label="Book Now"
        className="h-10 rounded-full w-full"
      />

      <CommonModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={`Book Site Visit at ${site.name}`}
        description="Please fill out the form below to book your site visit."
        confirmText="Confirm Booking"
        cancelText="Cancel"
        onConfirm={() => handleSubmit(onSubmit)}
        destroyOnClose={false}
        // loading={isLoading}
        className="!max-w-4xl"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* Yahan aap apna form component lagayenge */}
          <SiteForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
        </form>
      </CommonModal>
    </section>
  );
};

export default SitesDetail;
