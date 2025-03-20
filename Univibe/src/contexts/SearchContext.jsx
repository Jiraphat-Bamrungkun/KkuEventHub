import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchEvents } from '../api';

// สร้าง Context
const SearchFilterContext = createContext();

// Provider Component สำหรับจัดการสถานะการค้นหาและกรอง
export function SearchFilterProvider({ children }) {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ดึงข้อมูลกิจกรรมทั้งหมดเมื่อ component โหลด
    useEffect(() => {
        const loadEvents = async () => {
            try {
                setLoading(true);
                const events = await fetchEvents();
                setAllEvents(events);
                setFilteredEvents(events);

                // ดึงหมวดหมู่ที่มีทั้งหมด
                const uniqueCategories = [...new Set(events.map(event => event.category).filter(Boolean))];
                setCategories(uniqueCategories);

                setError(null);
            } catch (err) {
                console.error("Error loading events for search:", err);
                setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    // กรองกิจกรรมเมื่อมีการเปลี่ยนแปลงคำค้นหาหรือหมวดหมู่
    useEffect(() => {
        const filterEvents = () => {
            let results = [...allEvents];

            // กรองตามคำค้นหา
            if (searchTerm.trim() !== "") {
                const term = searchTerm.toLowerCase();
                results = results.filter(event =>
                    (event.title && event.title.toLowerCase().includes(term)) ||
                    (event.description && event.description.toLowerCase().includes(term)) ||
                    (event.location && event.location.toLowerCase().includes(term)) ||
                    (event.organizer && event.organizer.toLowerCase().includes(term))
                );
            }

            // กรองตามหมวดหมู่
            if (selectedCategory !== "") {
                results = results.filter(event => event.category === selectedCategory);
            }

            setFilteredEvents(results);
        };

        filterEvents();
    }, [searchTerm, selectedCategory, allEvents]);

    // ฟังก์ชันสำหรับล้างตัวกรอง
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
    };

    // ส่งค่าผ่าน Context Provider
    return (
        <SearchFilterContext.Provider
            value={{
                allEvents,
                filteredEvents,
                searchTerm,
                setSearchTerm,
                selectedCategory,
                setSelectedCategory,
                categories,
                loading,
                error,
                clearFilters
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    );
}

// Hook สำหรับเข้าถึง Context
export function useSearchFilter() {
    return useContext(SearchFilterContext);
}