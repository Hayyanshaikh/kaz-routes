import { useState } from "react";
import CommonModal from "../../common/CommonModal";
import { getDateRange } from "@/lib/utils";
import { useDestinationDates } from "@/app/hooks/useDestinationDates";
import CommonDatePicker from "../../common/CommonDatePicker";

interface Props {
  room: any;
  isBooked: boolean;
  onBook: (selectedDate: any, setSelectedDate: any) => void;
  onRemove: () => void;
  destination: any;
}

import { useTranslations } from "next-intl";

const RoomItem = ({ room, isBooked, onBook, onRemove, destination }: Props) => {
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
            onClick={onRemove}
            className="bg-red-500 text-white px-2 py-0.5 rounded-full hover:bg-red-600"
          >
            {t("delete")}
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
            title={
              allowedDates.length === 0 ? t("addNightsToBook") : t("book")
            }
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
          onBook(selectedDate, setSelectedDate);
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
