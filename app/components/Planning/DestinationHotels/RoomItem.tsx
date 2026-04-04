import { useState } from "react";
import CommonModal from "../../common/CommonModal";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import CommonDatePicker from "../../common/CommonDatePicker";
import dayjs from "dayjs";

interface Props {
  room: any;
  isBooked: boolean;
  bookedDates?: any[];
  onBook: (selectedDate: any, setSelectedDate: any) => void;
  onRemove: () => void;
  destination: any;
}

import { useTranslations } from "next-intl";

const RoomItem = ({
  room,
  isBooked,
  bookedDates,
  onBook,
  onRemove,
  destination,
}: Props) => {
  const t = useTranslations("planning");
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const { startDate, endDate } = useDestinationDates(destination);
  const allowedDates = getDateRange(startDate, endDate);

  return (
    <>
      <div className="flex justify-between items-center border border-gray-300 rounded-md px-2 py-2 text-xs">
        <span className="text-gray-700 truncate">{room.room_name}</span>
        {isBooked ? (
          <button
            onClick={() => {
              setSelectedDate(bookedDates?.map((d: any) => dayjs(d)));
              setOpen(true);
            }}
            className="bg-green-600 text-white px-2 py-0.5 rounded-full hover:bg-green-700 font-medium"
          >
            {t("alreadyBooked")}
          </button>
        ) : (
          <button
            onClick={() => {
              if (allowedDates.length === 0) {
                // You can replace this with antd Tooltip if preferred, for now keeping it simple or relying on modal logic
                // Actually, let's disable the button
                return;
              }
              setOpen(true);
            }}
            disabled={allowedDates.length === 0}
            title={allowedDates.length === 0 ? t("addNightsToBook") : t("book")}
            className={`px-2 py-0.5 rounded-full text-white ${
              allowedDates.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-orange-600"
            }`}
          >
            {t("book")}
          </button>
        )}
      </div>

      {/* Modal */}
      <CommonModal
        open={open}
        setOpen={setOpen}
        centered={false}
        title={t("confirmBooking")}
        description={t("confirmBookingDesc", { name: room.room_name })}
        confirmText={t("bookNow")}
        cancelText={t("cancel")}
        onConfirm={() => {
          if (selectedDate?.length === 0) {
            onRemove();
          } else {
            onBook(selectedDate, setSelectedDate);
          }
          setOpen(false);
        }}
        onClose={() => setOpen(false)}
      >
        <div className="space-y-3">
          <CommonDatePicker
            isNotFormItem={false}
            className="w-full"
            // mode="range"
            multiple
            value={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            allowedDates={allowedDates}
            label={t("selectBookingDate")}
          />
        </div>
      </CommonModal>
    </>
  );
};

export default RoomItem;
