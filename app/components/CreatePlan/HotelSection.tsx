"use client";
import React, { useEffect, useState } from "react";
import CommonMultiSelect from "../common/CommonMultiSelect";
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
  hotels: string[];
  hotelRooms: HotelRooms[];
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
  console.log({ formData });

  const [selectedHotels, setSelectedHotels] = useState<HotelRooms[]>([]);

  useEffect(() => {
    setSelectedHotels(formData.hotelRooms || []);
  }, [formData.hotelRooms]);

  const updateHotelRoomData = (hotelId: string, rooms: string[]) => {
    const updated = [...selectedHotels];
    const index = updated.findIndex((h) => h.hotelId === hotelId);

    const newCounts = rooms.map((id) => {
      const old =
        index > -1 ? updated[index].roomCounts.find((r) => r.id === id) : null;
      return old || { id, count: 1 };
    });

    if (index > -1) {
      updated[index] = { ...updated[index], rooms, roomCounts: newCounts };
    } else {
      updated.push({ hotelId, rooms, roomCounts: newCounts });
    }

    setSelectedHotels(updated);
    handleChange("hotelRooms", updated);
  };

  const updateRoomCount = (hotelId: string, roomId: string, count: number) => {
    const updated = [...selectedHotels];
    const index = updated.findIndex((h) => h.hotelId === hotelId);
    if (index > -1) {
      const roomCounts = [...updated[index].roomCounts];
      const roomIndex = roomCounts.findIndex((r) => r.id === roomId);
      if (roomIndex > -1) {
        roomCounts[roomIndex].count = count;
      } else {
        roomCounts.push({ id: roomId, count });
      }
      updated[index].roomCounts = roomCounts;
      setSelectedHotels(updated);
      handleChange("hotelRooms", updated);
    }
  };

  const handleHotelChange = (value: string[]) => {
    handleChange("hotels", value);
    const filtered = selectedHotels.filter((h) => value.includes(h.hotelId));
    const newOnes = value
      .filter((id) => !filtered.find((h) => h.hotelId === id))
      .map((id) => ({
        hotelId: id,
        rooms: [],
        roomCounts: [],
      }));

    const updated = [...filtered, ...newOnes];
    setSelectedHotels(updated);
    handleChange("hotelRooms", updated);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Hotel Select */}
      <CommonMultiSelect
        label="Select Hotels"
        value={Array.isArray(formData.hotels) ? formData.hotels : []}
        onValueChange={handleHotelChange}
        options={hotelOptions}
        error={errors.hotels}
      />

      {/* Hotel-wise Room & Input Fields */}
      {selectedHotels.map((hotelRoom) => {
        const hotelData = hotelDataRes?.data?.find(
          (h) => String(h.id) === hotelRoom.hotelId
        );
        const roomOptions =
          hotelData?.rooms.map((room: any) => ({
            label: room.room_name,
            value: String(room.id),
          })) || [];

        return (
          <div
            key={hotelRoom.hotelId}
            className="border p-4 rounded-md shadow bg-white space-y-4"
          >
            <h3 className="font-semibold text-lg mb-2">
              Hotel: {hotelData?.hotel_name || "Selected Hotel"}
            </h3>

            <CommonMultiSelect
              label="Select Rooms"
              value={Array.isArray(hotelRoom.rooms) ? hotelRoom.rooms : []}
              onValueChange={(value) =>
                updateHotelRoomData(hotelRoom.hotelId, value)
              }
              options={roomOptions}
              error={undefined}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hotelRoom.rooms.map((roomId) => {
                const roomName =
                  roomOptions.find((r) => r.value === roomId)?.label || "Room";
                const count =
                  hotelRoom.roomCounts.find((r) => r.id === roomId)?.count || 1;

                return (
                  <CommonInput
                    key={roomId}
                    label={`Room Count for "${roomName}"`}
                    value={String(count)}
                    type="number"
                    onChange={(e) =>
                      updateRoomCount(
                        hotelRoom.hotelId,
                        roomId,
                        Number(e.target.value)
                      )
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelSection;
