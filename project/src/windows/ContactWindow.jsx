import React, { useState } from 'react';
import { motion } from "framer-motion"; 
import { useDraggableWindow } from '../components/useDraggableWindow';
import ContactForm from '../components/ContactForm';
import emailPic from '../assets/email.jpg';
import '../styles/ContactWindow.css';

export const Contact = ({ onClose, onBringToFront, zIndex, openWindow }) => {
    const {
        windowRef,
        headerRef,
        dragStyle,
        handleDragEnd,
        attributes,
        listeners,
        setNodeRef
    } = useDraggableWindow('Contact');

    const [copied, setCopied] = useState(false);
    const email = "mariogon858@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the tooltip after 2 seconds
    };

    const box = {
        width: 150,
        height: 50,
        backgroundColor: "#8D6B94",
        borderRadius: 5,
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }

    return (
        <div style={{ ...dragStyle, zIndex, position: 'absolute' }} onPointerDown={onBringToFront} onPointerUp={handleDragEnd}>
            <motion.div
                ref={(node) => {
                    setNodeRef(node);
                    windowRef.current = node;
                }}
                className="window-box-contact"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .15, opacity: 0 }}
                transition={{ duration: 0.4, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 } }}
                style={{ transformOrigin: 'center center' }}
            >
                <div className="window-header-contact" {...listeners} {...attributes} ref={headerRef}>
                    <strong>Contact</strong>
                </div>
                <button className="close-button-contact" onClick={onClose}>[ x ]</button>
                <div className="window-content-contact">
                    <h2 className="mail-title">yayy mail!</h2>
                    <div className="contact-info">
                        
                        <div className="left-side">
                            
                            <p>the easiest way to contact me is through my email!</p>
                            <p>i check my email pretty frequently so expect a response lightning fast if i like what you sent me (: </p>
                            <img
                                src={emailPic}
                                alt="Contact Icon"
                                style={{ width: '100px', marginTop: '1rem' }}
                            />
                            <p className="email-hover-text">(this could be YOU writing ME an email!)</p>
                            <p>
                                email me at:{" "}
                                <div
                                    className="email-container"
                                    onClick={handleCopy}
                                >
                                    {email}
                                    <div className="email-tooltip">
                                        {copied ? "copied!" : "click to copy"}
                                    </div>
                                </div>
                            </p>
                        </div>

                        <div className="right-side">
                            
                                
                            <p>or fill out the form below</p>


                            <ContactForm openWindow={openWindow} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
