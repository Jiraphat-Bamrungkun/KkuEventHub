import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import EventCategoryPage from "../pages/EventCategoryPage";
import Footer from "../component/Footer/Footer";


function Mainlayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/category" element={<EventCategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Mainlayout;