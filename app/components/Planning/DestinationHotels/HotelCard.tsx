import { FILE_BASE_URL } from "@/lib/constant";
import RoomItem from "./RoomItem";

interface Props {
  hotel: any;
  destination: any;
  onBook: (
    hotel: any,
    room: any,
    selectedDate: any,
    setSelectedDate: any
  ) => void;
  onRemove: (destinationId: string, roomId: string) => void;
}

const HotelCard = ({ hotel, destination, onBook, onRemove }: Props) => {
  const mainImage = hotel.images?.[0] || "/placeholder.jpg";

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:shadow-md transition flex flex-col">
      {/* Hotel Image */}
      <div
        className="h-36 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${FILE_BASE_URL}/${mainImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-white">
          <h3 className="font-medium text-sm truncate">{hotel.hotel_name}</h3>
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
              <RoomItem
                key={room.id}
                room={room}
                isBooked={isBooked}
                destination={destination}
                onBook={(selectedDate, setSelectedDate) =>
                  onBook(hotel, room, selectedDate, setSelectedDate)
                }
                onRemove={() => onRemove(destination?.id, room.id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HotelCard;
