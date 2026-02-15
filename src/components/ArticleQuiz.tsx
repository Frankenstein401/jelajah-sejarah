import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Trophy, BookOpen, ArrowRight, Brain } from "lucide-react";
import type { Quiz } from "@/data/quizzes";

interface ArticleQuizProps {
  quiz: Quiz;
  articleTitle: string;
}

const ArticleQuiz = ({ quiz, articleTitle }: ArticleQuizProps) => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  // Reset quiz state when quiz (article) changes
  useEffect(() => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers(Array(quiz.questions.length).fill(null));
    setFinished(false);
  }, [quiz]);

  const q = quiz.questions[current];
  const isCorrect = selected === q.correctIndex;
  const total = quiz.questions.length;

  const score = useMemo(() => {
    if (!finished) return 0;
    return answers.reduce<number>((acc, a, i) => acc + (a === quiz.questions[i].correctIndex ? 1 : 0), 0);
  }, [finished, answers, quiz.questions]);

  const percentage = Math.round((score / total) * 100);

  const handleConfirm = () => {
    setConfirmed(true);
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers(Array(total).fill(null));
    setFinished(false);
    setStarted(false);
  };

  const getGrade = () => {
    if (percentage >= 90) return { label: "Luar Biasa! 🏆", color: "text-primary", suggestion: "Kamu menguasai materi ini dengan sangat baik!" };
    if (percentage >= 70) return { label: "Bagus! 👏", color: "text-primary", suggestion: "Coba baca ulang bagian yang salah untuk pemahaman sempurna." };
    if (percentage >= 50) return { label: "Cukup Baik 📖", color: "text-[hsl(var(--gold))]", suggestion: "Baca kembali artikel terutama bagian yang belum dipahami." };
    return { label: "Perlu Belajar Lagi 💪", color: "text-accent", suggestion: "Baca ulang seluruh artikel dengan teliti, lalu coba kuis ini lagi!" };
  };

  // Start screen
  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Uji Pemahamanmu!</h3>
        <p className="text-muted-foreground font-body mb-1">
          {total} soal pilihan ganda tentang
        </p>
        <p className="text-foreground font-display font-semibold mb-6">{articleTitle}</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStarted(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-colors"
        >
          Mulai Kuis
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    );
  }

  // Result screen
  if (finished) {
    const grade = getGrade();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-8 text-center">
          <Trophy className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="font-display text-2xl font-bold text-foreground mb-1">Hasil Kuis</h3>
          <p className={`font-display text-lg font-semibold ${grade.color}`}>{grade.label}</p>
        </div>

        {/* Score */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-foreground">{score}/{total}</p>
              <p className="text-muted-foreground font-body text-sm">Jawaban Benar</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <p className="font-display text-4xl font-bold text-primary">{percentage}%</p>
              <p className="text-muted-foreground font-body text-sm">Skor</p>
            </div>
          </div>

          {/* Study suggestion */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-sm font-body text-foreground flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span><strong>Saran:</strong> {grade.suggestion}</span>
            </p>
          </div>
        </div>

        {/* Review answers */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          <p className="font-display text-sm font-semibold text-foreground tracking-widest uppercase mb-2">Pembahasan</p>
          {quiz.questions.map((question, i) => {
            const wasCorrect = answers[i] === question.correctIndex;
            return (
              <div key={i} className={`p-3 rounded-lg border ${wasCorrect ? "border-primary/30 bg-primary/5" : "border-accent/30 bg-accent/5"}`}>
                <div className="flex items-start gap-2">
                  {wasCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{i + 1}. {question.question}</p>
                    {!wasCorrect && (
                      <p className="font-body text-xs text-accent mt-1">
                        Jawabanmu: {question.options[answers[i] ?? 0]}
                      </p>
                    )}
                    <p className="font-body text-xs text-muted-foreground mt-1">{question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Retry */}
        <div className="p-6 border-t border-border text-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary/90 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Coba Lagi
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Quiz question screen
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Progress */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <span className="text-sm font-body text-muted-foreground">Soal {current + 1} dari {total}</span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i < current ? "bg-primary" : i === current ? "bg-primary/60" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-6 h-1 bg-muted rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="px-6 pb-6"
        >
          <h4 className="font-display text-lg font-semibold text-foreground mb-5">
            {q.question}
          </h4>

          <div className="space-y-2.5">
            {q.options.map((option, i) => {
              const isSelected = selected === i;
              const isAnswer = i === q.correctIndex;
              let style = "border-border hover:border-primary/40 hover:bg-primary/5";

              if (confirmed) {
                if (isAnswer) style = "border-primary bg-primary/10";
                else if (isSelected && !isCorrect) style = "border-accent bg-accent/10";
                else style = "border-border opacity-50";
              } else if (isSelected) {
                style = "border-primary bg-primary/5 ring-1 ring-primary/20";
              }

              return (
                <motion.button
                  key={i}
                  whileHover={!confirmed ? { scale: 1.01 } : {}}
                  whileTap={!confirmed ? { scale: 0.99 } : {}}
                  disabled={confirmed}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left p-3.5 rounded-lg border-2 transition-all font-body text-sm flex items-center gap-3 ${style}`}
                >
                  <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-semibold shrink-0 ${
                    confirmed && isAnswer
                      ? "border-primary bg-primary text-primary-foreground"
                      : confirmed && isSelected && !isCorrect
                      ? "border-accent bg-accent text-accent-foreground"
                      : isSelected
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-foreground">{option}</span>
                  {confirmed && isAnswer && <CheckCircle2 className="w-4 h-4 text-primary ml-auto shrink-0" />}
                  {confirmed && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-accent ml-auto shrink-0" />}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation after confirm */}
          <AnimatePresence>
            {confirmed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 rounded-lg bg-muted/50 border border-border"
              >
                <p className="font-body text-sm text-muted-foreground">
                  <strong className="text-foreground">Penjelasan:</strong> {q.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="mt-5 flex justify-end gap-3">
            {!confirmed ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={selected === null}
                onClick={handleConfirm}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-body font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Jawab
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-body font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                {current < total - 1 ? "Soal Berikutnya" : "Lihat Hasil"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ArticleQuiz;
