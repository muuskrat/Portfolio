import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';

export const Contact = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('Contact');

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
                className="window-box-MP"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, 
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }, }}
                style={{ transformOrigin: 'center center' }}
                //whileHover={{scale: 1.05,}}
            >
                <div className="window-header-MP" {...listeners} {...attributes} ref={headerRef}>
                    <strong>Contact</strong>
                </div>
                    <button className="close-button-MP" onClick={onClose}>[ x ]</button>

                    <div className="window-content-MP">                    

                    </div>
            </motion.div>
        </div>
  );
};