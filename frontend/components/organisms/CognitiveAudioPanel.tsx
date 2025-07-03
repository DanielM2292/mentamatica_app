import React from 'react';
import { Brain, Play, Pause } from 'lucide-react';
import Button from '../atoms/Button';

interface CognitiveaAudio {
  id: string;
  title: string;
  description: string;
  category: 'motivacion' | 'concentracion' | 'relajacion' | 'celebracion';
  duration: string;
  audioUrl: string;
}

interface CognitiveAudioPanelProps {
  isOpen: boolean;
  onClose: () => void;
  audios: CognitiveaAudio[];
  currentAudio: string | null;
  isPlaying: boolean;
  onPlayAudio: (audioId: string) => void;
  onStopAudio: () => void;
}

const CognitiveAudioPanel: React.FC<CognitiveAudioPanelProps> = ({
  isOpen,
  onClose,
  audios,
  currentAudio,
  isPlaying,
  onPlayAudio,
  onStopAudio
}) => {
  return (
    <div className={`fixed right-4 bottom-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 p-4 z-50 transition-all duration-300 ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Estimulación Cognitiva
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-2 max-w-xs">
        {audios.map((audio) => (
          <div key={audio.id} className={`p-3 rounded-xl border transition-all duration-200 ${currentAudio === audio.id ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-800">{audio.title}</h4>
                <p className="text-xs text-gray-600 mb-1">{audio.description}</p>
                <span className="text-xs text-purple-600 font-medium">{audio.duration}</span>
              </div>
              <button
                onClick={() => currentAudio === audio.id ? onStopAudio() : onPlayAudio(audio.id)}
                className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${currentAudio === audio.id ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
              >
                {currentAudio === audio.id && isPlaying ? 
                  <Pause className="w-4 h-4" /> : 
                  <Play className="w-4 h-4" />
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl">
        <p className="text-xs text-blue-800">
          <strong>💡 Neurociencia:</strong> Estos audios están diseñados para optimizar el aprendizaje mediante técnicas de neuroplasticidad y regulación emocional.
        </p>
      </div>
    </div>
  );
};

export default CognitiveAudioPanel;