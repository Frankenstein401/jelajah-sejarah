import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle, MessageSquare, Search, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { recentComments } from "@/data/admin-dummy";

type Status = "approved" | "pending" | "flagged";

const statusConfig: Record<Status, { label: string; class: string }> = {
  approved: { label: "Disetujui", class: "bg-secondary/10 text-secondary border-secondary/20" },
  pending: { label: "Menunggu", class: "bg-primary/10 text-primary border-primary/20" },
  flagged: { label: "Ditandai", class: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function AdminComments() {
  const [filter, setFilter] = useState<Status | "all">("all");
  const [search, setSearch] = useState("");
  const [comments, setComments] = useState(recentComments);

  const filtered = comments.filter((c) => {
    const matchFilter = filter === "all" || c.status === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.message.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: comments.length,
    approved: comments.filter((c) => c.status === "approved").length,
    pending: comments.filter((c) => c.status === "pending").length,
    flagged: comments.filter((c) => c.status === "flagged").length,
  };

  const updateStatus = (id: string, status: Status) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const removeComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Moderasi Komentar</h1>
        <p className="text-sm text-muted-foreground mt-1">{comments.length} komentar total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari komentar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved", "flagged"] as const).map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className={filter === s ? "bg-primary text-primary-foreground" : ""}
            >
              {s === "all" ? "Semua" : statusConfig[s].label} ({counts[s]})
            </Button>
          ))}
        </div>
      </div>

      {/* Comments list */}
      <div className="space-y-3">
        {filtered.map((comment, i) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">{comment.name[0]}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-foreground">{comment.name}</span>
                      <Badge variant="outline" className={statusConfig[comment.status].class + " text-xs"}>
                        {statusConfig[comment.status].label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{comment.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">pada <span className="font-medium text-foreground">{comment.article}</span></p>
                    <p className="text-sm text-foreground mt-2">{comment.message}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {comment.status !== "approved" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-secondary hover:text-secondary hover:bg-secondary/10" onClick={() => updateStatus(comment.id, "approved")}>
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    {comment.status !== "flagged" && (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" onClick={() => updateStatus(comment.id, "flagged")}>
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeComment(comment.id)}>
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
    </motion.div>
  );
}
