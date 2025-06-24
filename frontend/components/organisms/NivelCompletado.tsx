import { ChevronRight } from 'lucide-react';

interface LevelCompleteScreenProps {
  score: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
}

const NivelCompletado = ({ score, isLastLevel, onNextLevel }: LevelCompleteScreenProps) => {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-200">
        <div className="text-6xl mb-4">🎉🧠</div>
        <h2 className="text-4xl font-bold text-blue-600 mb-4">¡Nivel Completado!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Has relacionado correctamente los elementos en su conjunto correspondiente.
        </p>
        <div className="text-2xl font-bold text-green-600 mb-6">
          Puntuación del Nivel: {score} puntos
        </div>
        {!isLastLevel ? (
          <button
            onClick={onNextLevel}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2 mx-auto"
          >
            Siguiente Nivel
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <p className="text-lg text-gray-600">
            ¡Has completado todos los niveles disponibles!
          </p>
        )}
      </div>
    </div>
  );
};

export default NivelCompletado;