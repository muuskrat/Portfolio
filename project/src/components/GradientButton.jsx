import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";
import "./GradientButton.css"; // import your CSS file

export const GradientButton = ({
  children,
  onClick,
  className = "",
  colors = ["#0cdcf7", "#ff0088", "#fff312", "#0cdcf7"],
  ...rest
}) => {
  const buttonRef = useRef(null);
  const gradientX = useMotionValue(0.5);
  const gradientY = useMotionValue(0.5);

  const gradientStops = colors.join(", ");

  const background = useTransform(
    [gradientX, gradientY],
    ([x, y]) =>
      `conic-gradient(from 0deg at ${x * 100}% ${y * 100}%, ${gradientStops})`
  );

  const handlePointerMove = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    gradientX.set((e.clientX - rect.left) / rect.width);
    gradientY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.button
      ref={buttonRef}
      onPointerMove={handlePointerMove}
      onClick={onClick}
      whileTap={{ scale: 0.8 }}
      whileHover={{ scale: 1.1 }}
      style={{ background }}
      className={`gradient-button ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
