import { useRef } from 'react';

export function useSound(src) {
  const audioRef = useRef(null);

  if (!audioRef.current) {
    audioRef.current = new Audio(src);
  }

  const play = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((e) => {
      console.warn('Audio play failed:', e);
    });
  };

  return play;
}
