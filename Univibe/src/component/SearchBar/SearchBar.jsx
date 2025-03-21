import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoFilterOutline } from 'react-icons/io5';
import { MdClear, MdLocationOn, MdPerson } from 'react-icons/md';
import './SearchBarStyle.css';
import { useSearchFilter } from '../../contexts/SearchContext';

function SearchBar() {
    const {
        searchTerm,
        setSearchTerm,
        searchInputValue,
        setSearchInputValue,
        selectedCategory,
        setSelectedCategory,
        categories,
        clearFilters,
        searchSuggestions,
        showSuggestions,
        setShowSuggestions,
        selectSuggestion
    } = useSearchFilter();

    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();
    const searchInputRef = useRef(null);
    const suggestionsRef = useRef(null);

    // เมื่อคำค้นหาในคอนเท็กซต์เปลี่ยน อัพเดท state ในคอมโพเนนต์
    useEffect(() => {
        setSearchInputValue(searchTerm);
    }, [searchTerm, setSearchInputValue]);

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
    const handleSubmit = (e) => {
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

    // จัดการการกดปุ่ม Enter ในช่องค้นหา
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        } else if (e.key === 'ArrowDown' && showSuggestions && searchSuggestions.length > 0) {
            // ป้องกันเคอร์เซอร์เลื่อนใน input
            e.preventDefault();

            // โฟกัสไปที่รายการแรกใน suggestions
            const firstSuggestion = document.querySelector('.search-suggestion-item');
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
                const prevSuggestion = document.querySelector(`.search-suggestion-item:nth-child(${index})`);
                if (prevSuggestion) {
                    prevSuggestion.focus();
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            // โฟกัสไปที่รายการถัดไป
            const nextSuggestion = document.querySelector(`.search-suggestion-item:nth-child(${index + 2})`);
            if (nextSuggestion) {
                nextSuggestion.focus();
            }
        }
    };

    // ล้างคำค้นหา
    const handleClearSearch = () => {
        setSearchInputValue("");
        setSearchTerm("");
        setShowSuggestions(false);
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    // เปลี่ยนหมวดหมู่ที่เลือก
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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

    // ไฮไลท์คำที่ตรงกับคำค้นหา
    const highlightMatch = (text, searchInput) => {
        if (!searchInput.trim()) return text;

        const regex = new RegExp(`(${searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
        );
    };

    return (
        <div className="search-filter-container">
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search-input-wrapper">
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
                    </div>
                    <button
                        type="button"
                        className="filter-toggle-btn"
                        onClick={() => setShowFilters(!showFilters)}
                        aria-label="Toggle filters"
                    >
                        <IoFilterOutline />
                        {selectedCategory && <span className="filter-indicator"></span>}
                    </button>
                    <button type="submit" className="search-submit-btn">
                        ค้นหา
                    </button>
                </form>

                {/* Search Suggestions */}
                {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="search-suggestions" ref={suggestionsRef}>
                        {searchSuggestions.map((suggestion, index) => (
                            <button
                                key={`${suggestion.type}-${index}`}
                                className="search-suggestion-item"
                                onClick={() => selectSuggestion(suggestion)}
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

                    {(selectedCategory || searchTerm) && (
                        <button className="clear-filters-btn" onClick={clearFilters}>
                            ล้างตัวกรอง
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;