import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
}

const events: TimelineEvent[] = [
  {
    year: "Abad ke-4",
    title: "Kerajaan Kutai",
    era: "Hindu-Buddha",
    description: "Kerajaan Hindu tertua di Indonesia, terletak di Kalimantan Timur. Dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
  },
  {
    year: "Abad ke-7",
    title: "Kerajaan Sriwijaya",
    era: "Hindu-Buddha",
    description: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang. Pusat perdagangan dan pendidikan agama Buddha.",
  },
  {
    year: "Abad ke-8",
    title: "Pembangunan Borobudur",
    era: "Hindu-Buddha",
    description: "Candi Buddha terbesar di dunia dibangun oleh Dinasti Syailendra. Mahakarya arsitektur yang menjadi kebanggaan Indonesia.",
  },
  {
    year: "1293",
    title: "Kerajaan Majapahit",
    era: "Hindu-Buddha",
    description: "Kerajaan terbesar di Nusantara di bawah Mahapatih Gajah Mada, dengan Sumpah Palapa yang menyatukan wilayah Nusantara.",
  },
  {
    year: "Abad ke-15",
    title: "Kesultanan Islam Nusantara",
    era: "Kesultanan",
    description: "Penyebaran Islam meluas dengan berdirinya Kesultanan Demak, Ternate, dan Tidore sebagai pusat kekuasaan baru.",
  },
  {
    year: "1908",
    title: "Kebangkitan Nasional",
    era: "Pergerakan",
    description: "Budi Utomo didirikan sebagai organisasi modern pertama, menandai era pergerakan nasional menuju kemerdekaan.",
  },
  {
    year: "1928",
    title: "Sumpah Pemuda",
    era: "Pergerakan",
    description: "Pemuda dari berbagai suku bersumpah satu tanah air, satu bangsa, dan satu bahasa: Indonesia.",
  },
  {
    year: "1945",
    title: "Proklamasi Kemerdekaan",
    era: "Kemerdekaan",
    description: "Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945, lahirnya Republik Indonesia.",
  },
];

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  const eraColors: Record<string, string> = {
    "Hindu-Buddha": "bg-primary",
    "Kesultanan": "bg-forest",
    "Pergerakan": "bg-terracotta",
    "Kemerdekaan": "bg-accent",
  };

  return (
    <div ref={ref} className={`flex items-center w-full mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-colors duration-300 group cursor-pointer">
          <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
            <span className={`text-xs px-2 py-0.5 rounded-full text-primary-foreground ${eraColors[event.era] || "bg-muted"}`}>
              {event.era}
            </span>
            <span className="text-sm font-body text-muted-foreground">{event.year}</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">
            {event.description}
          </p>
        </div>
      </motion.div>

      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/20"
        />
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  );
};

const TimelineSection = () => {
  return (
    <section className="py-24 px-6 bg-background relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Perjalanan Waktu</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Linimasa Sejarah
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Ikuti perjalanan panjang peradaban Indonesia dari era kerajaan hingga kemerdekaan
          </p>
        </motion.div>

        <div className="relative">
          <div className="timeline-line hidden md:block" />
          {events.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
