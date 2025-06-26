import React from "react";
import ConjuntosTemplate from "@/components/templates/conjuntos/ConjuntosTemplate";

const clasificaAgrupa: React.FC = () => {
  const conjuntosConfig = {
    id: "conjuntos",
    title: "Conjuntos",
    description: "Aprende a agrupar elementos",
    iconPath: "/images/icons/conjuntos.png",
    backgroundGradient: "bg-gradient-to-br from-pink-50 to-purple-50",
    videoTitle: "¿Qué son los conjuntos?",
    videoDescription: "Aprende qué son los conjuntos antes de comenzar",
    videoBackground: "bg-gradient-to-br from-pink-50 to-purple-100",
    activities: [
      {
        id: "clasificaAgrupa",
        title: "Clasifica y agrupa",
        description: "Arrastra objetos al conjunto correcto",
        type: "drag-drop" as const,
        difficulty: "easy" as const,
        completed: false,
        stars: 0,
      },
      {
        id: "unionInterseccion",
        title: "La unión y la intersección",
        description: "Selecciona que elementos pertenecen a la unión o intersección de dos conjuntos",
        type: "selection" as const,
        difficulty: "easy" as const,
        completed: false,
        stars: 0,
      },
      {
        id: "detectiveConjunto",
        title: "Detective del Conjunto Perdido",
        description: "Encuentra qué conjunto falta para completar una operación",
        type: "drag-drop" as const,
        difficulty: "medium" as const,
        completed: false,
        stars: 0,
      },
    ],
  };

  return (
    <ConjuntosTemplate
      config={conjuntosConfig}
      userStars={0}
      userCoins={0}
    />
  );
};

export default clasificaAgrupa;