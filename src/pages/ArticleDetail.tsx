import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Artikel Tidak Ditemukan</h1>
          <Link to="/" className="text-primary font-body hover:underline">← Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article.relatedSlugs);

  const eraColors: Record<string, string> = {
    "Hindu-Buddha": "bg-primary text-primary-foreground",
    "Kesultanan": "bg-forest text-primary-foreground",
    "Kolonial": "bg-terracotta text-primary-foreground",
    "Pergerakan": "bg-terracotta text-primary-foreground",
    "Kemerdekaan": "bg-accent text-accent-foreground",
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Article Header */}
      <section className="pt-24 pb-12 px-6 bg-gradient-warm">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/artikel"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary font-body text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Semua Artikel
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs px-3 py-1 rounded-full font-body ${eraColors[article.era] || "bg-muted text-muted-foreground"}`}>
                {article.era}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground text-sm font-body">
                <Clock className="w-3.5 h-3.5" />
                {article.year}
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
            <p className="text-muted-foreground font-body text-lg mt-4 leading-relaxed">
              {article.summary}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {article.content.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-10"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full inline-block" />
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-foreground/85 font-body leading-relaxed mb-4 text-base">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/artikel/${r.slug}`}
                  className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all bg-background"
                >
                  <span className={`text-xs px-2 py-0.5 rounded-full ${eraColors[r.era] || "bg-muted"}`}>
                    {r.era}
                  </span>
                  <h4 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-muted-foreground text-sm font-body mt-1 line-clamp-2">{r.summary}</p>
                  <span className="text-primary text-sm font-body mt-2 inline-flex items-center gap-1">
                    Baca selengkapnya <ChevronRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
    </main>
  );
};

export default ArticleDetail;
