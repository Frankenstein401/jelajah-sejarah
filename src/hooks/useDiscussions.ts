import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DiscussionComment {
  id: string;
  name: string;
  message: string;
  created_at: string | null;
  parent_id: string | null;
  article_id: string;
  replies?: DiscussionComment[];
}

function buildTree(flat: DiscussionComment[]): DiscussionComment[] {
  const map = new Map<string, DiscussionComment>();
  const roots: DiscussionComment[] = [];

  flat.forEach((c) => map.set(c.id, { ...c, replies: [] }));
  flat.forEach((c) => {
    const node = map.get(c.id)!;
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id)!.replies!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

export function useDiscussions(articleId: string | undefined) {
  return useQuery({
    queryKey: ["discussions", articleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .eq("article_id", articleId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return buildTree((data || []) as DiscussionComment[]);
    },
    enabled: !!articleId,
  });
}

export function useAddDiscussion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { article_id: string; name: string; message: string; parent_id?: string }) => {
      const { error } = await supabase.from("discussions").insert({
        article_id: params.article_id,
        name: params.name,
        message: params.message,
        parent_id: params.parent_id || null,
      });
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["discussions", vars.article_id] }),
  });
}

export function useDeleteDiscussion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (params: { id: string; article_id: string }) => {
      const { error } = await supabase.from("discussions").delete().eq("id", params.id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["discussions", vars.article_id] }),
  });
}

// For admin: get all discussions across articles
export function useAllDiscussions() {
  return useQuery({
    queryKey: ["all-discussions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("discussions")
        .select("*, articles(title, slug)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });
}
