import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Era-specific SVG shapes
const eraShapes: Record<string, { bg: React.ReactNode; accent: React.ReactNode }> = {
  "Hindu-Buddha": {
    bg: (
      <svg viewBox="0 0 120 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="32" rx="13" ry="18" />
        <polygon points="47,20 52,4 60,12 68,4 73,20" />
        <path d="M44 50 Q28 72 24 102 L96 102 Q92 72 76 50Z" />
        <rect x="18" y="102" width="84" height="18" rx="2" />
        <rect x="8" y="120" width="104" height="14" rx="2" />
        <rect x="4" y="134" width="112" height="62" rx="3" />
      </svg>
    ),
    accent: (
      <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="34" />
        <circle cx="40" cy="40" r="8" fill="currentColor" stroke="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            key={a}
            x1="40"
            y1="40"
            x2={40 + 29 * Math.cos((a * Math.PI) / 180)}
            y2={40 + 29 * Math.sin((a * Math.PI) / 180)}
          />
        ))}
      </svg>
    ),
  },
  "Kesultanan": {
    bg: (
      <svg viewBox="0 0 120 180" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 178 L8 96 Q60 8 112 96 L112 178Z" />
        <ellipse cx="60" cy="12" rx="9" ry="14" />
        <rect x="22" y="110" width="76" height="68" />
        <rect x="36" y="118" width="18" height="32" />
        <rect x="66" y="118" width="18" height="32" />
      </svg>
    ),
    accent: (
      <svg viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 4 A36 36 0 1 0 40 76 A26 26 0 1 1 40 4Z" />
        <polygon points="61,18 64,29 75,29 66,36 70,47 61,40 52,47 56,36 47,29 58,29" />
      </svg>
    ),
  },
  "Kolonial": {
    bg: (
      <svg viewBox="0 0 110 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="55,4 4,52 106,52" />
        <rect x="8" y="52" width="94" height="108" />
        <rect x="14" y="62" width="24" height="32" fill="white" opacity="0.15" />
        <rect x="72" y="62" width="24" height="32" fill="white" opacity="0.15" />
        <rect x="38" y="100" width="34" height="60" fill="white" opacity="0.1" />
        <rect x="4" y="48" width="102" height="8" />
      </svg>
    ),
    accent: (
      <svg viewBox="0 0 40 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5 Q12 18 18 32 Q12 46 18 60 Q12 74 20 90" />
      </svg>
    ),
  },
  "Pergerakan": {
    bg: (
      <svg viewBox="0 0 100 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 4 Q18 20 18 72 L50 84 L82 72 Q82 20 50 4Z" opacity="0.85" />
        <path d="M32 84 L32 136 L68 136 L68 84Z" />
        <path d="M37 84 L37 78 Q50 60 63 78 L63 84Z" />
      </svg>
    ),
    accent: (
      <svg viewBox="0 0 70 90" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="28" y="4" width="14" height="56" rx="3" />
        <polygon points="28,60 42,60 48,78 22,78" />
        <rect x="12" y="28" width="46" height="5" rx="2" />
        <rect x="12" y="40" width="46" height="5" rx="2" />
      </svg>
    ),
  },
  "Kemerdekaan": {
    bg: (
      <svg viewBox="0 0 110 130" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="4" width="7" height="122" rx="2" />
        <rect x="13" y="7" width="84" height="38" />
        <rect x="13" y="45" width="84" height="38" opacity="0.4" />
      </svg>
    ),
    accent: (
      <svg viewBox="0 0 80 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="40,4 47,26 70,26 52,40 59,62 40,48 21,62 28,40 10,26 33,26" />
      </svg>
    ),
  },
};

interface ArticleDecorationProps {
  era: string;
  containerRef?: React.RefObject<HTMLElement>;
}

const ArticleDecoration = ({ era, containerRef }: ArticleDecorationProps) => {
  const fallbackRef = useRef(null);
  const targetRef = containerRef || fallbackRef;

  const { scrollYProgress } = useScroll({
    target: targetRef as React.RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-30%", "40%"]);
  const accentY = useTransform(scrollYProgress, [0, 1], ["20%", "-30%"]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [-3, 5]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

  const shapes = eraShapes[era] || eraShapes["Hindu-Buddha"];

  return (
    <>
      {/* Large background watermark — top-right of hero */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2, x: 30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        style={{ y: bgY, rotate: bgRotate, scale: bgScale }}
        className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none select-none z-[1]"
        aria-hidden="true"
      >
        <div className="w-52 h-52 md:w-72 md:h-72 text-white/[0.06]">
          {shapes.bg}
        </div>
      </motion.div>

      {/* Accent shape — floats bottom-left with inverse parallax */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        style={{ y: accentY }}
        className="absolute left-8 md:left-20 bottom-20 md:bottom-24 pointer-events-none select-none z-[1]"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 md:w-14 md:h-14 text-white/[0.14]"
        >
          {shapes.accent}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ArticleDecoration;
