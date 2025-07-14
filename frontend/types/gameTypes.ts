export interface UnifiedGameItem {
  id: string;
  name: string;
  category: string | string[];
  icon: string;
  color: string;
}

export interface UnifiedGameSet {
  clue: UnifiedGameItem | any;
  id: string;
  name: string;
  color: string;
  icon: any;
}

export interface UnifiedGameLevel {
  id: number;
  title: string;
  description: string;
  items: UnifiedGameItem[];
  sets: UnifiedGameSet[];
}
