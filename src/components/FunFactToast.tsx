import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, X } from "lucide-react";

const funFacts = [
  "Borobudur memiliki 2.672 panel relief dan 504 arca Buddha — lebih banyak dari candi Buddha manapun di dunia! 🏛️",
  "Nama 'Indonesia' berasal dari bahasa Yunani: 'Indos' (India) + 'nesos' (pulau), berarti Kepulauan India. 🌏",
  "Sumpah Palapa Gajah Mada diucapkan sekitar tahun 1334, hampir 200 tahun sebelum Columbus menemukan Amerika! ⚔️",
  "Kerajaan Sriwijaya pernah menguasai jalur perdagangan terpenting dunia — Selat Malaka — selama 600 tahun. ⛵",
  "Teks Proklamasi Kemerdekaan Indonesia hanya terdiri dari 2 kalimat singkat, namun mengakhiri 350 tahun penjajahan. 🇮🇩",
  "Candi Prambanan dibangun hanya dalam waktu 1 malam menurut legenda — faktanya butuh sekitar 100 tahun! ✨",
  "Kata 'Nusantara' pertama kali muncul dalam Sumpah Palapa Gajah Mada, kini dipakai sebagai nama ibu kota baru RI. 🌴",
  "W.R. Supratman menciptakan lagu Indonesia Raya pada usia 25 tahun, dan pertama kali memainkannya dengan biola. 🎻",
  "Kerajaan Kutai di Kalimantan berdiri sekitar abad ke-4 M — lebih tua dari Kerajaan Romawi Barat yang runtuh! 🏺",
  "Ki Hajar Dewantara mendirikan Taman Siswa di Yogyakarta pada 1922, jauh sebelum Indonesia merdeka. 📚",
];

const FunFactToast = () => {
  const [fact, setFact] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first fact after 5 seconds
    const firstTimer = setTimeout(() => {
      setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
      setVisible(true);
    }, 5000);

    return () => clearTimeout(firstTimer);
  }, []);

  // Auto-hide after 8 seconds
  useEffect(() => {
    if (!visible) return;
    const hideTimer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(hideTimer);
  }, [visible, fact]);

  const showNext = () => {
    setVisible(false);
    setTimeout(() => {
      const remaining = funFacts.filter((f) => f !== fact);
      setFact(remaining[Math.floor(Math.random() * remaining.length)]);
      setVisible(true);
    }, 400);
  };

  return (
    <AnimatePresence>
      {visible && fact && (
        <motion.div
          key={fact}
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 80, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 right-6 z-50 max-w-xs bg-card border border-border rounded-xl shadow-xl overflow-hidden"
        >
          {/* Gold top strip */}
          <div className="h-[3px] bg-gradient-to-r from-[hsl(36,80%,50%)] to-[hsl(40,70%,65%)]" />

          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[hsl(36,80%,50%)]/15 flex items-center justify-center">
                  <Lightbulb className="w-3.5 h-3.5 text-[hsl(36,80%,50%)]" />
                </div>
                <span className="text-[10px] font-body font-semibold tracking-widest text-[hsl(36,80%,50%)] uppercase">
                  Tahukah Kamu?
                </span>
              </div>
              <button
                onClick={() => setVisible(false)}
                className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>

            {/* Fact text */}
            <p className="font-body text-sm text-foreground leading-relaxed">
              {fact}
            </p>

            {/* Next fact button */}
            <button
              onClick={showNext}
              className="mt-3 text-xs font-body text-[hsl(36,80%,50%)] hover:text-[hsl(36,80%,40%)] transition-colors flex items-center gap-1"
            >
              Fakta berikutnya →
            </button>
          </div>

          {/* Auto-hide progress bar */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-[2px] bg-[hsl(36,80%,50%)]/30 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FunFactToast;