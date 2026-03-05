
-- ============================================
-- SejarahKita Database Schema
-- ============================================

-- 1. Articles table
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

-- 2. Article sections
CREATE TABLE public.article_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  heading text NOT NULL,
  paragraphs text[] NOT NULL DEFAULT '{}',
  sort_order int NOT NULL DEFAULT 0,
  image_url text
);

-- 3. Article relations (self-referencing M:N)
CREATE TABLE public.article_relations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  related_article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(article_id, related_article_id)
);

-- 4. Article videos
CREATE TABLE public.article_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  youtube_id text NOT NULL,
  title text NOT NULL,
  channel text,
  sort_order int DEFAULT 0
);

-- 5. Quizzes
CREATE TABLE public.quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  title text NOT NULL
);

-- 6. Quiz questions
CREATE TABLE public.quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  options text[] NOT NULL,
  correct_index int NOT NULL,
  explanation text,
  sort_order int DEFAULT 0
);

-- 7. Discussions
CREATE TABLE public.discussions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  parent_id uuid REFERENCES public.discussions(id) ON DELETE CASCADE,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_discussions_article ON public.discussions(article_id);
CREATE INDEX idx_discussions_parent ON public.discussions(parent_id);

-- 8. Timeline events
CREATE TABLE public.timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  year text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  detail text,
  era text,
  significance text[],
  figures text[],
  image_url text,
  image_caption text,
  article_slug text,
  sort_order int DEFAULT 0
);

-- 9. Map locations
CREATE TABLE public.map_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  latitude float8 NOT NULL,
  longitude float8 NOT NULL,
  year text,
  era text,
  article_slug text
);

-- ============================================
-- Row-Level Security
-- ============================================

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public insert articles" ON public.articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update articles" ON public.articles FOR UPDATE USING (true);
CREATE POLICY "Public delete articles" ON public.articles FOR DELETE USING (true);

ALTER TABLE public.article_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sections" ON public.article_sections FOR SELECT USING (true);
CREATE POLICY "Public insert sections" ON public.article_sections FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update sections" ON public.article_sections FOR UPDATE USING (true);
CREATE POLICY "Public delete sections" ON public.article_sections FOR DELETE USING (true);

ALTER TABLE public.article_relations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read relations" ON public.article_relations FOR SELECT USING (true);
CREATE POLICY "Public insert relations" ON public.article_relations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete relations" ON public.article_relations FOR DELETE USING (true);

ALTER TABLE public.article_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read videos" ON public.article_videos FOR SELECT USING (true);
CREATE POLICY "Public insert videos" ON public.article_videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update videos" ON public.article_videos FOR UPDATE USING (true);
CREATE POLICY "Public delete videos" ON public.article_videos FOR DELETE USING (true);

ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read quizzes" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "Public insert quizzes" ON public.quizzes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update quizzes" ON public.quizzes FOR UPDATE USING (true);
CREATE POLICY "Public delete quizzes" ON public.quizzes FOR DELETE USING (true);

ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read questions" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "Public insert questions" ON public.quiz_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update questions" ON public.quiz_questions FOR UPDATE USING (true);
CREATE POLICY "Public delete questions" ON public.quiz_questions FOR DELETE USING (true);

ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read discussions" ON public.discussions FOR SELECT USING (true);
CREATE POLICY "Public insert discussions" ON public.discussions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete discussions" ON public.discussions FOR DELETE USING (true);

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read timeline" ON public.timeline_events FOR SELECT USING (true);
CREATE POLICY "Public insert timeline" ON public.timeline_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update timeline" ON public.timeline_events FOR UPDATE USING (true);
CREATE POLICY "Public delete timeline" ON public.timeline_events FOR DELETE USING (true);

ALTER TABLE public.map_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read map" ON public.map_locations FOR SELECT USING (true);
CREATE POLICY "Public insert map" ON public.map_locations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update map" ON public.map_locations FOR UPDATE USING (true);
CREATE POLICY "Public delete map" ON public.map_locations FOR DELETE USING (true);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_era ON public.articles(era);
CREATE INDEX idx_article_sections_article ON public.article_sections(article_id);
CREATE INDEX idx_quiz_questions_quiz ON public.quiz_questions(quiz_id);
