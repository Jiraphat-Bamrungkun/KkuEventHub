import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LocationOn } from '@mui/icons-material';
import Nav from '../component/Nav/Nav';
import SearchBar from '../component/SearchBar/SearchBar';
import { useSearchFilter } from '../contexts/SearchContext';
import './SearchResults.css';

function SearchResultsPage() {
    const {
        filteredEvents,
        searchTerm,
        selectedCategory,
        loading,
        error
    } = useSearchFilter();

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
        if (searchTerm && selectedCategory) {
            return `ผลการค้นหา "${searchTerm}" ในหมวดหมู่ "${selectedCategory}"`;
        } else if (searchTerm) {
            return `ผลการค้นหา "${searchTerm}"`;
        } else if (selectedCategory) {
            return `กิจกรรมในหมวดหมู่ "${selectedCategory}"`;
        }
        return "ทุกกิจกรรม";
    };

    return (
        <div className="search-results-page">
            <Nav />

            <div className="search-container">
                <SearchBar />

                <div className="search-summary">
                    <Link to="/" className="back-button">
                        <FaArrowLeft /> กลับหน้าหลัก
                    </Link>
                    <h2>{getSearchSummary()}</h2>
                    <p>พบ {filteredEvents.length} รายการ</p>
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