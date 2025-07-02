import { useTimer } from "@/context/timer-context";

interface FloatingTimerProps {
  formato?: "minutos" | "completo";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function TiempoJuego({
  formato = "minutos",
  position = "bottom-right",
}: FloatingTimerProps) {
  const { tiempo } = useTimer();

  const minutos = Math.floor(tiempo / 60);
  const restoSegundos = tiempo % 60;
  const tiempoTexto =
    formato === "minutos"
      ? `${minutos}:${restoSegundos.toString().padStart(2, "0")}`
      : `${tiempo} s`;

  const positionStyles: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div
      className={`fixed z-50 ${positionStyles[position]} bg-gradient-to-r from-amber-200 to-rose-200 shadow-lg border border-white text-pink-700 text-lg sm:text-xl rounded-full px-4 py-2 font-bold font-mono animate-fade-in-down`}
      style={{
        boxShadow: "0 0 10px #fbbf24",
        border: "2px dashed #f43f5e",
        transition: "all 0.3s ease",
      }}
    >
      <span role="img" aria-label="reloj">⏰</span> Tiempo: {tiempoTexto}
    </div>
  );
}
