import { useControllerGetFindAllHotels } from "@/app/hooks/api";
import { useFormatCurrency } from "@/app/hooks/useFormatCurrency";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { FILE_BASE_URL } from "@/lib/constant";
import { Spin } from "antd";
import { useState } from "react";
import CommonPagination from "../../common/CommonPagination";

interface Props {
  destination: any;
}

const DestinationHotels = ({ destination }: Props) => {
  const { addHotel, removeHotel } = useDestinationStore();
  const { plan, dayCount, usedDays } = usePlanStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useControllerGetFindAllHotels({
    params: { page: currentPage },
  });

  const totalPages = data?.meta?.last_page || 1;

  // Direct booking
  const handleBook = (hotel: any, room: any) => {
    if (plan && usedDays < dayCount) {
      const startDate = plan.planDateRange[0]
        .add(usedDays, "day")
        .startOf("day");
      const booking = {
        ...room,
        hotel: {
          name: hotel?.hotel_name,
          image: hotel?.images[0],
          id: hotel?.id,
        },
        fromDate: startDate.format("YYYY-MM-DD"),
        toDate: startDate.format("YYYY-MM-DD"),
      };
      addHotel(destination?.id, booking);
    }
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
        {data?.data?.map((hotel: any) => {
          const mainImage = hotel.images?.[0] || "/placeholder.jpg";

          return (
            <div
              key={hotel.id}
              className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition flex flex-col"
            >
              {/* Hotel Image */}
              <div
                className="h-36 bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${FILE_BASE_URL}/${mainImage})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="font-medium text-sm truncate">
                    {hotel.hotel_name}
                  </h3>
                  <p className="text-xs opacity-90">⭐ {hotel.hotel_rating}</p>
                </div>
              </div>

              {/* Rooms */}
              {hotel.rooms?.length > 0 && (
                <div className="p-3 flex flex-col gap-2 flex-1">
                  {hotel.rooms.map((room: any) => {
                    const isBooked = destination?.hotels?.some(
                      (h: any) => h.id === room.id
                    );
                    return (
                      <div
                        key={room.id}
                        className="flex justify-between items-center border border-gray-300 rounded-md px-2 py-2 text-xs"
                      >
                        <span className="text-gray-700 truncate">
                          {room.room_name}
                        </span>
                        {isBooked ? (
                          <button
                            onClick={() =>
                              removeHotel(destination?.id, room?.id)
                            }
                            className="bg-red-500 text-white px-2 py-0.5 rounded-full hover:bg-red-600"
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            onClick={() => handleBook(hotel, room)}
                            disabled={usedDays >= dayCount}
                            className={`px-2 py-0.5 rounded-full text-white bg-primary hover:bg-orange-600`}
                          >
                            Book
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
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
