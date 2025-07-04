import type { GameLevel } from "../../../types/game"

export const numeroCorrectoLevels: GameLevel[] = [
  {
    id: 1,
    name: "Números del 1 al 10",
    description: "Explota los globos del 1 al 10 en orden",
    maxNumber: 10,
    balloonCount: 10,
    timeLimit: 60,
    pointsToWin: 100,
    sets: [
      {
        id: 1,
        name: "Nivel 1",
        description: "Números del 1 al 10",
        items: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          isCorrect: false,
        })),
      },
    ],
  },
  {
    id: 2,
    name: "Números del 1 al 15",
    description: "Explota los globos del 1 al 15 en orden",
    maxNumber: 15,
    balloonCount: 15,
    timeLimit: 90,
    pointsToWin: 150,
    sets: [
      {
        id: 1,
        name: "Nivel 2",
        description: "Números del 1 al 15",
        items: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          isCorrect: false,
        })),
      },
    ],
  },
  {
    id: 3,
    name: "Números del 1 al 20",
    description: "Explota los globos del 1 al 20 en orden",
    maxNumber: 20,
    balloonCount: 20,
    timeLimit: 120,
    pointsToWin: 200,
    sets: [
      {
        id: 1,
        name: "Nivel 3",
        description: "Números del 1 al 20",
        items: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          number: i + 1,
          isCorrect: false,
        })),
      },
    ],
  },
]

export const balloonColors = [
  "#FF6B6B", // Rojo coral
  "#4ECDC4", // Turquesa
  "#45B7D1", // Azul cielo
  "#96CEB4", // Verde menta
  "#FFEAA7", // Amarillo suave
  "#DDA0DD", // Violeta claro
  "#FFB6C1", // Rosa claro
  "#FFA07A", // Salmón
  "#98FB98", // Verde claro
  "#87CEEB", // Azul cielo claro
]
