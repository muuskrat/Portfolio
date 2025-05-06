import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.1 },
    },
  },
};

export function HoverDrawBox({ children }) {
  return (
    <motion.div
      style={{ position: 'relative', display: 'inline-block' }}
      initial="hidden"
      whileHover="visible"
    >
      {children}

      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        <motion.rect
          width="100"
          height="100"
          rx="10"
          stroke="#DADDD8"
          variants={draw}
          style={{
            strokeWidth: 4,
            strokeLinecap: "round",
            fill: "transparent",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
