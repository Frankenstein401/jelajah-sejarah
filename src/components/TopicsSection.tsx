import { motion } from "framer-motion";
import { Crown, Landmark, Sword, Flag, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface Topic {
  icon: React.ElementType;
  title: string;
  description: string;
  articles: number;
}

const topics: Topic[] = [
  {
    icon: Crown,
    title: "Kerajaan Hindu-Buddha",
    description: "Kutai, Tarumanagara, Sriwijaya, Majapahit, dan kerajaan-kerajaan besar lainnya",
    articles: 15,
  },
  {
    icon: Landmark,
    title: "Kesultanan Islam",
    description: "Demak, Mataram Islam, Ternate, Tidore, Aceh, dan penyebaran Islam di Nusantara",
    articles: 12,
  },
  {
    icon: Sword,
    title: "Perlawanan & Kolonialisme",
    description: "Perjuangan melawan VOC dan pemerintah Hindia Belanda selama berabad-abad",
    articles: 18,
  },
  {
    icon: Users,
    title: "Pergerakan Nasional",
    description: "Budi Utomo, Sarekat Islam, Sumpah Pemuda, dan tokoh-tokoh pergerakan",
    articles: 10,
  },
  {
    icon: Flag,
    title: "Kemerdekaan Indonesia",
    description: "Proklamasi 1945, perang kemerdekaan, dan pembentukan negara Indonesia",
    articles: 14,
  },
  {
    icon: BookOpen,
    title: "Warisan Budaya",
    description: "Candi, prasasti, naskah kuno, dan peninggalan bersejarah Nusantara",
    articles: 8,
  },
];

const TopicsSection = () => {
  return (
    <section className="py-24 px-6 bg-gradient-warm">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Topik Pembelajaran</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Jelajahi Materi
          </h2>
          <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
            Pilih topik yang ingin kamu pelajari dan mulai perjalanan sejarahmu
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to="/artikel" className="block bg-card border border-border rounded-lg p-6 h-full hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <topic.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">
                  {topic.description}
                </p>
                <p className="text-primary font-body text-xs mt-4 font-medium">
                  {topic.articles} Artikel →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
