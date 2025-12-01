import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  type?: AnimationType;
  className?: string;
}

const getAnimationProps = (type: AnimationType, direction: string) => {
  const distance = 60;
  
  switch (type) {
    case "fade":
      return {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 }
      };
    case "slide-up":
      return {
        initial: { opacity: 0, y: distance },
        whileInView: { opacity: 1, y: 0 }
      };
    case "slide-down":
      return {
        initial: { opacity: 0, y: -distance },
        whileInView: { opacity: 1, y: 0 }
      };
    case "slide-left":
      return {
        initial: { opacity: 0, x: distance },
        whileInView: { opacity: 1, x: 0 }
      };
    case "slide-right":
      return {
        initial: { opacity: 0, x: -distance },
        whileInView: { opacity: 1, x: 0 }
      };
    case "scale":
      return {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 }
      };
    case "blur":
      return {
        initial: { opacity: 0, filter: "blur(10px)", y: 30 },
        whileInView: { opacity: 1, filter: "blur(0px)", y: 0 }
      };
    default:
      switch (direction) {
        case "up": 
          return {
            initial: { opacity: 0, y: distance },
            whileInView: { opacity: 1, y: 0 }
          };
        case "down": 
          return {
            initial: { opacity: 0, y: -distance },
            whileInView: { opacity: 1, y: 0 }
          };
        case "left": 
          return {
            initial: { opacity: 0, x: distance },
            whileInView: { opacity: 1, x: 0 }
          };
        case "right": 
          return {
            initial: { opacity: 0, x: -distance },
            whileInView: { opacity: 1, x: 0 }
          };
        default: 
          return {
            initial: { opacity: 0, y: distance },
            whileInView: { opacity: 1, y: 0 }
          };
      }
  }
};

export default function ScrollReveal({ 
  children, 
  delay = 0,
  duration = 0.7,
  direction = "up",
  type = "slide-up",
  className = ""
}: ScrollRevealProps) {
  const animationProps = getAnimationProps(type, direction);

  return (
    <motion.div
      className={className}
      initial={animationProps.initial}
      whileInView={animationProps.whileInView}
      viewport={{ 
        once: true, 
        amount: 0.15
      }}
      transition={{ 
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealStagger({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  delay = 0
}: { 
  children: ReactNode; 
  className?: string;
  staggerDelay?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        amount: 0.1
      }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className = "",
  type = "slide-up"
}: {
  children: ReactNode;
  className?: string;
  type?: AnimationType;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: type === "slide-up" ? 40 : 0, x: type === "slide-left" ? 40 : type === "slide-right" ? -40 : 0, scale: type === "scale" ? 0.9 : 1 },
        visible: { opacity: 1, y: 0, x: 0, scale: 1 }
      }}
      transition={{ 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
