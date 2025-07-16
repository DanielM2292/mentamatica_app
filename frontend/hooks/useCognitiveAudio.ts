import { useState, useRef, useCallback, useEffect } from 'react';

interface CognitiveAudio {
  id: string;
  title: string;
  description: string;
  category: 'motivacion' | 'concentracion' | 'relajacion' | 'celebracion' | 'resolucion' | 'recuperacion' | 'energia' | 'confianza';
  duration: string;
  script: string;
  neuroscience_principle: string;
  color: string;
  icon: string;
}

export const useCognitiveAudio = () => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCognitiveModal, setShowCognitiveModal] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  // Scripts de audio basados en neurociencia
  const cognitiveAudios: CognitiveAudio[] = [
    {
      id: "welcome-motivation",
      title: "¡Hola pequeño genio!",
      description: "Audio de bienvenida que activa la motivación intrínseca y la dopamina",
      category: "motivacion",
      duration: "30s",
      script: "¡Hola pequeño genio! Soy tu compañera de aprendizaje, y estoy muy emocionada de verte aquí. Tu cerebro es como un súper músculo que se hace más fuerte cada vez que aprendes algo nuevo. ¿Estás listo para una aventura matemática increíble? ¡Vamos a descubrir juntos lo genial que eres!",
      neuroscience_principle: "Activación del sistema de recompensa cerebral",
      color: "from-yellow-400 to-orange-500",
      icon: "🌟"
    },
    {
      id: "focus-breathing",
      title: "Respiración para el súper cerebro",
      description: "Técnica de respiración que mejora la atención sostenida y reduce cortisol",
      category: "concentracion",
      duration: "45s",
      script: "Es momento de preparar tu mente para aprender. Vamos a respirar juntos como los súper héroes. Inhala profundo por la nariz... uno, dos, tres... Ahora exhala lentamente por la boca... uno, dos, tres, cuatro... ¡Perfecto! Tu cerebro ya está listo para concentrarse. Siente cómo tu mente se vuelve clara y brillante.",
      neuroscience_principle: "Activación del sistema nervioso parasimpático",
      color: "from-blue-400 to-indigo-500",
      icon: "🧘‍♀️"
    },
    {
      id: "success-celebration",
      title: "¡Eres un campeón!",
      description: "Celebración que refuerza el aprendizaje mediante dopamina y serotonina",
      category: "celebracion",
      duration: "20s",
      script: "¡Increíble! ¡Lo lograste! Tu cerebro acaba de crear nuevas conexiones súper poderosas. Cada vez que resuelves un problema, te vuelves más inteligente. ¡Eres un verdadero campeón de las matemáticas! Guarda este momento feliz en tu corazón.",
      neuroscience_principle: "Consolidación de memoria a largo plazo",
      color: "from-green-400 to-emerald-500",
      icon: "🏆"
    },
    {
      id: "calm-transition",
      title: "Jardín de conocimiento",
      description: "Audio de transición que facilita la consolidación de memoria",
      category: "relajacion",
      duration: "60s",
      script: "Muy bien, pequeño explorador. Es momento de relajar tu mente después de tanto aprender. Imagina que tu cerebro es como un jardín hermoso donde acabas de plantar semillas de conocimiento. Ahora estas semillas van a crecer tranquilamente mientras descansas. Respira suavemente y siente la paz en tu mente. ¡Excelente trabajo hoy!",
      neuroscience_principle: "Facilita la neuroplasticidad durante el descanso",
      color: "from-purple-400 to-pink-500",
      icon: "🌸"
    },
    {
      id: "problem-solving-boost",
      title: "Detective matemático",
      description: "Prepara la mente para resolver problemas complejos",
      category: "resolucion",
      duration: "35s",
      script: "¡Qué emocionante! Tienes un reto por delante. Recuerda que tu cerebro es como un detective súper inteligente. Primero observa, luego piensa, y después encuentra la respuesta. No hay prisa, los mejores detectives toman su tiempo. ¡Confío en ti, pequeño genio!",
      neuroscience_principle: "Activación de la corteza prefrontal",
      color: "from-cyan-400 to-blue-500",
      icon: "🔍"
    },
    {
      id: "error-recovery",
      title: "Los errores son maestros",
      description: "Ayuda a procesar errores de manera positiva y constructiva",
      category: "recuperacion",
      duration: "40s",
      script: "¡Oye, está bien! Los errores son los mejores maestros. Cada error hace que tu cerebro se vuelva más fuerte y sabio. Los científicos más famosos del mundo cometieron miles de errores antes de sus grandes descubrimientos. Respira profundo y vuelve a intentarlo. ¡Yo creo en ti!",
      neuroscience_principle: "Reduce activación de amígdala, promueve resiliencia",
      color: "from-rose-400 to-red-500",
      icon: "💪"
    },
    {
      id: "pre-game-energy",
      title: "¡Hora de jugar!",
      description: "Energiza y motiva antes de comenzar actividades",
      category: "energia",
      duration: "25s",
      script: "¡Es hora de jugar y aprender! Tu cerebro está súper emocionado por este nuevo desafío. Recuerda: no importa si te equivocas, lo importante es intentarlo. ¡Vamos a divertirnos mientras aprendemos! ¡Tú puedes con todo!",
      neuroscience_principle: "Activa motivación intrínseca y reduce ansiedad",
      color: "from-amber-400 to-yellow-500",
      icon: "⚡"
    },
    {
      id: "concentration-boost",
      title: "Súper concentración",
      description: "Mejora el enfoque y la atención selectiva",
      category: "concentracion",
      duration: "40s",
      script: "Vamos a activar tu súper concentración. Cierra los ojos por un momento y siente cómo tu mente se enfoca. Imagina que tienes un láser de atención en tu cerebro. Ahora abre los ojos y dirige ese láser hacia el problema. ¡Tu concentración es increíble!",
      neuroscience_principle: "Mejora atención selectiva, activa corteza prefrontal",
      color: "from-indigo-400 to-purple-500",
      icon: "🎯"
    },
    {
      id: "math-confidence",
      title: "Matemáticas divertidas",
      description: "Reduce la ansiedad matemática y aumenta la confianza",
      category: "confianza",
      duration: "35s",
      script: "Las matemáticas son como un juego súper divertido. Cada número es tu amigo, cada operación es una aventura. No hay matemáticas difíciles, solo matemáticas que aún no conoces bien. Y tú eres muy bueno aprendiendo cosas nuevas. ¡Eres un matemático increíble!",
      neuroscience_principle: "Reduce ansiedad matemática, mejora autoeficacia",
      color: "from-teal-400 to-cyan-500",
      icon: "🧮"
    },
    {
      id: "end-session-positive",
      title: "¡Sesión fantástica!",
      description: "Cierre positivo que consolida el aprendizaje",
      category: "celebracion",
      duration: "30s",
      script: "¡Qué sesión tan fantástica hemos tenido! Tu cerebro ha trabajado muy duro y ha aprendido cosas increíbles. Cada minuto que practicas, te vuelves más inteligente. Descansa bien, que mañana tendremos más aventuras matemáticas. ¡Estoy muy orgullosa de ti!",
      neuroscience_principle: "Consolida aprendizaje, refuerza motivación futura",
      color: "from-emerald-400 to-green-500",
      icon: "🎉"
    }
  ];

  // Verificar disponibilidad de Speech Synthesis
  useEffect(() => {
    setIsAvailable('speechSynthesis' in window);
  }, []);

  // Configurar voz en español para niños
  const getSpanishVoice = useCallback(() => {
    const voices = speechSynthesis.getVoices();
    // Buscar voces en español, preferir femeninas y claras
    const spanishVoices = voices.filter(voice => 
      voice.lang.startsWith('es') || voice.name.toLowerCase().includes('spanish')
    );
    
    // Preferir voces femeninas para niños
    const femaleVoice = spanishVoices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('mujer') ||
      voice.name.toLowerCase().includes('maria') ||
      voice.name.toLowerCase().includes('carmen')
    );
    
    return femaleVoice || spanishVoices[0] || voices[0];
  }, []);

  const playAudio = useCallback((audioId: string) => {
    if (!isAvailable) {
      console.log('Speech Synthesis no disponible');
      return;
    }

    const audio = cognitiveAudios.find(a => a.id === audioId);
    if (!audio) return;

    // Detener audio actual si existe
    if (speechRef.current) {
      speechSynthesis.cancel();
      speechRef.current = null;
      setCurrentAudio(null);
      setIsPlaying(false);
    }

    // Crear nueva instancia de speech
    speechRef.current = new SpeechSynthesisUtterance(audio.script);
    
    // Configurar voz
    const voice = getSpanishVoice();
    if (voice) {
      speechRef.current.voice = voice;
    }
    
    // Configurar parámetros para niños
    speechRef.current.rate = 0.8; // Velocidad más lenta
    speechRef.current.pitch = 1.2; // Tono ligeramente más alto
    speechRef.current.volume = 0.8; // Volumen controlado

    // Eventos
    speechRef.current.onstart = () => {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    };

    speechRef.current.onend = () => {
      setCurrentAudio(null);
      setIsPlaying(false);
      speechRef.current = null;
    };

    speechRef.current.onerror = () => {
      console.log(`Error reproduciendo audio: ${audio.title}`);
      setCurrentAudio(null);
      setIsPlaying(false);
      speechRef.current = null;
    };

    // Reproducir
    speechSynthesis.speak(speechRef.current);
  }, [cognitiveAudios, getSpanishVoice, isAvailable]);

  const stopAudio = useCallback(() => {
    if (speechRef.current) {
      speechSynthesis.cancel();
      speechRef.current = null;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  }, []);

  // Funciones específicas para cada tipo de audio (SOLO MANUAL)
  const playWelcomeAudio = useCallback(() => {
    // Esta función ahora está disponible pero NO se ejecuta automáticamente
    const welcomeAudio = cognitiveAudios.find(audio => audio.id === "welcome-motivation");
    if (welcomeAudio) {
      playAudio(welcomeAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playSuccessAudio = useCallback(() => {
    const successAudio = cognitiveAudios.find(audio => audio.id === "success-celebration");
    if (successAudio) {
      playAudio(successAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playErrorRecoveryAudio = useCallback(() => {
    const errorAudio = cognitiveAudios.find(audio => audio.id === "error-recovery");
    if (errorAudio) {
      playAudio(errorAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playFocusAudio = useCallback(() => {
    const focusAudio = cognitiveAudios.find(audio => audio.id === "focus-breathing");
    if (focusAudio) {
      playAudio(focusAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playPreGameAudio = useCallback(() => {
    const preGameAudio = cognitiveAudios.find(audio => audio.id === "pre-game-energy");
    if (preGameAudio) {
      playAudio(preGameAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playEndSessionAudio = useCallback(() => {
    const endAudio = cognitiveAudios.find(audio => audio.id === "end-session-positive");
    if (endAudio) {
      playAudio(endAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playMathConfidenceAudio = useCallback(() => {
    const mathAudio = cognitiveAudios.find(audio => audio.id === "math-confidence");
    if (mathAudio) {
      playAudio(mathAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playConcentrationAudio = useCallback(() => {
    const concentrationAudio = cognitiveAudios.find(audio => audio.id === "concentration-boost");
    if (concentrationAudio) {
      playAudio(concentrationAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playProblemSolvingAudio = useCallback(() => {
    const problemAudio = cognitiveAudios.find(audio => audio.id === "problem-solving-boost");
    if (problemAudio) {
      playAudio(problemAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  const playCalmTransitionAudio = useCallback(() => {
    const calmAudio = cognitiveAudios.find(audio => audio.id === "calm-transition");
    if (calmAudio) {
      playAudio(calmAudio.id);
    }
  }, [cognitiveAudios, playAudio]);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (speechRef.current) {
        speechSynthesis.cancel();
        speechRef.current = null;
      }
    };
  }, []);

  return {
    currentAudio,
    isPlaying,
    isAvailable,
    showCognitiveModal,
    setShowCognitiveModal,
    cognitiveAudios,
    playAudio,
    stopAudio,
    playWelcomeAudio,
    playSuccessAudio,
    playErrorRecoveryAudio,
    playFocusAudio,
    playPreGameAudio,
    playEndSessionAudio,
    playMathConfidenceAudio,
    playConcentrationAudio,
    playProblemSolvingAudio,
    playCalmTransitionAudio
  };
};