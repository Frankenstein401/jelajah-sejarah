import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ChevronRight, ImageOff } from "lucide-react";
import ArticleReader from "@/components/ArticleReader";
import { useState } from "react";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { getQuizBySlug } from "@/data/quizzes";
import ArticleQuiz from "@/components/ArticleQuiz";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import BackToTop from "@/components/BackToTop";
import FunFactToast from "@/components/FunFactToast";
import FooterSection from "@/components/FooterSection";
import ArticleDecoration from "@/components/ArticleDecoration";
import ArticleDiscussion from "@/components/ArticleDiscussion";

const articleImages: Record<string, { hero: string; sections: Record<number, string> }> = {
  "kerajaan-kutai": {
    hero: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1200&q=80",
    sections: {
      3: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=900&q=80",
    },
  },
  "kerajaan-sriwijaya": {
    hero: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
    sections: {
      1: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=80",
    },
  },
  "kerajaan-tarumanagara": {
    hero: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1200&q=80",
    sections: {
      1: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=900&q=80",
    },
  },
  "kerajaan-majapahit": {
    hero: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&q=80",
    sections: {
      1: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=900&q=80",
      4: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=900&q=80",
    },
  },
  "kesultanan-demak": {
    hero: "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1200&q=80",
    sections: {
      2: "https://images.unsplash.com/photo-1585036156171-384164a8c357?w=900&q=80",
    },
  },
  "perlawanan-kolonialisme": {
    hero: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=1200&q=80",
    sections: {
      1: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=900&q=80",
    },
  },
  "kebangkitan-nasional": {
    hero: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    sections: {
      2: "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=900&q=80",
    },
  },
  "proklamasi-kemerdekaan": {
    hero: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    sections: {
      2: "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=900&q=80",
      4: "https://images.unsplash.com/photo-1568994526913-bc7ba70abc5a?w=900&q=80",
    },
  },
  "borobudur": {
    hero: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&q=80",
    sections: {
      1: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=900&q=80",
      2: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=900&q=80",
    },
  },
};

// Fallback image per era
const eraFallback: Record<string, string> = {
  "Hindu-Buddha": "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200&q=80",
  "Kesultanan": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1200&q=80",
  "Kolonial": "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=1200&q=80",
  "Pergerakan": "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&q=80",
  "Kemerdekaan": "https://images.unsplash.com/photo-1530277453888-c78fb77a5e3d?w=1200&q=80",
};

const eraColors: Record<string, string> = {
  "Hindu-Buddha": "bg-primary text-primary-foreground",
  "Kesultanan": "bg-[hsl(150,30%,25%)] text-primary-foreground",
  "Kolonial": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "Pergerakan": "bg-[hsl(15,60%,45%)] text-primary-foreground",
  "Kemerdekaan": "bg-accent text-accent-foreground",
};

// Image component with fallback
const ArticleImage = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <ImageOff className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={`object-cover rounded-lg ${className}`}
    />
  );
};

// Mini navbar for article pages - just logo
const ArticleNavbar = () => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
  >
    <div className="max-w-6xl mx-auto px-6 flex items-center h-14">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="font-display font-bold text-lg text-foreground">SejarahKita</span>
      </Link>
    </div>
  </motion.nav>
);

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Artikel Tidak Ditemukan
          </h1>
          <Link to="/" className="text-primary font-body hover:underline">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const related = getRelatedArticles(article.relatedSlugs);
  const quiz = getQuizBySlug(article.slug);
  const images = articleImages[article.slug];
  const heroSrc =
    images?.hero || eraFallback[article.era] || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Borobudur-Nothwest-view.jpg/1280px-Borobudur-Nothwest-view.jpg";

  return (
    <main className="min-h-screen bg-background">
      <ArticleNavbar />

      {/* ── Hero Image ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 md:h-[28rem] w-full overflow-hidden mt-14"
      >
        <ArticleImage
          src={heroSrc}
          alt={article.title}
          className="w-full h-full"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Era-specific decorative shapes — lives inside hero's relative container */}
        <ArticleDecoration era={article.era} />

        {/* Era badge overlay */}
        <div className="absolute bottom-6 left-6 z-[2]">
          <span className={`text-xs px-3 py-1 rounded-full font-body ${eraColors[article.era] || "bg-muted text-muted-foreground"}`}>
            {article.era}
          </span>
        </div>
      </motion.div>

      {/* ── Article Header ───────────────────────────────────────────── */}
      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/artikel"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary font-body text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Semua Artikel
            </Link>

            <div className="flex items-center gap-3 mb-4">
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

            {/* Divider */}
            <div className="mt-8 h-px bg-gradient-to-r from-primary/40 via-border to-transparent" />

            {/* Audio Reader */}
            <div className="mt-6">
              <ArticleReader sections={article.content} title={article.title} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article Content ──────────────────────────────────────────── */}
      <section className="pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          {article.content.map((section, index) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full inline-block shrink-0" />
                {section.heading}
              </h2>

              {/* Section image (if defined for this index) */}
              {images?.sections?.[index] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index + 0.1 }}
                  className="mb-5 overflow-hidden rounded-xl border border-border shadow-sm"
                >
                  <ArticleImage
                    src={images.sections[index]}
                    alt={section.heading}
                    className="w-full h-52 md:h-64"
                  />
                  <p className="text-center text-xs text-muted-foreground font-body py-2 bg-card">
                    {section.heading} — ilustrasi pendukung
                  </p>
                </motion.div>
              )}

              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-foreground/85 font-body leading-relaxed mb-4 text-base"
                >
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Quiz Section ────────────────────────────────────────────── */}
      {quiz && (
        <section className="pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />
              <ArticleQuiz key={article.slug} quiz={quiz} articleTitle={article.title} />
            </motion.div>
          </div>
        </section>
      )}

      {/* ── Related Articles ─────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-card border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Artikel Terkait
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => {
                const relImg =
                  articleImages[r.slug]?.hero ||
                  eraFallback[r.era] ||
                  "";
                return (
                  <Link
                    key={r.slug}
                    to={`/artikel/${r.slug}`}
                    className="group rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all bg-background overflow-hidden"
                  >
                    {relImg && (
                      <div className="h-32 overflow-hidden">
                        <ArticleImage
                          src={relImg}
                          alt={r.title}
                          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${eraColors[r.era] || "bg-muted"}`}
                      >
                        {r.era}
                      </span>
                      <h4 className="font-display text-lg font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                        {r.title}
                      </h4>
                      <p className="text-muted-foreground text-sm font-body mt-1 line-clamp-2">
                        {r.summary}
                      </p>
                      <span className="text-primary text-sm font-body mt-2 inline-flex items-center gap-1">
                        Baca selengkapnya <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <FooterSection />
      <ReadingProgressBar />
      <BackToTop />
      <FunFactToast />
    </main>
  );
};

export default ArticleDetail;