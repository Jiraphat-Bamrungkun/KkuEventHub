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

        // กรองupcoming events (วันที่มากกว่าหรือเท่ากับวันนี้)
        let upcoming = events
          .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= now;
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 6);

        // กรองrecent events (วันที่น้อยกว่าวันนี้)
        const recent = events
          .filter(e => {
            const eventDate = new Date(e.date);
            return eventDate < now;
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 6);

        // ถ้า upcoming events มีไม่ถึง 6การ์ด ให้เติมการ์ดเปล่า
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

        // กรณีมีข้อผิดพลาด แสดงการ์ดเปล่า
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
          style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/ab83/4717/51f2cd79743dde1b025ac8302972c347?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tQx3fcnRatWZfAyaVe10hRB4Q9qJ7895irsOhf4h-1YDzNrkzhXGq4RHUj5-CBHFej7aNGai8kadyeI51Ftmq3~NTidhMSkTwO~vAt0lP7w9~cGevYnuiJfkOBldSXvfrbpWwuhIhmxmR9L2OujHAwNw8w5RZ~X75Me0vHUa8rZgBXsaqBdrY4Ji0mpjMi~N3mQuY6uOWSIMDoeCtv9q3N~v4dP~n4Skpxg9H2AhJARxZGXRkwpv2rw2ybaXsrZwGsrDOcM1rM5uxLXIS~Vv9kaGmKCDLr8jcKV6F74HRYK354BxBijz25I1iXYHv4FaQ1h0fneatEEG~84Myr1S1A__)` }}
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