"use client";
import React, { useMemo } from "react";
import { Collapse, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import useDestinationStore from "@/app/store/destinationStore";
import usePlanStore from "@/app/store/planStore";
import { transformToDayWise } from "@/app/manipulators/planManipulator";

const TagItem = ({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) => (
  <div className="flex items-center gap-2 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
    <span>{label}</span>
    <DeleteOutlined
      onClick={onDelete}
      className="cursor-pointer text-gray-600"
    />
  </div>
);

const ListOfDays = () => {
  const { plan } = usePlanStore();
  const {
    destinations,
    removeHotelByDate,
    removeSiteByDate,
    removeRestaurantByDate,
    removeCarByDate,
  } = useDestinationStore();

  const data = useMemo(() => ({ plan, destinations }), [plan, destinations]);
  const daywiseData = useMemo(() => transformToDayWise(data), [data]);

  if (!destinations || destinations.length === 0)
    return (
      <p className="text-xs text-gray-400 italic">No destinations added yet.</p>
    );

  const collapseItems = daywiseData.map((day, idx) => {
    const hasBookings =
      day.hotelBookings.length ||
      day.siteBookings.length ||
      day.restaurantBookings.length ||
      day.carBookings.length;

    return {
      key: `day-${idx}`,
      label: (
        <span className="text-xs font-medium">{`Day ${idx + 1} - ${dayjs(
          day.date
        ).format("DD MMM YYYY")}`}</span>
      ),
      children: hasBookings ? (
        <div className="space-y-3">
          {day.hotelBookings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Hotels</h3>
              <div className="flex flex-wrap gap-2">
                {day.hotelBookings.map((h, i) => (
                  <TagItem
                    key={`hotel-${i}`}
                    label={h.room_name || h.hotel_name}
                    onDelete={() =>
                      removeHotelByDate(
                        day.destinationId,
                        h.room_id,
                        dayjs(day.date).format("YYYY-MM-DD")
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}
          {day.siteBookings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Sites</h3>
              <div className="flex flex-wrap gap-2">
                {day.siteBookings.map((s, i) => (
                  <TagItem
                    key={`site-${i}`}
                    label={s.name}
                    onDelete={() =>
                      removeSiteByDate(
                        day.destinationId,
                        s.id,
                        dayjs(day.date).format("YYYY-MM-DD")
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}
          {day.restaurantBookings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Restaurants</h3>
              <div className="flex flex-wrap gap-2">
                {day.restaurantBookings.map((r, i) => (
                  <TagItem
                    key={`restaurant-${i}`}
                    label={`${r.dishName} (${r.mealType})`}
                    onDelete={() =>
                      removeRestaurantByDate(
                        day.destinationId,
                        r.variantId,
                        dayjs(day.date).format("YYYY-MM-DD")
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}
          {day.carBookings.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Cars</h3>
              <div className="flex flex-wrap gap-2">
                {day.carBookings.map((c, i) => (
                  <TagItem
                    key={`car-${i}`}
                    label={c.brand || c.model || "Car"}
                    onDelete={() =>
                      removeCarByDate(
                        day.destinationId,
                        c.id,
                        dayjs(day.date).format("YYYY-MM-DD")
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Empty
          description="No bookings for this day"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ),
    };
  });

  return (
    daywiseData?.length > 0 && (
      <div className="mt-auto">
        <label className="block text-xs text-gray-600 mb-2 font-medium">
          Summary:
        </label>
        <div className=" max-h-[40vh] overflow-auto">
          <Collapse size="small" accordion items={collapseItems} />
        </div>
      </div>
    )
  );
};

export default ListOfDays;
