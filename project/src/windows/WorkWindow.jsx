import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import '../styles/WorkWindow.css';
import img1 from '../assets/image.png';
import horse from '../assets/horse.png';

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
          //maxWidth: '200px',
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

    function ProjectCard({title, skills, desc1, desc2, imageStyle}){
      return(
        <div className="work-container">
          <div className="work-container-intro">
            <motion.div className="work-image" 
              whileHover={{scale: 1.1}}
              style={imageStyle}
            ></motion.div>
            <div className="work-content">
              <h2 className="work-title">{title}</h2>
                <SkillBoxes className="work-skills" skills={skills}/>
              <div className="work-desc1">{desc1}</div>
              <div className="work-desc2">{desc2}</div>
            </div>
          </div>
        </div>
  );
}

const projects = [
  { 
    title: 'Horse Race Game', 
    skills: ['C++', 'SDL', ], 
    desc1: 'A 2D horse racing game with an integrated horse breeding system, built using SDL (Simple DirectMedia Layer). Players can race their horses, manage stats like speed and stamina, and breed horses to develop stronger generations over time. Features include randomized genetics, dynamic race outcomes, and a retro-inspired pixel art style.',
    desc2: 'Designed and programmed this game from scratch to explore game development fundamentals, simulation mechanics, and low-level graphics programming.',
    image: horse 
  },
  { 
    title: 'world', 
    skills: ['C++', 'Python'], 
    desc: 'Lorem ipsum...',
    image: img1
  },
  { 
    title: 'foo', 
    skills: ['Java', 'React'], 
    desc: 'Lorem ipsum...',
    image: '/myimage3.jpg'
  },
];
  

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
                          {projects.map((project, index) => (
                            <React.Fragment key={index}>
                            <ProjectCard 
                              title={project.title}
                              skills={project.skills}
                              desc1={project.desc1}
                              desc2={project.desc2}
                              imageStyle={{
                                ...imagebox,
                                backgroundImage: `url(${project.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }
                              }
                            />
                            {index !== projects.length - 1 && <div className="divider"></div>}
                            </React.Fragment>
                          ))}
                            

                        </div>
                    </div>
            </motion.div>
        </div>
  );
};