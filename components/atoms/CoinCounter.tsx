import React from 'react';
import { Star } from 'lucide-react';

interface CoinCounterProps {
  count: number;
  className?: string;
}

export const CoinCounter: React.FC<CoinCounterProps> = ({
  count,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full ${className}`}>
      <span className="text-yellow-600 font-bold text-sm">TUS MONEDAS:</span>
      <Star className="w-5 h-5 text-yellow-500" />
      <span className="font-bold text-yellow-700 text-lg">{count}</span>
    </div>
  );
};