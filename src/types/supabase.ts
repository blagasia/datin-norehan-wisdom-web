
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          full_name: string | null
          email: string
          phone: string | null
          source: string | null
          status: string | null
          tags: string[] | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name?: string | null
          email: string
          phone?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          tags?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lead_activities: {
        Row: {
          id: string
          lead_id: string
          activity_type: string
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          activity_type: string
          description?: string
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          activity_type?: string
          description?: string
          created_at?: string
        }
      }
      content_pages: {
        Row: {
          id: string
          title: string
          slug: string
          meta_description: string | null
          content: any
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          meta_description?: string | null
          content?: any
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          meta_description?: string | null
          content?: any
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      seo_metadata: {
        Row: {
          id: string
          page_path: string
          title: string | null
          description: string | null
          keywords: string[] | null
          og_title: string | null
          og_description: string | null
          og_image_url: string | null
          canonical_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_path: string
          title?: string | null
          description?: string | null
          keywords?: string[] | null
          og_title?: string | null
          og_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          title?: string | null
          description?: string | null
          keywords?: string[] | null
          og_title?: string | null
          og_description?: string | null
          og_image_url?: string | null
          canonical_url?: string | null
          created_at?: string
          updated_at?: string
        }
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
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          public: boolean | null
        }
      }
      objects: {
        Row: {
          id: string
          bucket_id: string
          name: string
          owner: string | null
          created_at: string | null
          updated_at: string | null
          last_accessed_at: string | null
          metadata: any | null
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
