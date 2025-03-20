import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import SearchResultsPage from "../pages/SearchResultsPage";

function Mainlayout() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
    </Routes>
  );
}

export default Mainlayout;