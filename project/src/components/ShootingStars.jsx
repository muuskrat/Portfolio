import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import "../styles/ShootingStars.css";

const ShootingStars = () => {
  const [shootingStars, setShootingStars] = useState([]);

  // Static twinkling stars (60 for better performance)
  const staticStars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 10,
      intensity: Math.floor(Math.random() * 10 + 5),
    }));
  }, []);

  // Predefined angles to reduce per-frame randomness
  const angleClasses = ["angle-1", "angle-2", "angle-3"];

  // Shooting stars
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newStar = {
        id,
        left: Math.random() * 100,
        top: Math.random() * 50,
        speed: 0.4 + Math.random() * 1,
        glow: Math.floor(Math.random() * 20 + 10),
        angleClass: angleClasses[Math.floor(Math.random() * angleClasses.length)],
      };

      setShootingStars((prev) => {
        if (prev.length > 2) return prev; // cap active stars
        return [...prev, newStar];
      });

      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== id));
      }, newStar.speed * 1000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shooting-stars-container">
      {/* Static stars */}
      {staticStars.map((star) => (
        <div
          key={star.id}
          className="twinkling-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            boxShadow: `0 0 ${star.intensity}px white`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className={`shooting-star ${star.angleClass}`}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ x: 300, y: 300, opacity: 0 }}
          transition={{
            duration: star.speed,
            ease: "easeOut",
          }}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            boxShadow: `0 0 ${star.glow}px white`,
          }}
        />
      ))}
    </div>
  );
};

export default ShootingStars;
