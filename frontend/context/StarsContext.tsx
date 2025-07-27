// contexts/StarsContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, useMemo, useCallback, useRef } from 'react';

interface StarsContextType {
    starsData: Record<string, number>;
    updateStars: (activityId: string, stars: number) => void;
    getAverage: () => number;
}

const StarsContext = createContext<StarsContextType | undefined>(undefined);

export const StarsProvider = ({ children }: { children: ReactNode }) => {
    const [starsData, setStarsData] = useState<Record<string, number>>({});
    const lastUpdateRef = useRef<Record<string, number>>({});

    const updateStars = useCallback((activityId: string, stars: number) => {
        setStarsData(prev => {
            if (prev[activityId] === stars) return prev;

            lastUpdateRef.current[activityId] = Date.now();

            return { ...prev, [activityId]: stars };
        });
    }, []);

    const getAverage = useCallback(() => {
        const values = Object.values(starsData);
        if (values.length === 0) return 0;
        const sum = values.reduce((a, b) => a + b, 0);
        return parseFloat((sum / values.length).toFixed(1));
    }, [starsData]);

    const value = useMemo(() => ({
        starsData,
        updateStars,
        getAverage
    }), [starsData, updateStars, getAverage]);

    return (
        <StarsContext.Provider value={value}>
            {children}
        </StarsContext.Provider>
    );
};

export const useStars = () => {
    const context = useContext(StarsContext);
    if (!context) {
        throw new Error('useStars must be used within a StarsProvider');
    }
    return context;
};