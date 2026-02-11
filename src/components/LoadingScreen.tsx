import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onFinish: () => void;
}

const LoadingScreen = ({ onFinish }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Increment progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Fade out after ~1.8s
    const timeout = setTimeout(() => {
      setVisible(false);
      setTimeout(onFinish, 600);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(25,20%,8%)] overflow-hidden"
        >
          {/* Background texture dots */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(36,80%,50%) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Glow orb behind wayang */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute w-64 h-64 rounded-full bg-[hsl(36,80%,50%)] blur-3xl"
          />

          {/* Wayang Silhouette SVG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 mb-8"
          >
            <svg
              width="120"
              height="180"
              viewBox="0 0 120 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_20px_hsl(36,80%,50%,0.6)]"
            >
              {/* Head */}
              <ellipse cx="60" cy="28" rx="16" ry="20" fill="hsl(36,80%,50%)" />
              {/* Crown / Makuta */}
              <polygon points="44,14 52,2 60,10 68,2 76,14" fill="hsl(36,70%,40%)" />
              <rect x="50" y="8" width="20" height="8" rx="2" fill="hsl(36,80%,55%)" />
              {/* Face features */}
              <ellipse cx="52" cy="30" rx="3" ry="4" fill="hsl(25,20%,8%)" opacity="0.6" />
              {/* Nose pointy (wayang style) */}
              <path d="M60 22 Q56 34 54 36" stroke="hsl(25,20%,8%)" strokeWidth="1.5" fill="none" opacity="0.5" />
              {/* Neck */}
              <rect x="56" y="46" width="8" height="12" rx="2" fill="hsl(36,70%,45%)" />
              {/* Body */}
              <path
                d="M38 58 Q30 70 28 90 Q26 110 32 125 L46 122 L44 96 L56 100 L64 100 L76 96 L74 122 L88 125 Q94 110 92 90 Q90 70 82 58 Z"
                fill="hsl(36,65%,40%)"
              />
              {/* Chest decoration */}
              <ellipse cx="60" cy="78" rx="10" ry="12" fill="hsl(36,80%,50%)" opacity="0.7" />
              <circle cx="60" cy="74" r="3" fill="hsl(25,20%,8%)" opacity="0.5" />
              {/* Left arm flowing */}
              <path
                d="M38 62 Q18 70 10 88 Q8 96 14 102 Q16 98 22 94 Q28 90 34 84 L40 76 Z"
                fill="hsl(36,65%,40%)"
              />
              <path
                d="M14 102 Q6 114 10 124 Q14 118 20 116"
                stroke="hsl(36,70%,45%)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right arm up (wayang gesture) */}
              <path
                d="M82 62 Q102 70 110 88 Q112 96 106 102 Q104 98 98 94 Q92 90 86 84 L80 76 Z"
                fill="hsl(36,65%,40%)"
              />
              <path
                d="M106 102 Q114 114 110 124 Q106 118 100 116"
                stroke="hsl(36,70%,45%)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Sarong / Kain */}
              <path
                d="M32 122 Q34 148 36 165 Q44 170 60 170 Q76 170 84 165 Q86 148 88 122 Z"
                fill="hsl(36,55%,35%)"
              />
              {/* Sarong pattern lines */}
              <line x1="44" y1="125" x2="42" y2="165" stroke="hsl(36,80%,50%)" strokeWidth="1" opacity="0.4" />
              <line x1="60" y1="125" x2="60" y2="170" stroke="hsl(36,80%,50%)" strokeWidth="1" opacity="0.4" />
              <line x1="76" y1="125" x2="78" y2="165" stroke="hsl(36,80%,50%)" strokeWidth="1" opacity="0.4" />
              {/* Feet */}
              <ellipse cx="44" cy="167" rx="10" ry="5" fill="hsl(36,60%,35%)" />
              <ellipse cx="76" cy="167" rx="10" ry="5" fill="hsl(36,60%,35%)" />
            </svg>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 text-center mb-8"
          >
            <h1 className="font-display font-bold text-3xl text-[hsl(35,30%,97%)] tracking-wide">
              SejarahKita
            </h1>
            <p className="font-body text-xs tracking-[0.35em] text-[hsl(36,80%,50%)] uppercase mt-1">
              Warisan Nusantara
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 w-48 h-0.5 bg-[hsl(25,15%,20%)] rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[hsl(36,80%,50%)] to-[hsl(40,70%,65%)] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.03 }}
            />
          </motion.div>

          {/* Spinning ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-[hsl(25,15%,25%)] border-t-[hsl(36,80%,50%)] rounded-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;