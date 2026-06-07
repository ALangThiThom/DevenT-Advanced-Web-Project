import React, { createContext, useState, useContext, useMemo } from 'react';

const EventFilterContext = createContext();

export const useEventFilters = () => {
    const context = useContext(EventFilterContext);
    if (!context) {
        throw new Error('useEventFilters must be used within an EventFilterProvider');
    }
    return context;
};

export const EventFilterProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [categoryId, setCategoryId] = useState('');

    // Debounce search term
    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);
    
    const value = useMemo(() => ({
        searchTerm,
        setSearchTerm,
        debouncedSearchTerm,
        categoryId,
        setCategoryId
    }), [searchTerm, debouncedSearchTerm, categoryId]);

    return (
        <EventFilterContext.Provider value={value}>
            {children}
        </EventFilterContext.Provider>
    );
};
