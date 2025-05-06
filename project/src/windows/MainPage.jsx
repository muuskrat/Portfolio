import React, { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from "framer-motion";
import { useDraggableWindow } from '../components/useDraggableWindow';
import { HoverDrawBox } from '../components/HoverDrawBox';

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

    // One hover hook for each button
    const [aboutHovered, aboutHoverHandlers] = useHoverAnimation();
    const [linksHovered, linksHoverHandlers] = useHoverAnimation();
    const [workHovered, workHoverHandlers] = useHoverAnimation();
    const [contactHovered, contactHoverHandlers] = useHoverAnimation();

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
                    <strong>Mo main Page f</strong>
                </div>
                <button className="close-button-MP" onClick={onClose}>[ x ]</button>

                <div className="window-content-MP">
                    <h2 className="hero">Welcome to my website!</h2>
                    <h3 className="hero-more">software and web developer</h3>
                    <div className="button-pannel-mainpage">
                        
                        <HoverDrawBox>
                            <motion.button 
                                className="about-button"
                                {...aboutHoverHandlers}
                                whileTap={{ scale: 0.8 }}
                                whileHover={{ scale: 1.2 }}
                                style={box}
                                onClick={() => openWindow("About")}
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
                                onClick={() => openWindow("Links")}
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
                                onClick={() => openWindow("Work")}
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
                                onClick={() => openWindow("Contact")}
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
