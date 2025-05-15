import React, { useRef } from 'react';
import { motion } from "framer-motion";
import { useDraggableWindow } from '../components/useDraggableWindow';
import '../styles/Music.css';

import { useSound } from '../components/useSound';
import openSound from '../assets/button_click.wav';
import closeSound from '../assets/button_close.wav';
import { LoopingAudioButton } from '../components/LoopingAudioButton';


export const Music = ({ onClose, onBringToFront, zIndex }) => {
  const {
    windowRef,
    headerRef,
    dragStyle,
    handleDragEnd,
    attributes,
    listeners,
    setNodeRef
  } = useDraggableWindow('Music');

  const playOpen = useSound(openSound);
  const playClose = useSound(closeSound);

  // Ref to control audio inside LoopingAudioButton
  const audioButtonRef = useRef();

  const handleClose = () => {
    // Stop and reset audio before closing
    if (audioButtonRef.current?.stop) {
      audioButtonRef.current.stop();
    }
    playClose();
    onClose();
  };

  return (
    <div style={{ ...dragStyle, zIndex, position: 'absolute' }} onPointerDown={onBringToFront} onPointerUp={handleDragEnd}>
      <motion.div
        ref={(node) => {
          setNodeRef(node);
          windowRef.current = node;
        }}
        className="window-box-music"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.15, opacity: 0 }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
        style={{ transformOrigin: 'center center' }}
      >
        <div className="window-header-music" {...listeners} {...attributes} ref={headerRef}>
          <strong>Music</strong>
        </div>
        <button className="close-button-MP" onClick={handleClose}>[ x ]</button>

        <div className="window-content-music">
          <LoopingAudioButton ref={audioButtonRef} />
        </div>
      </motion.div>
    </div>
  );
};
