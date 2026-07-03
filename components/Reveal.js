"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, y = 32, className = "", style, once = true, amount = 0.2, as = "div" }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}
