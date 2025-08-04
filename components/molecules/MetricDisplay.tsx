"use client"

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useStars } from '@/context/StarsContext';

const MetricDisplay = () => {
    const { getAverage } = useStars();
    const [average, setAverage] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAverage(getAverage());
        }, 100);
        return () => clearTimeout(timer);
    }, [getAverage]);

  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-yellow-100 px-2 sm:px-4 py-1 sm:py-2 rounded-full hover:bg-yellow-200 transition-colors duration-300">
      <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500 animate-pulse" />
      <span className="font-bold text-yellow-700 text-xs sm:text-base">
        {average.toFixed(1)}
      </span>
    </div>
  );
};

export default MetricDisplay;