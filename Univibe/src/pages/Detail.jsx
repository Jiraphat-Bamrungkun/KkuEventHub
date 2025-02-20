import { Link } from "react-router-dom";
import Nav from "../component/Nav/Nav";
import Detail from "../component/Detail/Detail";

function DetailPage() {
  return (
    <section id = "detail-layout">
    <Nav></Nav> 
    <Detail></Detail>
    </section>
  );
}

export default DetailPage;
