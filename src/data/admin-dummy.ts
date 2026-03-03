// Dummy analytics data for admin dashboard

export const visitorData = [
  { date: "1 Feb", visitors: 120, pageViews: 340 },
  { date: "2 Feb", visitors: 145, pageViews: 410 },
  { date: "3 Feb", visitors: 98, pageViews: 280 },
  { date: "4 Feb", visitors: 167, pageViews: 490 },
  { date: "5 Feb", visitors: 189, pageViews: 520 },
  { date: "6 Feb", visitors: 210, pageViews: 580 },
  { date: "7 Feb", visitors: 176, pageViews: 460 },
  { date: "8 Feb", visitors: 195, pageViews: 530 },
  { date: "9 Feb", visitors: 230, pageViews: 640 },
  { date: "10 Feb", visitors: 256, pageViews: 710 },
  { date: "11 Feb", visitors: 198, pageViews: 550 },
  { date: "12 Feb", visitors: 280, pageViews: 780 },
  { date: "13 Feb", visitors: 310, pageViews: 860 },
  { date: "14 Feb", visitors: 245, pageViews: 690 },
];

export const topArticles = [
  { title: "Kerajaan Majapahit", views: 1240, slug: "kerajaan-majapahit" },
  { title: "Kerajaan Sriwijaya", views: 980, slug: "kerajaan-sriwijaya" },
  { title: "Proklamasi Kemerdekaan", views: 870, slug: "proklamasi-kemerdekaan" },
  { title: "Kerajaan Kutai", views: 650, slug: "kerajaan-kutai" },
  { title: "Candi Borobudur", views: 540, slug: "candi-borobudur" },
];

export const trafficSources = [
  { name: "Langsung", value: 45 },
  { name: "Google", value: 30 },
  { name: "Media Sosial", value: 15 },
  { name: "Referral", value: 10 },
];

export const recentComments = [
  { id: "1", name: "Ahmad", article: "Kerajaan Majapahit", message: "Artikelnya sangat informatif!", time: "5 menit lalu", status: "approved" as const },
  { id: "2", name: "Siti", article: "Kerajaan Sriwijaya", message: "Bisa ditambahkan sumber referensinya?", time: "1 jam lalu", status: "pending" as const },
  { id: "3", name: "Budi", article: "Proklamasi Kemerdekaan", message: "Terima kasih atas materinya", time: "2 jam lalu", status: "approved" as const },
  { id: "4", name: "Rina", article: "Kerajaan Kutai", message: "Kontennya spam dan tidak relevan", time: "3 jam lalu", status: "flagged" as const },
  { id: "5", name: "Doni", article: "Candi Borobudur", message: "Sangat membantu untuk tugas sekolah!", time: "5 jam lalu", status: "approved" as const },
];

export const statsOverview = {
  totalVisitors: 4_832,
  totalPageViews: 12_450,
  totalArticles: 12,
  totalQuizzes: 8,
  totalComments: 156,
  avgTimeOnSite: "3m 24s",
  bounceRate: "34%",
  conversionRate: "12%",
};

export const deviceData = [
  { name: "Mobile", value: 58 },
  { name: "Desktop", value: 35 },
  { name: "Tablet", value: 7 },
];

export const dummyQuizStats = [
  { title: "Kuis Kerajaan Kutai", attempts: 89, avgScore: 72, article: "Kerajaan Kutai" },
  { title: "Kuis Kerajaan Sriwijaya", attempts: 124, avgScore: 68, article: "Kerajaan Sriwijaya" },
  { title: "Kuis Kerajaan Majapahit", attempts: 156, avgScore: 75, article: "Kerajaan Majapahit" },
  { title: "Kuis Proklamasi", attempts: 201, avgScore: 82, article: "Proklamasi Kemerdekaan" },
  { title: "Kuis Candi Borobudur", attempts: 67, avgScore: 70, article: "Candi Borobudur" },
];
