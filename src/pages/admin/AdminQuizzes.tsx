import { motion } from "framer-motion";
import { HelpCircle, Users, TrendingUp, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dummyQuizStats } from "@/data/admin-dummy";

export default function AdminQuizzes() {
  const totalAttempts = dummyQuizStats.reduce((s, q) => s + q.attempts, 0);
  const avgAllScore = Math.round(dummyQuizStats.reduce((s, q) => s + q.avgScore, 0) / dummyQuizStats.length);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kelola Kuis</h1>
          <p className="text-sm text-muted-foreground mt-1">{dummyQuizStats.length} kuis aktif</p>
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
              <p className="text-xl font-bold text-foreground">{dummyQuizStats.length}</p>
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
              <p className="text-xl font-bold text-foreground">{totalAttempts}</p>
              <p className="text-xs text-muted-foreground">Total Percobaan</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border col-span-2 md:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{avgAllScore}%</p>
              <p className="text-xs text-muted-foreground">Rata-rata Skor</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz list */}
      <div className="grid gap-4">
        {dummyQuizStats.map((quiz, i) => (
          <motion.div
            key={quiz.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground">{quiz.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Artikel: {quiz.article}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                      <p className="font-bold text-foreground">{quiz.attempts}</p>
                      <p className="text-xs text-muted-foreground">Percobaan</p>
                    </div>
                    <div className="text-center min-w-[80px]">
                      <p className="font-bold text-foreground">{quiz.avgScore}%</p>
                      <Progress value={quiz.avgScore} className="h-1.5 mt-1" />
                    </div>
                    <Badge variant={quiz.avgScore >= 75 ? "default" : "secondary"} className={quiz.avgScore >= 75 ? "bg-secondary text-secondary-foreground" : ""}>
                      {quiz.avgScore >= 75 ? "Baik" : "Perlu Review"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
