import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[hsl(36,80%,50%)] via-[hsl(40,70%,65%)] to-[hsl(15,60%,50%)] origin-left z-[100] shadow-[0_0_8px_hsl(36,80%,50%,0.6)]"
    />
  );
};

export default ReadingProgressBar;