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
import { useControllerPostCreateSiteBooking } from "@/app/hooks/api";
import { SiteBookingPayload } from "@/app/types/CommonType";

type SiteType = {
  id: string;
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
    { name: "bookingDate", required: true },
    { name: "bookingTime", required: true },
    { name: "referenceNumber" },
    { name: "numberOfBoys" },
    { name: "numberOfChildren" },
    { name: "numberOfAdults" },
    { name: "specialRequest" },
    { name: "customerName", required: true },
    { name: "customerPhone", required: true },
    { name: "customerEmail" },
  ]);

  const hasActivities = site.activities && site.activities.length > 0;

  const { mutateAsync: bookSite, isPending } =
    useControllerPostCreateSiteBooking();

  const onSubmit = () => {
    const payload: SiteBookingPayload = {
      site_id: site.id,
      booking_date: formData.bookingDate || "",
      booking_time: formData.bookingTime || "",
      boy_count: Number(formData.numberOfBoys) || 0,
      child_count: Number(formData.numberOfChildren) || 0,
      adult_count: Number(formData.numberOfAdults) || 0,
      special_request: formData.specialRequest || "",
      customer_name: formData.customerName || "",
      customer_phone: formData.customerPhone || "",
      customer_email: formData.customerEmail || "",
    };

    bookSite(payload)
      .then(() => {
        setIsModalOpen(false);
        resetForm();
        showSuccess({
          message: "Booking Successful",
          description: "Your booking has been confirmed successfully.",
        });
      })
      .catch((error) => {
        showError({
          message: "Submission Error",
          description:
            error?.response?.data?.message ||
            "An error occurred while submitting the form.",
        });
        console.error("Error submitting form:", error);
      });
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
        loading={isPending}
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
