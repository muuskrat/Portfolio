import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import '../styles/WorkWindow.css';

export const Work = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('Work');

    const box = {
        width: 100,
        height: 100,
        backgroundColor: "#9911ff",
        borderRadius: 5,
        
    }

    function SkillBoxes() {
        const skills = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'HTML', 'CSS', 'React', ];
      
        return (
          <div  style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
            gap: '12px',
            padding: '12px'
          }}>
            {skills.map(skill => (
              <motion.div
                key={skill}
                whileHover={{ scale: 0.95 }}
                transition={{ duration: .5 }}
                className="skill-box"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        );
      }

  

    return (
        <div style={{...dragStyle, zIndex, position: 'absolute'}} onPointerDown={onBringToFront} onPointerUp={handleDragEnd}>
            <motion.div
                ref={(node) => {
                    setNodeRef(node);
                    windowRef.current = node;
                }}
                className="window-box-work"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, 
                            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }, }}
                style={{ transformOrigin: 'center center' }}
                //whileHover={{scale: 1.05,}}
            >
                <div className="window-header-work" {...listeners} {...attributes} ref={headerRef}>
                    <strong>Work</strong>
                </div>
                    <button className="close-button-work" onClick={onClose}>[ x ]</button>

                    <div className="window-content-work">
                        <h2>Development Skills</h2>
                        <SkillBoxes />
                        <div class="divider"></div>
                        <h2>Projects</h2>
                    </div>
            </motion.div>
        </div>
  );
};