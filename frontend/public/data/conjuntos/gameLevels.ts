import { Target, Zap, LayoutGrid } from 'lucide-react';

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
    title: "Conjuntos por Color",
    description: "Relaciona los elementos segun el color",
    items: [
      { id: '1', name: 'Escoba', category: 'rojo', icon: "/data/conjuntos/icons/clasificaAgrupa/rojo2.png", color: 'bg-purple-100' },
      { id: '2', name: 'Carro', category: 'amarillo', icon: "/data/conjuntos/icons/clasificaAgrupa/amarillo2.png", color: 'bg-blue-100' },
      { id: '3', name: 'Hojas', category: 'verde', icon: "/data/conjuntos/icons/clasificaAgrupa/verde1.png", color: 'bg-red-100' },
      { id: '4', name: 'Gorra', category: 'verde', icon: "/data/conjuntos/icons/clasificaAgrupa/verde3.png", color: 'bg-red-100' },
      { id: '5', name: 'Rana', category: 'verde', icon: "/data/conjuntos/icons/clasificaAgrupa/verde2.png", color: 'bg-red-100' },
      { id: '6', name: 'Manzana', category: 'rojo', icon: "/data/conjuntos/icons/clasificaAgrupa/rojo1.png", color: 'bg-purple-100' },
      { id: '7', name: 'Banano', category: 'amarillo', icon: "/data/conjuntos/icons/clasificaAgrupa/amarillo1.png", color: 'bg-blue-100' },
      { id: '8', name: 'Bombero', category: 'rojo', icon: "/data/conjuntos/icons/clasificaAgrupa/rojo3.png", color: 'bg-purple-100' },
      { id: '9', name: 'Lápiz', category: 'amarillo', icon: "/data/conjuntos/icons/clasificaAgrupa/amarillo3.png", color: 'bg-blue-100' },
    ],
    sets: [
      { 
        id: 'amarillo', 
        name: 'Amarillo', 
        color: 'border-blue-400 bg-blue-50', 
        icon: LayoutGrid
      },
      { 
        id: 'verde', 
        name: 'Verde', 
        color: 'border-green-400 bg-green-50', 
        icon: Target
      },
      { 
        id: 'rojo', 
        name: 'Rojo', 
        color: 'border-purple-400 bg-purple-50', 
        icon: Zap
      },
    ]
  },
  {
    id: 2,
    title: "Conjuntos por Forma",
    description: "Relaciona los elementos segun su forma",
    items: [
      { id: '10', name: 'Llanta', category: 'circulo', icon: "/data/conjuntos/icons/clasificaAgrupa/circulo1.png", color: 'bg-red-100' },
      { id: '11', name: 'Pizza', category: 'triangulo', icon: "/data/conjuntos/icons/clasificaAgrupa/triangulo1.png", color: 'bg-red-100' },
      { id: '12', name: 'Pantalla', category: 'cuadrado', icon: "/data/conjuntos/icons/clasificaAgrupa/cuadrado1.png", color: 'bg-red-100' },
      { id: '13', name: 'Sol', category: 'circulo', icon: "/data/conjuntos/icons/clasificaAgrupa/circulo2.png", color: 'bg-orange-100' },
      { id: '14', name: 'Regalo', category: 'cuadrado', icon: "/data/conjuntos/icons/clasificaAgrupa/cuadrado2.png", color: 'bg-orange-100' },
      { id: '15', name: 'Balón', category: 'circulo', icon: "/data/conjuntos/icons/clasificaAgrupa/circulo3.png", color: 'bg-orange-100' },
      { id: '16', name: 'Calendario', category: 'cuadrado', icon: "/data/conjuntos/icons/clasificaAgrupa/cuadrado3.png", color: 'bg-yellow-100' },
      { id: '17', name: 'Gorro Cumpleaños', category: 'triangulo', icon: "/data/conjuntos/icons/clasificaAgrupa/triangulo2.png", color: 'bg-yellow-100' },
      { id: '18', name: 'Señal', category: 'triangulo', icon: "/data/conjuntos/icons/clasificaAgrupa/triangulo3.png", color: 'bg-yellow-100' },
    ],
    sets: [
      { 
        id: 'circulo', 
        name: 'Circulo', 
        color: 'border-red-400 bg-red-50', 
        icon: LayoutGrid
      },
      { 
        id: 'triangulo', 
        name: 'Triangulo', 
        color: 'border-orange-400 bg-orange-50', 
        icon: Target
      },
      { 
        id: 'cuadrado', 
        name: 'Cuadrado', 
        color: 'border-yellow-400 bg-yellow-50', 
        icon: Zap
      },
    ]
  },
  {
    id: 3,
    title: "Conjuntos por tipo",
    description: "Relaciona los elementos según su tipo",
    items: [
      { id: '19', name: 'Perro', category: 'animal', icon: "/data/conjuntos/icons/clasificaAgrupa/animal1.png", color: 'bg-emerald-100' },
      { id: '20', name: 'Flores', category: 'planta', icon: "/data/conjuntos/icons/clasificaAgrupa/planta1.png", color: 'bg-emerald-100' },
      { id: '21', name: 'Maleta', category: 'cosa', icon: "/data/conjuntos/icons/clasificaAgrupa/cosa1.png", color: 'bg-emerald-100' },
      { id: '22', name: 'Gallina', category: 'animal', icon: "/data/conjuntos/icons/clasificaAgrupa/animal2.png", color: 'bg-teal-100' },
      { id: '23', name: 'Computador', category: 'cosa', icon: "/data/conjuntos/icons/clasificaAgrupa/cosa2.png", color: 'bg-teal-100' },
      { id: '24', name: 'Vaca', category: 'animal', icon: "/data/conjuntos/icons/clasificaAgrupa/animal3.png", color: 'bg-teal-100' },
      { id: '25', name: 'Rosa', category: 'planta', icon: "/data/conjuntos/icons/clasificaAgrupa/planta2.png", color: 'bg-cyan-100' },
      { id: '26', name: 'Bombillo', category: 'cosa', icon: "/data/conjuntos/icons/clasificaAgrupa/cosa3.png", color: 'bg-cyan-100' },
      { id: '27', name: 'Árbol', category: 'planta', icon: "/data/conjuntos/icons/clasificaAgrupa/planta3.png", color: 'bg-cyan-100' },
    ],
    sets: [
      { 
        id: 'cosa', 
        name: 'Cosas', 
        color: 'border-emerald-400 bg-emerald-50', 
        icon: LayoutGrid
      },
      { 
        id: 'animal', 
        name: 'Animales', 
        color: 'border-teal-400 bg-teal-50', 
        icon: Target
      },
      { 
        id: 'planta', 
        name: 'Plantas', 
        color: 'border-cyan-400 bg-cyan-50', 
        icon: Zap
      },
    ]
  }
];
