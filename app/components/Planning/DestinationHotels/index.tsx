import { useControllerGetFindAllHotels } from "@/app/hooks/api";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { Spin } from "antd";
import { useState } from "react";
import CommonPagination from "../../common/CommonPagination";
import HotelCard from "./HotelCard";

interface Props {
  destination: any;
}

const DestinationHotels = ({ destination }: Props) => {
  const { addHotel, removeHotel } = useDestinationStore();
  const { plan, usedDays } = usePlanStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useControllerGetFindAllHotels({
    params: { page: currentPage },
  });

  const totalPages = data?.meta?.last_page || 1;

  // direct booking handler
  const handleBook = (hotel: any, room: any, selectedDate: any) => {
    if (!plan) return;

    const startDate = plan.planDateRange[0].add(usedDays, "day").startOf("day");

    const booking = {
      ...room,
      bookingDates: selectedDate?.map((date: any) => date.format("YYYY-MM-DD")),
      hotel: {
        images: hotel?.images,
        name: hotel?.hotel_name,
        image: hotel?.images[0],
        id: hotel?.id,
      },
      fromDate: startDate.format("YYYY-MM-DD"),
      toDate: startDate.format("YYYY-MM-DD"),
    };

    addHotel(destination?.id, booking);
  };

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.map((hotel: any) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            destination={destination}
            onBook={handleBook}
            onRemove={removeHotel}
          />
        ))}
      </div>

      <div className="mt-8">
        <CommonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default DestinationHotels;
