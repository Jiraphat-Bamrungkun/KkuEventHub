import { createContext, useState, useEffect } from 'react';
import { fetchEvents } from '../api';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // โค้ดการโหลดข้อมูล...

    return (
        <EventContext.Provider value={{ events, loading, error }}>
            {children}
        </EventContext.Provider>
    );
};