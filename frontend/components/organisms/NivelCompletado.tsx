import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import EstrellasCanvas from '../molecules/EstrellasCanvas';

interface LevelCompleteScreenProps {
  aciertos: number;
  isLastLevel: boolean;
  onNextLevel: () => void;
}

const NivelCompletado = ({ aciertos, isLastLevel, onNextLevel }: LevelCompleteScreenProps) => {
  return (
    <div className="text-center py-16">
      <EstrellasCanvas />
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-blue-200">
        <div className="text-6xl mb-4">🎉🧠</div>
        <h2 className="text-4xl font-bold text-blue-600 mb-4">¡Nivel Completado!</h2>
        <p className="text-xl text-gray-600 mb-6">
          Has relacionado correctamente los elementos en su conjunto correspondiente.
        </p>
        <div className="text-2xl font-bold text-green-600 mb-6">
          Puntuación del Nivel: {aciertos} puntos
        </div>
        {!isLastLevel ? (
          <button
            onClick={onNextLevel}
            className={clsx(
              "bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full",
              "flex items-center justify-center gap-2 mx-auto",
              "transition-transform duration-300 ease-in-out",
              "shadow-md hover:shadow-lg",
              "hover:scale-105",
              "ring-2 ring-white ring-offset-2"
            )}
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