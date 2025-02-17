import React from 'react';
import './NavStyle.css';
import { FaSearch } from 'react-icons/fa';

function Nav() {
  return (
    <section id="nav">
      {/*logo*/}
      <div className="logo">UniVibe</div>

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
        <div className="menu-item">Calendar</div>
      </div>
    </section>
  );
}

export default Nav;
