import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TimelinePhoto from "./timeline/TimelinePhoto";

import kutaiImg from "@/assets/timeline/kutai.jpg";
import sriwijayaImg from "@/assets/timeline/sriwijaya.jpg";
import borobudurImg from "@/assets/timeline/borobudur.jpg";
import majapahitImg from "@/assets/timeline/majapahit.jpg";
import kesultananImg from "@/assets/timeline/kesultanan.jpg";
import kebangkitanImg from "@/assets/timeline/kebangkitan.jpg";
import sumpahpemudaImg from "@/assets/timeline/sumpahpemuda.jpg";
import proklamasiImg from "@/assets/timeline/proklamasi.jpg";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  era: string;
  detail: string;
  significance: string[];
  figures?: string[];
  image: string;
  imageCaption: string;
}

const events: TimelineEvent[] = [
  {
    year: "Abad ke-4",
    title: "Kerajaan Kutai",
    era: "Hindu-Buddha",
    description: "Kerajaan Hindu tertua di Indonesia, terletak di Kalimantan Timur. Dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
    detail: "Kerajaan Kutai Martadipura adalah kerajaan bercorak Hindu tertua di Indonesia yang berdiri sekitar abad ke-4 Masehi. Kerajaan ini terletak di tepi Sungai Mahakam, Kalimantan Timur. Bukti keberadaannya ditemukan melalui 7 prasasti Yupa yang ditulis dalam aksara Pallawa dan bahasa Sansekerta.",
    significance: [
      "Kerajaan Hindu pertama di wilayah Nusantara",
      "Peninggalan prasasti Yupa sebagai bukti tertua pengaruh India",
      "Raja Mulawarman dikenal dermawan dengan persembahan 20.000 ekor sapi",
    ],
    figures: ["Raja Kudungga", "Raja Aswawarman", "Raja Mulawarman"],
    image: kutaiImg,
    imageCaption: "Prasasti Yupa, Kalimantan Timur",
  },
  {
    year: "Abad ke-7",
    title: "Kerajaan Sriwijaya",
    era: "Hindu-Buddha",
    description: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang. Pusat perdagangan dan pendidikan agama Buddha.",
    detail: "Kerajaan Sriwijaya adalah kerajaan maritim yang berpusat di Palembang, Sumatera Selatan. Berdiri sekitar abad ke-7, kerajaan ini tumbuh menjadi kekuatan besar di Asia Tenggara berkat posisi strategisnya di jalur perdagangan internasional antara India dan Cina.",
    significance: [
      "Pusat perdagangan rempah terbesar di Asia Tenggara",
      "Pusat pendidikan agama Buddha kelas dunia",
      "Menguasai jalur pelayaran Selat Malaka selama berabad-abad",
    ],
    figures: ["Raja Dapunta Hyang Sri Jayanasa", "Balaputradewa", "I-Tsing (pendeta Cina yang mencatat perjalanannya)"],
  },
  {
    year: "Abad ke-8",
    title: "Pembangunan Borobudur",
    era: "Hindu-Buddha",
    description: "Candi Buddha terbesar di dunia dibangun oleh Dinasti Syailendra. Mahakarya arsitektur yang menjadi kebanggaan Indonesia.",
    detail: "Candi Borobudur dibangun oleh Dinasti Syailendra pada abad ke-8 hingga ke-9 Masehi. Dibangun menggunakan sekitar 2 juta blok batu andesit tanpa perekat, candi ini memiliki 2.672 panel relief dan 504 patung Buddha. Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO dan merupakan monumen Buddha terbesar di dunia.",
    significance: [
      "Candi Buddha terbesar di dunia",
      "Situs Warisan Dunia UNESCO sejak 1991",
      "Menggambarkan perjalanan menuju pencerahan dalam 10 tingkat",
    ],
  },
  {
    year: "1293",
    title: "Kerajaan Majapahit",
    era: "Hindu-Buddha",
    description: "Kerajaan terbesar di Nusantara di bawah Mahapatih Gajah Mada, dengan Sumpah Palapa yang menyatukan wilayah Nusantara.",
    detail: "Kerajaan Majapahit didirikan oleh Raden Wijaya pada tahun 1293 M setelah berhasil mengusir pasukan Mongol dari tanah Jawa. Pada masa kejayaannya di bawah pemerintahan Raja Hayam Wuruk dan Mahapatih Gajah Mada (abad ke-14), Majapahit menguasai hampir seluruh wilayah Nusantara.",
    significance: [
      "Kerajaan terluas dalam sejarah Indonesia",
      "Sumpah Palapa Gajah Mada menyatukan Nusantara",
      "Kitab Nagarakretagama mencatat kejayaan wilayah kekuasaan",
    ],
    figures: ["Raden Wijaya", "Hayam Wuruk", "Mahapatih Gajah Mada", "Tribhuwana Tunggadewi"],
  },
  {
    year: "Abad ke-15",
    title: "Kesultanan Islam Nusantara",
    era: "Kesultanan",
    description: "Penyebaran Islam meluas dengan berdirinya Kesultanan Demak, Ternate, dan Tidore sebagai pusat kekuasaan baru.",
    detail: "Pada abad ke-15, Islam mulai menyebar luas di Nusantara melalui jalur perdagangan. Kesultanan Demak menjadi kerajaan Islam pertama di Jawa, sementara Ternate dan Tidore di Maluku menjadi pusat perdagangan rempah sekaligus penyebaran Islam di kawasan timur Indonesia. Wali Songo berperan penting dalam penyebaran Islam secara damai di Jawa.",
    significance: [
      "Islam masuk melalui jalur perdagangan secara damai",
      "Wali Songo menyebarkan Islam dengan pendekatan budaya lokal",
      "Masjid Agung Demak menjadi simbol kekuatan Islam di Jawa",
    ],
    figures: ["Raden Patah", "Sultan Baab Ullah", "Wali Songo"],
  },
  {
    year: "1908",
    title: "Kebangkitan Nasional",
    era: "Pergerakan",
    description: "Budi Utomo didirikan sebagai organisasi modern pertama, menandai era pergerakan nasional menuju kemerdekaan.",
    detail: "Pada tanggal 20 Mei 1908, dr. Wahidin Soedirohoesodo dan dr. Soetomo mendirikan Budi Utomo di Batavia (Jakarta). Ini merupakan organisasi modern pertama di Hindia Belanda yang bertujuan meningkatkan martabat rakyat melalui pendidikan. Tanggal berdirinya kini diperingati sebagai Hari Kebangkitan Nasional.",
    significance: [
      "Organisasi modern pertama di Indonesia",
      "Cikal bakal gerakan kebangsaan Indonesia",
      "20 Mei diperingati sebagai Hari Kebangkitan Nasional",
    ],
    figures: ["dr. Wahidin Soedirohoesodo", "dr. Soetomo", "dr. Cipto Mangunkusumo"],
  },
  {
    year: "1928",
    title: "Sumpah Pemuda",
    era: "Pergerakan",
    description: "Pemuda dari berbagai suku bersumpah satu tanah air, satu bangsa, dan satu bahasa: Indonesia.",
    detail: "Kongres Pemuda II yang berlangsung pada 27–28 Oktober 1928 di Batavia menghasilkan ikrar bersejarah yang dikenal sebagai Sumpah Pemuda. Dalam kongres ini, para pemuda dari berbagai daerah menyatakan bertanah air satu, berbangsa satu, dan menjunjung bahasa persatuan: Indonesia.",
    significance: [
      "Mempersatukan pemuda dari berbagai suku dan daerah",
      "Bahasa Indonesia ditetapkan sebagai bahasa persatuan",
      "28 Oktober diperingati sebagai Hari Sumpah Pemuda",
    ],
    figures: ["Muhammad Yamin", "Sugondo Djojopuspito", "WR Soepratman (pencipta Indonesia Raya)"],
  },
  {
    year: "1945",
    title: "Proklamasi Kemerdekaan",
    era: "Kemerdekaan",
    description: "Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945, lahirnya Republik Indonesia.",
    detail: "Pada tanggal 17 Agustus 1945 pukul 10.00 WIB, Ir. Soekarno membacakan teks Proklamasi Kemerdekaan Indonesia di Jalan Pegangsaan Timur No. 56, Jakarta. Didampingi Drs. Mohammad Hatta, momen bersejarah ini menandai berakhirnya penjajahan dan lahirnya Republik Indonesia sebagai negara merdeka.",
    significance: [
      "Berakhirnya 350 tahun penjajahan Belanda dan 3,5 tahun Jepang",
      "Lahirnya Republik Indonesia sebagai negara merdeka",
      "17 Agustus diperingati sebagai Hari Kemerdekaan Indonesia",
    ],
    figures: ["Ir. Soekarno", "Drs. Mohammad Hatta", "Fatmawati (penjahit bendera)"],
  },
];

const eraColorMap: Record<string, { bg: string; border: string; badge: string; glow: string }> = {
  "Hindu-Buddha": {
    bg: "from-primary/20 via-transparent to-gold/10",
    border: "border-primary/40",
    badge: "bg-primary",
    glow: "shadow-primary/20",
  },
  "Kesultanan": {
    bg: "from-[hsl(150,30%,25%)]/20 via-transparent to-primary/10",
    border: "border-[hsl(150,30%,25%)]/40",
    badge: "bg-[hsl(150,30%,25%)]",
    glow: "shadow-[hsl(150,30%,25%)]/20",
  },
  "Pergerakan": {
    bg: "from-[hsl(15,60%,45%)]/20 via-transparent to-accent/10",
    border: "border-[hsl(15,60%,45%)]/40",
    badge: "bg-[hsl(15,60%,45%)]",
    glow: "shadow-[hsl(15,60%,45%)]/20",
  },
  "Kemerdekaan": {
    bg: "from-accent/20 via-transparent to-primary/10",
    border: "border-accent/40",
    badge: "bg-accent",
    glow: "shadow-accent/20",
  },
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const TimelineModal = ({
  event,
  onClose,
}: {
  event: TimelineEvent;
  onClose: () => void;
}) => {
  const colors = eraColorMap[event.era] || eraColorMap["Hindu-Buddha"];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Panel */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-card border border-border rounded-xl max-w-lg w-full overflow-hidden shadow-2xl"
        >
          {/* Header gradient strip */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${colors.bg}`} />

          {/* Glow bg */}
          <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${colors.bg} blur-2xl opacity-40 pointer-events-none`} />

          <div className="relative z-10 p-6">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Badge + Year */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full text-primary-foreground ${colors.badge}`}>
                {event.era}
              </span>
              <span className="text-sm font-body text-muted-foreground">{event.year}</span>
            </div>

            {/* Title */}
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              {event.title}
            </h3>

            {/* Detail paragraph */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
              {event.detail}
            </p>

            {/* Significance */}
            <div className="mb-4">
              <p className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-2">
                Signifikansi Sejarah
              </p>
              <ul className="flex flex-col gap-1.5">
                {event.significance.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key figures */}
            {event.figures && (
              <div className="mb-5">
                <p className="font-display text-xs font-semibold text-foreground tracking-widest uppercase mb-2">
                  Tokoh Utama
                </p>
                <div className="flex flex-wrap gap-2">
                  {event.figures.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Link
              to="/artikel"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={onClose}
            >
              <BookOpen className="w-4 h-4" />
              Baca artikel lengkap
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Timeline Item ─────────────────────────────────────────────────────────────
const TimelineItem = ({
  event,
  index,
  onClick,
}: {
  event: TimelineEvent;
  index: number;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;
  const colors = eraColorMap[event.era] || eraColorMap["Hindu-Buddha"];

  return (
    <div
      ref={ref}
      className={`flex items-center w-full mb-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-8`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <motion.div
          whileHover={{ scale: 1.03, y: -6 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClick}
          className="relative group bg-card p-6 rounded-lg border border-border cursor-pointer overflow-hidden"
        >
          {/* Gradient glow on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 bg-gradient-to-br ${colors.bg} blur-xl`}
          />

          {/* Shimmer */}
          <motion.div
            initial={{ x: isLeft ? "-100%" : "100%" }}
            whileHover={{ x: isLeft ? "100%" : "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />

          {/* Border glow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-lg border-2 ${colors.border}`}
          />

          <div className="relative z-10">
            <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
              <span className={`text-xs px-2 py-0.5 rounded-full text-primary-foreground ${colors.badge}`}>
                {event.era}
              </span>
              <span className="text-sm font-body text-muted-foreground">{event.year}</span>
            </div>

            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>

            <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
              {event.description}
            </p>

            {/* Click hint */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`mt-3 flex items-center gap-1 text-xs text-primary font-medium ${isLeft ? "md:justify-end" : ""}`}
            >
              <span>Lihat detail</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
          </div>

          {/* Corner decoration */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            whileHover={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.4 }}
            className={`absolute ${isLeft ? "top-0 right-0" : "top-0 left-0"} w-16 h-16 opacity-20 ${colors.badge} ${isLeft ? "rounded-bl-full" : "rounded-br-full"}`}
          />
        </motion.div>
      </motion.div>

      {/* Timeline dot */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative"
        >
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-4 h-4 bg-primary rounded-full"
          />
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg shadow-primary/20" />
        </motion.div>
      </div>

      <div className="hidden md:block w-5/12" />
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────
const TimelineSection = () => {
  const [selected, setSelected] = useState<TimelineEvent | null>(null);

  return (
    <section className="py-24 px-6 bg-background relative" id="linimasa">
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
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="timeline-line hidden md:block origin-top"
          />

          {events.map((event, index) => (
            <TimelineItem
              key={event.title}
              event={event}
              index={index}
              onClick={() => setSelected(event)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <TimelineModal event={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
};

export default TimelineSection;