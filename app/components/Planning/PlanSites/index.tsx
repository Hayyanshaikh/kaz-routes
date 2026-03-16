"use client";
import React, { useState } from "react";
import PlanSiteCard from "./PlanSiteCard";
import { useControllerGetFindAllSites } from "@/app/hooks/api";
import { FILE_BASE_URL } from "@/lib/constant";
import { Empty, DatePicker, Spin, Form, message } from "antd";
import useDestinationStore from "@/app/store/destinationStore";
import CommonModal from "../../common/CommonModal";
import dayjs from "dayjs";
import CommonDatePicker from "../../common/CommonDatePicker";
import usePlanStore from "@/app/store/planStore";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import CommonPagination from "../../common/CommonPagination";

type Props = {
  destination: any;
};

const PlanSites = ({ destination }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useControllerGetFindAllSites({
    params: { page: currentPage },
  });
  const totalPages = data?.meta?.last_page || 1;
  const sitesData = data?.data;
  const { plan } = usePlanStore();
  const { addSite, removeSite } = useDestinationStore();
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  const handleBook = (site: any) => {
    setSelectedSite(site);
    setOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const { selectedDate } = await form.validateFields();
      const allSites = destination?.sites ?? [];
      const existingBookings = allSites.flatMap(
        (s: any) => s.bookingDates ?? [],
      );
      const siteDuration = Number(selectedSite?.duration_hours) || 0;

      // Overbooked date check
      const invalidDates = selectedDate.filter((d: any) => {
        const date = dayjs(d).format("YYYY-MM-DD");
        const total = existingBookings
          .filter((b: any) => b.date === date)
          .reduce((sum: number, b: any) => sum + Number(b.hours || 0), 0);
        return total + siteDuration > 11.5;
      });

      if (invalidDates.length) {
        form.setFields([
          {
            name: "selectedDate",
            errors: [
              `Already full on: ${invalidDates
                .map((d: any) => dayjs(d).format("YYYY-MM-DD"))
                .join(", ")}`,
            ],
          },
        ]);
        return;
      }

      // ✅ Valid
      addSite(destination.id, {
        ...selectedSite,
        bookingDates: selectedDate.map((d: any) => ({
          date: dayjs(d).format("YYYY-MM-DD"),
          hours: siteDuration,
        })),
      });

      messageApi.success("Site booked successfully!");

      form.resetFields();
      setSelectedSite(null);
      setSelectedDate(null);
      setOpen(false);
    } catch {
      // ignore validation errors
    }
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <div className="h-[300px] flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitesData?.length > 0 ? (
              sitesData?.map((site: any) => {
                const isBooked = destination?.sites?.some(
                  (s: any) => s.id === site.id,
                );

                return (
                  <PlanSiteCard
                    key={site.id}
                    imageSrc={
                      site.images[0] && `${FILE_BASE_URL}/${site.images[0]}`
                    }
                    imageAlt={site.name || "Tour description"}
                    price={`${site.price_adult}`}
                    title={site.name}
                    city={`${site.city?.name}, ${site.country?.name}`}
                    buttonText="Book"
                    startTime={site.start_time}
                    endTime={site.end_time}
                    duration={`${site.duration_hours} hrs`}
                    onBook={() => handleBook(site)}
                    isBooked={isBooked}
                    onRemove={() => removeSite(destination.id, site.id)}
                    disabled={allowedDates.length === 0}
                  />
                );
              })
            ) : (
              <Empty />
            )}
          </div>

          {/* Booking Modal */}
          <CommonModal
            centered={false}
            destroyOnClose={false}
            open={open}
            title={`Book ${selectedSite?.name}`}
            setOpen={setOpen}
            onConfirm={handleConfirm}
            confirmText="Book"
          >
            <Form form={form} layout="vertical">
              <CommonDatePicker
                rules={[
                  {
                    required: true,
                    message: "Please select at least one date.",
                  },
                ]}
                name="selectedDate"
                className="w-full"
                label="Please select a date for your booking:"
                multiple
                value={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  form.setFieldsValue({ selectedDate: date });
                }}
                allowedDates={allowedDates.filter((date) => {
                  if (!selectedSite) return true;
                  const alreadyBookedDates = destination?.sites
                    ?.filter((s: any) => s.id === selectedSite.id)
                    ?.flatMap((s: any) => s.bookingDates?.map((b: any) => b.date) || []);
                  return !alreadyBookedDates.includes(date);
                })}
              />
            </Form>
          </CommonModal>

          {/* Pagination */}
          <div className="mt-8">
            <CommonPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PlanSites;
