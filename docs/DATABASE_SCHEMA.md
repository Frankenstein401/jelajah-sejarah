# 📦 Dokumentasi Struktur Database — SejarahKita

> Dokumen ini menjelaskan skema database yang dibutuhkan untuk menjadikan website SejarahKita **dinamis** (data tersimpan di server, bukan localStorage). Dirancang untuk **Supabase (PostgreSQL)**.

---

## 1. Tabel `articles`

Menyimpan semua artikel/materi sejarah.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK, default `gen_random_uuid()` | ID unik artikel |
| `slug` | `text` | UNIQUE, NOT NULL | URL-friendly identifier |
| `title` | `text` | NOT NULL | Judul artikel |
| `era` | `text` | NOT NULL | Era sejarah (Hindu-Buddha, Kesultanan, dll.) |
| `year` | `text` | NOT NULL | Tahun/periode (contoh: "Abad ke-4 M") |
| `summary` | `text` | NOT NULL | Ringkasan singkat artikel |
| `hero_image` | `text` | | URL gambar hero |
| `created_at` | `timestamptz` | default `now()` | Waktu dibuat |
| `updated_at` | `timestamptz` | default `now()` | Waktu terakhir diubah |

```sql
CREATE TABLE public.articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  era text NOT NULL,
  year text NOT NULL,
  summary text NOT NULL,
  hero_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

---

## 2. Tabel `article_sections`

Menyimpan konten per-bagian dari setiap artikel.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik section |
| `article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE | Relasi ke artikel |
| `heading` | `text` | NOT NULL | Judul sub-bagian |
| `paragraphs` | `text[]` | NOT NULL | Array paragraf konten |
| `sort_order` | `int` | NOT NULL, default 0 | Urutan tampil |
| `image_url` | `text` | | Gambar pendukung section |

```sql
CREATE TABLE public.article_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  heading text NOT NULL,
  paragraphs text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  image_url text
);
```

---

## 3. Tabel `article_relations`

Menyimpan hubungan "artikel terkait" antar artikel.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE | Artikel utama |
| `related_article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE | Artikel terkait |

```sql
CREATE TABLE public.article_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  related_article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(article_id, related_article_id)
);
```

---

## 4. Tabel `article_videos`

Menyimpan video YouTube yang terkait dengan artikel.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE | Relasi ke artikel |
| `youtube_id` | `text` | NOT NULL | YouTube video ID |
| `title` | `text` | NOT NULL | Judul video |
| `channel` | `text` | | Nama channel YouTube |
| `sort_order` | `int` | default 0 | Urutan tampil |

```sql
CREATE TABLE public.article_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  youtube_id text NOT NULL,
  title text NOT NULL,
  channel text,
  sort_order int DEFAULT 0
);
```

---

## 5. Tabel `quizzes`

Menyimpan kuis yang terkait dengan artikel.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE, UNIQUE | Satu kuis per artikel |
| `title` | `text` | NOT NULL | Judul kuis |

```sql
CREATE TABLE public.quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  title text NOT NULL
);
```

---

## 6. Tabel `quiz_questions`

Menyimpan pertanyaan-pertanyaan dalam setiap kuis.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `quiz_id` | `uuid` | FK → `quizzes.id` ON DELETE CASCADE | Relasi ke kuis |
| `question` | `text` | NOT NULL | Pertanyaan |
| `options` | `text[]` | NOT NULL | Array pilihan jawaban |
| `correct_index` | `int` | NOT NULL | Index jawaban benar (0-based) |
| `explanation` | `text` | | Penjelasan jawaban |
| `sort_order` | `int` | default 0 | Urutan tampil |

```sql
CREATE TABLE public.quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  options text[] NOT NULL,
  correct_index int NOT NULL,
  explanation text,
  sort_order int DEFAULT 0
);
```

---

## 7. Tabel `discussions`

Menyimpan komentar/diskusi pada setiap artikel (menggantikan localStorage).

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik komentar |
| `article_id` | `uuid` | FK → `articles.id` ON DELETE CASCADE | Relasi ke artikel |
| `parent_id` | `uuid` | FK → `discussions.id` ON DELETE CASCADE, NULLABLE | NULL = komentar utama, terisi = balasan |
| `name` | `text` | NOT NULL | Nama pengirim |
| `message` | `text` | NOT NULL | Isi komentar |
| `created_at` | `timestamptz` | default `now()` | Waktu dibuat |

```sql
CREATE TABLE public.discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES public.discussions(id) ON DELETE CASCADE,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Index untuk query komentar per artikel
CREATE INDEX idx_discussions_article ON public.discussions(article_id);
-- Index untuk query balasan
CREATE INDEX idx_discussions_parent ON public.discussions(parent_id);
```

---

## 8. Tabel `timeline_events`

Menyimpan data linimasa sejarah di halaman utama.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `year` | `text` | NOT NULL | Tahun event |
| `title` | `text` | NOT NULL | Judul event |
| `description` | `text` | NOT NULL | Deskripsi singkat |
| `image_url` | `text` | | URL gambar |
| `article_slug` | `text` | | Link ke artikel terkait |
| `sort_order` | `int` | default 0 | Urutan tampil |

```sql
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  article_slug text,
  sort_order int DEFAULT 0
);
```

---

## 9. Tabel `map_locations`

Menyimpan titik-titik lokasi sejarah di peta interaktif.

| Kolom | Tipe | Constraint | Keterangan |
|-------|------|-----------|------------|
| `id` | `uuid` | PK | ID unik |
| `name` | `text` | NOT NULL | Nama lokasi |
| `description` | `text` | | Deskripsi lokasi |
| `latitude` | `float8` | NOT NULL | Koordinat lintang |
| `longitude` | `float8` | NOT NULL | Koordinat bujur |
| `article_slug` | `text` | | Slug artikel terkait |

```sql
CREATE TABLE public.map_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  article_slug text
);
```

---

## 📐 Diagram Relasi (ERD Summary)

```
articles ──┬── article_sections (1:N)
           ├── article_relations (N:M self-ref)
           ├── article_videos (1:N)
           ├── quizzes ── quiz_questions (1:N)
           ├── discussions (1:N, self-ref via parent_id)
           └── (referenced by timeline_events, map_locations via slug)
```

---

## 🔒 Row-Level Security (RLS)

Rekomendasi kebijakan RLS:

```sql
-- Semua tabel konten: publik bisa baca
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON public.articles FOR SELECT USING (true);

-- Discussions: publik bisa baca & insert, tapi tidak bisa update/delete
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read discussions" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Public insert discussions" ON public.discussions FOR INSERT WITH CHECK (true);

-- Untuk admin CRUD, gunakan tabel user_roles:
-- Lihat panduan user_roles di dokumentasi Lovable
```

---

## 🚀 Migrasi dari Data Statis

Saat ini data disimpan di:
- `src/data/articles.ts` → migrasi ke tabel `articles` + `article_sections`
- `src/data/quizzes.ts` → migrasi ke tabel `quizzes` + `quiz_questions`
- `localStorage` (diskusi) → migrasi ke tabel `discussions`
- Hardcoded di komponen (video, timeline, peta) → migrasi ke tabel masing-masing

Langkah migrasi:
1. Aktifkan Lovable Cloud
2. Buat tabel sesuai skema di atas
3. Seed data dari file statis ke database
4. Update komponen untuk fetch dari Supabase
5. Tambah admin panel untuk CRUD konten (opsional)
