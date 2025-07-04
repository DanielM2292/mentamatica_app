import { ModuleInfo } from '../../types/module';

export const moduleConfigs: Record<string, ModuleInfo> = {
  conjuntos: {
    id: 'conjuntos',
    name: 'Conjuntos',
    title: 'Clasifica y Agrupa',
    icon: '/images/icons/conjuntos.png',
    iconAlt: 'Icono Módulo de Conjuntos',
    backgroundColor: 'bg-pink-100',
    backUrl: '/modules/conjuntos',
    progressLabel: 'conjuntos'
  },
  numeracion: {
    id: 'numeracion',
    name: 'Numeración',
    title: 'El Número Correcto',
    icon: '/images/icons/numeracion.png',
    iconAlt: 'Icono Módulo de Numeración',
    backgroundColor: 'bg-blue-100',
    backUrl: '/modules/numeracion',
    progressLabel: 'números'
  },
  suma: {
    id: 'suma',
    name: 'Suma',
    title: 'Sumando Estrellas',
    icon: '/images/icons/suma.png',
    iconAlt: 'Icono Módulo de Suma',
    backgroundColor: 'bg-green-100',
    backUrl: '/modules/suma',
    progressLabel: 'sumas'
  },
  resta: {
    id: 'resta',
    name: 'Resta',
    title: 'Resta y Rescata',
    icon: '/images/icons/resta.png',
    iconAlt: 'Icono Módulo de Resta',
    backgroundColor: 'bg-red-100',
    backUrl: '/modules/resta',
    progressLabel: 'restas'
  },
  multiplicacion: {
    id: 'multiplicacion',
    name: 'Multiplicación',
    title: 'Rompe la Piñata',
    icon: '/images/icons/multiplicacion.png',
    iconAlt: 'Icono Módulo de Multiplicación',
    backgroundColor: 'bg-yellow-100',
    backUrl: '/modules/multiplicacion',
    progressLabel: 'multiplicaciones'
  },
  division: {
    id: 'division',
    name: 'División',
    title: 'Reparte los Dulces',
    icon: '/images/icons/division.png',
    iconAlt: 'Icono Módulo de División',
    backgroundColor: 'bg-purple-100',
    backUrl: '/modules/division',
    progressLabel: 'divisiones'
  },
  geometria: {
    id: 'geometria',
    name: 'Geometría',
    title: 'Detective de Figuras',
    icon: '/images/icons/geometria.png',
    iconAlt: 'Icono Módulo de Geometría',
    backgroundColor: 'bg-indigo-100',
    backUrl: '/modules/geometria',
    progressLabel: 'figuras'
  }
};

// Configuración específica de juegos por módulo
export const gameConfigs: Record<string, Record<string, { title: string; description: string; tags: string[] }>> = {
  conjuntos: {
    'clasifica-agrupa': {
      title: 'Clasifica y Agrupa',
      description: 'Arrastra objetos al conjunto correcto.',
      tags: ['Drag & Drop', 'Visual']
    },
    'union-interseccion': {
      title: 'La Unión y la Intersección',
      description: 'Selecciona qué elementos pertenecen a la unión o intersección de dos conjuntos.',
      tags: ['Lógica', 'Visual']
    },
    'detective-conjunto': {
      title: 'Detective del Conjunto Perdido',
      description: 'Encuentra qué conjunto falta para completar una operación.',
      tags: ['Lógica', 'Narrativo']
    }
  },
  numeracion: {
    'numero-correcto': {
      title: 'El Número Correcto',
      description: 'Explota globos en orden ascendente.',
      tags: ['Velocidad', 'Visual']
    },
    'numero-gigante': {
      title: 'Forma el Número Gigante',
      description: 'Construye números de 4-5 cifras usando valor posicional.',
      tags: ['Drag & Drop', 'Construcción']
    },
    'contador-espacial': {
      title: 'Contador Espacial',
      description: 'Avanza en un mapa sumando/restando decenas.',
      tags: ['Narrativo', 'Lógica']
    }
  },
  suma: {
    'sumando-estrellas': {
      title: 'Sumando Estrellas',
      description: 'Elige la estrella con el resultado correcto.',
      tags: ['Visual', 'Retroalimentación']
    },
    'carrera-numeros': {
      title: 'Carrera de Números',
      description: 'Resuelve sumas para avanzar en una carrera.',
      tags: ['Velocidad', 'Retroalimentación']
    },
    'drag-drop-numerico': {
      title: 'Drag & Drop Numérico',
      description: 'Completa sumas arrastrando los números correctos.',
      tags: ['Drag & Drop', 'Construcción']
    }
  },
  resta: {
    'resta-rescata': {
      title: 'Resta y Rescata',
      description: 'Cruza un puente resolviendo restas.',
      tags: ['Narrativo', 'Lógica']
    },
    'memoria-inversa': {
      title: 'Memoria Inversa',
      description: 'Elige la suma que comprueba una resta.',
      tags: ['Lógica', 'Construcción']
    },
    'resta-cueva': {
      title: 'Resta en la Cueva',
      description: 'Escapa resolviendo restas, si fallas retrocedes.',
      tags: ['Narrativo', 'Velocidad']
    }
  },
  multiplicacion: {
    'rompe-pinata': {
      title: 'Rompe la Piñata',
      description: 'Golpea la piñata con el resultado correcto.',
      tags: ['Visual', 'Retroalimentación']
    },
    'repeticiones-rapidas': {
      title: 'Repeticiones Rápidas',
      description: 'Agrupa elementos para representar multiplicaciones.',
      tags: ['Drag & Drop', 'Construcción']
    },
    'desafio-tablas': {
      title: 'Desafío de Tablas',
      description: 'Completa tablas de multiplicar a contrarreloj.',
      tags: ['Velocidad', 'Lógica']
    }
  },
  division: {
    'reparte-dulces': {
      title: 'Reparte los Dulces',
      description: 'Divide objetos entre personajes en partes iguales.',
      tags: ['Drag & Drop', 'Lógica']
    },
    'division-tesoro': {
      title: 'División del Tesoro',
      description: 'Divide monedas según pistas del mapa.',
      tags: ['Narrativo', 'Lógica']
    },
    'pulsa-cifra': {
      title: 'Pulsa la Cifra Correcta',
      description: 'Elige entre opciones la división correcta.',
      tags: ['Velocidad', 'Visual']
    }
  },
  geometria: {
    'detective-figuras': {
      title: 'Detective de Figuras',
      description: 'Encuentra figuras geométricas ocultas.',
      tags: ['Visual', 'Lógica']
    },
    'construye-figura': {
      title: 'Construye tu Figura',
      description: 'Usa puntos y líneas para formar figuras.',
      tags: ['Drag & Drop', 'Construcción']
    },
    'perimetro-magico': {
      title: 'Perímetro Mágico',
      description: 'Calcula perímetros para desbloquear cofres.',
      tags: ['Lógica', 'Retroalimentación']
    }
  }
};

export const getModuleConfig = (moduleId: string): ModuleInfo => {
  return moduleConfigs[moduleId] || moduleConfigs.conjuntos;
};

export const getGameConfig = (moduleId: string, gameId: string) => {
  return gameConfigs[moduleId]?.[gameId] || null;
};

export const getModuleGames = (moduleId: string) => {
  return gameConfigs[moduleId] || {};
};