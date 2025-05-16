import { useState } from 'react';
import { motion } from "framer-motion";
import '../styles/ContactWindow.css';

function ContactForm({ openWindow }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false); // new state to control button

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return; // Prevent double submit while disabled

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      openWindow("Failed");
      return;
    }

    setIsSending(true); // disable button on send

    try {
      const response = await fetch('https://portfolio-ab5n.onrender.com/api/send-email', {
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

    // Re-enable send button after 3 seconds
    setTimeout(() => {
      setIsSending(false);
    }, 3000);
  };

  const box = {
    width: 150,
    height: 50,
    backgroundColor: isSending ? "#555" : "#9911ff", // visually indicate disabled
    borderRadius: 5,
    color: "white",
    border: "none",
    cursor: isSending ? "not-allowed" : "pointer",
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
        whileTap={isSending ? {} : { scale: 0.9 }}
        whileHover={isSending ? {} : { scale: 1.05 }}
        disabled={isSending}
      >
        {isSending ? "Sending..." : "Send"}
      </motion.button>
    </form>
  );
}

export default ContactForm;
