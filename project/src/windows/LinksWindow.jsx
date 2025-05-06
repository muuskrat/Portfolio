import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/LinksWindow.css';


export const Links = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('Links');

    const box = {
        width: 75,
        height: 75,
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
                className="window-box-links"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, 
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }, }}
                style={{ transformOrigin: 'center center' }}
                //whileHover={{scale: 1.05,}}
            >
                <div className="window-header-links" {...listeners} {...attributes} ref={headerRef}>
                    <strong>Links</strong>
                </div>
                    <button className="close-button-links" onClick={onClose}>[ x ]</button>
                    <div className="window-content-links">
                        <motion.button 
                            className="git-button"
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.2 }}
                            style={box}
                            onClick={() => window.open('https://github.com/muuskrat', '_blank')}
                        >
                        <FaGithub style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>about</strong>
                        </motion.button>

                        <motion.button 
                            className="linkedin-button"
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.2 }}
                            style={box}
                            onClick={() => window.open('https://www.linkedin.com/in/mario-orlando-mmo/', '_blank')}
                        >
                        <FaLinkedin style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>about</strong>
                        </motion.button>  

                        <motion.button 
                            className="email-button"
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.2 }}
                            style={box}
                            onClick={() => openWindow("Contact")}
                        >
                        <FaEnvelope style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>about</strong>
                        </motion.button>               
                    </div>
            </motion.div>
        </div>
  );
};