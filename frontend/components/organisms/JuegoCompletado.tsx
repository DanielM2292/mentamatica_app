import { Trophy } from 'lucide-react';

interface GameCompleteScreenProps {
  totalScore: number;
  score: number;
  onRestart: () => void;
}

const JuegoCompletado = ({ totalScore, score, onRestart }: GameCompleteScreenProps) => {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-200">
        <div className="text-6xl mb-4">🏆🧠✨</div>
        <h2 className="text-4xl font-bold text-green-600 mb-4">¡Felicitaciones!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Has completado todos los niveles del juego Clasifica y Agrupa
        </p>
        <div className="text-3xl font-bold text-blue-600 mb-6">
          Puntuación Total: {totalScore + score} puntos
        </div>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 mx-auto"
        >
          <Trophy className="w-5 h-5" />
          Jugar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default JuegoCompletado;