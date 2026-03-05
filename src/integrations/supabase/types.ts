export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      article_relations: {
        Row: {
          article_id: string
          id: string
          related_article_id: string
        }
        Insert: {
          article_id: string
          id?: string
          related_article_id: string
        }
        Update: {
          article_id?: string
          id?: string
          related_article_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_relations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "article_relations_related_article_id_fkey"
            columns: ["related_article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_sections: {
        Row: {
          article_id: string
          heading: string
          id: string
          image_url: string | null
          paragraphs: string[]
          sort_order: number
        }
        Insert: {
          article_id: string
          heading: string
          id?: string
          image_url?: string | null
          paragraphs?: string[]
          sort_order?: number
        }
        Update: {
          article_id?: string
          heading?: string
          id?: string
          image_url?: string | null
          paragraphs?: string[]
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "article_sections_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      article_videos: {
        Row: {
          article_id: string
          channel: string | null
          id: string
          sort_order: number | null
          title: string
          youtube_id: string
        }
        Insert: {
          article_id: string
          channel?: string | null
          id?: string
          sort_order?: number | null
          title: string
          youtube_id: string
        }
        Update: {
          article_id?: string
          channel?: string | null
          id?: string
          sort_order?: number | null
          title?: string
          youtube_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "article_videos_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          created_at: string | null
          era: string
          hero_image: string | null
          id: string
          slug: string
          summary: string
          title: string
          updated_at: string | null
          year: string
        }
        Insert: {
          created_at?: string | null
          era: string
          hero_image?: string | null
          id?: string
          slug: string
          summary: string
          title: string
          updated_at?: string | null
          year: string
        }
        Update: {
          created_at?: string | null
          era?: string
          hero_image?: string | null
          id?: string
          slug?: string
          summary?: string
          title?: string
          updated_at?: string | null
          year?: string
        }
        Relationships: []
      }
      discussions: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          message: string
          name: string
          parent_id: string | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          message: string
          name: string
          parent_id?: string | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          message?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "discussions_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      map_locations: {
        Row: {
          article_slug: string | null
          description: string | null
          era: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          year: string | null
        }
        Insert: {
          article_slug?: string | null
          description?: string | null
          era?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          year?: string | null
        }
        Update: {
          article_slug?: string | null
          description?: string | null
          era?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          year?: string | null
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_index: number
          explanation: string | null
          id: string
          options: string[]
          question: string
          quiz_id: string
          sort_order: number | null
        }
        Insert: {
          correct_index: number
          explanation?: string | null
          id?: string
          options: string[]
          question: string
          quiz_id: string
          sort_order?: number | null
        }
        Update: {
          correct_index?: number
          explanation?: string | null
          id?: string
          options?: string[]
          question?: string
          quiz_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          article_id: string
          id: string
          title: string
        }
        Insert: {
          article_id: string
          id?: string
          title: string
        }
        Update: {
          article_id?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: true
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      timeline_events: {
        Row: {
          article_slug: string | null
          description: string
          detail: string | null
          era: string | null
          figures: string[] | null
          id: string
          image_caption: string | null
          image_url: string | null
          significance: string[] | null
          sort_order: number | null
          title: string
          year: string
        }
        Insert: {
          article_slug?: string | null
          description: string
          detail?: string | null
          era?: string | null
          figures?: string[] | null
          id?: string
          image_caption?: string | null
          image_url?: string | null
          significance?: string[] | null
          sort_order?: number | null
          title: string
          year: string
        }
        Update: {
          article_slug?: string | null
          description?: string
          detail?: string | null
          era?: string | null
          figures?: string[] | null
          id?: string
          image_caption?: string | null
          image_url?: string | null
          significance?: string[] | null
          sort_order?: number | null
          title?: string
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
