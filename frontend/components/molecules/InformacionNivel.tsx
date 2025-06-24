import { GameLevel } from "@/public/data/conjuntos/gameLevels";

interface LevelInfoProps {
  currentLevel: number;
  gameLevel: GameLevel;
}

const InformacionNivel = ({ currentLevel, gameLevel }: LevelInfoProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Nivel {currentLevel + 1}: {gameLevel.title}
          </h2>
          <p className="text-gray-600">
            {gameLevel.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformacionNivel;