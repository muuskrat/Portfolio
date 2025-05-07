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

  const imagebox = {
      width: 200,
      height: 250,
      backgroundColor: "#9911ff",
      borderRadius: 5,
      
  }

  function SkillBoxes({ skills }) {
      
    
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
                        <SkillBoxes skills={['C', 'C++', 'Java', 'Python', 'JS', 'HTML', 'CSS', 'React']}/>
                        <div class="divider"></div>
                        <h2>Projects</h2>
                        <div className="projects">

                          
                          <div className="test-work-container">
                            <div className="test-work-container-intro">
                              <motion.div className="test-work-image" 
                                whileHover={{scale: 1.1}}
                                style={imagebox}></motion.div>
                              <div className="test-work-content">
                                <h2 className="test-work-title">hello</h2>
                                  <SkillBoxes className="test-work-skills" skills={['JS', 'HTML', 'CSS', 'React']}/>
                                <div className="test-work-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veniam magnam aliquid labore nesciunt est provident fuga corrupti consectetur, possimus assumenda iure esse asperiores ipsa? Quos distinctio perferendis odit magnam!</div>
                              </div>
                            </div>
                          </div>

                          <div class="divider"></div>
                          <div className="test-work-container">
                            <div className="test-work-container-intro">
                              <motion.div className="test-work-image" 
                                whileHover={{scale: 1.1}}
                                style={imagebox}></motion.div>
                              <div className="test-work-content">
                                <h2 className="test-work-title">hello</h2>
                                  <SkillBoxes className="test-work-skills" skills={['JS', 'HTML', 'CSS', 'React']}/>
                                <div className="test-work-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veniam magnam aliquid labore nesciunt est provident fuga corrupti consectetur, possimus assumenda iure esse asperiores ipsa? Quos distinctio perferendis odit magnam!</div>
                              </div>
                            </div>
                          </div>

                          <div class="divider"></div>
                          <div className="test-work-container">
                            <div className="test-work-container-intro">
                              <motion.div className="test-work-image" 
                                whileHover={{scale: 1.1}}
                                style={imagebox}></motion.div>
                              <div className="test-work-content">
                                <h2 className="test-work-title">hello</h2>
                                  <SkillBoxes className="test-work-skills" skills={['JS', 'HTML', 'CSS', 'React']}/>
                                <div className="test-work-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex veniam magnam aliquid labore nesciunt est provident fuga corrupti consectetur, possimus assumenda iure esse asperiores ipsa? Quos distinctio perferendis odit magnam!</div>
                              </div>
                            </div>
                          </div>

                        </div>
                    </div>
            </motion.div>
        </div>
  );
};