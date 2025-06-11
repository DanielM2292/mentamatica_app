import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Button from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { CoinCounter } from '../atoms/CoinCounter';

interface ModuleHeaderProps {
  moduleName: string;
  moduleIcon: string;
  moduleColor: string;
  coins: number;
  onBack: () => void;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  moduleName,
  moduleIcon,
  moduleColor,
  coins,
  onBack
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-gray-200/50 p-6">
      <div className="flex items-center justify-between">
        {/* Left side - Back button and module info */}
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            icon={ArrowLeft}
            className="text-gray-600 hover:text-gray-800"
          >
            Volver
          </Button>
          
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${moduleColor}20` }}
            >
              <Icon src={moduleIcon} alt={moduleName} size="lg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{moduleName}</h1>
              <p className="text-sm text-gray-600">
                Mientras más niveles completes y lo logres con 3 estrellas obtendrás más monedas
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Coins */}
        <CoinCounter count={coins} />
      </div>
    </div>
  );
};

export default ModuleHeader