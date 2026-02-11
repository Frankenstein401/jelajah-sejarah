import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { articles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const eras = ["Hindu-Buddha", "Kesultanan", "Kolonial", "Pergerakan", "Kemerdekaan"];

const eraColors: Record<string, string> = {
  "Hindu-Buddha": "bg-primary text-primary-foreground",
  "Kesultanan": "bg-forest text-primary-foreground",
  "Kolonial": "bg-terracotta text-primary-foreground",
  "Pergerakan": "bg-terracotta text-primary-foreground",
  "Kemerdekaan": "bg-accent text-accent-foreground",
};

const ArticleList = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12 px-6 bg-gradient-warm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Perpustakaan Sejarah</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Semua Artikel</h1>
            <p className="text-muted-foreground font-body mt-4 max-w-xl mx-auto">
              Jelajahi koleksi lengkap materi sejarah Indonesia dari berbagai era
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {eras.map((era) => {
            const eraArticles = articles.filter((a) => a.era === era);
            if (eraArticles.length === 0) return null;
            return (
              <div key={era} className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full ${eraColors[era]}`}>{era}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {eraArticles.map((article, index) => (
                    <motion.div
                      key={article.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={`/artikel/${article.slug}`}
                        className="group block p-5 rounded-lg border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all"
                      >
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-body">{article.year}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed line-clamp-2">
                          {article.summary}
                        </p>
                        <span className="text-primary text-sm font-body mt-3 inline-flex items-center gap-1">
                          Baca <ChevronRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <FooterSection />
    </main>
  );
};

export default ArticleList;
