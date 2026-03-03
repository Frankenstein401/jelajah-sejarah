import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, Eye, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/data/articles";

const eraColors: Record<string, string> = {
  "Hindu-Buddha": "bg-primary/10 text-primary border-primary/20",
  "Kesultanan Islam": "bg-secondary/10 text-secondary border-secondary/20",
  "Kolonial": "bg-accent/10 text-accent border-accent/20",
  "Kemerdekaan": "bg-destructive/10 text-destructive border-destructive/20",
  "Pergerakan Nasional": "bg-muted text-muted-foreground border-border",
};

export default function AdminArticles() {
  const [search, setSearch] = useState("");

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.era.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Artikel</h1>
          <p className="text-sm text-muted-foreground mt-1">{articles.length} artikel tersedia</p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Cari artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <Card className="border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Judul</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Era</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Periode</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Sections</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((article, i) => (
                  <motion.tr
                    key={article.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{article.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 md:hidden">{article.era}</p>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <Badge variant="outline" className={eraColors[article.era] || "border-border text-muted-foreground"}>
                        {article.era}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell">{article.year}</td>
                    <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell">{article.content.length}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">Tidak ada artikel ditemukan.</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
