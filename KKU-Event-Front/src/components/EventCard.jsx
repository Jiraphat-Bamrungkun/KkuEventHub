import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link to={`/event/${event.id}`} className="border rounded-lg overflow-hidden shadow-md bg-white w-[250px] md:w-[300px]">
      <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg">{event.title}</h2>
        <p className="text-gray-600">{event.date}</p>
        <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
          {event.category}
        </span>
      </div>
    </Link>
  );
}

export default EventCard;
