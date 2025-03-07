import React from 'react';
import './NavStyle.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import logo from "../../assets/pic/logo1.png";

function Nav() {
  return (
    <section id="nav">
      {/*logo*/}
      <div className="logo"> <img src={logo} alt="" width={110} height={80} /></div>

      {/* search */}
      <div className="center">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" className="search-input" placeholder="Search" />
        </div>
      </div>

      {/* menu */}
      <div className="menu">
        <div className="menu-item">
          Faculty <span>▼</span>
        </div>
        <Link to="https://calendar.google.com/calendar/embed?src=univibekkuengineer%40gmail.com&ctz=Asia%2FBangkok" className="menu-item">Calendar</Link>
      </div>
    </section>
  );
}

export default Nav;
