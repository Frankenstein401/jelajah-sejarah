import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Youtube, ChevronRight } from "lucide-react";

interface VideoItem {
  id: string;
  title: string;
  channel?: string;
}

interface ArticleVideoProps {
  videos: VideoItem[];
}

const ArticleVideo = ({ videos }: ArticleVideoProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (!videos || videos.length === 0) return null;

  const active = videos[activeIndex];

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setPlaying(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="pb-16 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />

        {/* Heading */}
        <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Youtube className="w-5 h-5 text-primary" />
          Video Pembelajaran
        </h3>

        {/* Main Player — responsive container that works for both landscape & portrait */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-md bg-card">
          <div className="relative w-full bg-black flex items-center justify-center" style={{ maxHeight: "70vh" }}>
            {playing ? (
              <div className="relative w-full aspect-video">
                <iframe
                  key={active.id}
                  src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group relative w-full aspect-video"
                aria-label={`Putar video: ${active.title}`}
              >
                {/* YouTube thumbnail — object-contain ensures full visibility */}
                <img
                  src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`}
                  alt={active.title}
                  className="w-full h-full object-contain bg-black"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`;
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary shadow-lg shadow-primary/40 flex items-center justify-center"
                  >
                    <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground ml-1" fill="currentColor" />
                  </motion.div>
                </div>

                {/* YouTube badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 text-white text-[10px] font-body px-2 py-1 rounded-md">
                  <Youtube className="w-3 h-3 text-red-400" />
                  YouTube
                </div>
              </button>
            )}
          </div>

          {/* Video info bar */}
          <div className="px-4 py-3 flex items-start justify-between gap-3 bg-card">
            <div>
              <p className="font-body text-sm font-semibold text-foreground leading-snug">
                {active.title}
              </p>
              {active.channel && (
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {active.channel}
                </p>
              )}
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${active.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-body text-primary hover:underline flex items-center gap-0.5 mt-0.5"
            >
              Buka di YouTube
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Video list — tampil jika ada lebih dari 1 video */}
        {videos.length > 1 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {videos.map((v, i) => (
              <button
                key={v.id}
                onClick={() => handleSelect(i)}
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  i === activeIndex
                    ? "border-primary/50 bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:bg-muted/40"
                }`}
              >
                {/* Thumbnail kecil */}
                <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                    className="w-full h-full object-cover"
                  />
                  {i === activeIndex && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-primary" fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-body text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                    {v.title}
                  </p>
                  {v.channel && (
                    <p className="font-body text-[10px] text-muted-foreground mt-1">
                      {v.channel}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ArticleVideo;
