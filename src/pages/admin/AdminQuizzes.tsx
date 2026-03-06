import { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, Users, TrendingUp, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ITEMS_PER_PAGE = 6;

export default function AdminQuizzes() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: quizzes = [], isLoading } = useQuery({
    queryKey: ["admin-quizzes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*, articles(title), quiz_questions(id)")
        .order("title");
      if (error) throw error;
      return data || [];
    },
  });

  const totalPages = Math.ceil(quizzes.length / ITEMS_PER_PAGE);
  const paginated = quizzes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Kuis</h1>
          <p className="text-sm text-muted-foreground mt-1">{quizzes.length} kuis aktif</p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Tambah Kuis
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{quizzes.length}</p>
              <p className="text-xs text-muted-foreground">Total Kuis</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {quizzes.reduce((sum, q) => sum + ((q as any).quiz_questions?.length || 0), 0)}
              </p>
              <p className="text-xs text-muted-foreground">Total Soal</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border col-span-2 md:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">
                {quizzes.length > 0 ? Math.round(quizzes.reduce((sum, q) => sum + ((q as any).quiz_questions?.length || 0), 0) / quizzes.length) : 0}
              </p>
              <p className="text-xs text-muted-foreground">Rata-rata Soal/Kuis</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-muted-foreground">Memuat kuis...</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {paginated.map((quiz, i) => (
            <motion.div key={quiz.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{quiz.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Artikel: {(quiz as any).articles?.title || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-bold text-foreground">{(quiz as any).quiz_questions?.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Soal</p>
                      </div>
                      <Badge variant="default" className="bg-secondary text-secondary-foreground">Aktif</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, quizzes.length)} dari {quizzes.length} kuis
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
