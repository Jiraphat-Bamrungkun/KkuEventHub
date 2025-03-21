import { useParams } from "react-router-dom";
import Nav from "../component/Nav/Nav";
import EventDetail from "../component/Detail/EventDetail";

function DetailPage() {
  const { id } = useParams(); // รับ parameter id จาก URL

  return (
    <section id="detail-layout">
      <EventDetail eventId={id} />
    </section>
  );
}

export default DetailPage;