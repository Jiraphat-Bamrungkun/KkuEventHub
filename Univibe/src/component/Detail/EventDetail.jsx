import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './EventDetailStyle.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { fetchEventById } from "../api";
import Nav from "../component/Nav/Nav";

export default function Detail() {
  const { id } = useParams(); // รับค่า id จาก URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);
        const eventData = await fetchEventById(id);
        if (eventData) {
          setEvent(eventData);
          setError(null);
        } else {
          setError("ไม่พบข้อมูลกิจกรรมที่ต้องการ");
        }
      } catch (err) {
        console.error("Error loading event:", err);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadEvent();
    }
  }, [id]);

  // แสดงข้อความ Loading ขณะโหลดข้อมูล
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>กำลังโหลดข้อมูลกิจกรรม...</p>
      </div>
    );
  }

  // แสดงข้อความ Error ถ้าเกิดข้อผิดพลาด
  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <Link to="/" className="back-button">กลับสู่หน้าหลัก</Link>
      </div>
    );
  }

  // ถ้าไม่มีข้อมูล event
  if (!event) {
    return (
      <div className="error-container">
        <h2>ไม่พบข้อมูลกิจกรรม</h2>
        <Link to="/" className="back-button">กลับสู่หน้าหลัก</Link>
      </div>
    );
  }

  // ฟังก์ชันสำหรับลิงก์ไปยัง Google Calendar
  const addToGoogleCalendar = () => {
    if (!event) return "#";

    const eventTitle = encodeURIComponent(event.title);
    const startDate = event.date ? new Date(event.date) : new Date();
    const endDate = event.enddate ? new Date(event.enddate) : new Date(startDate.getTime() + (2 * 60 * 60 * 1000)); // +2 ชั่วโมงถ้าไม่มีวันสิ้นสุด

    // เพิ่มเวลาเริ่มและเวลาสิ้นสุด
    if (event.time) {
      const [hours, minutes] = event.time.split(':');
      startDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    }

    if (event.endtime) {
      const [hours, minutes] = event.endtime.split(':');
      endDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    }

    // Format วันที่เป็น ISO string
    const start = startDate.toISOString().replace(/-|:|\.\d+/g, '');
    const end = endDate.toISOString().replace(/-|:|\.\d+/g, '');

    const location = encodeURIComponent(event.location || '');
    const description = encodeURIComponent(event.description || '');

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${start}/${end}&details=${description}&location=${location}&sf=true&output=xml`;
  };

  // ฟังก์ชันสำหรับแปลงวันที่ให้อยู่ในรูปแบบที่อ่านง่าย
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "ไม่ระบุ";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <>
      <Nav />
      <section className="detail-section">
        <div
          className="background-blur"
          style={{ backgroundImage: `url(${event.bg || event.image || '/images/default-bg.jpg'})` }}
        />

        <div className="event-card">
          <img
            src={event.image || '/images/default-event.jpg'}
            alt={event.title}
            className="event-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/images/default-event.jpg";
            }}
          />
          <div className="event-details">
            <div className="event-title">{event.title}</div>
            <div className="event-subtitle">{event.description}</div>

            <div className="event-info">
              <CalendarTodayIcon style={{ color: '#888' }} />
              {formatDisplayDate(event.date)}
              {event.enddate && event.enddate !== event.date && (
                <span> - {formatDisplayDate(event.enddate)}</span>
              )}
            </div>

            {event.time && (
              <div className="event-info">
                <AccessTimeIcon style={{ color: '#888' }} />
                {event.time}
                {event.endtime && (
                  <span> - {event.endtime}</span>
                )}
              </div>
            )}

            {event.location && (
              <div className="event-info">
                <LocationOnIcon style={{ color: '#888' }} />
                {event.location}
              </div>
            )}

            {event.category && (
              <div className="event-info">
                <CategoryIcon style={{ color: '#888' }} />
                {event.category}
              </div>
            )}

            {event.organizer && (
              <div className="event-info">
                <GroupIcon style={{ color: '#888' }} />
                จัดโดย: {event.organizer}
              </div>
            )}

            <div className="event-buttons">
              <a
                href={addToGoogleCalendar()}
                target="_blank"
                rel="noopener noreferrer"
                className="event-button"
              >
                Add To Calendar
              </a>

              {event.evLink && (
                <a
                  href={event.evLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-button"
                >
                  ลงทะเบียน
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="see-more">
          <Link to="/" className="see-more-button">กลับสู่หน้าหลัก</Link>
        </div>
      </section>
    </>
  );
}