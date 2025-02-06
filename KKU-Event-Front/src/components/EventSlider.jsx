import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function EventSlider({ events }) {
  return (
    <Swiper spaceBetween={10} slidesPerView={1} autoplay={{ delay: 3000 }}>
      {events.map(event => (
        <SwiperSlide key={event.id}>
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default EventSlider;
