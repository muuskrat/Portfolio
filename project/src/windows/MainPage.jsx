import React, { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from "framer-motion";
import { useDraggableWindow } from '../components/useDraggableWindow';
import { HoverDrawBox } from '../components/HoverDrawBox';

import { useSound } from '../components/useSound';
import openSound from '../assets/button_click.wav';
import closeSound from '../assets/button_close.wav';

// Custom Hook
const useHoverAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const handlers = {
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false),
  };
  return [isHovered, handlers];
};

// Reusable Animation Function
const getIconAnimation = (isHovered) => ({
    animate: isHovered 
      ? {
          color: ["#9911ff", "#4C4B4B", "#9911ff"],
          y: [0, -2, 0]  // small bounce up and back
        }
      : {
          color: "#4C4B4B",
          y: 0
        },
    transition: isHovered 
      ? {
          color: { duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }
      : {
          duration: 0.3
        }
  });

export const MainPage = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('MainPage');

    const playOpen = useSound(openSound);
    const playClose = useSound(closeSound);

    // One hover hook for each button
    const [aboutHovered, aboutHoverHandlers] = useHoverAnimation();
    const [linksHovered, linksHoverHandlers] = useHoverAnimation();
    const [workHovered, workHoverHandlers] = useHoverAnimation();
    const [contactHovered, contactHoverHandlers] = useHoverAnimation();
    const [resumeHovered, resumeHoverHandlers] = useHoverAnimation();

    

    const box = {
        width: 150,
        height: 150,
        color: "#4C4B4B",
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: "60px",
    };

    const WaveText = ({ text }) => {
  const letters = Array.from(text);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "loop",
      }
    }
  };

  const child = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

    return (
        <motion.span
        style={{ display: "inline-flex", overflow: "hidden" }}
        variants={container}
        initial="hidden"
        animate="visible"
        >
        {letters.map((letter, index) => (
            <motion.span
            key={index}
            variants={child}
            style={{ display: "inline-block", fontWeight: 'bold' }}
            transition={{ delay: index * 0.1 }}
            >
            {letter === " " ? "\u00A0" : letter}
            </motion.span>
        ))}
        </motion.span>
    );
    };

    return (
        
        <div style={{ ...dragStyle, zIndex, position: 'absolute' }} onPointerDown={onBringToFront} onPointerUp={handleDragEnd}>
            <motion.div
                ref={(node) => {
                    setNodeRef(node);
                    windowRef.current = node;
                }}
                className="window-box-MP"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.15, opacity: 0 }}
                transition={{ duration: 0.4, scale: { type: "spring", bounce: 0.5 } }}
                style={{ transformOrigin: 'center center' }}
            >
                <div className="window-header-MP" {...listeners} {...attributes} ref={headerRef}>
                    <strong>Mario Party</strong>
                </div>
                <button className="close-button-MP" onClick={() => {playClose(); onClose();}}>[ x ]</button>

                <div className="window-content-MP">
                    
                    
                    <h2 className='hero-name'>welcome to my website! <br /><span className="highlight-name">i'm mario</span></h2>
                    <p className="hero-more">software and web developer</p>
                   
                    
                    
                    <div className="button-pannel-mainpage">
                        
                        <HoverDrawBox>
                            <motion.button 
                                className="about-button"
                                {...aboutHoverHandlers}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.2 }}
                                style={box}
                                onClick={() => {
                                    playOpen();
                                    openWindow("About");
                                }}
                            >
                                <motion.i 
                                    className="fa-solid fa-comment"
                                    {...getIconAnimation(aboutHovered)}
                                    style={{ fontSize: "60px" }}
                                />
                                <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>
                                    about
                                </strong>
                            </motion.button>
                        </HoverDrawBox>

                        <HoverDrawBox>
                            <motion.button 
                                className="links-button"
                                {...linksHoverHandlers}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.2 }}
                                style={box}
                                onClick={() => {
                                    playOpen();
                                    openWindow("Links");
                                }}
                            >
                                <motion.i 
                                    className="fa-solid fa-link"
                                    {...getIconAnimation(linksHovered)}
                                    style={{ fontSize: "60px" }}
                                />
                                <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>
                                    links
                                </strong>
                            </motion.button>
                        </HoverDrawBox>

                        <HoverDrawBox>
                            <motion.button 
                                className="work-button"
                                {...workHoverHandlers}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.2 }}
                                style={box}
                                onClick={() => {
                                    playOpen();
                                    openWindow("Work");
                                }}
                            >
                                <motion.i 
                                    className="fa-solid fa-folder-open"
                                    {...getIconAnimation(workHovered)}
                                    style={{ fontSize: "60px" }}
                                />
                                <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>
                                    work
                                </strong>
                            </motion.button>
                        </HoverDrawBox>

                        <HoverDrawBox>
                            <motion.button 
                                className="contact-button"
                                {...contactHoverHandlers}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.2 }}
                                style={box}
                                onClick={() => {
                                    playOpen();
                                    openWindow("Contact");
                                }}
                            >
                                <motion.i 
                                    className="fa-solid fa-envelope"
                                    {...getIconAnimation(contactHovered)}
                                    style={{ fontSize: "60px" }}
                                />
                                <strong style={{ marginTop: '1px', fontSize: '14px', color: '#9911ff', fontFamily: 'Quicksand' }}>
                                    contact
                                </strong>
                            </motion.button>
                        </HoverDrawBox>
                        

                    </div>
                </div>
            </motion.div>
        </div>
    );
};
