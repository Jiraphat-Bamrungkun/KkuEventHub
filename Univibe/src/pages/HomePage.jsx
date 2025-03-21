import React, { useState, useEffect } from "react";
import Nav from "../component/Nav/Nav";
import Promote from "../component/Promote/Promote";
import RecentEvents from "../component/Content/RecentEvents";
import UpcomingEvents from "../component/Content/UpcomingEvents";
import { fetchEvents } from "../api";
import "./Home.css";


function Home() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getEvents() {
      try {
        setLoading(true);
        const events = await fetchEvents();

        const now = new Date();

        // กรอง upcoming events (วันที่มากกว่าหรือเท่ากับวันนี้)
        let upcoming = events
          .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= now;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);

        // กรอง recent events (วันที่น้อยกว่าวันนี้)
        const recent = events
          .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate < now;
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        // ถ้า upcoming events มีไม่ถึง 6 การ์ด ให้เติมการ์ดเปล่า
        if (upcoming.length < 6) {
          const emptyCards = Array(6 - upcoming.length).fill().map((_, i) => ({
            id: `empty-${i}`,
            isEmpty: true,
            title: "ไม่มีกิจกรรมที่กำลังจะมาถึง",
            location: "รอติดตาม",
            date: "",
            image: ""
          }));
          upcoming = [...upcoming, ...emptyCards];
        }

        setUpcomingEvents(upcoming);
        setRecentEvents(recent);
        setError(null);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");

        // กรณีมีข้อผิดพลาด ให้แสดงการ์ดเปล่า
        const emptyUpcoming = Array(6).fill().map((_, i) => ({
          id: `empty-${i}`,
          isEmpty: true,
          title: "ไม่มีข้อมูลกิจกรรม",
          location: "โปรดลองใหม่ภายหลัง",
          date: "",
          image: ""
        }));
        setUpcomingEvents(emptyUpcoming);
      } finally {
        setLoading(false);
      }
    }

    getEvents();
  }, []);

  return (
    <section id="home-container">
      <Nav />
      <Promote />

      <section id="events-container">
      <div
          className="background1-blur"
          style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/0bab/9a40/8077e8cfaf0d7009fbb8615188f3215b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AEpOvv-Mu02Rik9lIPOE9Q9HoMXKp-BX~LmdrOMiTr~~jA2vG8WD9K3DsKiX1G6uwM-cveJ1~xMGHyU0yztFHeWqNfwWMwp6uftyb0rDAotoBjVmGifZFIW5P4r1p3qDGpYkEik3vG13PHQlV0iI7fc22URJq~ec4UZtC5LUJWIWUinzLLDQco~Bjz8YXNz2hvYd4FWAQIIjU2oU2hymAFChy6aefAMc2~DllT-0evGip6KYozHS7veNtQu65HhVH8sBQXlR0sBmew2HwiTGCmPRJrqVBlW~5DR0Pe-Gc6GfIByCer-8p~T7XXkM1lZrm9Z8hEi17nOCR-Ywa44itA__)` }}
        />
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>กำลังโหลดข้อมูลกิจกรรม...</p>
          </div>
        ) : (
          <>
            <UpcomingEvents upcomingEvents={upcomingEvents} />
            <RecentEvents recentEvents={recentEvents} />
          </>
        )}
      </section>
    </section>
  );
}

export default Home;