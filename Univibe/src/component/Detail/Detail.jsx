import React from 'react';
import './DetailStyle.css';
import { Link } from "react-router-dom";
import './DetailStyle.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';



export default function Detail() {
  const backgroundUrl = "https://s3-alpha-sig.figma.com/img/05cd/a92c/1302a773bb4079095cf5beb497036c18?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2MjY8uo1KLGYfMzQ9rVqh~FOWUANf3wTKyOkuPmHYLnPLIC~Abm55caMdSv8ULU1uNpXkot0cDxPK7-qNj2IO2lkryGMQ61vJ5PQ5QTj3mVovPSqeKaodTzhMJ80exLzYvWGv9YO0Wlu9ZupD4VlS4NsrYfC4Iwprf-9ocVAK1Vz59rSTjlj3vMm2IA9vu0TV0gj~~hp0iyNzC1VkPXYGQVtOX-e7OXN2HZUcFV0tSPhGMRV2mzW58VDF1ObeDdxqXmK5AnAlLRh8J7yn1JPpV~CrMAgLC-o5KaCibxZiP0TWpkNky3tKY0CexVU7RLsA5e9BP3~rzr6AEgxJI0uA__";
  const imgUrl = "https://s3-alpha-sig.figma.com/img/05cd/a92c/1302a773bb4079095cf5beb497036c18?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=J2MjY8uo1KLGYfMzQ9rVqh~FOWUANf3wTKyOkuPmHYLnPLIC~Abm55caMdSv8ULU1uNpXkot0cDxPK7-qNj2IO2lkryGMQ61vJ5PQ5QTj3mVovPSqeKaodTzhMJ80exLzYvWGv9YO0Wlu9ZupD4VlS4NsrYfC4Iwprf-9ocVAK1Vz59rSTjlj3vMm2IA9vu0TV0gj~~hp0iyNzC1VkPXYGQVtOX-e7OXN2HZUcFV0tSPhGMRV2mzW58VDF1ObeDdxqXmK5AnAlLRh8J7yn1JPpV~CrMAgLC-o5KaCibxZiP0TWpkNky3tKY0CexVU7RLsA5e9BP3~rzr6AEgxJI0uA__";

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
          <div className="event-title">EconoVibe
            MUSIV JORNEY</div>
          <div className="event-subtitle">Econovibe by Econ KKU Music Club ✨
            ขอเชิญทุกคนมาสัมผัสค่ำคืนแห่งเสียงเพลงและบรรยากาศสุดอบอุ่นหัวใจ 💖🎶 ไม่ว่าคุณจะมากับคนรู้ใจ เพื่อนสนิท หรือมาคนเดียว ก็เตรียมตัวดื่มด่ำไปกับบทเพลงเพราะ ๆ ที่จะเติมเต็มความทรงจำดี ๆ ให้คุณไม่มีวันลืม</div>
          <div className="event-info">
            <CalendarTodayIcon style={{ color: '#888' }} />
            20 มิ.ย 2025
          </div>
          <div className="event-info">
            <LocationOnIcon style={{ color: '#888' }} />
            สนามกีฬากลางมหาวิทยาลัยขอนแก่น
          </div>
          <div className="event-buttons">
            <Link to="https://calendar.google.com/calendar/embed?src=univibekkuengineer%40gmail.com&ctz=Asia%2FBangkok" className="event-button">Add To Calendar</Link>
          </div>
        </div>
      </div>

      <div className="see-more">
        <button className="see-more-button">see more detail</button>
      </div>
    </section>
  );
}





