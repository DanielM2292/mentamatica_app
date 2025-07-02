import { useState, useRef, useCallback } from "react";

export default function useCognitiveAudio(audios: CognitiveAudio[]) {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = useCallback((audioId: string) => {
    const audio = audios.find(a => a.id === audioId);
    if (!audio) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    audioRef.current = new Audio(audio.audioUrl);
    audioRef.current.volume = 0.7;
    
    audioRef.current.onplay = () => {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    };
    
    audioRef.current.onended = () => {
      setCurrentAudio(null);
      setIsPlaying(false);
    };
    
    audioRef.current.onerror = () => {
      console.log(`Audio ${audio.title} no encontrado`);
      setCurrentAudio(null);
      setIsPlaying(false);
    };

    audioRef.current.play().catch(() => {
      console.log(`No se pudo reproducir ${audio.title}`);
    });
  }, [audios]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  }, []);

  return { currentAudio, isPlaying, playAudio, stopAudio };
}