// src/components/ContactForm.jsx
import { useState } from 'react';
import { motion } from "framer-motion";
import '../styles/ContactWindow.css';

function ContactForm({ openWindow }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      openWindow("Failed");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        openWindow("Success");
      } else {
        openWindow("Failed");
      }
    } catch (err) {
      openWindow("Failed");
    }
  };

      const box = {
        width: 150,
        height: 50,
        backgroundColor: "#9911ff",
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
    <form onSubmit={handleSubmit} className="contact-form">
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange} />
      <motion.button
        type="submit"
        className="submit-button"
        style={box}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
      >
        Send
      </motion.button>
    </form>
  );
}

export default ContactForm;
