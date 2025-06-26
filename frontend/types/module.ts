import React from "react";

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: "drag-drop" | "selection" | "matching";
  difficulty: "easy" | "medium" | "hard";
  completed: boolean;
  stars: number;
}

export interface ModuleTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  videoBackground: string;
  headerGradient: string;
  progressGradient: string;
  shapes: string[];
  elements: React.ReactNode[];
}

export interface ModuleConfig {
  id: string;
  title: string;
  description: string;
  iconPath: string;
  videoTitle: string;
  videoDescription: string;
  activities: Activity[];
  theme: ModuleTheme;
  funFact: string;
}

export interface FloatingElement {
  id: number;
  x: number;
  y: number;
  element: React.ReactNode;
  color: string;
  size: string;
}

export interface ModuleTemplateProps {
  config: ModuleConfig;
  userStars?: number;
  userCoins?: number;
}