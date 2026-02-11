import { motion } from "framer-motion";
import heroImage from "@/assets/hero-history.jpg";
import { BookOpen, Clock, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <img
        src={heroImage}
        alt="Candi bersejarah Indonesia saat golden hour"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gold-light font-body text-sm tracking-[0.3em] uppercase mb-4"
        >
          Jelajahi Warisan Nusantara
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl font-bold text-parchment leading-tight max-w-4xl"
        >
          Sejarah Indonesia
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-parchment/80 font-body text-lg md:text-xl max-w-2xl mt-6"
        >
          Perjalanan melalui ribuan tahun peradaban, kerajaan, dan perjuangan bangsa Indonesia
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-6 mt-10"
        >
          {[
            { icon: BookOpen, label: "12+ Materi" },
            { icon: Clock, label: "Ribuan Tahun" },
            { icon: MapPin, label: "Seluruh Nusantara" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-parchment/70">
              <item.icon className="w-4 h-4 text-gold" />
              <span className="text-sm font-body">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-parchment/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gold rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
