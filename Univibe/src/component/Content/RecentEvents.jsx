import React from "react";
import "./ContentStyle.css";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function RecentEvents({ recentEvents = [] }) {
  return (
    <section id="recent-events">
      <div className="header">
        <div className="topic">Recent Events</div>
      </div>
      <div className="allcard">
        {recentEvents && recentEvents.length > 0 ? (
          recentEvents.map((event, index) => (
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
          ))
        ) : (
          <div className="no-events-message">ยังไม่มีกิจกรรมที่ผ่านมาในขณะนี้</div>
        )}
      </div>
    </section>
  );
}

function formatDisplayDate(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}