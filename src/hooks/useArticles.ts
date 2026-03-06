import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useArticles() {
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*, article_sections(id)")
        .order("created_at");
      if (error) throw error;
      return data || [];
    },
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          article_sections(id, heading, paragraphs, sort_order, image_url),
          article_videos(id, title, youtube_id, channel, sort_order),
          quizzes(id, title, quiz_questions(id, question, options, correct_index, explanation, sort_order))
        `)
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}

export function useRelatedArticles(articleId: string | undefined) {
  return useQuery({
    queryKey: ["related-articles", articleId],
    queryFn: async () => {
      const { data: relations } = await supabase
        .from("article_relations")
        .select("related_article_id")
        .eq("article_id", articleId!);
      if (!relations || relations.length === 0) return [];

      const relIds = relations.map((r) => r.related_article_id);
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .in("id", relIds);
      if (error) throw error;
      return data || [];
    },
    enabled: !!articleId,
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["articles"] }),
  });
}
