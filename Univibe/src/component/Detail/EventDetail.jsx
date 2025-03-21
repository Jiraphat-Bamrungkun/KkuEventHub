import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import './EventDetailStyle.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchEventById } from "../../api";
import Nav from "../Nav/Nav";

export default function Detail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  // ฟังก์ชันสำหรับตัดข้อความให้เหลือแค่ 4 บรรทัด
  const truncateDescription = (text, lines = 4) => {
    if (!text) return "";

    // คำนวณความยาวโดยประมาณต่อบรรทัด
    const charsPerLine = 60;
    const maxLength = lines * charsPerLine;

    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength) + "...";
  };

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

  // แปลง Google Drive URL เป็น direct link
  const convertGoogleDriveUrl = (url) => {
    if (!url || !url.includes('drive.google.com')) return url;

    try {
      // หากเป็น URL แบบ /d/FILE_ID/
      const fileIdMatch = url.match(/\/d\/(.*?)(\/|$)/);
      if (fileIdMatch && fileIdMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }

      // หากเป็น URL แบบ id=FILE_ID
      const idParamMatch = url.match(/id=(.*?)(&|$)/);
      if (idParamMatch && idParamMatch[1]) {
        return `https://drive.google.com/uc?export=view&id=${idParamMatch[1]}`;
      }
    } catch (e) {
      console.error("Error converting Google Drive URL:", e);
    }

    return url;
  };

  const imageUrl = convertGoogleDriveUrl(event.image) || '/images/default-event.jpg';
  const bgUrl = convertGoogleDriveUrl(event.bg) || convertGoogleDriveUrl(event.image) || '/images/default-bg.jpg';

  return (
    <>
      <Nav />
      <section className={`detail-section ${showDetailedView ? 'detailed-view' : ''}`}>
        <div
          className="background-blur"
          style={{ backgroundImage: `url(${bgUrl})` }}
        />

        {!showDetailedView ? (
          // หน้า Detail แบบเดิม
          <>
            <div className="event-card">
              <img
                src={imageUrl}
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/default-event.jpg";
                }}
              />
              <div className="event-details">
                <div className="event-title">{event.title}</div>
                <div className={`event-subtitle ${showFullDescription ? 'expanded' : ''}`}>
                  {showFullDescription ? event.description : truncateDescription(event.description)}

                  {/* ปุ่มแสดงเพิ่มเติม/น้อยลง เฉพาะเมื่อข้อความยาวเกิน 4 บรรทัด */}
                  {event.description && event.description.length > 240 && (
                    <button
                      className="read-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullDescription(!showFullDescription);
                      }}
                    >
                      {showFullDescription ? "แสดงน้อยลง" : "อ่านเพิ่มเติม..."}
                    </button>
                  )}
                </div>

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

            <div className="more-info-toggle" onClick={() => setShowDetailedView(true)}>
              <span>More Info</span>
              <ExpandMoreIcon />
            </div>
          </>
        ) : (
          // หน้า Detail แบบใหม่ที่มีซ้ายขวา
          <>
            <div className="event-container">
              {/* LEFT SIDE - Card Preview */}
              <div className="event-card-preview">
                <div className="preview-image">
                  <img
                    src={imageUrl}
                    alt={event.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default-event.jpg";
                    }}
                  />
                </div>
                <div className="preview-info">
                  <h2>{event.title}</h2>
                  <div className="preview-date">
                    <CalendarTodayIcon />
                    {formatDisplayDate(event.date)}
                  </div>
                  <div className="preview-location">
                    <LocationOnIcon />
                    {event.location || "ไม่ระบุสถานที่"}
                  </div>
                  <div className="preview-organizer">
                    <GroupIcon />
                    {event.organizer || "ไม่ระบุผู้จัด"}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Full Details */}
              <div className="event-full-details">
                <div className="event-header">
                  <h1>{event.title}</h1>
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

                <div className="event-info-container">
                  <div className="event-description">
                    <p>{event.description}</p>
                  </div>

                  <div className="event-details-grid">
                    <div className="detail-item">
                      <CalendarTodayIcon />
                      <span>วันที่:</span>
                      <span>
                        {formatDisplayDate(event.date)}
                        {event.enddate && event.enddate !== event.date && (
                          <span> - {formatDisplayDate(event.enddate)}</span>
                        )}
                      </span>
                    </div>

                    {event.time && (
                      <div className="detail-item">
                        <AccessTimeIcon />
                        <span>เวลา:</span>
                        <span>
                          {event.time}
                          {event.endtime && <span> - {event.endtime}</span>}
                        </span>
                      </div>
                    )}

                    {event.duration && (
                      <div className="detail-item">
                        <AccessTimeIcon />
                        <span>ระยะเวลา:</span>
                        <span>{event.duration}</span>
                      </div>
                    )}

                    {event.location && (
                      <div className="detail-item">
                        <LocationOnIcon />
                        <span>สถานที่:</span>
                        <span>{event.location}</span>
                      </div>
                    )}

                    {event.category && (
                      <div className="detail-item">
                        <CategoryIcon />
                        <span>ประเภท:</span>
                        <span>{event.category}</span>
                      </div>
                    )}

                    {event.organizer && (
                      <div className="detail-item">
                        <GroupIcon />
                        <span>จัดโดย:</span>
                        <span>{event.organizer}</span>
                      </div>
                    )}

                    {event.participate && (
                      <div className="detail-item">
                        <GroupIcon />
                        <span>ผู้เข้าร่วม:</span>
                        <span>{event.participate}</span>
                      </div>
                    )}

                    {event.dressCode && (
                      <div className="detail-item">
                        <span>การแต่งกาย:</span>
                        <span>{event.dressCode}</span>
                      </div>
                    )}
                  </div>

                  {event.socialMedia && (
                    <div className="social-media">
                      <h3>ติดตามได้ที่:</h3>
                      <pg>{event.socialMedia}</pg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="more-info-toggle" onClick={() => setShowDetailedView(false)}>
              <span>Simple View</span>
              <ExpandMoreIcon style={{ transform: 'rotate(180deg)' }} />
            </div>
          </>
        )}

        <div className="see-more">
          <Link to="/" className="see-more-button">กลับสู่หน้าหลัก</Link>
        </div>
      </section>
    </>
  );
}