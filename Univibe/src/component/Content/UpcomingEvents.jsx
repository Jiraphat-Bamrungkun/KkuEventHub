import React from "react";
import "./ContentStyle.css";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function UpcomingEvents({ upcomingEvents = [] }) {
  return (
    <section id="upcoming-events">
      <div className="header">
        <div className="topic">Upcoming Events</div>
      </div>
      <div className="allcard">
        {upcomingEvents.map((event, index) => (
          event.isEmpty ? ( 
            // การ์ดเปล่า
            <div className="card empty-card" key={`empty-${index}`}>
              <div className="photo empty-photo">
                <img src="/images/default-event.jpg" alt="No upcoming event" />
              </div>
              <div className="date">เร็วๆ นี้</div>
              <div className="Name">{event.title}</div>
              <div className="Locate">
                <LocationOnIcon style={{ color: "#888" }} />
                {event.location}
              </div>
            </div>
          ) : (
            // การ์ดปกติที่มีข้อมูล
            <Link to={`/detail/${event.id}`} className="card" key={index}>
              <div className="photo">
                <img
                  src={event.image || "/images/default-event.jpg"}
                  alt={event.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-event.jpg";
                  }}
                />
              </div>
              <div className="date">{formatDisplayDate(event.date)}</div>
              <div className="Name">{event.title}</div>
              <div className="Locate">
                <LocationOnIcon style={{ color: "#888" }} />
                {event.location}
              </div>
            </Link>
          )
        ))}
      </div>
    </section>
  );
}

function formatDisplayDate(dateString) {
  if (!dateString) return "เร็วๆ นี้";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString || "เร็วๆ นี้";
  }
}