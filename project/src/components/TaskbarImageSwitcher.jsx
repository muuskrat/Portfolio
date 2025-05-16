import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import img1 from "../assets/image.webp";
import img2 from "../assets/pfp1.webp";
import img3 from "../assets/pfp2.webp";


export default function TaskbarImageSwitcher() {
  const images = [img1, img2, img3];
  const [index, setIndex] = useState(0);
  const [shake, setShake] = useState(false);
  const [shakeId, setShakeId] = useState(0);

  const handleClick = () => {
    setShakeId((prev) => prev + 1);
    setShake(true);
    setIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (shake) {
      const timeout = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [shake]);

  return (
    <motion.img
      key={shakeId}
      src={images[index]}
      alt="Start icon"
      onClick={handleClick}
      className="taskbar-avatar"
      whileHover={{ scale: 1.05 }}
      animate={shake ? { rotate: [0, -5, 5, -5, 5, 0] } : { rotate: 0 }}
      transition={{ duration: 0.2 }}
    />
  );
}
