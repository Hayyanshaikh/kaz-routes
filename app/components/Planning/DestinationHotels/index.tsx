"use client";

import React, { useState } from "react";
import { useControllerGetFindAllHotels } from "@/app/hooks/api";
import CommonPagination from "../../common/CommonPagination";
import { Spin } from "antd";
import { FILE_BASE_URL } from "@/lib/constant";
import { PlusOutlined } from "@ant-design/icons";
import useDestinationStore from "@/app/store/destinationStore";

type Props = {
  destination: any;
};

const DestinationHotels = ({ destination }: Props) => {
  const { addHotel, removeHotel } = useDestinationStore();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useControllerGetFindAllHotels({
    params: { page: currentPage },
  });

  const totalPages = data?.meta?.last_page || 1;

  return (
    <>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((hotel: any) => {
            const mainImage = hotel.images?.[0] || "/placeholder.jpg";

            return (
              <div
                key={hotel.id}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition bg-white flex flex-col"
              >
                {/* Hotel Image */}
                <div
                  className="h-56 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${FILE_BASE_URL}/${mainImage})`,
                  }}
                >
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                    <h3 className="font-semibold text-lg truncate">
                      {hotel.hotel_name}
                    </h3>
                    <p className="text-sm">⭐ {hotel.hotel_rating}</p>
                  </div>
                </div>

                {/* Hotel Details */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    {hotel.rooms?.map((room: any) => (
                      <div
                        key={room.id}
                        className="flex justify-between items-center border border-gray-200 rounded-lg p-3 hover:border-orange-400 transition"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {room.room_name}
                          </p>
                          <p className="text-primary font-bold text-sm">
                            Rs {room.price_double}
                          </p>
                        </div>
                        {destination?.hotels?.some(
                          (h: any) => h.id === room.id
                        ) ? (
                          <button
                            onClick={() => {
                              removeHotel(destination?.id, room?.id);
                              console.log("removeHotel call karo:", room.id);
                            }}
                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addHotel(destination?.id, room);
                            }}
                            className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-orange-700 transition"
                          >
                            <PlusOutlined />
                            Book
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

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
