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
// emociones rutinas diarias tecnologia 
export const gameLevels: GameLevel[] = [
  {
    id: 1,
    title: "Relacionar los elementos",
    description: "Observa la pista y agrupa los elementos que hacen falta",
    items: [
      { id: '2', name: 'Sorpresa', category: 'emocion', icon: "/data/conjuntos/icons/detectiveConjuntos/emocion1.png", color: 'bg-blue-100' },
      { id: '3', name: 'Despertarse', category: 'rutina', icon: "/data/conjuntos/icons/detectiveConjuntos/rutina1.png", color: 'bg-red-100' },
      { id: '4', name: 'Celular', category: 'tecnologia', icon: "/data/conjuntos/icons/detectiveConjuntos/tecnologia1.png", color: 'bg-red-100' },
      { id: '5', name: 'Computador', category: 'tecnologia', icon: "/data/conjuntos/icons/detectiveConjuntos/tecnologia2.png", color: 'bg-red-100' },
      { id: '6', name: 'Tristeza', category: 'emocion', icon: "/data/conjuntos/icons/detectiveConjuntos/emocion2.png", color: 'bg-purple-100' },
      { id: '7', name: 'Estudiar', category: 'rutina', icon: "/data/conjuntos/icons/detectiveConjuntos/rutina2.png", color: 'bg-blue-100' },
      { id: '8', name: 'Audifonos', category: 'tecnologia', icon: "/data/conjuntos/icons/detectiveConjuntos/tecnologia3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Rabia', category: 'emocion', icon: "/data/conjuntos/icons/detectiveConjuntos/emocion3.png", color: 'bg-blue-100' },
      { id: '10', name: 'Caminar', category: 'rutina', icon: "/data/conjuntos/icons/detectiveConjuntos/rutina3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'emocion', 
        name: 'Emociones', 
        color: 'border-blue-400 bg-blue-50', 
        icon: Pencil,
        clue: { id: 'emocion-clue', name: 'Alegria', category: 'emocion', icon: "/data/conjuntos/icons/detectiveConjuntos/emocion0.png", color: 'bg-purple-100' }
      },
      { 
        id: 'rutina', 
        name: 'Prendas Vestir', 
        color: 'border-green-400 bg-green-50', 
        icon: Shirt,
        clue: { id: 'rutina-clue', name: 'Bañarse', category: 'rutina', icon: "/data/conjuntos/icons/detectiveConjuntos/rutina0.png", color: 'bg-green-100' }
      },
      { 
        id: 'tecnologia', 
        name: 'Deportes', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Trophy,
        clue: { id: 'tecnologia-clue', name: 'Camara', category: 'tecnologia', icon: "/data/conjuntos/icons/detectiveConjuntos/tecnologia0.png", color: 'bg-purple-100' }
      },
    ]
  }, // clima partes del cuerpo instrumentos musicales
  {
    id: 2,
    title: "Relacionar los elementos",
    description: "Observa la pista y agrupa los elementos que hacen falta",
    items: [
      { id: '2', name: 'Lluvioso', category: 'clima', icon: "/data/conjuntos/icons/detectiveConjuntos/clima1.png", color: 'bg-blue-100' },
      { id: '3', name: 'Orejas', category: 'partesCuerpo', icon: "/data/conjuntos/icons/detectiveConjuntos/partesCuerpo1.png", color: 'bg-red-100' },
      { id: '4', name: 'Guitarra', category: 'instrumentos', icon: "/data/conjuntos/icons/detectiveConjuntos/instrumentos1.png", color: 'bg-red-100' },
      { id: '5', name: 'Brazos', category: 'partesCuerpo', icon: "/data/conjuntos/icons/detectiveConjuntos/partesCuerpo2.png", color: 'bg-red-100' },
      { id: '6', name: 'Nublado', category: 'clima', icon: "/data/conjuntos/icons/detectiveConjuntos/clima2.png", color: 'bg-purple-100' },
      { id: '7', name: 'Piano', category: 'instrumentos', icon: "/data/conjuntos/icons/detectiveConjuntos/instrumentos2.png", color: 'bg-blue-100' },
      { id: '8', name: 'Flauta', category: 'instrumentos', icon: "/data/conjuntos/icons/detectiveConjuntos/instrumentos3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Labios', category: 'partesCuerpo', icon: "/data/conjuntos/icons/detectiveConjuntos/partesCuerpo3.png", color: 'bg-blue-100' },
      { id: '10', name: 'Ventoso', category: 'clima', icon: "/data/conjuntos/icons/detectiveConjuntos/clima3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'clima', 
        name: 'Clima', 
        color: 'border-blue-400 bg-blue-50', 
        icon: Pencil,
        clue: { id: 'clima-clue', name: 'Soleado', category: 'clima', icon: "/data/conjuntos/icons/detectiveConjuntos/clima0.png", color: 'bg-purple-100' }
      },
      { 
        id: 'partesCuerpo', 
        name: 'Partes del cuerpo', 
        color: 'border-green-400 bg-green-50', 
        icon: Shirt,
        clue: { id: 'partesCuerpo-clue', name: 'Manos', category: 'partesCuerpo', icon: "/data/conjuntos/icons/detectiveConjuntos/partesCuerpo0.png", color: 'bg-green-100' }
      },
      { 
        id: 'instrumentos', 
        name: 'Instrumentos Musicales', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Trophy,
        clue: { id: 'instrumentos-clue', name: 'Tambor', category: 'instrumentos', icon: "/data/conjuntos/icons/detectiveConjuntos/instrumentos0.png", color: 'bg-purple-100' }
      },
    ]
  },
];