// hooks/useEnviarResultados.ts
import { useEffect } from 'react';

interface ResultadosParams {
  user: { id?: string };
  aciertos: number;
  errores: number;
  estrellas: number;
  tiempo: number;
  isGameComplete: boolean;
  tiempoFinal: number | null;
  detener: () => void;
  setTiempoFinal: (tiempo: number) => void;
}

export const useEnviarResultados = ({
  user,
  aciertos,
  errores,
  estrellas,
  tiempo,
  isGameComplete,
  tiempoFinal,
  detener,
  setTiempoFinal,
}: ResultadosParams) => {
  useEffect(() => {
    const enviarResultados = async () => {
      const usuario_id = user?.id;
      const actividad = window.location.pathname.split('/').pop();
      const intentos = aciertos + errores;

      try {
        const res = await fetch(`http://localhost:3001/api/conjuntos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario_id, actividad, estrellas, intentos, errores, tiempo }),
        });

        if (!res.ok) throw new Error('Error al guardar resultados');
        setTiempoFinal(tiempo);
      } catch (error) {
        console.error('Error al guardar resultados:', error);
      }
    };

    if (isGameComplete && tiempoFinal === null) {
      detener();
      enviarResultados();
    }
  }, [isGameComplete, tiempoFinal]);
};
