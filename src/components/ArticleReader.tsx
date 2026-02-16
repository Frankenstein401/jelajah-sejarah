import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Pause, Play, SkipForward } from "lucide-react";

interface ArticleReaderProps {
  sections: { heading: string; paragraphs: string[] }[];
  title: string;
}

const ArticleReader = ({ sections, title }: ArticleReaderProps) => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [supported, setSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
    }
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Reset on content change
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsReading(false);
    setIsPaused(false);
    setCurrentSection(0);
  }, [title]);

  const speakSection = useCallback((sectionIndex: number) => {
    if (sectionIndex >= sections.length) {
      setIsReading(false);
      setIsPaused(false);
      setCurrentSection(0);
      return;
    }

    const section = sections[sectionIndex];
    const text = `${section.heading}. ${section.paragraphs.join(". ")}`;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Try to use Indonesian voice
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find((v) => v.lang.startsWith("id")) || voices.find((v) => v.lang.startsWith("ms"));
    if (idVoice) utterance.voice = idVoice;

    utterance.onend = () => {
      const next = sectionIndex + 1;
      if (next < sections.length) {
        setCurrentSection(next);
        speakSection(next);
      } else {
        setIsReading(false);
        setIsPaused(false);
        setCurrentSection(0);
      }
    };

    utteranceRef.current = utterance;
    setCurrentSection(sectionIndex);
    window.speechSynthesis.speak(utterance);
  }, [sections]);

  const handleStart = () => {
    setIsReading(true);
    setIsPaused(false);
    speakSection(0);
  };

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
    setCurrentSection(0);
  };

  const handleSkip = () => {
    window.speechSynthesis.cancel();
    const next = currentSection + 1;
    if (next < sections.length) {
      setCurrentSection(next);
      speakSection(next);
    } else {
      handleStop();
    }
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
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleSkip}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border text-muted-foreground transition-colors"
              title="Bagian berikutnya"
            >
              <SkipForward className="w-3.5 h-3.5" />
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
                {sections[currentSection]?.heading}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArticleReader;
