import { Pencil, Shirt, Trophy, Turtle, Plane, Webhook } from 'lucide-react';

export interface GameItem {
  id: string;
  name: string;
  category: string[];
  icon: string;
  color: string;
}

export interface GameSet {
  id: string;
  name: string;
  color: string;
  icon: any;
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
      { id: '1', name: 'Regla', category: ['escolar'], icon: "/data/conjuntos/icons/unionInterseccion/escolar1.png", color: 'bg-purple-100' },
      { id: '2', name: 'Buzo', category: ['ropa'], icon: "/data/conjuntos/icons/unionInterseccion/ropa1.png", color: 'bg-blue-100' },
      { id: '3', name: 'Medias', category: ['ropa'], icon: "/data/conjuntos/icons/unionInterseccion/ropa2.png", color: 'bg-red-100' },
      { id: '4', name: 'Pelota Tenis', category: ['deportes'], icon: "/data/conjuntos/icons/unionInterseccion/deporte1.png", color: 'bg-red-100' },
      { id: '5', name: 'Temperas', category: ['escolar'], icon: "/data/conjuntos/icons/unionInterseccion/escolar2.png", color: 'bg-red-100' },
      { id: '6', name: 'Balon Futbol', category: ['deportes'], icon: "/data/conjuntos/icons/unionInterseccion/deporte2.png", color: 'bg-purple-100' },
      { id: '7', name: 'Ciclismo', category: ['deportes'], icon: "/data/conjuntos/icons/unionInterseccion/deporte3.png", color: 'bg-blue-100' },
      { id: '8', name: 'Tijeras', category: ['escolar'], icon: "/data/conjuntos/icons/unionInterseccion/escolar3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Zapatillas', category: ['ropa'], icon: "/data/conjuntos/icons/unionInterseccion/ropa3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'escolar', 
        name: 'Objetos Escolares', 
        color: 'border-blue-400 bg-blue-50', 
        icon: Pencil
      },
      { 
        id: 'ropa', 
        name: 'Prendas Vestir', 
        color: 'border-green-400 bg-green-50', 
        icon: Shirt
      },
      { 
        id: 'deportes', 
        name: 'Deportes', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Trophy
      },
    ]
  },
  {
    id: 2,
    title: "La intersección",
    description: "Relaciona los elementos que comparten caracteristicas iguales",
    items: [
      { id: '10', name: 'Perro', category: ['animal'], icon: "/data/conjuntos/icons/unionInterseccion/animal1.png", color: 'bg-red-100' },
      { id: '11', name: 'Avión', category: ['vuela'], icon: "/data/conjuntos/icons/unionInterseccion/vuela1.png", color: 'bg-red-100' },
      { id: '12', name: 'Pájaro', category: ['animal', 'vuela'], icon: "/data/conjuntos/icons/unionInterseccion/animal2.png", color: 'bg-red-100' },
      { id: '13', name: 'Globo', category: ['vuela'], icon: "/data/conjuntos/icons/unionInterseccion/vuela2.png", color: 'bg-orange-100' },
      { id: '14', name: 'Águila', category: ['vuela', 'animal'], icon: "/data/conjuntos/icons/unionInterseccion/vuela3.png", color: 'bg-orange-100' },
      { id: '15', name: 'Serpiente', category: ['animal'], icon: "/data/conjuntos/icons/unionInterseccion/animal3.png", color: 'bg-orange-100' },
      { id: '16', name: 'Helicóptero', category: ['vuela'], icon: "/data/conjuntos/icons/unionInterseccion/vuela4.png", color: 'bg-yellow-100' },
      { id: '17', name: 'Conejo', category: ['animal'], icon: "/data/conjuntos/icons/unionInterseccion/animal4.png", color: 'bg-yellow-100' },
      { id: '18', name: 'Tucán', category: ['vuela', 'animal'], icon: "/data/conjuntos/icons/unionInterseccion/vuela5.png", color: 'bg-yellow-100' },
    ],
    sets: [
      { 
        id: 'animal', 
        name: 'Animales', 
        color: 'border-red-400 bg-red-50', 
        icon: Turtle
      },
      { 
        id: 'vuela', 
        name: 'Vuelan', 
        color: 'border-orange-400 bg-orange-50', 
        icon: Plane
      },
      { 
        id: 'interseccion', 
        name: 'Ambos', 
        color: 'border-yellow-400 bg-yellow-50', 
        icon: Webhook
      },
    ]
  },
];
