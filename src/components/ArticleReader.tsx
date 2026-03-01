import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";

interface ArticleReaderProps {
  sections: { heading: string; paragraphs: string[] }[];
  title: string;
}

const ArticleReader = ({ sections, title }: ArticleReaderProps) => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
    }
    window.speechSynthesis?.getVoices();
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsReading(false);
    setIsPaused(false);
  }, [title]);

  const handleStart = useCallback(() => {
    const fullText = sections
      .map((s) => `${s.heading}. ${s.paragraphs.join(". ")}`)
      .join(". ");

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const idVoice =
      voices.find((v) => v.lang.startsWith("id")) ||
      voices.find((v) => v.lang.startsWith("ms")) ||
      voices[0];
    if (idVoice) utterance.voice = idVoice;

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      if ((e as SpeechSynthesisErrorEvent).error === "interrupted") return;
      setIsReading(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    setIsReading(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  }, [sections]);

  const handlePause = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  };

  if (!supported) return null;

  return (
    <div className="mb-8">
      <AnimatePresence mode="wait">
        {!isReading ? (
          <motion.button
            key="start"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-body text-sm font-medium transition-colors border border-primary/20"
          >
            <Volume2 className="w-4 h-4" />
            Dengarkan Artikel
          </motion.button>
        ) : (
          <motion.div
            key="controls"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex items-center gap-3 px-4 py-2.5 bg-card border border-border rounded-lg"
          >
            <button
              onClick={handlePause}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5" />
              ) : (
                <Pause className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={handleStop}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border text-muted-foreground transition-colors"
              title="Berhenti"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
            <div className="ml-1">
              <p className="text-xs font-body text-muted-foreground">
                {isPaused ? "Dijeda" : "Membacakan"}
              </p>
              <p className="text-xs font-body text-foreground font-medium truncate max-w-[180px]">
                {title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleReader;
