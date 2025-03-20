import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoFilterOutline } from 'react-icons/io5';
import { MdClear } from 'react-icons/md';
import './SearchBarStyle.css';
import { useSearchFilter } from '../../contexts/SearchContext';

function SearchBar() {
    const {
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        clearFilters
    } = useSearchFilter();

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [showFilters, setShowFilters] = useState(false);

    // เมื่อคำค้นหาในคอนเท็กซต์เปลี่ยน อัพเดท state ในคอมโพเนนต์
    useEffect(() => {
        setLocalSearchTerm(searchTerm);
    }, [searchTerm]);

    // จัดการการส่งคำค้นหา
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(localSearchTerm);
    };

    // จัดการการเปลี่ยนแปลงในช่องค้นหา
    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    // จัดการการกดปุ่ม Enter ในช่องค้นหา
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setSearchTerm(localSearchTerm);
        }
    };

    // ล้างคำค้นหา
    const handleClearSearch = () => {
        setLocalSearchTerm("");
        setSearchTerm("");
    };

    // เปลี่ยนหมวดหมู่ที่เลือก
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="search-filter-container">
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search-input-wrapper">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="ค้นหากิจกรรม..."
                            value={localSearchTerm}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                        />
                        {localSearchTerm && (
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
                </form>
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