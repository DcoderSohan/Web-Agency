import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Default to dark theme for this specific project as it was designed in dark mode initially
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // Optional: Sync with local storage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('pixelora_theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('pixelora_theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
