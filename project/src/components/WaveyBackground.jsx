import { motion } from "framer-motion";

export const WavyBackground = () => {
  return (
    <motion.svg
      viewBox="0 0 1440 320"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, 
      }}
      initial={{ x: 0 }}
      animate={{ x: ["0%", "5%", "0%"] }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      }}
    >
      <path
        fill="#9f7aea"
        fillOpacity="0.4"
        
      />
    </motion.svg>
  );
};
