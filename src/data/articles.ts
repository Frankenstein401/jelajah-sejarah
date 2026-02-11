export interface Article {
  slug: string;
  title: string;
  era: string;
  year: string;
  summary: string;
  heroImage?: string;
  content: ArticleSection[];
  relatedSlugs: string[];
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export const articles: Article[] = [
  {
    slug: "kerajaan-kutai",
    title: "Kerajaan Kutai",
    era: "Hindu-Buddha",
    year: "Abad ke-4 M",
    summary: "Kerajaan Hindu tertua di Indonesia yang terletak di Kalimantan Timur, dikenal melalui prasasti Yupa peninggalan Raja Mulawarman.",
    content: [
      {
        heading: "Latar Belakang",
        paragraphs: [
          "Kerajaan Kutai merupakan kerajaan Hindu tertua di Indonesia yang diperkirakan berdiri pada abad ke-4 Masehi. Kerajaan ini terletak di hulu Sungai Mahakam, Kalimantan Timur. Keberadaan kerajaan ini diketahui dari penemuan tujuh buah prasasti yang dikenal sebagai Prasasti Yupa.",
          "Prasasti-prasasti tersebut ditulis dalam huruf Pallawa dan bahasa Sanskerta, menunjukkan adanya pengaruh kebudayaan India yang kuat pada masa itu. Prasasti ini merupakan bukti tertulis tertua tentang keberadaan kerajaan di Nusantara.",
        ],
      },
      {
        heading: "Raja-Raja Kutai",
        paragraphs: [
          "Berdasarkan Prasasti Yupa, silsilah raja-raja Kutai dimulai dari Kudungga, yang merupakan nama asli Indonesia (bukan nama Sanskrit). Hal ini menunjukkan bahwa kerajaan ini awalnya didirikan oleh penguasa lokal.",
          "Putra Kudungga bernama Aswawarman yang disebut sebagai 'pembentuk keluarga raja' (wangsakarta). Aswawarman memiliki tiga orang putra, dan yang paling terkenal adalah Mulawarman. Raja Mulawarman dikenal sebagai raja yang dermawan karena mengadakan upacara kurban emas yang besar dan menyumbangkan 20.000 ekor sapi kepada para Brahmana.",
        ],
      },
      {
        heading: "Kehidupan Masyarakat",
        paragraphs: [
          "Masyarakat Kerajaan Kutai hidup dari pertanian, perdagangan, dan perikanan di sepanjang Sungai Mahakam. Pengaruh Hindu terlihat dari praktik keagamaan yang mengikuti tradisi Weda, khususnya pemujaan terhadap Dewa Siwa.",
          "Kutai juga merupakan salah satu titik perdagangan penting di jalur perdagangan maritim antara India dan Cina. Letak geografisnya yang strategis di muara Sungai Mahakam memungkinkan akses ke perdagangan laut.",
        ],
      },
      {
        heading: "Peninggalan Sejarah",
        paragraphs: [
          "Peninggalan utama dari Kerajaan Kutai adalah tujuh buah Prasasti Yupa yang ditemukan di daerah Muara Kaman, Kalimantan Timur. Prasasti ini berupa tiang batu yang digunakan untuk mengikat hewan kurban dalam upacara keagamaan Hindu.",
          "Selain prasasti, ditemukan juga berbagai artefak seperti arca-arca kecil dan perhiasan yang menunjukkan tingginya peradaban masyarakat Kutai pada masa itu.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kerajaan-tarumanagara"],
  },
  {
    slug: "kerajaan-sriwijaya",
    title: "Kerajaan Sriwijaya",
    era: "Hindu-Buddha",
    year: "Abad ke-7 – 13 M",
    summary: "Kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang, menjadi pusat perdagangan dan pendidikan agama Buddha.",
    content: [
      {
        heading: "Kejayaan Maritim",
        paragraphs: [
          "Sriwijaya merupakan kerajaan maritim terbesar di Asia Tenggara yang berpusat di Palembang, Sumatera Selatan. Kerajaan ini menguasai jalur perdagangan laut antara India, Cina, dan kepulauan Nusantara selama hampir enam abad.",
          "Kekuatan angkatan laut Sriwijaya memungkinkannya menguasai Selat Malaka, salah satu jalur perdagangan paling penting di dunia. Pedagang dari berbagai penjuru dunia singgah di pelabuhan-pelabuhan Sriwijaya, menjadikannya pusat perdagangan internasional.",
        ],
      },
      {
        heading: "Pusat Pendidikan Buddha",
        paragraphs: [
          "Sriwijaya dikenal sebagai pusat pembelajaran agama Buddha terbesar di Asia Tenggara. Pendeta Cina I-Tsing yang mengunjungi Sriwijaya pada tahun 671 M mencatat bahwa terdapat lebih dari 1.000 biksu yang tinggal dan belajar di sana.",
          "I-Tsing menyarankan para pelajar Buddha dari Cina untuk singgah di Sriwijaya terlebih dahulu untuk mempelajari bahasa Sanskerta dan ajaran Buddha sebelum melanjutkan perjalanan ke India. Hal ini menunjukkan tingginya kualitas pendidikan di Sriwijaya.",
        ],
      },
      {
        heading: "Hubungan Internasional",
        paragraphs: [
          "Sriwijaya menjalin hubungan diplomatik dengan berbagai kerajaan besar di Asia, termasuk Dinasti Tang dan Song di Cina, serta kerajaan-kerajaan di India. Hubungan ini memperkuat posisi Sriwijaya sebagai kekuatan regional.",
          "Pengaruh Sriwijaya bahkan mencapai hingga Filipina, Thailand, dan Kamboja. Kerajaan ini mengirimkan duta-duta ke Cina dan menerima pengakuan sebagai kerajaan besar yang setara.",
        ],
      },
      {
        heading: "Kemunduran",
        paragraphs: [
          "Kemunduran Sriwijaya dimulai pada abad ke-11 ketika diserang oleh Kerajaan Chola dari India Selatan pada tahun 1025 M. Serangan ini melemahkan dominasi Sriwijaya atas jalur perdagangan.",
          "Pada abad ke-13, kemunculan Kerajaan Majapahit di Jawa dan pergeseran jalur perdagangan semakin mempercepat kemunduran Sriwijaya. Beberapa wilayah taklukan Sriwijaya mulai melepaskan diri dan membentuk kerajaan-kerajaan baru.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-kutai", "kerajaan-majapahit"],
  },
  {
    slug: "kerajaan-tarumanagara",
    title: "Kerajaan Tarumanagara",
    era: "Hindu-Buddha",
    year: "Abad ke-5 – 7 M",
    summary: "Kerajaan Hindu kuno di Jawa Barat yang dikenal melalui prasasti-prasasti peninggalan Raja Purnawarman.",
    content: [
      {
        heading: "Sejarah Berdiri",
        paragraphs: [
          "Kerajaan Tarumanagara adalah kerajaan Hindu yang terletak di wilayah Jawa Barat dan diperkirakan berdiri pada abad ke-5 Masehi. Kerajaan ini merupakan salah satu kerajaan tertua di Pulau Jawa.",
          "Keberadaan kerajaan ini diketahui dari penemuan berbagai prasasti batu yang tersebar di wilayah Jawa Barat dan Banten. Prasasti-prasasti tersebut memberikan gambaran tentang kehidupan politik dan keagamaan pada masa itu.",
        ],
      },
      {
        heading: "Raja Purnawarman",
        paragraphs: [
          "Raja paling terkenal dari Kerajaan Tarumanagara adalah Purnawarman. Ia meninggalkan banyak prasasti, di antaranya Prasasti Ciaruteun yang menampilkan jejak tapak kaki raja yang disamakan dengan tapak kaki Dewa Wisnu.",
          "Prasasti Tugu, salah satu prasasti terpenting, menceritakan tentang penggalian saluran air (sungai buatan) sepanjang 6.122 tombak (sekitar 11 km) yang dilakukan atas perintah Purnawarman. Proyek ini menunjukkan kemampuan teknik dan kepemimpinan yang luar biasa.",
        ],
      },
      {
        heading: "Peradaban dan Budaya",
        paragraphs: [
          "Masyarakat Tarumanagara menganut agama Hindu, khususnya aliran Wisnu. Hal ini terlihat dari prasasti-prasasti yang menyebut raja sebagai penjelmaan Dewa Wisnu.",
          "Kerajaan ini memiliki sistem irigasi yang maju, menunjukkan bahwa pertanian merupakan tulang punggung perekonomian. Selain itu, Tarumanagara juga terlibat dalam perdagangan internasional melalui pelabuhan-pelabuhan di pantai utara Jawa.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-kutai", "kerajaan-sriwijaya"],
  },
  {
    slug: "kerajaan-majapahit",
    title: "Kerajaan Majapahit",
    era: "Hindu-Buddha",
    year: "1293 – 1527 M",
    summary: "Kerajaan terbesar di Nusantara yang berhasil menyatukan hampir seluruh wilayah kepulauan Indonesia di bawah kepemimpinan Gajah Mada.",
    content: [
      {
        heading: "Berdirinya Majapahit",
        paragraphs: [
          "Kerajaan Majapahit didirikan oleh Raden Wijaya pada tahun 1293 setelah berhasil mengalahkan pasukan Mongol yang dikirim oleh Kaisar Kubilai Khan. Dengan kecerdikannya, Raden Wijaya memanfaatkan pasukan Mongol untuk mengalahkan musuhnya, Jayakatwang dari Kediri, kemudian membalikkan serangan kepada tentara Mongol.",
          "Pusat kerajaan terletak di Trowulan, Jawa Timur. Raden Wijaya kemudian bergelar Kertarajasa Jayawardhana dan menjadi raja pertama Majapahit.",
        ],
      },
      {
        heading: "Masa Kejayaan di Bawah Hayam Wuruk",
        paragraphs: [
          "Majapahit mencapai puncak kejayaannya pada masa pemerintahan Raja Hayam Wuruk (1350-1389) dengan Mahapatih Gajah Mada. Gajah Mada bersumpah dalam Sumpah Palapa untuk tidak akan makan palapa (rempah-rempah) sebelum berhasil menyatukan seluruh Nusantara.",
          "Di bawah kepemimpinan mereka, wilayah kekuasaan Majapahit membentang dari Sumatera hingga Papua, bahkan mencakup sebagian Semenanjung Malaya dan Filipina Selatan. Kitab Negarakertagama karya Mpu Prapanca mencatat setidaknya 98 daerah yang berada di bawah pengaruh Majapahit.",
          "Masa ini juga ditandai dengan kemajuan seni dan sastra. Selain Negarakertagama, karya sastra penting lainnya adalah Sutasoma karya Mpu Tantular yang memuat semboyan \"Bhinneka Tunggal Ika\" yang kemudian menjadi semboyan negara Indonesia.",
        ],
      },
      {
        heading: "Struktur Pemerintahan",
        paragraphs: [
          "Majapahit memiliki sistem pemerintahan yang terstruktur dan kompleks. Raja dibantu oleh Mahapatih (perdana menteri), Rakryan Mahamantri Katrini (tiga menteri utama), dan para pejabat daerah yang disebut Bhre.",
          "Sistem pemerintahan ini memungkinkan Majapahit mengelola wilayah yang sangat luas secara efektif. Daerah-daerah taklukan diberikan otonomi namun harus mengakui kedaulatan Majapahit dan membayar upeti.",
        ],
      },
      {
        heading: "Kehidupan Ekonomi",
        paragraphs: [
          "Majapahit memiliki perekonomian yang sangat maju, ditopang oleh perdagangan rempah-rempah, pertanian, dan kerajinan tangan. Pelabuhan-pelabuhan utama di pantai utara Jawa menjadi pusat perdagangan internasional.",
          "Pedagang dari Cina, India, Arab, dan Persia datang ke pelabuhan-pelabuhan Majapahit untuk berdagang. Rempah-rempah seperti cengkeh, pala, dan lada merupakan komoditas utama yang sangat diminati oleh pedagang asing.",
        ],
      },
      {
        heading: "Kemunduran dan Keruntuhan",
        paragraphs: [
          "Setelah wafatnya Hayam Wuruk pada tahun 1389, Majapahit mengalami perang saudara yang dikenal sebagai Perang Paregreg (1405-1406). Konflik perebutan takhta ini sangat melemahkan kekuatan Majapahit.",
          "Pada abad ke-15, penyebaran Islam semakin meluas di Nusantara. Banyak daerah taklukan yang melepaskan diri dan memeluk agama Islam. Kesultanan Demak yang didirikan oleh Raden Patah akhirnya mengakhiri kekuasaan Majapahit sekitar tahun 1527.",
        ],
      },
      {
        heading: "Warisan Majapahit",
        paragraphs: [
          "Warisan terbesar Majapahit bagi Indonesia adalah konsep persatuan Nusantara. Sumpah Palapa Gajah Mada menjadi inspirasi bagi cita-cita persatuan bangsa Indonesia. Semboyan Bhinneka Tunggal Ika dari kitab Sutasoma menjadi semboyan resmi negara.",
          "Peninggalan arkeologis Majapahit yang ditemukan di Trowulan menunjukkan tingginya peradaban kerajaan ini, termasuk sistem tata kota yang terencana, kanal-kanal air, dan berbagai candi serta arca yang indah.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kesultanan-demak"],
  },
  {
    slug: "kesultanan-demak",
    title: "Kesultanan Demak",
    era: "Kesultanan",
    year: "1475 – 1554 M",
    summary: "Kesultanan Islam pertama di Pulau Jawa yang memainkan peran penting dalam penyebaran agama Islam di Nusantara.",
    content: [
      {
        heading: "Berdirinya Kesultanan Demak",
        paragraphs: [
          "Kesultanan Demak didirikan oleh Raden Patah sekitar tahun 1475 di pesisir utara Jawa Tengah. Raden Patah diperkirakan merupakan keturunan dari raja terakhir Majapahit, sehingga Demak dianggap sebagai penerus sah kekuasaan Majapahit dalam bentuk kerajaan Islam.",
          "Berdirinya Demak menandai era baru dalam sejarah Indonesia, yaitu peralihan dari kerajaan Hindu-Buddha ke kesultanan Islam. Demak menjadi pusat penyebaran Islam di Jawa dan sekitarnya.",
        ],
      },
      {
        heading: "Wali Songo dan Penyebaran Islam",
        paragraphs: [
          "Penyebaran Islam di Jawa tidak terlepas dari peran Wali Songo, sembilan orang wali penyebar Islam yang legendaris. Sunan Kalijaga, Sunan Ampel, Sunan Giri, dan wali lainnya menggunakan pendekatan kultural dalam menyebarkan Islam.",
          "Para Wali Songo mengadaptasi kesenian dan tradisi lokal untuk menyampaikan ajaran Islam. Wayang, gamelan, dan tembang Jawa digunakan sebagai media dakwah, sehingga Islam dapat diterima dengan baik oleh masyarakat Jawa.",
        ],
      },
      {
        heading: "Masjid Agung Demak",
        paragraphs: [
          "Peninggalan paling terkenal dari Kesultanan Demak adalah Masjid Agung Demak yang dibangun oleh Wali Songo. Masjid ini memiliki arsitektur unik dengan atap tumpang tiga yang melambangkan Iman, Islam, dan Ihsan.",
          "Salah satu tiang utama masjid, yang disebut Soko Tatal, terbuat dari serpihan-serpihan kayu yang disatukan oleh Sunan Kalijaga. Masjid ini hingga kini masih berdiri dan menjadi salah satu masjid tertua di Indonesia.",
        ],
      },
      {
        heading: "Perlawanan terhadap Portugis",
        paragraphs: [
          "Kesultanan Demak aktif melawan ekspansi Portugis di Nusantara. Pada tahun 1513, Demak mengirim pasukan untuk membantu Kesultanan Malaka yang diserang Portugis, meskipun serangan tersebut tidak berhasil.",
          "Perlawanan Demak terhadap Portugis menunjukkan semangat kemandirian dan persatuan umat Islam di Nusantara dalam menghadapi ancaman kolonialisme Eropa.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-majapahit", "perlawanan-kolonialisme"],
  },
  {
    slug: "perlawanan-kolonialisme",
    title: "Perlawanan terhadap Kolonialisme",
    era: "Kolonial",
    year: "Abad ke-16 – 20 M",
    summary: "Perjuangan rakyat Indonesia melawan penjajahan VOC dan Hindia Belanda selama berabad-abad.",
    content: [
      {
        heading: "Kedatangan Bangsa Eropa",
        paragraphs: [
          "Bangsa Eropa pertama yang tiba di Nusantara adalah Portugis, yang berhasil merebut Malaka pada tahun 1511. Kemudian disusul oleh Spanyol, Belanda, dan Inggris. Mereka tertarik dengan kekayaan rempah-rempah Nusantara yang sangat bernilai di pasar Eropa.",
          "Pada tahun 1602, Belanda mendirikan VOC (Vereenigde Oostindische Compagnie) yang kemudian menjadi kekuatan kolonial dominan di Nusantara. VOC menerapkan monopoli perdagangan yang merugikan rakyat Indonesia.",
        ],
      },
      {
        heading: "Perlawanan di Berbagai Daerah",
        paragraphs: [
          "Perlawanan terhadap kolonialisme terjadi di seluruh penjuru Nusantara. Sultan Hasanuddin dari Makassar melawan VOC dengan gagah berani hingga dijuluki 'Ayam Jantan dari Timur'. Perang Padri di Sumatera Barat (1803-1837) dipimpin oleh Tuanku Imam Bonjol.",
          "Pangeran Diponegoro memimpin Perang Jawa (1825-1830), perang terbesar yang pernah dihadapi Belanda di Nusantara. Perang ini menelan biaya besar dan menewaskan sekitar 200.000 orang dari pihak Indonesia dan 15.000 dari pihak Belanda.",
          "Di Aceh, perlawanan yang dipimpin oleh Teuku Umar dan Cut Nyak Dhien berlangsung selama puluhan tahun (1873-1914). Perlawanan sengit rakyat Aceh membuat Belanda sangat kesulitan menaklukkan wilayah ini.",
        ],
      },
      {
        heading: "Sistem Tanam Paksa",
        paragraphs: [
          "Pada tahun 1830, Gubernur Jenderal Van den Bosch menerapkan Sistem Tanam Paksa (Cultuurstelsel). Rakyat dipaksa menanam tanaman ekspor di sepertiga lahan mereka untuk diserahkan kepada pemerintah kolonial.",
          "Sistem ini menyebabkan penderitaan luar biasa bagi rakyat Indonesia. Kelaparan dan kemiskinan merajalela. Namun, bagi Belanda, sistem ini menghasilkan keuntungan besar yang disebut 'batig slot' (saldo menguntungkan).",
        ],
      },
      {
        heading: "Politik Etis",
        paragraphs: [
          "Pada awal abad ke-20, Belanda menerapkan Politik Etis yang terdiri dari irigasi, emigrasi, dan edukasi. Kebijakan ini dimaksudkan sebagai 'balas budi' kepada rakyat Indonesia yang telah memberikan keuntungan besar bagi Belanda.",
          "Ironinya, kebijakan edukasi justru melahirkan kaum terpelajar Indonesia yang kemudian menjadi pelopor pergerakan nasional. Tokoh-tokoh seperti Soekarno, Hatta, dan Sjahrir mengenyam pendidikan Barat dan menggunakannya untuk memperjuangkan kemerdekaan.",
        ],
      },
    ],
    relatedSlugs: ["kesultanan-demak", "kebangkitan-nasional"],
  },
  {
    slug: "kebangkitan-nasional",
    title: "Kebangkitan Nasional",
    era: "Pergerakan",
    year: "1908 – 1945",
    summary: "Era pergerakan nasional yang menandai bangkitnya kesadaran berbangsa dan semangat kemerdekaan Indonesia.",
    content: [
      {
        heading: "Budi Utomo dan Awal Pergerakan",
        paragraphs: [
          "Pada tanggal 20 Mei 1908, dr. Soetomo dan mahasiswa STOVIA mendirikan Budi Utomo, organisasi modern pertama di Indonesia. Meskipun masih bersifat kedaerahan (Jawa-sentris), Budi Utomo menandai dimulainya era pergerakan nasional.",
          "Setelah Budi Utomo, bermunculan organisasi-organisasi lain seperti Sarekat Islam (1912), Indische Partij (1912), dan Muhammadiyah (1912). Organisasi-organisasi ini memiliki tujuan dan pendekatan berbeda, tetapi semuanya bertujuan memajukan rakyat Indonesia.",
        ],
      },
      {
        heading: "Sumpah Pemuda 1928",
        paragraphs: [
          "Peristiwa paling monumental dalam pergerakan nasional adalah Sumpah Pemuda yang diikrarkan pada tanggal 28 Oktober 1928. Para pemuda dari berbagai suku dan daerah bersumpah: Satu Nusa, Satu Bangsa, dan Satu Bahasa — Indonesia.",
          "Sumpah Pemuda menjadi tonggak penting dalam pembentukan identitas nasional Indonesia. Bahasa Melayu resmi dipilih sebagai bahasa persatuan dengan nama 'Bahasa Indonesia', menyatukan ratusan suku bangsa dengan bahasa yang berbeda-beda.",
          "Lagu Indonesia Raya yang diciptakan oleh W.R. Supratman juga pertama kali diperdengarkan dalam kongres ini, yang kemudian menjadi lagu kebangsaan Republik Indonesia.",
        ],
      },
      {
        heading: "Tokoh-Tokoh Pergerakan",
        paragraphs: [
          "Soekarno mendirikan PNI (Partai Nasional Indonesia) pada tahun 1927 dengan tujuan kemerdekaan penuh. Dengan pidato-pidatonya yang membara, Soekarno mampu membangkitkan semangat nasionalisme di kalangan rakyat.",
          "Mohammad Hatta dan Sutan Sjahrir memimpin gerakan nasionalis dari Belanda melalui organisasi Perhimpunan Indonesia. Keduanya merupakan pemikir dan intelektual yang memberikan landasan ideologis bagi perjuangan kemerdekaan.",
          "Ki Hadjar Dewantara mendirikan Taman Siswa pada tahun 1922 sebagai bentuk perlawanan melalui pendidikan. Semboyannya 'Ing ngarso sung tulodho, ing madyo mangun karso, tut wuri handayani' menjadi filosofi pendidikan Indonesia.",
        ],
      },
      {
        heading: "Menuju Kemerdekaan",
        paragraphs: [
          "Pada masa pendudukan Jepang (1942-1945), pergerakan kemerdekaan memasuki fase baru. Jepang membentuk BPUPKI (Badan Penyelidik Usaha-Usaha Persiapan Kemerdekaan Indonesia) pada tahun 1945 yang bertugas merumuskan dasar negara.",
          "Pada sidang BPUPKI, Soekarno mengusulkan Pancasila sebagai dasar negara pada 1 Juni 1945. Setelah Jepang menyerah kepada Sekutu, para pemuda mendesak Soekarno-Hatta untuk segera memproklamasikan kemerdekaan.",
        ],
      },
    ],
    relatedSlugs: ["perlawanan-kolonialisme", "proklamasi-kemerdekaan"],
  },
  {
    slug: "proklamasi-kemerdekaan",
    title: "Proklamasi Kemerdekaan Indonesia",
    era: "Kemerdekaan",
    year: "17 Agustus 1945",
    summary: "Detik-detik bersejarah proklamasi kemerdekaan Republik Indonesia oleh Soekarno-Hatta.",
    content: [
      {
        heading: "Peristiwa Rengasdengklok",
        paragraphs: [
          "Pada tanggal 16 Agustus 1945, sekelompok pemuda yang dipimpin oleh Soekarni, Chaerul Saleh, dan Wikana membawa Soekarno dan Hatta ke Rengasdengklok, Karawang. Para pemuda mendesak agar proklamasi segera dilakukan tanpa menunggu persetujuan Jepang.",
          "Setelah negosiasi yang alot antara golongan tua dan golongan muda, akhirnya disepakati bahwa proklamasi akan dilakukan keesokan harinya, 17 Agustus 1945.",
        ],
      },
      {
        heading: "Perumusan Teks Proklamasi",
        paragraphs: [
          "Pada malam tanggal 16 Agustus, teks proklamasi dirumuskan di rumah Laksamana Tadashi Maeda di Jalan Imam Bonjol No. 1, Jakarta. Soekarno, Hatta, dan Ahmad Soebardjo merumuskan teks tersebut.",
          "Teks proklamasi ditulis tangan oleh Soekarno atas saran Hatta. Sayuti Melik kemudian mengetik ulang teks tersebut dengan beberapa perubahan, termasuk penambahan 'atas nama bangsa Indonesia' yang diusulkan oleh Soekarni.",
        ],
      },
      {
        heading: "Detik-Detik Proklamasi",
        paragraphs: [
          "Pada hari Jumat, 17 Agustus 1945, pukul 10.00 WIB, Ir. Soekarno didampingi Drs. Mohammad Hatta membacakan teks Proklamasi Kemerdekaan Indonesia di Jalan Pegangsaan Timur 56, Jakarta (sekarang Jalan Proklamasi).",
          "\"Kami bangsa Indonesia dengan ini menjatakan kemerdekaan Indonesia. Hal-hal jang mengenai pemindahan kekoeasaan d.l.l., diselenggarakan dengan tjara saksama dan dalam tempo jang sesingkat-singkatnja.\"",
          "Setelah pembacaan proklamasi, bendera Merah Putih yang dijahit oleh Ibu Fatmawati dikibarkan diiringi lagu Indonesia Raya. Peristiwa ini menandai lahirnya Republik Indonesia sebagai negara merdeka dan berdaulat.",
        ],
      },
      {
        heading: "Penyebaran Berita Kemerdekaan",
        paragraphs: [
          "Berita proklamasi disebarkan ke seluruh Indonesia melalui berbagai cara. Para pemuda mengambil alih kantor-kantor berita dan stasiun radio untuk menyiarkan berita kemerdekaan. Surat selebaran dan telegram dikirimkan ke berbagai daerah.",
          "Di berbagai daerah, rakyat merespons proklamasi dengan penuh semangat. Bendera Merah Putih dikibarkan di mana-mana dan rakyat mulai mengambil alih pemerintahan dari tangan Jepang.",
        ],
      },
      {
        heading: "Mempertahankan Kemerdekaan",
        paragraphs: [
          "Setelah proklamasi, Indonesia harus menghadapi upaya Belanda untuk kembali menjajah melalui agresi militer. Pertempuran 10 November 1945 di Surabaya menjadi bukti semangat juang rakyat Indonesia mempertahankan kemerdekaan.",
          "Melalui perjuangan diplomasi dan militer, Indonesia akhirnya memperoleh pengakuan kedaulatan dari Belanda pada tanggal 27 Desember 1949 melalui Konferensi Meja Bundar di Den Haag.",
        ],
      },
    ],
    relatedSlugs: ["kebangkitan-nasional", "perlawanan-kolonialisme"],
  },
  {
    slug: "borobudur",
    title: "Candi Borobudur",
    era: "Hindu-Buddha",
    year: "Abad ke-8 – 9 M",
    summary: "Candi Buddha terbesar di dunia yang dibangun oleh Dinasti Syailendra, mahakarya arsitektur Indonesia.",
    content: [
      {
        heading: "Pembangunan Borobudur",
        paragraphs: [
          "Candi Borobudur dibangun pada masa Dinasti Syailendra sekitar abad ke-8 hingga ke-9 Masehi. Terletak di Magelang, Jawa Tengah, Borobudur merupakan candi Buddha terbesar di dunia dan salah satu monumen paling megah yang pernah dibangun manusia.",
          "Pembangunan Borobudur diperkirakan melibatkan puluhan ribu pekerja dan memakan waktu sekitar 75 tahun. Candi ini dibangun tanpa menggunakan perekat, melainkan dengan sistem interlocking (saling mengunci) yang sangat presisi.",
        ],
      },
      {
        heading: "Arsitektur dan Struktur",
        paragraphs: [
          "Borobudur berbentuk punden berundak dengan 10 tingkat, terdiri dari 6 tingkat berbentuk bujur sangkar dan 3 tingkat berbentuk lingkaran, ditutup oleh sebuah stupa besar di puncak. Candi ini memiliki 2.672 panel relief dan 504 arca Buddha.",
          "Struktur Borobudur melambangkan kosmologi Buddha. Tiga zona utama melambangkan tiga alam dalam ajaran Buddha: Kamadhatu (alam nafsu), Rupadhatu (alam bentuk), dan Arupadhatu (alam tanpa bentuk).",
        ],
      },
      {
        heading: "Relief dan Cerita",
        paragraphs: [
          "Panel-panel relief di Borobudur menceritakan kisah-kisah dari kitab suci Buddha, termasuk Jataka (kisah kehidupan lampau Buddha), Lalitavistara (riwayat hidup Buddha Gautama), dan Gandavyuha (perjalanan spiritual Sudhana).",
          "Jika direntangkan, total panjang panel relief Borobudur mencapai sekitar 5 km, menjadikannya salah satu kumpulan relief terlengkap di dunia. Relief-relief ini juga memberikan gambaran berharga tentang kehidupan masyarakat Jawa kuno.",
        ],
      },
      {
        heading: "Penemuan Kembali dan Pemugaran",
        paragraphs: [
          "Setelah berabad-abad tertutup oleh abu vulkanik dan vegetasi, Borobudur ditemukan kembali pada tahun 1814 oleh Sir Thomas Stamford Raffles. Pemugaran besar-besaran dilakukan oleh UNESCO dan pemerintah Indonesia pada tahun 1975-1982.",
          "Pada tahun 1991, Borobudur ditetapkan sebagai Situs Warisan Dunia UNESCO. Kini, Borobudur menjadi salah satu destinasi wisata terpenting di Indonesia dan simbol kebanggaan bangsa.",
        ],
      },
    ],
    relatedSlugs: ["kerajaan-sriwijaya", "kerajaan-majapahit"],
  },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find((a) => a.slug === slug);
};

export const getArticlesByEra = (era: string): Article[] => {
  return articles.filter((a) => a.era === era);
};

export const getRelatedArticles = (slugs: string[]): Article[] => {
  return articles.filter((a) => slugs.includes(a.slug));
};
