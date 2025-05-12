import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';



export const About = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('About');

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
                className="window-box-about"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, 
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }, }}
                style={{ transformOrigin: 'center center' }}
                //whileHover={{scale: 1.05,}}
            >
                <div className="window-header-about" {...listeners} {...attributes} ref={headerRef}>
                    <strong>About</strong>
                </div>
                    <button className="close-button-about" onClick={onClose}>[ x ]</button>

                    <div className="window-content-about">                    
                        <div className="about-hero">
                            <div className="about-image"></div>
                            <div className="about-title">
                                <h1>Mario Orlando</h1>
                                <h2>california based software engineer and web develoepr</h2>
                                <h2>software engineer at Evu</h2>
                            </div>
                        </div>

                        <div className="about-info">
                                <div className="info-intro">
                                    hi! i'm mario, a computer science graduate with experince in that knows
                                    <ul>
                                        <li>Software engineering</li>
                                        <li>Frontend web development</li>
                                        <li>Backend web development</li>
                                        <li>Embeded Systems</li>
                                        <li>AI/ML concepets</li>
                                    </ul>
                                </div>

                                <div className="info-education">
                                    <h2 className='title'>EDUCATION</h2>
                                    <div className="education">
                                        <p className='degree'>Bachelor's of Science</p>
                                        <p className='year'>(2023)</p>
                                    </div>
                                </div>

                                <div className="info-other-interests">
                                    <h2 className="title">OTHER INTERESTS</h2>
                                    <ul>
                                        <li>learning about emerging tech</li>
                                        <li>game development</li>
                                        <li>physics based software</li>
                                        <li>drawing anatomy and landscapes)</li>
                                        <li>exercising (255lb bench 💪)</li>
                                    </ul>
                                </div>

                                <div className="info-language">
                                <h2 className="title">LANGUAGES</h2>
                                    <div className="language">
                                        <p className="main">i have native fluency in English and have taken 3 years of American Sign Language</p>
                                        <p className="extra">i can understand a little Spanish and Italian but i cant speak them at all -_- </p>
                                    </div>
                                </div>
                        </div>
                    </div>
            </motion.div>
        </div>
  );
};