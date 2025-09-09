"use client";
import { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import CommonButton from "../common/CommonButton";
import Services from "./Services";
import dayjs from "dayjs";
import { DISPLAY_DATE } from "@/lib/constant";
import CommonModal from "../common/CommonModal";
import { showError, showSuccess } from "../common/CommonSonner";
import { useControllerPostCreateSiteBooking } from "@/app/hooks/api";
import { SiteBookingPayload } from "@/app/types/CommonType";
import SiteForm from "../SiteForm";
import { Form } from "antd";

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
  const [form] = Form.useForm();

  const { mutateAsync: bookSite, isPending } =
    useControllerPostCreateSiteBooking();

  const onSubmit = async (values: any) => {
    const payload: SiteBookingPayload = {
      site_id: site.id,
      booking_date: dayjs(values.bookingDate).format("YYYY-MM-DD"),
      booking_time: dayjs(values.bookingTime).format("HH:mm"),
      boy_count: Number(values.numberOfBoys) || 0,
      child_count: Number(values.numberOfChildren) || 0,
      adult_count: Number(values.numberOfAdults) || 0,
      special_request: values.specialRequest || "",
      customer_name: values.customerName,
      customer_phone: values.customerPhone,
      customer_email: values.customerEmail,
    };

    try {
      await bookSite(payload);
      setIsModalOpen(false);
      form.resetFields();
      showSuccess({
        message: "Booking Successful",
        description: "Your booking has been confirmed successfully.",
      });
    } catch (error: any) {
      showError({
        message: "Submission Error",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the form.",
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
        <button
          className="p-0 bg-transparent hover:bg-transparent text-gray-900 w-auto underline text-sm"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Show less" : "Show more"}
        </button>
      </div>

      {/* Categories as services */}
      <Services services={site.categories} />

      <div className="flex items-center justify-between w-full gap-6 flex-wrap mb-8">
        {site.timings && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Timings:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong className="font-medium">Sight opening time:</strong>{" "}
                {dayjs(site.timings.start).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong className="font-medium">Sight closing time:</strong>{" "}
                {dayjs(site.timings.end).format(DISPLAY_DATE)}
              </li>
              <li>
                <strong className="font-medium">Duration:</strong>{" "}
                {site.timings.duration_hours} hrs
              </li>
            </ul>
          </div>
        )}

        {site.pricing && (
          <div className="mt-6">
            <p className="font-semibold text-gray-900 mb-3">Pricing:</p>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>
                <strong className="font-medium">Adult:</strong> PKR{" "}
                {site.pricing.adult}
              </li>
              <li>
                <strong className="font-medium">Boy:</strong> PKR{" "}
                {site.pricing.boy}
              </li>
              {site.pricing.child && (
                <li>
                  <strong className="font-medium">Child:</strong> PKR{" "}
                  {site.pricing.child}
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
        setOpen={setIsModalOpen}
        onClose={() => {
          form.resetFields();
        }}
        title={`Book Site Visit at ${site.name}`}
        description="Please fill out the form below to book your site visit."
        confirmText="Confirm Booking"
        cancelText="Cancel"
        onConfirm={() => form.submit()}
        destroyOnClose={false}
        loading={isPending}
        width={768}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <SiteForm />
        </Form>
      </CommonModal>
    </section>
  );
};

export default SitesDetail;
