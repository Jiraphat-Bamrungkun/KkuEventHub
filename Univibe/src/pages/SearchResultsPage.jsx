import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaFilter, FaSearch } from 'react-icons/fa';
import { MdClear } from 'react-icons/md';
import { LocationOn } from '@mui/icons-material';
import Nav from '../component/Nav/Nav';
import { useSearchFilter } from '../contexts/SearchContext';
import './SearchResults.css';


function SearchResultsPage() {
    const {
        filteredEvents,
        allEvents,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        loading,
        error,
        clearFilters
    } = useSearchFilter();

    const [showFilters, setShowFilters] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

    // จัดการการเปลี่ยนแปลงในช่องค้นหา
    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    // จัดการการส่งคำค้นหา
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(localSearchTerm);
    };

    // เปลี่ยนหมวดหมู่ที่เลือก
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // ฟังก์ชันสำหรับแปลงวันที่ให้อยู่ในรูปแบบที่อ่านง่าย
    const formatDisplayDate = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    // สร้างข้อความสรุปผลการค้นหา
    const getSearchSummary = () => {
        const totalEvents = allEvents.length;
        const foundEvents = filteredEvents.length;

        if (searchTerm && selectedCategory) {
            return `ผลการค้นหา "${searchTerm}" ในหมวดหมู่ "${selectedCategory}" (${foundEvents} จาก ${totalEvents} รายการ)`;
        } else if (searchTerm) {
            return `ผลการค้นหา "${searchTerm}" (${foundEvents} จาก ${totalEvents} รายการ)`;
        } else if (selectedCategory) {
            return `กิจกรรมในหมวดหมู่ "${selectedCategory}" (${foundEvents} จาก ${totalEvents} รายการ)`;
        }
        return `กิจกรรมทั้งหมด (${foundEvents} รายการ)`;
    };

    return (
        <div className="search-results-page">
            
            <Nav />

            <div className="search-container">
            <div
          className="background2-blur"
          style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/0bab/9a40/8077e8cfaf0d7009fbb8615188f3215b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AEpOvv-Mu02Rik9lIPOE9Q9HoMXKp-BX~LmdrOMiTr~~jA2vG8WD9K3DsKiX1G6uwM-cveJ1~xMGHyU0yztFHeWqNfwWMwp6uftyb0rDAotoBjVmGifZFIW5P4r1p3qDGpYkEik3vG13PHQlV0iI7fc22URJq~ec4UZtC5LUJWIWUinzLLDQco~Bjz8YXNz2hvYd4FWAQIIjU2oU2hymAFChy6aefAMc2~DllT-0evGip6KYozHS7veNtQu65HhVH8sBQXlR0sBmew2HwiTGCmPRJrqVBlW~5DR0Pe-Gc6GfIByCer-8p~T7XXkM1lZrm9Z8hEi17nOCR-Ywa44itA__)` }}
        />
                <div className="search-header">
                    <Link to="/" className="back-button">
                        <FaArrowLeft /> กลับหน้าหลัก
                    </Link>
                    <h2>{getSearchSummary()}</h2>
                </div>

                <div className="search-tools">
                    <div className="search-bar-container">
                        <form onSubmit={handleSubmit} className="search-form">
                            <div className="search-input-wrapper">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="ค้นหากิจกรรม..."
                                    value={localSearchTerm}
                                    onChange={handleSearchChange}
                                />
                                {localSearchTerm && (
                                    <button
                                        type="button"
                                        className="clear-search-btn"
                                        onClick={() => setLocalSearchTerm('')}
                                        aria-label="Clear search"
                                    >
                                        <MdClear />
                                    </button>
                                )}
                            </div>
                            <button type="submit" className="search-button">
                                ค้นหา
                            </button>
                        </form>
                    </div>

                    <div className="filter-controls">
                        <button
                            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FaFilter />
                            <span>ตัวกรอง</span>
                            {selectedCategory && <span className="filter-indicator"></span>}
                        </button>

                        {(selectedCategory || searchTerm) && (
                            <button className="clear-filters-btn" onClick={clearFilters}>
                                ล้างตัวกรอง
                            </button>
                        )}
                    </div>
                </div>

                {showFilters && (
                    <div className="filters-panel">
                        <div className="filter-group">
                            <label htmlFor="category-filter">หมวดหมู่:</label>
                            <select
                                id="category-filter"
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="category-select"
                            >
                                <option value="">ทั้งหมด</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>ระยะเวลา:</label>
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input type="checkbox" /> กิจกรรมที่กำลังจะมาถึง
                                </label>
                                <label className="checkbox-label">
                                    <input type="checkbox" /> กิจกรรมที่ผ่านมาแล้ว
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>กำลังโหลดข้อมูลกิจกรรม...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <h3>{error}</h3>
                        <p>โปรดลองอีกครั้งภายหลัง</p>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="no-results">
                        <h3>ไม่พบกิจกรรมที่ตรงกับการค้นหา</h3>
                        <p>ลองค้นหาด้วยคำที่แตกต่างหรือล้างตัวกรอง</p>
                    </div>
                ) : (
                    <div className="search-results-grid">
                        {filteredEvents.map((event) => (
                            <Link to={`/detail/${event.id}`} className="result-card" key={event.id}>
                                <div className="result-image">
                                    <img
                                        src={event.image || "/images/default-event.jpg"}
                                        alt={event.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/images/default-event.jpg";
                                        }}
                                    />
                                    {event.category && (
                                        <div className="result-category">{event.category}</div>
                                    )}
                                </div>
                                <div className="result-content">
                                    <h3 className="result-title">{event.title}</h3>
                                    <div className="result-date">{formatDisplayDate(event.date)}</div>
                                    {event.location && (
                                        <div className="result-location">
                                            <LocationOn className="location-icon" />
                                            {event.location}
                                        </div>
                                    )}
                                    {event.description && (
                                        <div className="result-description">
                                            {event.description.length > 120
                                                ? `${event.description.substring(0, 120)}...`
                                                : event.description}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResultsPage;