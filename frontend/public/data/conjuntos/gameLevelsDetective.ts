import { Pencil, Shirt, Trophy, Turtle, Plane, Webhook } from 'lucide-react';

export interface GameItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface GameSet {
  id: string;
  name: string;
  color: string;
  icon: any;
  clue?: GameItem;
}

export interface GameLevel {
  id: number;
  title: string;
  description: string;
  items: GameItem[];
  sets: GameSet[];
}

export const gameLevels: GameLevel[] = [
  {
    id: 1,
    title: "La Union",
    description: "Relaciona los elementos segun correspondan",
    items: [
      { id: '2', name: 'Buzo', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa1.png", color: 'bg-blue-100' },
      { id: '3', name: 'Medias', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa2.png", color: 'bg-red-100' },
      { id: '4', name: 'Pelota Tenis', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte1.png", color: 'bg-red-100' },
      { id: '5', name: 'Temperas', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar2.png", color: 'bg-red-100' },
      { id: '6', name: 'Balon Futbol', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte2.png", color: 'bg-purple-100' },
      { id: '7', name: 'Ciclismo', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte3.png", color: 'bg-blue-100' },
      { id: '8', name: 'Tijeras', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Zapatillas', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'escolar', 
        name: 'Objetos Escolares', 
        color: 'border-blue-400 bg-blue-50', 
        icon: Pencil,
        clue: { id: '1', name: 'Regla', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar1.png", color: 'bg-purple-100' }
      },
      { 
        id: 'ropa', 
        name: 'Prendas Vestir', 
        color: 'border-green-400 bg-green-50', 
        icon: Shirt,
        clue: { id: 'ropa-clue', name: 'Bufanda', category: 'ropa', icon: "/data/conjuntos/icons/detectiveConjuntos/ropa0.png", color: 'bg-green-100' }
      },
      { 
        id: 'deportes', 
        name: 'Deportes', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Trophy,
        clue: { id: 'deportes-clue', name: 'Ping Pong', category: 'deportes', icon: "/data/conjuntos/icons/detectiveConjuntos/deporte0.png", color: 'bg-purple-100' }
      },
    ]
  },
  {
    id: 2,
    title: "La Union",
    description: "Relaciona los elementos segun correspondan",
    items: [
      { id: '2', name: 'Buzo', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa1.png", color: 'bg-blue-100' },
      { id: '3', name: 'Medias', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa2.png", color: 'bg-red-100' },
      { id: '4', name: 'Pelota Tenis', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte1.png", color: 'bg-red-100' },
      { id: '5', name: 'Temperas', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar2.png", color: 'bg-red-100' },
      { id: '6', name: 'Balon Futbol', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte2.png", color: 'bg-purple-100' },
      { id: '7', name: 'Ciclismo', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte3.png", color: 'bg-blue-100' },
      { id: '8', name: 'Tijeras', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Zapatillas', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'escolar', 
        name: 'Objetos Escolares', 
        color: 'border-blue-400 bg-blue-50', 
        icon: Pencil,
        clue: { id: '1', name: 'Regla', category: 'escolar', icon: "/data/conjuntos/icons/unionInterseccion/escolar1.png", color: 'bg-purple-100' }
      },
      { 
        id: 'ropa', 
        name: 'Prendas Vestir', 
        color: 'border-green-400 bg-green-50', 
        icon: Shirt,
        clue: { id: 'ropa-clue', name: 'Pantalón', category: 'ropa', icon: "/data/conjuntos/icons/unionInterseccion/ropa0.png", color: 'bg-green-100' }
      },
      { 
        id: 'deportes', 
        name: 'Deportes', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Trophy,
        clue: { id: 'deportes-clue', name: 'Raqueta', category: 'deportes', icon: "/data/conjuntos/icons/unionInterseccion/deporte0.png", color: 'bg-purple-100' }
      },
    ]
  },
];