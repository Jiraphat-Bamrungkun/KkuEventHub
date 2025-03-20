import React, { useState } from 'react';
import './NavStyle.css';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/pic/logo1.png";
import { useSearchFilter } from '../../contexts/SearchContext';

function Nav() {
  const navigate = useNavigate();
  const { setSearchTerm, categories, setSelectedCategory } = useSearchFilter();
  const [localSearch, setLocalSearch] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // จัดการการส่งคำค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(localSearch);
    navigate('/search');
  };

  // จัดการการเลือกหมวดหมู่
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    navigate('/search');
  };

  return (
    <section id="nav">
      {/*logo*/}
      <Link to="/" className="logo">
        <img src={logo} alt="Univibe Logo" width={110} height={80} />
      </Link>

      {/* search */}
      <div className="center">
        <form onSubmit={handleSearch} className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหากิจกรรม..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <button type="submit" className="search-button">ค้นหา</button>
        </form>
      </div>

      {/* menu */}
      <div className="menu">
        <div
          className="menu-item dropdown"
          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          Event's Category <span>▼</span>

          {showCategoryDropdown && (
            <div className="dropdown-menu">
              <div
                className="dropdown-item"
                onClick={() => handleCategorySelect("")}
              >
                ทุกหมวดหมู่
              </div>
              <div className="dropdown-divider"></div>
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        <Link
          to="https://calendar.google.com/calendar/embed?src=univibekkuengineer%40gmail.com&ctz=Asia%2FBangkok"
          className="menu-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          Calendar
        </Link>
      </div>
    </section>
  );
}

export default Nav;
