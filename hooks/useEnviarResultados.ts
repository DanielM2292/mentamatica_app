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
  console.log("Entra a la funcion")
  useEffect(() => {
    console.log("Entra al useEfect")
    const enviarResultados = async () => {
      console.log("Entra al end")
      const usuario_id = user?.id;
      const actividad = window.location.pathname.split('/').pop();
      const intentos = aciertos + errores;

      try {
        const res = await fetch(`/api/juegos`, {
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
      console.log("Estra a la validacion antes de ejecutar el envio ")
      detener();
      enviarResultados();
    }
  }, [isGameComplete, tiempoFinal]);
};
