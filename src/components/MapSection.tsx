import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  year: string;
  era: string;
  description: string;
  articleSlug?: string;
}

const locations: MapLocation[] = [
  {
    id: "kutai",
    name: "Kerajaan Kutai",
    lat: -0.5,
    lng: 117.15,
    year: "Abad ke-4",
    era: "Hindu-Buddha",
    description:
      "Kerajaan Hindu tertua di Indonesia, terletak di tepi Sungai Mahakam, Kalimantan Timur. Dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
    articleSlug: "kerajaan-kutai",
  },
  {
    id: "sriwijaya",
    name: "Kerajaan Sriwijaya",
    lat: -2.99,
    lng: 104.76,
    year: "Abad ke-7",
    era: "Hindu-Buddha",
    description:
      "Kerajaan maritim terbesar di Asia Tenggara, berpusat di Palembang. Pusat perdagangan rempah dan pendidikan agama Buddha.",
    articleSlug: "kerajaan-sriwijaya",
  },
  {
    id: "borobudur",
    name: "Candi Borobudur",
    lat: -7.608,
    lng: 110.204,
    year: "Abad ke-8",
    era: "Hindu-Buddha",
    description:
      "Candi Buddha terbesar di dunia, dibangun oleh Dinasti Syailendra di Magelang, Jawa Tengah. Situs Warisan Dunia UNESCO.",
  },
  {
    id: "majapahit",
    name: "Kerajaan Majapahit",
    lat: -7.615,
    lng: 112.41,
    year: "1293",
    era: "Hindu-Buddha",
    description:
      "Kerajaan terluas di Nusantara di bawah Gajah Mada. Berpusat di Trowulan, Jawa Timur, menguasai hampir seluruh kepulauan.",
    articleSlug: "kerajaan-majapahit",
  },
  {
    id: "demak",
    name: "Kesultanan Demak",
    lat: -6.89,
    lng: 110.64,
    year: "Abad ke-15",
    era: "Kesultanan",
    description:
      "Kesultanan Islam pertama di Pulau Jawa, didirikan oleh Raden Patah. Pusat penyebaran Islam dengan peran penting Wali Songo.",
    articleSlug: "kesultanan-islam-nusantara",
  },
  {
    id: "ternate",
    name: "Kesultanan Ternate",
    lat: 0.78,
    lng: 127.37,
    year: "Abad ke-15",
    era: "Kesultanan",
    description:
      "Kesultanan di Maluku Utara, pusat perdagangan rempah cengkih dan pala yang menarik bangsa Eropa ke Nusantara.",
  },
  {
    id: "budiutomo",
    name: "Kebangkitan Nasional",
    lat: -6.17,
    lng: 106.85,
    year: "1908",
    era: "Pergerakan",
    description:
      "Budi Utomo didirikan di Batavia (Jakarta), organisasi modern pertama yang menandai era pergerakan nasional Indonesia.",
    articleSlug: "kebangkitan-nasional",
  },
  {
    id: "sumpahpemuda",
    name: "Sumpah Pemuda",
    lat: -6.2,
    lng: 106.83,
    year: "1928",
    era: "Pergerakan",
    description:
      "Kongres Pemuda II di Batavia menghasilkan ikrar satu tanah air, satu bangsa, dan satu bahasa: Indonesia.",
    articleSlug: "sumpah-pemuda",
  },
  {
    id: "proklamasi",
    name: "Proklamasi Kemerdekaan",
    lat: -6.19,
    lng: 106.84,
    year: "1945",
    era: "Kemerdekaan",
    description:
      "Soekarno-Hatta memproklamasikan kemerdekaan di Jl. Pegangsaan Timur 56, Jakarta, pada 17 Agustus 1945.",
    articleSlug: "proklamasi-kemerdekaan",
  },
];

const eraColors: Record<string, string> = {
  "Hindu-Buddha": "hsl(36, 80%, 50%)",
  Kesultanan: "hsl(150, 30%, 25%)",
  Pergerakan: "hsl(15, 60%, 45%)",
  Kemerdekaan: "hsl(0, 70%, 50%)",
};

const eraBadgeClass: Record<string, string> = {
  "Hindu-Buddha": "bg-primary text-primary-foreground",
  Kesultanan: "bg-secondary text-secondary-foreground",
  Pergerakan: "bg-accent text-accent-foreground",
  Kemerdekaan: "bg-destructive text-destructive-foreground",
};

const MapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<MapLocation | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const map = L.map(mapRef.current, {
      center: [-2.5, 118],
      zoom: 5,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 10,
        minZoom: 4,
      }
    ).addTo(map);

    L.control.attribution({ position: "bottomright" }).addTo(map);

    locations.forEach((loc) => {
      const color = eraColors[loc.era] || "hsl(36,80%,50%)";

      const icon = L.divIcon({
        className: "custom-map-marker",
        html: `
          <div style="
            width: 28px; height: 28px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            cursor: pointer;
            transition: transform 0.2s;
          "></div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);

      marker.bindTooltip(loc.name, {
        permanent: false,
        direction: "top",
        offset: [0, -16],
        className: "map-tooltip",
      });

      marker.on("click", () => {
        setSelected(loc);
      });
    });

    leafletMap.current = map;

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  return (
    <section className="py-24 px-6 bg-background relative" id="peta">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
            Jelajahi Nusantara
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Peta Sejarah Indonesia
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Temukan lokasi kerajaan-kerajaan dan peristiwa bersejarah yang
            membentuk peradaban Indonesia
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.entries(eraColors).map(([era, color]) => (
            <div key={era} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-border"
                style={{ background: color }}
              />
              <span className="text-xs font-body text-muted-foreground">
                {era}
              </span>
            </div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-xl overflow-hidden border border-border shadow-lg"
        >
          <div
            ref={mapRef}
            className="w-full h-[450px] md:h-[550px]"
            style={{ background: "hsl(var(--card))" }}
          />
        </motion.div>
      </div>

      {/* Info popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full ${eraBadgeClass[selected.era] || "bg-primary text-primary-foreground"}`}
                >
                  {selected.era}
                </span>
                <span className="text-sm font-body text-muted-foreground">
                  {selected.year}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <h3 className="font-display text-xl font-bold text-foreground">
                  {selected.name}
                </h3>
              </div>

              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {selected.description}
              </p>

              {selected.articleSlug && (
                <Link
                  to={`/artikel/${selected.articleSlug}`}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setSelected(null)}
                >
                  <BookOpen className="w-4 h-4" />
                  Baca artikel lengkap
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MapSection;
