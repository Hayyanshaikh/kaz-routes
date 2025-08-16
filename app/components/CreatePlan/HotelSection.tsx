"use client";
import React, { useEffect, useState } from "react";
import CommonSelect from "../common/CommonSelect";
import CommonMultiSelect from "../common/CommonMultiSelect"; // room multi-select
import CommonInput from "../common/CommonInput";
import { useControllerGetFindAllHotels } from "@/app/hooks/api";
import dropdownManipulator from "@/app/manipulators/dropdownManipulator";

type RoomCount = { id: string; count: number };

type HotelRooms = {
  hotelId: string;
  rooms: string[];
  roomCounts: RoomCount[];
};

type Fields = {
  hotels: string[]; // single hotel stored as array with 0 index
  hotelRooms: HotelRooms[];
  country?: string;
  city?: string;
};

type Props = {
  formData: Fields;
  handleChange: (field: string, value: any) => void;
  errors: Fields;
};

const HotelSection = ({ formData, handleChange, errors }: Props) => {
  const { data: hotelDataRes } = useControllerGetFindAllHotels({
    params: {
      country: formData?.country,
      city: formData?.city,
    },
    enabled: !!formData?.country && !!formData?.city,
  });

  const hotelOptions = dropdownManipulator(hotelDataRes?.data || []);

  const [selectedHotel, setSelectedHotel] = useState<HotelRooms | null>(
    formData.hotelRooms[0] || null
  );

  useEffect(() => {
    setSelectedHotel(formData.hotelRooms[0] || null);
  }, [formData.hotelRooms]);

  const handleHotelChange = (hotelId: string) => {
    const newHotelRoom: HotelRooms = {
      hotelId,
      rooms: [],
      roomCounts: [],
    };
    setSelectedHotel(newHotelRoom);
    handleChange("hotels", [hotelId]); // single hotel stored as array
    handleChange("hotelRooms", [newHotelRoom]);
  };

  const updateHotelRoomData = (rooms: string[]) => {
    if (!selectedHotel) return;

    const newCounts = rooms.map((id) => {
      const old = selectedHotel.roomCounts.find((r) => r.id === id);
      return old || { id, count: 1 };
    });

    const updated = { ...selectedHotel, rooms, roomCounts: newCounts };
    setSelectedHotel(updated);
    handleChange("hotelRooms", [updated]);
  };

  const updateRoomCount = (roomId: string, count: number) => {
    if (!selectedHotel) return;

    const roomCounts = [...selectedHotel.roomCounts];
    const index = roomCounts.findIndex((r) => r.id === roomId);

    if (index > -1) {
      roomCounts[index].count = count;
    } else {
      roomCounts.push({ id: roomId, count });
    }

    const updated = { ...selectedHotel, roomCounts };
    setSelectedHotel(updated);
    handleChange("hotelRooms", [updated]);
  };

  const roomOptions = selectedHotel?.hotelId
    ? hotelDataRes?.data
        ?.find((h) => String(h.id) === selectedHotel.hotelId)
        ?.rooms.map((room: any) => ({
          label: room.room_name,
          value: String(room.id),
        })) || []
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Hotel Select (single select) */}
      <CommonSelect
        label="Select Hotel"
        value={selectedHotel?.hotelId || ""}
        onValueChange={(value) => handleHotelChange(value)}
        options={hotelOptions}
        error={errors.hotels}
      />

      {/* Rooms & Count */}
      {selectedHotel && (
        <div className="border p-4 rounded-md shadow bg-white space-y-4">
          <h3 className="font-semibold text-lg mb-2">
            Hotel:{" "}
            {
              hotelDataRes?.data?.find(
                (h) => String(h.id) === selectedHotel.hotelId
              )?.hotel_name
            }
          </h3>

          <CommonMultiSelect
            label="Select Rooms"
            value={selectedHotel.rooms}
            onValueChange={updateHotelRoomData}
            options={roomOptions}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedHotel.rooms.map((roomId) => {
              const roomName =
                roomOptions.find((r) => r.value === roomId)?.label || "Room";
              const count =
                selectedHotel.roomCounts.find((r) => r.id === roomId)?.count ||
                1;

              return (
                <CommonInput
                  key={roomId}
                  label={`Room Count for "${roomName}"`}
                  value={String(count)}
                  type="number"
                  onChange={(e) =>
                    updateRoomCount(roomId, Number(e.target.value))
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelSection;
