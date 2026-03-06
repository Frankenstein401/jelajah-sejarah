import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Eye, FileText, MessageSquare, Clock, ArrowUpRight, ArrowDownRight, Database, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { visitorData, topArticles, trafficSources, statsOverview, deviceData } from "@/data/admin-dummy";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import { useArticles } from "@/hooks/useArticles";
import { useAllDiscussions } from "@/hooks/useDiscussions";
import { seedDatabase } from "@/lib/seed-database";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const COLORS = ["hsl(36, 80%, 50%)", "hsl(150, 30%, 25%)", "hsl(15, 60%, 45%)", "hsl(25, 20%, 40%)"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AdminDashboard() {
  const { data: articles = [] } = useArticles();
  const { data: discussions = [] } = useAllDiscussions();
  const [seeding, setSeeding] = useState(false);
  const [seedLog, setSeedLog] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleSeed = async () => {
    setSeeding(true);
    setSeedLog([]);
    try {
      const result = await seedDatabase((msg) => setSeedLog((prev) => [...prev, msg]));
      if (result.success) {
        toast({ title: "Berhasil!", description: result.message });
        queryClient.invalidateQueries();
      } else {
        toast({ title: "Gagal", description: result.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    { label: "Total Pengunjung", value: statsOverview.totalVisitors.toLocaleString(), icon: Users, change: "+12.5%", up: true },
    { label: "Total Page Views", value: statsOverview.totalPageViews.toLocaleString(), icon: Eye, change: "+8.3%", up: true },
    { label: "Total Artikel", value: articles.length.toString(), icon: FileText, change: "", up: true },
    { label: "Total Komentar", value: discussions.length.toString(), icon: MessageSquare, change: "", up: true },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Ringkasan performa website SejarahKita</p>
      </motion.div>

      {/* Seed Database Card */}
      {articles.length === 0 && (
        <motion.div variants={item}>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">Inisialisasi Database</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Database masih kosong. Klik tombol di bawah untuk mengisi data artikel, kuis, timeline, dan lokasi peta dari data bawaan.
                  </p>
                  {seedLog.length > 0 && (
                    <div className="mt-3 p-3 bg-card rounded-lg border border-border max-h-32 overflow-y-auto">
                      {seedLog.map((log, i) => (
                        <p key={i} className="text-xs font-body text-muted-foreground flex items-center gap-1.5">
                          {log.startsWith("✅") ? <CheckCircle2 className="w-3 h-3 text-primary shrink-0" /> : <span className="w-3 h-3 shrink-0" />}
                          {log}
                        </p>
                      ))}
                    </div>
                  )}
                  <Button onClick={handleSeed} disabled={seeding} className="mt-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    {seeding ? "Menyimpan data..." : "Isi Data Awal"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <motion.div key={stat.label} variants={item}>
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  {stat.change && (
                    <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-secondary" : "text-destructive"}`}>
                      {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Trafik Pengunjung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={visitorData}>
                    <defs>
                      <linearGradient id="gradVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(36, 80%, 50%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(36, 80%, 50%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradPageViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(150, 30%, 25%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(150, 30%, 25%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(25, 10%, 45%)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="hsl(25, 10%, 45%)" />
                    <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: "1px solid hsl(35,20%,85%)" }} />
                    <Area type="monotone" dataKey="visitors" stroke="hsl(36, 80%, 50%)" fill="url(#gradVisitors)" strokeWidth={2} name="Pengunjung" />
                    <Area type="monotone" dataKey="pageViews" stroke="hsl(150, 30%, 25%)" fill="url(#gradPageViews)" strokeWidth={2} name="Page Views" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-border h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Sumber Trafik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {trafficSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 mt-2">
                {trafficSources.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {s.name} ({s.value}%)
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={item}>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Artikel Terpopuler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topArticles.map((a, i) => (
                  <div key={a.slug} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{a.title}</p></div>
                    <span className="text-xs text-muted-foreground font-medium">{a.views.toLocaleString()} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-body font-semibold">Perangkat Pengunjung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(35, 20%, 85%)" />
                    <XAxis type="number" tick={{ fontSize: 11 }} stroke="hsl(25, 10%, 45%)" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(25, 10%, 45%)" width={60} />
                    <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" fill="hsl(36, 80%, 50%)" radius={[0, 6, 6, 0]} barSize={24} name="Persentase" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Rata-rata waktu: <strong className="text-foreground">{statsOverview.avgTimeOnSite}</strong></span>
                <span className="text-xs text-muted-foreground ml-4">Bounce rate: <strong className="text-foreground">{statsOverview.bounceRate}</strong></span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
