import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

interface ArticleDiscussionProps {
  slug: string;
  articleTitle: string;
}

const STORAGE_KEY = (slug: string) => `discussions_${slug}`;

const ArticleDiscussion = ({ slug, articleTitle }: ArticleDiscussionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY(slug));
      if (stored) setComments(JSON.parse(stored));
      else setComments([]);
    } catch {
      setComments([]);
    }
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimName = name.trim();
    const trimMsg = message.trim();
    if (!trimName || !trimMsg) return;

    const newComment: Comment = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: trimName,
      message: trimMsg,
      timestamp: Date.now(),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(STORAGE_KEY(slug), JSON.stringify(updated));
    setMessage("");
  };

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - ts;
    if (diff < 60000) return "Baru saja";
    if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <section className="pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />

        <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Diskusi
          {comments.length > 0 && (
            <span className="text-sm font-body text-muted-foreground font-normal">
              ({comments.length})
            </span>
          )}
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <input
            type="text"
            placeholder="Nama kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <textarea
            placeholder="Tulis komentar atau pertanyaan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={3}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <button
            type="submit"
            disabled={!name.trim() || !message.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            Kirim
          </button>
        </form>

        {/* Comments */}
        {comments.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm text-center py-8">
            Belum ada komentar. Jadilah yang pertama berdiskusi!
          </p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {comments.map((c) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground">
                      {c.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-body ml-auto">
                      {formatTime(c.timestamp)}
                    </span>
                  </div>
                  <p className="font-body text-sm text-foreground/85 leading-relaxed pl-9">
                    {c.message}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleDiscussion;
