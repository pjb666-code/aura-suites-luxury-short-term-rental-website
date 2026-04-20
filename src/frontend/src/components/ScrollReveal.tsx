import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    up: {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    left: {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    right: {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  const { initial, animate } = variants[direction];

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
