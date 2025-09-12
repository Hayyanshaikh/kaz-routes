"use client";
import React, { useState } from "react";
import PlanSiteCard from "./PlanSiteCard";
import { useControllerGetFindAllSites } from "@/app/hooks/api";
import { FILE_BASE_URL } from "@/lib/constant";
import { Empty, DatePicker, Spin } from "antd";
import useDestinationStore from "@/app/store/destinationStore";
import CommonModal from "../../common/CommonModal";
import dayjs from "dayjs";
import CommonDatePicker from "../../common/CommonDatePicker";
import usePlanStore from "@/app/store/planStore";
import { getDateRange, getDestinationDates } from "@/lib/utils";
import CommonPagination from "../../common/CommonPagination";

type Props = {
  destination: any;
};

const PlanSites = ({ destination }: Props) => {
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
  const { startDate, endDate } = getDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  const handleBook = (site: any) => {
    setSelectedSite(site);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (selectedSite && selectedDate) {
      addSite(destination.id, {
        ...selectedSite,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      });
    }
    setSelectedSite(null);
    setSelectedDate(null);
  };

  return (
    <>
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
                  (s: any) => s.id === site.id
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
                    startTime={site.start_time}
                    endTime={site.end_time}
                    duration={`${site.duration_hours} hrs`}
                    onBook={() => handleBook(site)}
                    isBooked={isBooked}
                    onRemove={() => removeSite(destination.id, site.id)}
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
            open={open}
            title={`Book ${selectedSite?.name}`}
            setOpen={setOpen}
            onConfirm={handleConfirm}
            confirmText="Book"
          >
            <div className="space-y-3">
              <CommonDatePicker
                isNotFormItem={false}
                className="w-full"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                allowedDates={allowedDates}
                label="Please select a date for your booking:"
              />
            </div>
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
