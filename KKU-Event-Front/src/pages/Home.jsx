import Navbar from "../components/Navbar";
import EventSlider from "../components/EventSlider";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const mockEvents = [
  {
    id: 1,
    title: "งานรับปริญญา",
    category: "University",
    date: "2025-03-15",
    location: "หอกาญ",
    image: "https://th.bing.com/th/id/OIP._MEnJY8Kvic6hx1s3fcfogHaE8?w=245&h=180",
  },
  {
    id: 2,
    title: "พิธีประดับช่อกัลปพฤกษ์",
    category: "University",
    date: "2025-04-10",
    location: "สนามกีฬากลาง มข",
    image: "https://th.bing.com/th/id/OIP.awh8uQ4Qiz4zHVb39opxqgHaEK?w=289&h=180",
  },
  {
    id: 3,
    title: "งานเกษตร มข",
    category: "Faculty of Agriculture",
    date: "2025-02-25",
    location: "ศูนย์ประชุม มข",
    image: "",
  },
  {
    id: 4,
    title: "งานแสดงดนตรี Dark light",
    category: "Faculty of Engineering",
    date: "2025-05-05",
    location: "ตึก 50 ปี ,คณะวิศวกรรมศาสตร์",
    image: "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/416977669_958773526249983_2693749562396735460_n.jpg",
  },
];

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, category, events]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar category={category} setCategory={setCategory} />

      {/* Content */}
      <div className="container mx-auto p-4">
        <EventSlider events={events.slice(0, 5)} />

        {/* Event List - Horizontal Scroll */}
        {/* Event List - Horizontal Scroll */}
        <h2 className="text-xl font-bold mb-2">Popular Events</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div key={event.id} className="min-w-[250px] md:min-w-[300px]">
                  <EventCard event={event} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">ไม่พบอีเว้นต์</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
