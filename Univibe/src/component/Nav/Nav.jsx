import React, { useState, useRef, useEffect } from 'react';
import './NavStyle.css';
import { FaSearch } from 'react-icons/fa';
import { MdClear, MdLocationOn, MdPerson } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/pic/logo1.png";
import { useSearchFilter } from '../../contexts/SearchContext';

function Nav() {
  const navigate = useNavigate();
  const {
    setSearchTerm,
    searchInputValue,
    setSearchInputValue,
    searchSuggestions,
    showSuggestions,
    setShowSuggestions,
    selectSuggestion
  } = useSearchFilter();

  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // จัดการคลิกนอก suggestions เพื่อปิด
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  // จัดการการส่งคำค้นหา
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInputValue);
    setShowSuggestions(false);
    navigate('/search');
  };

  // จัดการการเปลี่ยนแปลงในช่องค้นหา
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);

    // แสดง suggestions เมื่อมีการพิมพ์อย่างน้อย 2 ตัวอักษร
    setShowSuggestions(value.trim().length >= 2);
  };

  // จัดการการกดปุ่มในช่องค้นหา
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    } else if (e.key === 'ArrowDown' && showSuggestions && searchSuggestions.length > 0) {
      // ป้องกันเคอร์เซอร์เลื่อนใน input
      e.preventDefault();

      // โฟกัสไปที่รายการแรกใน suggestions
      const firstSuggestion = document.querySelector('.suggestion-item');
      if (firstSuggestion) {
        firstSuggestion.focus();
      }
    }
  };

  // จัดการการนำทางใน suggestions ด้วยแป้นพิมพ์
  const handleSuggestionKeyDown = (e, index, suggestion) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      selectSuggestion(suggestion);
      // ส่งการค้นหาหลังจากเลือก suggestion
      setTimeout(() => {
        navigate('/search');
      }, 100);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      searchInputRef.current.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (index === 0) {
        // ถ้าอยู่ที่รายการแรก ให้กลับไปที่ช่องค้นหา
        searchInputRef.current.focus();
      } else {
        // มิฉะนั้น โฟกัสไปที่รายการก่อนหน้า
        const prevSuggestion = document.querySelector(`.suggestion-item:nth-child(${index})`);
        if (prevSuggestion) {
          prevSuggestion.focus();
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      // โฟกัสไปที่รายการถัดไป
      const nextSuggestion = document.querySelector(`.suggestion-item:nth-child(${index + 2})`);
      if (nextSuggestion) {
        nextSuggestion.focus();
      }
    }
  };

  // ไฮไลท์คำที่ตรงกับคำค้นหา
  const highlightMatch = (text, searchInput) => {
    if (!searchInput.trim()) return text;

    const regex = new RegExp(`(${searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
    );
  };

  // แสดงไอคอนตามประเภทของ suggestion
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'location':
        return <MdLocationOn className="suggestion-icon location" />;
      case 'organizer':
        return <MdPerson className="suggestion-icon organizer" />;
      case 'title':
      default:
        return <FaSearch className="suggestion-icon title" />;
    }
  };

  // แสดงคำอธิบายประเภทของ suggestion
  const getSuggestionTypeLabel = (type) => {
    switch (type) {
      case 'location':
        return 'สถานที่';
      case 'organizer':
        return 'ผู้จัด';
      case 'title':
        return 'กิจกรรม';
      default:
        return '';
    }
  };

  // ล้างคำค้นหา
  const handleClearSearch = () => {
    setSearchInputValue("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
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
            ref={searchInputRef}
            type="text"
            className="search-input"
            placeholder="ค้นหากิจกรรม..."
            value={searchInputValue}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchInputValue.trim().length >= 2) {
                setShowSuggestions(true);
              }
            }}
            autoComplete="off"
          />
          {searchInputValue && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <MdClear />
            </button>
          )}
          <button type="submit" className="search-button">ค้นหา</button>
        </form>

        {/* Search Suggestions */}
        {showSuggestions && searchSuggestions.length > 0 && (
          <div className="search-suggestions" ref={suggestionsRef}>
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={`${suggestion.type}-${index}`}
                className="suggestion-item"
                onClick={() => {
                  selectSuggestion(suggestion);
                  navigate('/search');
                }}
                onKeyDown={(e) => handleSuggestionKeyDown(e, index, suggestion)}
                tabIndex={0}
              >
                <div className="suggestion-content">
                  {getSuggestionIcon(suggestion.type)}
                  <div className="suggestion-text">
                    <span className="suggestion-value">
                      {highlightMatch(suggestion.value, searchInputValue)}
                    </span>
                    <span className="suggestion-type">
                      {getSuggestionTypeLabel(suggestion.type)}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* menu */}
      <div className="menu">
        <Link to="/search" className="menu-item">
          Event's Category
        </Link>
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