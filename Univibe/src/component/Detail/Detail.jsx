import React from 'react';
import './DetailStyle.css';
import { Link } from "react-router-dom";
import './DetailStyle.css'; 

export default function Detail() {
  const backgroundUrl = "https://placehold.co/1920x1080"; 
  const imgUrl = "https://placehold.co/200x200"; 

  return (
    <section className="detail-section">
      <div 
        className="background-blur"
        style={{ backgroundImage: `url(${backgroundUrl})` }}
      />

      <div className="event-card">
        <img 
          src={imgUrl} 
          alt="Event" 
          className="event-image"
        />
        <div className="event-details">
          <h2 className="event-title">พิธีประดับช่อกัลปพฤกษ์ ช่อที่ 62</h2>
          <p className="event-subtitle">กิจกรรมต้อนรับน้องใหม่</p>
          <div className="event-info">
            <span className="icon">📅</span>
            20 มิ.ย 2025
          </div>
          <div className="event-info">
            <span className="icon">📍</span>
            สนามกีฬากลางมหาวิทยาลัยขอนแก่น
          </div>
          <div className="event-buttons">
            <Link to="https://calendar.google.com/calendar/embed?src=univibekkuengineer%40gmail.com&ctz=Asia%2FBangkok" className="event-button">Add To Calendar</Link>
            <button className="event-button">Follow</button>
          </div>
        </div>
      </div>

      <div className="see-more">
        <button className="see-more-button">see more detail</button>
      </div>
    </section>
  );
}





