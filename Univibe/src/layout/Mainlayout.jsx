import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home"; 
import Detail from "../pages/Detail";

function Mainlayout() {
  return (
    <section id="main-layout">
      <Routes basename="/">
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </section>
  );
}

export default Mainlayout;
