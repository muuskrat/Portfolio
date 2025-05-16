import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import '../styles/SentSuccessWindow.css';

import { useSound } from '../components/useSound';
import openSound from '../assets/button_click.wav';
import closeSound from '../assets/button_close.wav';

export const Success = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('Success');
    const playOpen = useSound(openSound);
    const playClose = useSound(closeSound);

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#9911ff",
        borderRadius: 5,
        
    }

  

    return (
        <div style={{...dragStyle, zIndex, position: 'absolute'}} onPointerDown={onBringToFront} onPointerUp={handleDragEnd}>
            <motion.div
                ref={(node) => {
                    setNodeRef(node);
                    windowRef.current = node;
                }}
                className="window-box-success"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, 
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }, }}
                style={{ transformOrigin: 'center center' }}
                //whileHover={{scale: 1.05,}}
            >
                <div className="window-header-success" {...listeners} {...attributes} ref={headerRef}>
                    <strong>( ˶ˆ ᗜ ˆ˵ )</strong>
                </div>
                    <button className="close-button-MP" onClick={() => {playClose(); onClose();}}>[ x ]</button>
                    <div className="window-content-success">                    
                        email sent! <br />something went right wahoo!! 
                    </div>
            </motion.div>
        </div>
  );
};