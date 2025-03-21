import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LocationOn } from '@mui/icons-material';
import Nav from '../component/Nav/Nav';
import { useSearchFilter } from '../contexts/SearchContext';
import './SearchResults.css';


function SearchResultsPage() {
    const {
        filteredEvents,
        allEvents,
        searchTerm,
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
        const totalEvents = allEvents.length;
        const foundEvents = filteredEvents.length;

        if (searchTerm) {
            return `ผลการค้นหา "${searchTerm}" (${foundEvents} จาก ${totalEvents} รายการ)`;
        }

        return `กิจกรรมทั้งหมด (${foundEvents} รายการ)`;
    };

    return (
        <div className="search-results-page">
            <Nav />

            <div className="search-container">
                <div className="background2-blur"
                    style={{ backgroundImage: `url(https://s3-alpha-sig.figma.com/img/0bab/9a40/8077e8cfaf0d7009fbb8615188f3215b?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=AEpOvv-Mu02Rik9lIPOE9Q9HoMXKp-BX~LmdrOMiTr~~jA2vG8WD9K3DsKiX1G6uwM-cveJ1~xMGHyU0yztFHeWqNfwWMwp6uftyb0rDAotoBjVmGifZFIW5P4r1p3qDGpYkEik3vG13PHQlV0iI7fc22URJq~ec4UZtC5LUJWIWUinzLLDQco~Bjz8YXNz2hvYd4FWAQIIjU2oU2hymAFChy6aefAMc2~DllT-0evGip6KYozHS7veNtQu65HhVH8sBQXlR0sBmew2HwiTGCmPRJrqVBlW~5DR0Pe-Gc6GfIByCer-8p~T7XXkM1lZrm9Z8hEi17nOCR-Ywa44itA__)` }}
                />

                <div className="search-header simplified">
                    <Link to="/" className="back-button">
                        <FaArrowLeft /> กลับหน้าหลัก
                    </Link>
                    <h2>{getSearchSummary()}</h2>
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
                        <p>ลองค้นหาด้วยคำที่แตกต่างอีกครั้ง</p>
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