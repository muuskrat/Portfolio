import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import '../styles/WorkWindow.css';
import img1 from '../assets/image.png';
import horse from '../assets/horse.png';
import ballphy from '../assets/ballphy.png';
import aitic from '../assets/aitic.png';
import atmega from '../assets/atmega.png';
import blog from '../assets/blog.png';
import thisweb from '../assets/thisweb.png';
import BannerSkills from '../components/BannerSkills';

import { useSound } from '../components/useSound';
import openSound from '../assets/button_click.wav';
import closeSound from '../assets/button_close.wav';

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

  const playOpen = useSound(openSound);
  const playClose = useSound(closeSound);

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
    title: 'AI Tic-Tac-Toe', 
    skills: ['Python', 'Algorithms'], 
    desc1: 'A classic Tic-Tac-Toe game written in Python, featuring an AI opponent powered by the minimax algorithm. The game supports one human and one AI, and includes dynamic board creation, win detection, and recursive game state evaluation.',
    desc2: 'This project was a hands-on exploration of AI decision trees, recursion, and turn-based game logic. It demonstrates how strategic AI can be implemented with a simple yet powerful algorithm like minimax.',
    image: aitic
  },
    { 
    title: 'Embedded Systems Project', 
    skills: ['C', 'ATMEGA'], 
    desc1: 'A real-time reaction-based combat game built in C for an embedded system using a joystick and LCD display.',
    desc2: 'This project helped me gain hands-on experience with low-level hardware control, user input handling, and creating engaging gameplay mechanics under tight system constraints.',
    image: atmega
  },
  
    { 
    title: 'FullStack Blog App', 
    skills: ['JS', 'React', 'Node.js', 'HTML', 'CSS'], 
    desc1: 'A simple and responsive blog application built with React',
    desc2: 'sers can browse all blog posts, read individual entries, and create new posts. The app uses RESTful API calls to interact with the backend, making it a complete experience.',
    image: blog
  },
    { 
    title: 'Horse Race Game', 
    skills: ['C++', 'SDL', ], 
    desc1: 'A 2D horse racing game with an integrated horse breeding system, built using SDL (Simple DirectMedia Layer). ',
    desc2: 'Designed and programmed this game from scratch to explore game development fundamentals, simulation mechanics, and low-level graphics programming.',
    image: horse 
  },
  { 
    title: 'Physics Engine', 
    skills: ['JS', 'HTML'], 
    desc1: 'A lightweight 2D physics engine written in JavaScript. It simulates realistic movement and collisions',
    desc2: 'Used this project to deepen my understanding of physics simulation and JavaScript performance. It is a hands-on implementation of core physics concepts, with a focus on simplicity, flexibility, and visual feedback.',     
    image: ballphy
  },
  { 
    title: 'This Website!', 
    skills: ['JS', 'React', 'Node.js', 'HTML', 'CSS'], 
    desc1: 'It features draggable windows, smooth animations, and playful styling',
    desc2: 'Built to showcase my projects and skills in a unique way, blending classic game aesthetics with modern web development tools like React and Framer Motion.',
    image: thisweb
  },
];
/*
  { 
    title: 'foo', 
    skills: ['Java', 'React'], 
    desc1: 'Lorem ipsum...',
    desc2: '',
    image: img1
  },
  */
  

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
                    <button className="close-button-MP" onClick={() => {playClose(); onClose();}}>[ x ]</button>

                    <div className="window-content-work">
                        <h2>Development Skills</h2>
                        <BannerSkills />
                        <div class="divider"></div>
                        <h2>Personal Projects</h2>
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