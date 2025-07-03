import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Trophy, Clock } from 'lucide-react';
import Button from '../atoms/Button';

const LevelPage: React.FC = () => {
  const { moduleId, levelId } = useParams<{ moduleId: string; levelId: string }>();
  const navigate = useNavigate();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleBack = () => {
    navigate(`/modules/${moduleId}`);
  };

  const handleComplete = () => {
    setIsActive(false);
    setTimeout(() => {
      navigate(`/modules/${moduleId}`);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              icon={ArrowLeft}
            >
              Volver
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {moduleId?.toUpperCase()} - Nivel {levelId}
              </h1>
              <p className="text-sm text-gray-600">Actividad en progreso</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-800 font-medium">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((star) => (
                <Star key={star} className="w-5 h-5 text-gray-300" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[500px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Actividad del Nivel {levelId}
            </h2>
            <p className="text-gray-600 mb-8">
              Aquí irá el contenido interactivo específico para {moduleId}
            </p>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-12 mb-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Contenido Interactivo
                </h3>
                <p className="text-gray-600 mb-6">
                  Aquí se desarrollarán las actividades específicas para cada módulo
                </p>
                <Button
                  onClick={handleComplete}
                  variant="primary"
                  size="lg"
                >
                  Completar Actividad
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              Tiempo transcurrido: {formatTime(timeElapsed)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelPage;