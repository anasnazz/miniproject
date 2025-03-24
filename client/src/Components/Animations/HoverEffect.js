import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const HoverEffect = ({
  children,
  distance = 150, // How far the effect reaches
  magnification = 1.5, // Max scale on hover
  baseScale = 1, // Normal scale
  springConfig = { mass: 0.1, stiffness: 150, damping: 12 }, // Smooth animation
  className = "",
}) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(Infinity);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return val - rect.x - rect.width / 2; // Distance from center
  });

  const targetScale = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseScale, magnification, baseScale] // Scale based on distance
  );
  const scale = useSpring(targetScale, springConfig); // Smooth animation

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale }}
      onMouseMove={({ pageX }) => mouseX.set(pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {children}
    </motion.div>
  );
};

export default HoverEffect;
