export interface GameLevel {
  id: number;
  name: string;
  description: string;
  maxNumber: number;
  balloonCount: number;
  timeLimit: number;
  pointsToWin: number;
  sets: Array<{
    id: number;
    name: string;
    description: string;
    items: Array<{
      id: number;
      number: number;
      isCorrect: boolean;
    }>;
  }>;
}

export interface Balloon {
  id: string;
  number: number;
  x: number;
  y: number;
  color: string;
  isPopped: boolean;
  isClickable: boolean;
}

export interface GameState {
  currentLevel: number;
  score: number;
  timeLeft: number;
  balloons: Balloon[];
  nextExpectedNumber: number;
  isGameActive: boolean;
  isGameCompleted: boolean;
  stars: number;
  mistakes: number;
}