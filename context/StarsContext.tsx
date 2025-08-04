"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface StarsContextType {
  starsData: Record<string, number>;
  updateStars: (activityId: string, stars: number) => void;
  getAverage: () => number;
  getSum: () => number;
  getActivityStars: (activityId: string) => number | null;
}

const StarsContext = createContext<StarsContextType | undefined>(undefined);

export const StarsProvider = ({ 
  children, 
  initialData = {} 
}: { 
  children: ReactNode; 
  initialData?: Record<string, number> 
}) => {
  const [starsData, setStarsData] = useState<Record<string, number>>(initialData);

  const updateStars = useCallback((activityId: string, stars: number) => {
    setStarsData(prev => {
      if (prev[activityId] === stars) return prev;
      
      console.log(`Updating ${activityId} to ${stars} stars`);
      return { ...prev, [activityId]: stars };
    });
  }, []);

  const getSum = useCallback(() => {
    return Object.values(starsData).reduce((a, b) => a + b, 0);
  }, [starsData]);

  const getAverage = useCallback(() => {
    const values = Object.values(starsData);
    if (values.length === 0) return 0;
    const sum = getSum();
    return parseFloat((sum / values.length).toFixed(1));
  }, [starsData, getSum]);

  const getActivityStars = useCallback((activityId: string) => {
    return starsData[activityId] ?? null;
  }, [starsData]);

  const value = useMemo(() => ({
    starsData,
    updateStars,
    getAverage,
    getSum,
    getActivityStars
  }), [starsData, updateStars, getAverage, getSum, getActivityStars]);

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