import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { fetchEvents } from '../api';

// สร้าง Context
const SearchFilterContext = createContext();

// Provider Component สำหรับจัดการสถานะการค้นหาและกรอง
export function SearchFilterProvider({ children }) {
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchInputValue, setSearchInputValue] = useState(""); // เพิ่มสถานะใหม่สำหรับค่าที่กำลังพิมพ์
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false); // ควบคุมการแสดง suggestions
    

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

    // สร้าง search suggestions จากคำที่กำลังพิมพ์
    const searchSuggestions = useMemo(() => {
        if (!searchInputValue.trim() || searchInputValue.length < 2) return [];

        const term = searchInputValue.toLowerCase();
        const titleMatches = new Set();
        const locationMatches = new Set();
        const organizerMatches = new Set();

        // ค้นหา suggestions จากชื่อกิจกรรม
        allEvents.forEach(event => {
            if (event.title && event.title.toLowerCase().includes(term)) {
                titleMatches.add(event.title);
            }

            // ค้นหา suggestions จากสถานที่
            if (event.location && event.location.toLowerCase().includes(term)) {
                locationMatches.add(event.location);
            }

            // ค้นหา suggestions จากผู้จัด
            if (event.organizer && event.organizer.toLowerCase().includes(term)) {
                organizerMatches.add(event.organizer);
            }
        });

        // รวม suggestions ทั้งหมด
        const suggestions = [
            ...Array.from(titleMatches).map(title => ({ type: 'title', value: title })),
            ...Array.from(locationMatches).map(location => ({ type: 'location', value: location })),
            ...Array.from(organizerMatches).map(organizer => ({ type: 'organizer', value: organizer }))
        ];

        // จำกัดจำนวน suggestions และเรียงลำดับตามความเกี่ยวข้อง
        return suggestions
            .sort((a, b) => {
                // ให้ความสำคัญกับ suggestions ที่ขึ้นต้นด้วยคำค้นหา
                const aStartsWith = a.value.toLowerCase().startsWith(term);
                const bStartsWith = b.value.toLowerCase().startsWith(term);

                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;

                // ให้ความสำคัญกับชื่อกิจกรรมมากกว่าสถานที่และผู้จัด
                if (a.type === 'title' && b.type !== 'title') return -1;
                if (a.type !== 'title' && b.type === 'title') return 1;

                // เรียงตามตัวอักษร
                return a.value.localeCompare(b.value);
            })
            .slice(0, 7); // แสดงไม่เกิน 7 suggestions
    }, [searchInputValue, allEvents]);

    // ฟังก์ชันสำหรับล้างตัวกรอง
    const clearFilters = () => {
        setSearchTerm("");
        setSearchInputValue("");
        setSelectedCategory("");
    };

    // ฟังก์ชันสำหรับเลือก suggestion
    const selectSuggestion = (suggestion) => {
        setSearchInputValue(suggestion.value);
        setSearchTerm(suggestion.value);
        setShowSuggestions(false);
    };

    // ส่งค่าผ่าน Context Provider
    return (
        <SearchFilterContext.Provider
            value={{
                allEvents,
                filteredEvents,
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