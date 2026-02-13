import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

interface TimelinePhotoProps {
  image: string;
  caption: string;
  isLeft: boolean;
}

const TimelinePhoto = ({ image, caption, isLeft }: TimelinePhotoProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Floating polaroid thumbnail */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: isLeft ? -6 : 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08, rotate: 0, y: -4 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => setExpanded(true)}
        className="relative z-20 cursor-pointer inline-block"
      >
        <div className="bg-card border border-border rounded-sm p-1.5 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300">
          <div className="w-28 h-36 md:w-36 md:h-44 overflow-hidden rounded-[2px]">
            <img
              src={image}
              alt={caption}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-[9px] md:text-[10px] text-muted-foreground font-body text-center mt-1 max-w-[112px] md:max-w-[144px] truncate">
            {caption}
          </p>
        </div>

        {/* Tape effect */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 bg-primary/20 rounded-sm rotate-[-2deg]" />
      </motion.div>

      {/* Expanded lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="photo-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-6"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card p-3 md:p-4 rounded-sm shadow-2xl max-w-sm w-full"
            >
              {/* Close button */}
              <button
                onClick={() => setExpanded(false)}
                className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-card border border-border shadow-md hover:bg-muted transition-colors z-10"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Photo */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-[2px]">
                <img
                  src={image}
                  alt={caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <p className="font-body text-sm text-foreground text-center mt-3 px-2">
                {caption}
              </p>

              {/* Decorative tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-primary/15 rounded-sm rotate-[-1deg]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TimelinePhoto;
