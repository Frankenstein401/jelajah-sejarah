import { supabase } from "@/integrations/supabase/client";
import { articles } from "@/data/articles";
import { quizzes } from "@/data/quizzes";

const articleVideoData: Record<string, { id: string; title: string; channel?: string }[]> = {
  "kerajaan-kutai": [{ id: "YHj8W0XZAR0", title: "Kerajaan Kutai — Kerajaan Hindu Tertua di Indonesia", channel: "Sejarah Indonesia" }],
  "kerajaan-sriwijaya": [{ id: "2JzFxRqWLkM", title: "Kerajaan Sriwijaya — Kemaharajaan Maritim Nusantara", channel: "Sejarah Indonesia" }],
  "kerajaan-tarumanagara": [{ id: "XKCK6O6YVPU", title: "Kerajaan Tarumanagara — Kerajaan Hindu di Jawa Barat", channel: "Sejarah Indonesia" }],
  "kerajaan-majapahit": [
    { id: "m_NMpS3YBSE", title: "Kerajaan Majapahit — Kejayaan Nusantara", channel: "Sejarah Indonesia" },
    { id: "0V8gPj_Vbpk", title: "Gajah Mada dan Sumpah Palapa", channel: "Dokumenter Sejarah" },
  ],
  "kesultanan-demak": [{ id: "tSCrZfVGP3k", title: "Kesultanan Demak — Kerajaan Islam Pertama di Jawa", channel: "Sejarah Indonesia" }],
  "perlawanan-kolonialisme": [{ id: "PCYjVLOzBGs", title: "Perlawanan Rakyat Indonesia Melawan Kolonialisme", channel: "Sejarah Indonesia" }],
  "kebangkitan-nasional": [{ id: "YNjEsPl7K3s", title: "Kebangkitan Nasional Indonesia — Lahirnya Pergerakan", channel: "Sejarah Indonesia" }],
  "proklamasi-kemerdekaan": [
    { id: "fCGMOCwMsZU", title: "Proklamasi Kemerdekaan Indonesia 17 Agustus 1945", channel: "Sejarah Indonesia" },
    { id: "QaJZAGMSZwY", title: "Detik-Detik Proklamasi Kemerdekaan RI", channel: "Dokumenter Sejarah" },
  ],
};

const timelineData = [
  { year: "Abad ke-4", title: "Kerajaan Kutai", era: "Hindu-Buddha", description: "Kerajaan Hindu tertua di Indonesia, terletak di Kalimantan Timur.", detail: "Kerajaan Kutai Martadipura adalah kerajaan bercorak Hindu tertua di Indonesia yang berdiri sekitar abad ke-4 Masehi.", significance: ["Kerajaan Hindu pertama di wilayah Nusantara", "Peninggalan prasasti Yupa sebagai bukti tertua pengaruh India", "Raja Mulawarman dikenal dermawan dengan persembahan 20.000 ekor sapi"], figures: ["Raja Kudungga", "Raja Aswawarman", "Raja Mulawarman"], image_caption: "Prasasti Yupa, Kalimantan Timur", article_slug: "kerajaan-kutai", sort_order: 0 },
  { year: "Abad ke-7", title: "Kerajaan Sriwijaya", era: "Hindu-Buddha", description: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang.", detail: "Kerajaan Sriwijaya adalah kerajaan maritim yang berpusat di Palembang, Sumatera Selatan.", significance: ["Pusat perdagangan rempah terbesar di Asia Tenggara", "Pusat pendidikan agama Buddha kelas dunia", "Menguasai jalur pelayaran Selat Malaka selama berabad-abad"], figures: ["Raja Dapunta Hyang Sri Jayanasa", "Balaputradewa"], image_caption: "Armada Laut Sriwijaya", article_slug: "kerajaan-sriwijaya", sort_order: 1 },
  { year: "Abad ke-8", title: "Pembangunan Borobudur", era: "Hindu-Buddha", description: "Candi Buddha terbesar di dunia dibangun oleh Dinasti Syailendra.", detail: "Candi Borobudur dibangun oleh Dinasti Syailendra pada abad ke-8 hingga ke-9 Masehi.", significance: ["Candi Buddha terbesar di dunia", "Situs Warisan Dunia UNESCO sejak 1991", "Menggambarkan perjalanan menuju pencerahan dalam 10 tingkat"], figures: null, image_caption: "Candi Borobudur saat fajar", article_slug: null, sort_order: 2 },
  { year: "1293", title: "Kerajaan Majapahit", era: "Hindu-Buddha", description: "Kerajaan terbesar di Nusantara di bawah Mahapatih Gajah Mada.", detail: "Kerajaan Majapahit didirikan oleh Raden Wijaya pada tahun 1293 M setelah berhasil mengusir pasukan Mongol.", significance: ["Kerajaan terluas dalam sejarah Indonesia", "Sumpah Palapa Gajah Mada menyatukan Nusantara", "Kitab Nagarakretagama mencatat kejayaan wilayah kekuasaan"], figures: ["Raden Wijaya", "Hayam Wuruk", "Mahapatih Gajah Mada", "Tribhuwana Tunggadewi"], image_caption: "Mahapatih Gajah Mada", article_slug: "kerajaan-majapahit", sort_order: 3 },
  { year: "Abad ke-15", title: "Kesultanan Islam Nusantara", era: "Kesultanan", description: "Penyebaran Islam meluas dengan berdirinya Kesultanan Demak, Ternate, dan Tidore.", detail: "Pada abad ke-15, Islam mulai menyebar luas di Nusantara melalui jalur perdagangan.", significance: ["Islam masuk melalui jalur perdagangan secara damai", "Wali Songo menyebarkan Islam dengan pendekatan budaya lokal", "Masjid Agung Demak menjadi simbol kekuatan Islam di Jawa"], figures: ["Raden Patah", "Sultan Baab Ullah", "Wali Songo"], image_caption: "Penyebaran Islam di Nusantara", article_slug: "kesultanan-demak", sort_order: 4 },
  { year: "1908", title: "Kebangkitan Nasional", era: "Pergerakan", description: "Budi Utomo didirikan sebagai organisasi modern pertama.", detail: "Pada tanggal 20 Mei 1908, dr. Wahidin Soedirohoesodo dan dr. Soetomo mendirikan Budi Utomo di Batavia.", significance: ["Organisasi modern pertama di Indonesia", "Cikal bakal gerakan kebangsaan Indonesia", "20 Mei diperingati sebagai Hari Kebangkitan Nasional"], figures: ["dr. Wahidin Soedirohoesodo", "dr. Soetomo", "dr. Cipto Mangunkusumo"], image_caption: "Rapat Budi Utomo, 1908", article_slug: "kebangkitan-nasional", sort_order: 5 },
  { year: "1928", title: "Sumpah Pemuda", era: "Pergerakan", description: "Pemuda dari berbagai suku bersumpah satu tanah air, satu bangsa, dan satu bahasa: Indonesia.", detail: "Kongres Pemuda II yang berlangsung pada 27–28 Oktober 1928 di Batavia menghasilkan ikrar bersejarah.", significance: ["Mempersatukan pemuda dari berbagai suku dan daerah", "Bahasa Indonesia ditetapkan sebagai bahasa persatuan", "28 Oktober diperingati sebagai Hari Sumpah Pemuda"], figures: ["Muhammad Yamin", "Sugondo Djojopuspito", "WR Soepratman"], image_caption: "Kongres Pemuda II, 1928", article_slug: "kebangkitan-nasional", sort_order: 6 },
  { year: "1945", title: "Proklamasi Kemerdekaan", era: "Kemerdekaan", description: "Soekarno dan Hatta memproklamasikan kemerdekaan Indonesia pada 17 Agustus 1945.", detail: "Pada tanggal 17 Agustus 1945 pukul 10.00 WIB, Ir. Soekarno membacakan teks Proklamasi Kemerdekaan Indonesia.", significance: ["Berakhirnya 350 tahun penjajahan Belanda dan 3,5 tahun Jepang", "Lahirnya Republik Indonesia sebagai negara merdeka", "17 Agustus diperingati sebagai Hari Kemerdekaan Indonesia"], figures: ["Ir. Soekarno", "Drs. Mohammad Hatta", "Fatmawati"], image_caption: "Proklamasi Kemerdekaan, 1945", article_slug: "proklamasi-kemerdekaan", sort_order: 7 },
];

const mapLocationData = [
  { name: "Kerajaan Kutai", latitude: -0.5, longitude: 117.15, year: "Abad ke-4", era: "Hindu-Buddha", description: "Kerajaan Hindu tertua di Indonesia, terletak di tepi Sungai Mahakam, Kalimantan Timur.", article_slug: "kerajaan-kutai" },
  { name: "Kerajaan Tarumanagara", latitude: -6.6, longitude: 106.8, year: "Abad ke-5", era: "Hindu-Buddha", description: "Kerajaan Hindu di Jawa Barat, dikenal lewat Prasasti Tugu dan jejak Raja Purnawarman.", article_slug: "kerajaan-tarumanagara" },
  { name: "Kerajaan Sriwijaya", latitude: -2.99, longitude: 104.76, year: "Abad ke-7", era: "Hindu-Buddha", description: "Kerajaan maritim terbesar di Asia Tenggara, berpusat di Palembang.", article_slug: "kerajaan-sriwijaya" },
  { name: "Candi Borobudur", latitude: -7.608, longitude: 110.204, year: "Abad ke-8", era: "Hindu-Buddha", description: "Candi Buddha terbesar di dunia, dibangun oleh Dinasti Syailendra di Magelang.", article_slug: null },
  { name: "Candi Prambanan", latitude: -7.752, longitude: 110.491, year: "Abad ke-9", era: "Hindu-Buddha", description: "Kompleks candi Hindu terbesar di Indonesia, didedikasikan untuk Trimurti.", article_slug: null },
  { name: "Kerajaan Mataram Kuno", latitude: -7.58, longitude: 110.42, year: "Abad ke-8", era: "Hindu-Buddha", description: "Kerajaan besar di Jawa Tengah yang membangun Borobudur dan Prambanan.", article_slug: null },
  { name: "Kerajaan Kalingga", latitude: -6.73, longitude: 110.84, year: "Abad ke-7", era: "Hindu-Buddha", description: "Kerajaan Buddha di Jawa Tengah, dipimpin oleh Ratu Shima yang terkenal adil.", article_slug: null },
  { name: "Kerajaan Majapahit", latitude: -7.615, longitude: 112.41, year: "1293", era: "Hindu-Buddha", description: "Kerajaan terluas di Nusantara di bawah Gajah Mada, berpusat di Trowulan.", article_slug: "kerajaan-majapahit" },
  { name: "Kerajaan Singasari", latitude: -7.89, longitude: 112.65, year: "1222", era: "Hindu-Buddha", description: "Pendahulu Majapahit, didirikan oleh Ken Arok di Malang, Jawa Timur.", article_slug: null },
  { name: "Kesultanan Demak", latitude: -6.89, longitude: 110.64, year: "Abad ke-15", era: "Kesultanan", description: "Kesultanan Islam pertama di Pulau Jawa, didirikan oleh Raden Patah.", article_slug: "kesultanan-demak" },
  { name: "Kesultanan Ternate", latitude: 0.78, longitude: 127.37, year: "Abad ke-15", era: "Kesultanan", description: "Pusat perdagangan rempah cengkih dan pala yang menarik bangsa Eropa.", article_slug: null },
  { name: "Kesultanan Tidore", latitude: 0.68, longitude: 127.45, year: "Abad ke-15", era: "Kesultanan", description: "Rival Ternate dalam perdagangan rempah, bersekutu dengan Spanyol.", article_slug: null },
  { name: "Kesultanan Mataram Islam", latitude: -7.8, longitude: 110.36, year: "1587", era: "Kesultanan", description: "Kesultanan terbesar di Jawa, mencapai puncak di bawah Sultan Agung.", article_slug: null },
  { name: "Kesultanan Aceh", latitude: 5.55, longitude: 95.32, year: "1496", era: "Kesultanan", description: "Kesultanan kuat di ujung Sumatera, pusat perdagangan lada dan Islam.", article_slug: null },
  { name: "Kesultanan Gowa-Tallo", latitude: -5.13, longitude: 119.41, year: "Abad ke-16", era: "Kesultanan", description: "Kesultanan maritim di Sulawesi Selatan, dipimpin Sultan Hasanuddin.", article_slug: null },
  { name: "Kesultanan Banten", latitude: -6.05, longitude: 106.15, year: "1527", era: "Kesultanan", description: "Pusat perdagangan lada di ujung barat Jawa, melawan kolonialisme VOC.", article_slug: null },
  { name: "Perang Diponegoro", latitude: -7.79, longitude: 110.36, year: "1825-1830", era: "Pergerakan", description: "Perlawanan Pangeran Diponegoro melawan Belanda, perang terbesar di Jawa.", article_slug: "perlawanan-kolonialisme" },
  { name: "Kebangkitan Nasional", latitude: -6.17, longitude: 106.85, year: "1908", era: "Pergerakan", description: "Budi Utomo didirikan, organisasi modern pertama pergerakan nasional.", article_slug: "kebangkitan-nasional" },
  { name: "Sumpah Pemuda", latitude: -6.2, longitude: 106.83, year: "1928", era: "Pergerakan", description: "Kongres Pemuda II di Batavia menghasilkan ikrar satu tanah air, satu bangsa, dan satu bahasa.", article_slug: "kebangkitan-nasional" },
  { name: "Proklamasi Kemerdekaan", latitude: -6.19, longitude: 106.84, year: "1945", era: "Kemerdekaan", description: "Soekarno-Hatta memproklamasikan kemerdekaan pada 17 Agustus 1945.", article_slug: "proklamasi-kemerdekaan" },
  { name: "Bandung Lautan Api", latitude: -6.91, longitude: 107.61, year: "1946", era: "Kemerdekaan", description: "Rakyat Bandung membakar kota agar tidak dimanfaatkan Sekutu dan Belanda.", article_slug: null },
  { name: "Pertempuran Surabaya", latitude: -7.25, longitude: 112.75, year: "1945", era: "Kemerdekaan", description: "Pertempuran heroik 10 November melawan Inggris, diperingati sebagai Hari Pahlawan.", article_slug: null },
  { name: "Serangan Umum 1 Maret", latitude: -7.8, longitude: 110.36, year: "1949", era: "Kemerdekaan", description: "Serangan besar TNI di Yogyakarta membuktikan RI masih berdiri kepada dunia.", article_slug: null },
];

export async function seedDatabase(onProgress?: (msg: string) => void): Promise<{ success: boolean; message: string }> {
  const log = onProgress || (() => {});

  // Check if already seeded
  const { count } = await supabase.from("articles").select("*", { count: "exact", head: true });
  if (count && count > 0) {
    return { success: true, message: "Data sudah ada di database." };
  }

  try {
    // 1. Insert articles
    log("Menyimpan artikel...");
    const articleInserts = articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      era: a.era,
      year: a.year,
      summary: a.summary,
      hero_image: a.heroImage || null,
    }));

    const { data: insertedArticles, error: artError } = await supabase
      .from("articles")
      .insert(articleInserts)
      .select();
    if (artError) throw artError;

    const slugToId: Record<string, string> = {};
    for (const a of insertedArticles!) {
      slugToId[a.slug] = a.id;
    }

    // 2. Insert article sections
    log("Menyimpan konten artikel...");
    const allSections = articles.flatMap((article) =>
      article.content.map((section, i) => ({
        article_id: slugToId[article.slug],
        heading: section.heading,
        paragraphs: section.paragraphs,
        sort_order: i,
      }))
    );
    // Insert in batches of 50
    for (let i = 0; i < allSections.length; i += 50) {
      const batch = allSections.slice(i, i + 50);
      const { error } = await supabase.from("article_sections").insert(batch);
      if (error) throw error;
    }

    // 3. Insert article relations
    log("Menyimpan relasi artikel...");
    const relations = articles.flatMap((article) =>
      article.relatedSlugs
        .filter((relSlug) => slugToId[relSlug])
        .map((relSlug) => ({
          article_id: slugToId[article.slug],
          related_article_id: slugToId[relSlug],
        }))
    );
    if (relations.length > 0) {
      const { error } = await supabase.from("article_relations").insert(relations);
      if (error) throw error;
    }

    // 4. Insert article videos
    log("Menyimpan video...");
    const videoInserts = Object.entries(articleVideoData).flatMap(([slug, videos]) => {
      const articleId = slugToId[slug];
      if (!articleId) return [];
      return videos.map((v, i) => ({
        article_id: articleId,
        youtube_id: v.id,
        title: v.title,
        channel: v.channel || null,
        sort_order: i,
      }));
    });
    if (videoInserts.length > 0) {
      const { error } = await supabase.from("article_videos").insert(videoInserts);
      if (error) throw error;
    }

    // 5. Insert quizzes
    log("Menyimpan kuis...");
    for (const quiz of quizzes) {
      const articleId = slugToId[quiz.articleSlug];
      if (!articleId) continue;

      const articleTitle = articles.find((a) => a.slug === quiz.articleSlug)?.title || quiz.articleSlug;
      const { data: quizData, error: quizError } = await supabase
        .from("quizzes")
        .insert({ article_id: articleId, title: `Kuis ${articleTitle}` })
        .select()
        .single();
      if (quizError) throw quizError;

      const questions = quiz.questions.map((q, i) => ({
        quiz_id: quizData.id,
        question: q.question,
        options: q.options,
        correct_index: q.correctIndex,
        explanation: q.explanation,
        sort_order: i,
      }));
      const { error: qError } = await supabase.from("quiz_questions").insert(questions);
      if (qError) throw qError;
    }

    // 6. Insert timeline events
    log("Menyimpan timeline...");
    const { error: tlError } = await supabase.from("timeline_events").insert(timelineData);
    if (tlError) throw tlError;

    // 7. Insert map locations
    log("Menyimpan lokasi peta...");
    const { error: mapError } = await supabase.from("map_locations").insert(mapLocationData);
    if (mapError) throw mapError;

    log("✅ Selesai! Semua data berhasil disimpan.");
    return { success: true, message: "Semua data berhasil disimpan ke database." };
  } catch (error: any) {
    console.error("Seed error:", error);
    return { success: false, message: error.message || "Terjadi kesalahan saat menyimpan data." };
  }
}
