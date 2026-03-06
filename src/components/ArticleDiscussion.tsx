import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, User, AlertTriangle, Reply, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useDiscussions, useAddDiscussion, type DiscussionComment } from "@/hooks/useDiscussions";

const COMMENTS_PER_PAGE = 5;

const PROFANITY = [
  "anjing","anjir","anjrit","bangsat","babi","bajingan","keparat","goblok",
  "tolol","kampret","brengsek","sialan","monyet","ngentot","jancok","jancuk",
  "jancik","asu","taik","tai","kontol","memek","puki","lonte","pelacur",
  "sundal","titit","pepek","ngentod","entot","cok","cuk","dancok","dancuk",
  "kimak","pantek","pukimak","bedebah","setan","iblis","celeng",
];

const filterProfanity = (text: string): { filtered: string; hasProfanity: boolean } => {
  let result = text;
  let hasProfanity = false;
  PROFANITY.forEach((word) => {
    const regex = new RegExp(`(?<![a-z])${word}(?![a-z])`, "gi");
    if (regex.test(result)) {
      hasProfanity = true;
      result = result.replace(regex, "*".repeat(word.length));
    }
  });
  return { filtered: result, hasProfanity };
};

const formatTime = (ts: string | null) => {
  if (!ts) return "";
  const now = Date.now();
  const diff = now - new Date(ts).getTime();
  if (diff < 60000) return "Baru saja";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};

interface ArticleDiscussionProps {
  articleId: string;
  articleTitle: string;
}

const ReplyForm = ({ onSubmit, onCancel }: { onSubmit: (name: string, message: string) => void; onCancel: () => void }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    onSubmit(name.trim(), message.trim());
    setName("");
    setMessage("");
  };

  return (
    <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} onSubmit={handleSubmit} className="mt-3 ml-9 space-y-2">
      <input type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      <textarea placeholder="Tulis balasan..." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={500} rows={2} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      <div className="flex items-center gap-2">
        <button type="submit" disabled={!name.trim() || !message.trim()} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-body text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          <Send className="w-3 h-3" /> Balas
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-1.5 rounded-lg text-xs font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Batal</button>
      </div>
    </motion.form>
  );
};

const CommentItem = ({ comment, articleId, depth = 0 }: { comment: DiscussionComment; articleId: string; depth?: number }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [warning, setWarning] = useState(false);
  const addDiscussion = useAddDiscussion();
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReply = (name: string, message: string) => {
    const { filtered: filteredMsg, hasProfanity: msgProf } = filterProfanity(message);
    const { filtered: filteredName } = filterProfanity(name);
    setWarning(msgProf);

    addDiscussion.mutate({
      article_id: articleId,
      name: filteredName,
      message: filteredMsg,
      parent_id: comment.id,
    });
    setReplyOpen(false);
    setShowReplies(true);
  };

  const totalReplies = (c: DiscussionComment): number =>
    (c.replies?.length || 0) + (c.replies?.reduce((sum, r) => sum + totalReplies(r), 0) || 0);

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={depth > 0 ? "ml-9 mt-3" : ""}>
      <div className={`rounded-xl border border-border bg-card p-4 ${depth > 0 ? "bg-muted/30" : ""}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${depth > 0 ? "bg-accent/20" : "bg-primary/10"}`}>
            <User className={`w-3.5 h-3.5 ${depth > 0 ? "text-accent-foreground" : "text-primary"}`} />
          </div>
          <span className="font-body text-sm font-semibold text-foreground">{comment.name}</span>
          <span className="text-[10px] text-muted-foreground font-body">•</span>
          <span className="text-xs text-muted-foreground font-body ml-auto">{formatTime(comment.created_at)}</span>
        </div>
        <p className="font-body text-sm text-foreground/85 leading-relaxed pl-9">{comment.message}</p>
        {depth < 2 && (
          <div className="pl-9 mt-2 flex items-center gap-3">
            <button onClick={() => setReplyOpen(!replyOpen)} className="inline-flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-primary transition-colors">
              <Reply className="w-3 h-3" /> Balas
            </button>
            {hasReplies && (
              <button onClick={() => setShowReplies(!showReplies)} className="inline-flex items-center gap-1 text-xs font-body text-muted-foreground hover:text-foreground transition-colors">
                {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                {totalReplies(comment)} balasan
              </button>
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {replyOpen && <ReplyForm onSubmit={handleReply} onCancel={() => setReplyOpen(false)} />}
      </AnimatePresence>
      {warning && (
        <p className="flex items-center gap-1.5 text-xs font-body text-amber-600 dark:text-amber-400 mt-1 ml-9">
          <AlertTriangle className="w-3 h-3 shrink-0" /> Balasan mengandung kata tidak pantas dan telah disensor.
        </p>
      )}
      <AnimatePresence initial={false}>
        {showReplies && hasReplies && comment.replies!.map((reply) => (
          <CommentItem key={reply.id} comment={reply} articleId={articleId} depth={depth + 1} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

const ArticleDiscussion = ({ articleId, articleTitle }: ArticleDiscussionProps) => {
  const { data: comments = [], isLoading } = useDiscussions(articleId);
  const addDiscussion = useAddDiscussion();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [profanityWarning, setProfanityWarning] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = (list: DiscussionComment[]): number =>
    list.reduce((sum, c) => sum + 1 + (c.replies ? totalCount(c.replies) : 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimName = name.trim();
    const trimMsg = message.trim();
    if (!trimName || !trimMsg) return;

    const { filtered: filteredMsg, hasProfanity } = filterProfanity(trimMsg);
    const { filtered: filteredName } = filterProfanity(trimName);
    setProfanityWarning(hasProfanity);

    addDiscussion.mutate({
      article_id: articleId,
      name: filteredName,
      message: filteredMsg,
    });
    setCurrentPage(1);
    setName("");
    setMessage("");
  };

  return (
    <section className="pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-10" />
        <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" /> Diskusi
          {totalCount(comments) > 0 && <span className="text-sm font-body text-muted-foreground font-normal">({totalCount(comments)})</span>}
        </h3>

        <form onSubmit={handleSubmit} className="mb-8 space-y-3">
          <input type="text" placeholder="Nama kamu" value={name} onChange={(e) => setName(e.target.value)} maxLength={50} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <textarea placeholder="Tulis komentar atau pertanyaan..." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={1000} rows={3} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          <button type="submit" disabled={!name.trim() || !message.trim() || addDiscussion.isPending} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            {addDiscussion.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Kirim
          </button>
          <AnimatePresence>
            {profanityWarning && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-xs font-body text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Komentar mengandung kata tidak pantas dan telah disensor otomatis.
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Memuat diskusi...</span>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm text-center py-8">Belum ada komentar. Jadilah yang pertama berdiskusi!</p>
        ) : (() => {
          const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
          const paginated = comments.slice((currentPage - 1) * COMMENTS_PER_PAGE, currentPage * COMMENTS_PER_PAGE);
          return (
            <>
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {paginated.map((c) => <CommentItem key={c.id} comment={c} articleId={articleId} />)}
                </AnimatePresence>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Sebelumnya
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-sm font-body transition-colors ${page === currentPage ? "bg-primary text-primary-foreground font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>{page}</button>
                    ))}
                  </div>
                  <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    Berikutnya <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </section>
  );
};

export default ArticleDiscussion;
