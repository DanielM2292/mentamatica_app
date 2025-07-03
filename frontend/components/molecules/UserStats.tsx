import React from 'react';
import { Star, Trophy, Clock, Brain } from 'lucide-react';

interface UserStatsType {
  name: string;
  totalStars: number;
  streak: number;
  timeSpent: number;
  level: number;
}

interface UserStatsProps {
  userStats: UserStatsType;
}

const UserStats: React.FC<UserStatsProps> = ({ userStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Estrellas</p>
            <p className="text-2xl font-bold text-gray-800">
              {userStats.totalStars}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Racha</p>
            <p className="text-2xl font-bold text-gray-800">
              {userStats.streak} días
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Tiempo</p>
            <p className="text-2xl font-bold text-gray-800">
              {userStats.timeSpent}min
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Nivel</p>
            <p className="text-2xl font-bold text-gray-800">
              {userStats.level}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;