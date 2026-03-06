import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, MessageSquare, Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAllDiscussions, useDeleteDiscussion } from "@/hooks/useDiscussions";
import { toast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 8;

const formatTime = (ts: string | null) => {
  if (!ts) return "";
  const now = Date.now();
  const diff = now - new Date(ts).getTime();
  if (diff < 60000) return "Baru saja";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
  return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
};

export default function AdminComments() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: comments = [], isLoading } = useAllDiscussions();
  const deleteDiscussion = useDeleteDiscussion();

  useEffect(() => { setCurrentPage(1); }, [search]);

  const filtered = comments.filter((c) => {
    return c.name.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (id: string, articleId: string) => {
    if (!confirm("Hapus komentar ini?")) return;
    try {
      await deleteDiscussion.mutateAsync({ id, article_id: articleId });
      toast({ title: "Komentar dihapus" });
    } catch {
      toast({ title: "Gagal menghapus", variant: "destructive" });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Moderasi Komentar</h1>
        <p className="text-sm text-muted-foreground mt-1">{comments.length} komentar total</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari komentar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Memuat komentar...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {paginated.map((comment, i) => (
            <motion.div key={comment.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{comment.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-foreground">{comment.name}</span>
                        <span className="text-xs text-muted-foreground">{formatTime(comment.created_at)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        pada <span className="font-medium text-foreground">{(comment as any).articles?.title || "—"}</span>
                      </p>
                      <p className="text-sm text-foreground mt-2">{comment.message}</p>
                      {comment.parent_id && (
                        <p className="text-xs text-muted-foreground mt-1 italic">↳ Balasan</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(comment.id, comment.article_id)} disabled={deleteDiscussion.isPending}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
              <MessageSquare className="w-8 h-8 text-muted-foreground/40" />
              Tidak ada komentar ditemukan.
            </div>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} komentar
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}><ChevronLeft className="w-4 h-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button key={page} variant={page === currentPage ? "default" : "outline"} size="icon" className={`h-8 w-8 text-sm ${page === currentPage ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setCurrentPage(page)}>{page}</Button>
            ))}
            <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
