import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import loopTrack from '../assets/jazz.mp3'; // Replace with your audio file path


export const LoopingAudioButton = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(loopTrack));

  const audio = audioRef.current;
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = volume;

  // Expose stop method for parent to control audio externally
  useImperativeHandle(ref, () => ({
    stop: () => {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  }));

  const handlePlay = () => {
    audio.currentTime = 0;
    audio.play().catch((e) => console.warn('Audio play failed:', e));
    setIsPlaying(true);
  };

  const handlePause = () => {
    audio.pause();
    setIsPlaying(false);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'start' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handlePlay} className="looping-audio-button" aria-label="Play Music">
          <i className="fa-solid fa-play"></i> Play
        </button>
        <button onClick={handlePause} className="looping-audio-button" aria-label="Pause Music">
          <i className="fa-solid fa-pause"></i> Pause
        </button>
      </div>

      <label style={{ fontSize: 14, color: '#4C4B4B', fontFamily: 'Quicksand' }}>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          style={{ marginLeft: 8 }}
        />
      </label>
    </div>
  );
});
