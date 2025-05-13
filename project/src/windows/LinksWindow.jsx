"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion";
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

    const ref = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const gradientX = useMotionValue(0.5);
    const gradientY = useMotionValue(0.5);

    const background = useTransform(() =>
        `conic-gradient(from 0deg at calc(${gradientX.get() * 100}% - ${dimensions.left}px) calc(${gradientY.get() * 100}% - ${dimensions.top}px), #0cdcf7, #ff0088, #fff312, #0cdcf7)`
    );

    const measure = () => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setDimensions({
                width: rect.width,
                height: rect.height,
                top: rect.top,
                left: rect.left
            });
        }
    };

    useEffect(() => {
        measure();
    }, []);

    const handlePointerMove = (e) => {
        if (dimensions.width && dimensions.height) {
            gradientX.set(e.clientX / dimensions.width);
            gradientY.set(e.clientY / dimensions.height);
        }
    };

    const buttonStyle = {
        width: 75,
        height: 75,
        borderRadius: 5,
        background: background,
        border: "2px solid #fff",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const labelStyle = {
        marginTop: '1px',
        fontSize: '14px',
        color: '#fff',
        fontFamily: 'Quicksand',
    };

    return (
        <div
            style={{ ...dragStyle, zIndex, position: 'absolute' }}
            onPointerDown={onBringToFront}
            onPointerUp={handleDragEnd}
            onPointerMove={handlePointerMove}
        >
            <motion.div
                ref={(node) => {
                    setNodeRef(node);
                    windowRef.current = node;
                    ref.current = node;
                }}
                className="window-box-links"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.15, opacity: 0 }}
                transition={{
                    duration: 0.4,
                    scale: { type: "spring", bounce: 0.5 }
                }}
                style={{ transformOrigin: 'center center' }}
                onPointerEnter={measure}
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
                        style={buttonStyle}
                        onClick={() => window.open('https://github.com/muuskrat', '_blank')}
                    >
                        <FaGithub style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={labelStyle}>github</strong>
                    </motion.button>

                    <motion.button
                        className="linkedin-button"
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                        style={buttonStyle}
                        onClick={() => window.open('https://www.linkedin.com/in/mario-orlando-mmo/', '_blank')}
                    >
                        <FaLinkedin style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={labelStyle}>linkedIn</strong>
                    </motion.button>

                    <motion.button
                        className="email-button"
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                        style={buttonStyle}
                        onClick={() => openWindow("Contact")}
                    >
                        <FaEnvelope style={{ fontSize: "60px", color: "#fff" }} />
                        <strong style={labelStyle}>contact</strong>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};
