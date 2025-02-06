import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`https://api.example.com/events/${id}`)
      .then(response => setEvent(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <img src={event.image} alt={event.title} className="w-full h-80 object-cover" />
      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600">{event.date}</p>
      <p className="mt-4">{event.description}</p>
    </div>
  );
}

export default EventDetail;
