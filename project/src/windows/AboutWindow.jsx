import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, createBox } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import img1 from '../assets/image.png';
import img2 from '../assets/horse.png';



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
    const images = [
        img1,
        img2
    ];

    const [imageIndex, setImageIndex] = useState(0);
    const [shake, setShake] = useState(false);
    const [shakeId, setShakeId] = useState(0);

    const handleImageClick = () => {
        setShakeId(prev => prev + 1); // trigger re-render of motion.img
        setShake(true); // start shaking animation
        setImageIndex((prev) => (prev + 1) % images.length); // switch to next image
        
    };

    useEffect(() => {
    if (shake) {
        const timer = setTimeout(() => setShake(false), 500);
        return () => clearTimeout(timer);
    }
    }, [shake]);

  

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
                            <div className="about-image">
                                <motion.img
                                    key={shakeId}
                                    src={images[imageIndex]}
                                    alt="Mario Orlando"
                                    onClick={handleImageClick}
                                    className="about-image"
                                    whileHover={{ scale: 1.01 }}
                                    animate={shake ? { rotate: [0, -5, 5, -5, 5, 0] } : { rotate: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        borderRadius: "20px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        marginRight: "1rem",
                                    }}
                                />
                            </div>
                            <div className="about-title">
                                <h1 className='my-name'>Mario Orlando</h1>
                                <p>california based software engineer and web developer <br /> 
                                    software engineer at Evu</p>
                            </div>
                        </div>

                        <div className="about-info">
                                <div className="info-intro">
                                    hi! i'm mario, a computer science graduate with experince in 
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
                                        <p className='degree'>University of California Riverside  <br/>
                                            Bachelor's of Science in Computer Science</p>
                            
                                        <p className='year'>(Graduated 2023)</p>
                                    </div>
                                </div>

                                <div className="info-other-interests">
                                    <h2 className="title">OTHER INTERESTS</h2>
                                    <ul>
                                        <li>learning about emerging tech</li>
                                        <li>game development</li>
                                        <li>physics based software</li>
                                        <li>drawing anatomy and landscapes</li>
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