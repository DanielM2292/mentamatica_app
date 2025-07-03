import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilidades para efectos de sonido
export const playSoundEffect = (type: "correct" | "wrong" | "celebration") => {
  if (typeof window !== "undefined") {
    const soundId = `${type}-sound`
    // @ts-ignore
    if (window.playSound) window.playSound(soundId)
  }
}

// Utilidades para animaciones matemáticas
export const getRandomMathProblem = (
  operation: "suma" | "resta" | "multiplicacion" | "division",
  difficulty: 1 | 2 | 3,
) => {
  let a: number, b: number, result: number

  switch (operation) {
    case "suma":
      a =
        difficulty === 1
          ? Math.floor(Math.random() * 10)
          : difficulty === 2
            ? Math.floor(Math.random() * 50)
            : Math.floor(Math.random() * 100)
      b =
        difficulty === 1
          ? Math.floor(Math.random() * 10)
          : difficulty === 2
            ? Math.floor(Math.random() * 50)
            : Math.floor(Math.random() * 100)
      result = a + b
      return { a, b, result, symbol: "+", text: `${a} + ${b} = ${result}` }

    case "resta":
      b =
        difficulty === 1
          ? Math.floor(Math.random() * 10)
          : difficulty === 2
            ? Math.floor(Math.random() * 50)
            : Math.floor(Math.random() * 100)
      a =
        difficulty === 1
          ? b + Math.floor(Math.random() * 10)
          : difficulty === 2
            ? b + Math.floor(Math.random() * 50)
            : b + Math.floor(Math.random() * 100)
      result = a - b
      return { a, b, result, symbol: "-", text: `${a} - ${b} = ${result}` }

    case "multiplicacion":
      a =
        difficulty === 1
          ? Math.floor(Math.random() * 5) + 1
          : difficulty === 2
            ? Math.floor(Math.random() * 10) + 1
            : Math.floor(Math.random() * 12) + 1
      b =
        difficulty === 1
          ? Math.floor(Math.random() * 5) + 1
          : difficulty === 2
            ? Math.floor(Math.random() * 10) + 1
            : Math.floor(Math.random() * 12) + 1
      result = a * b
      return { a, b, result, symbol: "×", text: `${a} × ${b} = ${result}` }

    case "division":
      b =
        difficulty === 1
          ? Math.floor(Math.random() * 5) + 1
          : difficulty === 2
            ? Math.floor(Math.random() * 10) + 1
            : Math.floor(Math.random() * 12) + 1
      result =
        difficulty === 1
          ? Math.floor(Math.random() * 5) + 1
          : difficulty === 2
            ? Math.floor(Math.random() * 10) + 1
            : Math.floor(Math.random() * 12) + 1
      a = b * result
      return { a, b, result, symbol: "÷", text: `${a} ÷ ${b} = ${result}` }
  }
}

// Utilidades para gamificación
export const calculateStars = (score: number, maxScore: number): number => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 90) return 5
  if (percentage >= 75) return 4
  if (percentage >= 60) return 3
  if (percentage >= 40) return 2
  return 1
}

// Utilidades para accesibilidad
export const generateAriaLabel = (text: string): string => {
  return text.replace(/[+\-×÷=]/g, (match) => {
    switch (match) {
      case "+":
        return " más "
      case "-":
        return " menos "
      case "×":
        return " por "
      case "÷":
        return " dividido entre "
      case "=":
        return " igual a "
      default:
        return match
    }
  })
}