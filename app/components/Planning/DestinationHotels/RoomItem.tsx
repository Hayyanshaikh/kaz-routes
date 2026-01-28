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

const RoomItem = ({ room, isBooked, onBook, onRemove, destination }: Props) => {
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
            Delete
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
              allowedDates.length === 0 ? "Please add nights to book" : "Book"
            }
            className={`px-2 py-0.5 rounded-full text-white ${
              allowedDates.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-orange-600"
            }`}
          >
            Book
          </button>
        )}
      </div>

      {/* Modal */}
      <CommonModal
        open={open}
        setOpen={setOpen}
        centered={false}
        title="Confirm Booking"
        description={`Do you want to book room: ${room.room_name}?`}
        confirmText="Book Now"
        cancelText="Cancel"
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
            label="Please select a date for your booking:"
          />
        </div>
      </CommonModal>
    </>
  );
};

export default RoomItem;
