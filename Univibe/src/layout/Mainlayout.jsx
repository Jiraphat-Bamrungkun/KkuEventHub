import { Routes, Route } from "react-router-dom";
import Home from "../pages/home"; 
import DetailPage from "../pages/Detail";

function Mainlayout() {
  return (
    <section id="main-layout">
      <Routes basename="/">
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </section>
  );
}

export default Mainlayout;
