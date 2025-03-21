import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaSearch, FaFilter } from 'react-icons/fa';
import { MdClear, MdLocationOn } from 'react-icons/md';
import Nav from '../component/Nav/Nav';
import { useSearchFilter } from '../contexts/SearchContext';
import './EventCategory.css';

function EventCategoryPage() {
    const {
        allEvents,
        searchTerm,
        setSearchTerm,
        searchInputValue,
        setSearchInputValue,
        selectedCategory,
        setSelectedCategory,
        categories,
        loading,
        error,
        clearFilters,
        searchSuggestions,
        showSuggestions,
        setShowSuggestions,
        selectSuggestion
    } = useSearchFilter();

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [categoryEvents, setCategoryEvents] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [localSearchTerm, setLocalSearchTerm] = useState('');

    // เพิ่มสถานะสำหรับการกรองตามเวลา
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(false);
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // กำหนดหมวดหมู่ที่เลือกจาก URL parameters
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const upcomingParam = searchParams.get('upcoming');
        const pastParam = searchParams.get('past');

        if (categoryParam) {
            setActiveCategory(categoryParam);
            setSelectedCategory(categoryParam);
        } else {
            setActiveCategory('');
            setSelectedCategory('');
        }

        // อ่านพารามิเตอร์สำหรับกรองตามเวลา
        setShowUpcomingEvents(upcomingParam === 'true');
        setShowPastEvents(pastParam === 'true');
    }, [searchParams, setSelectedCategory]);

    // กรองกิจกรรมตามหมวดหมู่ที่เลือกและเวลา
    useEffect(() => {
        if (allEvents.length > 0) {
            let filteredEvents = [...allEvents];
            const now = new Date();

            // กรองตามหมวดหมู่
            if (activeCategory) {
                filteredEvents = filteredEvents.filter(event => event.category === activeCategory);
            }

            // กรองตามเวลา
            if (showUpcomingEvents && !showPastEvents) {
                // แสดงเฉพาะกิจกรรมที่กำลังจะมาถึง
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate >= now;
                });
            } else if (!showUpcomingEvents && showPastEvents) {
                // แสดงเฉพาะกิจกรรมที่ผ่านมาแล้ว
                filteredEvents = filteredEvents.filter(event => {
                    const eventDate = new Date(event.date);
                    return eventDate < now;
                });
            }

            // จัดเรียงตามวันที่ (ใกล้ที่สุดก่อน สำหรับกิจกรรมที่กำลังจะมาถึง)
            // หรือล่าสุดก่อน สำหรับกิจกรรมที่ผ่านมาแล้ว
            if (showPastEvents && !showUpcomingEvents) {
                filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
            } else {
                filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            }

            setCategoryEvents(filteredEvents);
        }
    }, [allEvents, activeCategory, showUpcomingEvents, showPastEvents]);

    // จัดการการเปลี่ยนแปลงในช่องค้นหา
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        setSearchInputValue(value);
        setShowSuggestions(value.trim().length >= 2);
    };

    // จัดการการส่งคำค้นหา
    const handleSubmit = (e) => {
        e.preventDefault();
        if (localSearchTerm.trim()) {
            setSearchTerm(localSearchTerm);
            navigate(`/search?${localSearchTerm ? `term=${encodeURIComponent(localSearchTerm)}` : ''}${activeCategory ? `&category=${encodeURIComponent(activeCategory)}` : ''}`);
        }
    };

    // จัดการการคลิกที่ suggestion
    const handleSuggestionClick = (suggestion) => {
        selectSuggestion(suggestion);
        navigate(`/search?term=${encodeURIComponent(suggestion.value)}`);
    };

    // จัดการการเลือกหมวดหมู่
    const handleCategoryClick = (category) => {
        // อัปเดตพารามิเตอร์ URL
        const params = new URLSearchParams(searchParams);

        if (category) {
            params.set('category', category);
        } else {
            params.delete('category');
        }

        // คงค่าพารามิเตอร์เวลา
        if (showUpcomingEvents) {
            params.set('upcoming', 'true');
        } else {
            params.delete('upcoming');
        }

        if (showPastEvents) {
            params.set('past', 'true');
        } else {
            params.delete('past');
        }

        setSearchParams(params);
        setActiveCategory(category);
    };

    // จัดการการเปลี่ยนแปลงของตัวกรองระยะเวลา
    const handleUpcomingEventsChange = (e) => {
        const isChecked = e.target.checked;

        // อัปเดตพารามิเตอร์ URL
        const params = new URLSearchParams(searchParams);

        if (isChecked) {
            params.set('upcoming', 'true');
        } else {
            params.delete('upcoming');
        }

        // คงค่าพารามิเตอร์อื่น
        if (activeCategory) {
            params.set('category', activeCategory);
        }

        if (showPastEvents) {
            params.set('past', 'true');
        }

        setSearchParams(params);
        setShowUpcomingEvents(isChecked);
    };

    const handlePastEventsChange = (e) => {
        const isChecked = e.target.checked;

        // อัปเดตพารามิเตอร์ URL
        const params = new URLSearchParams(searchParams);

        if (isChecked) {
            params.set('past', 'true');
        } else {
            params.delete('past');
        }

        // คงค่าพารามิเตอร์อื่น
        if (activeCategory) {
            params.set('category', activeCategory);
        }

        if (showUpcomingEvents) {
            params.set('upcoming', 'true');
        }

        setSearchParams(params);
        setShowPastEvents(isChecked);
    };

    // ล้างตัวกรองทั้งหมด
    const handleClearFilters = () => {
        setLocalSearchTerm('');
        setActiveCategory('');
        setShowUpcomingEvents(false);
        setShowPastEvents(false);
        setSearchParams({});
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

    // แปลงภาษาอังกฤษเป็นไทยสำหรับชื่อหมวดหมู่
    const translateCategory = (category) => {
        const translations = {
            'Academic': 'วิชาการ',
            'Culture': 'วัฒนธรรม',
            'Sport': 'กีฬา',
            'Entertainment': 'บันเทิง',
            'Volunteer': 'จิตอาสา',
            'Markets & Trade Shows': 'งานแสดงสินค้า & งานแฟร์',
            'Sports & Competitions': 'งานกีฬา & การแข่งขัน',
            'Entertainment & Lifestyle': 'งานบันเทิง & ไลฟ์สไตล์'
        };

        return translations[category] || category;
    };

    // ตรวจสอบว่ามีการใช้ตัวกรองใดๆ หรือไม่
    const hasActiveFilters = activeCategory || showUpcomingEvents || showPastEvents;

    return (
        <div className="category-page">
            <Nav />

            <div className="category-container">
                <div className="background-blur"></div>

                <div className="category-header">
                    <Link to="/" className="back-button">
                        <FaArrowLeft /> กลับหน้าหลัก
                    </Link>
                    <h2>
                        {activeCategory
                            ? `${translateCategory(activeCategory)}`
                            : `กิจกรรมทั้งหมด`}
                        {showUpcomingEvents && !showPastEvents && " (กำลังจะมาถึง)"}
                        {!showUpcomingEvents && showPastEvents && " (ผ่านมาแล้ว)"}
                        {` (${categoryEvents.length} รายการ)`}
                    </h2>
                </div>

                <div className="search-area">
                    <form onSubmit={handleSubmit} className="search-form">
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="ค้นหากิจกรรม..."
                                value={localSearchTerm}
                                onChange={handleSearchChange}
                                onFocus={() => {
                                    if (localSearchTerm.trim().length >= 2) {
                                        setShowSuggestions(true);
                                    }
                                }}
                            />
                            {localSearchTerm && (
                                <button
                                    type="button"
                                    className="clear-search-btn"
                                    onClick={() => {
                                        setLocalSearchTerm('');
                                        setSearchInputValue('');
                                    }}
                                >
                                    <MdClear />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="search-button">ค้นหา</button>

                        <div className="filter-toggle">
                            <button
                                type="button" // เพิ่ม type="button" เพื่อป้องกันการส่งฟอร์ม
                                className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <FaFilter />
                                <span>ตัวกรอง</span>
                                {hasActiveFilters && <span className="filter-indicator"></span>}
                            </button>

                            {hasActiveFilters && (
                                <button
                                    type="button" // เพิ่ม type="button" เพื่อป้องกันการส่งฟอร์ม
                                    className="clear-filters-btn"
                                    onClick={handleClearFilters}
                                >
                                    ล้างตัวกรอง
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Search Suggestions */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                        <div className="search-suggestions">
                            {searchSuggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <div className="suggestion-icon">
                                        {suggestion.type === 'location' ? (
                                            <MdLocationOn />
                                        ) : (
                                            <FaSearch />
                                        )}
                                    </div>
                                    <div className="suggestion-text">
                                        <span className="suggestion-value">{suggestion.value}</span>
                                        <span className="suggestion-type">
                                            {suggestion.type === 'title' ? 'กิจกรรม' :
                                                suggestion.type === 'location' ? 'สถานที่' : 'ผู้จัด'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="filters-panel">
                            <div className="filter-section">
                                <h3>หมวดหมู่</h3>
                                <div className="category-buttons">
                                    <button
                                        type="button"
                                        className={activeCategory === '' ? 'active' : ''}
                                        onClick={() => handleCategoryClick('')}
                                    >
                                        ทั้งหมด
                                    </button>
                                    {categories.map((category, index) => (
                                        <button
                                            type="button"
                                            key={index}
                                            className={activeCategory === category ? 'active' : ''}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {translateCategory(category)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <h3>ระยะเวลา</h3>
                                <div className="time-filters">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={showUpcomingEvents}
                                            onChange={handleUpcomingEventsChange}
                                        />
                                        กิจกรรมที่กำลังจะมาถึง
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={showPastEvents}
                                            onChange={handlePastEventsChange}
                                        />
                                        กิจกรรมที่ผ่านมาแล้ว
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Category Quick Filter */}
                    <div className="category-filter">
                        <button
                            type="button"
                            className={activeCategory === '' ? 'active' : ''}
                            onClick={() => handleCategoryClick('')}
                        >
                            ทั้งหมด
                        </button>
                        {categories.map((category, index) => (
                            <button
                                type="button"
                                key={index}
                                className={activeCategory === category ? 'active' : ''}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {translateCategory(category)}
                            </button>
                        ))}
                    </div>
                </div>

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
                ) : categoryEvents.length === 0 ? (
                    <div className="no-results">
                        <h3>ไม่พบกิจกรรมตามเงื่อนไขที่กำหนด</h3>
                        <p>ลองเลือกตัวกรองอื่น หรือกลับไปดูกิจกรรมทั้งหมด</p>
                    </div>
                ) : (
                    <div className="category-results-grid">
                        {categoryEvents.map((event) => (
                            <Link to={`/detail/${event.id}`} className="category-card" key={event.id}>
                                <div className="card-image">
                                    <img
                                        src={event.image || "/images/default-event.jpg"}
                                        alt={event.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/images/default-event.jpg";
                                        }}
                                    />
                                    <div className="card-category">{translateCategory(event.category)}</div>
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title">{event.title}</h3>
                                    <div className="card-date">{formatDisplayDate(event.date)}</div>
                                    {event.location && (
                                        <div className="card-location">
                                            <MdLocationOn />
                                            {event.location}
                                        </div>
                                    )}
                                    {event.description && (
                                        <div className="card-description">
                                            {event.description.length > 100
                                                ? `${event.description.substring(0, 100)}...`
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

export default EventCategoryPage;