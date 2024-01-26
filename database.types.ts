export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey';
            columns: ['post_id'];
            referencedRelation: 'posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      posts: {
        Row: {
          created_at: string;
          id: string;
          paper_data: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          paper_data: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          paper_data?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'posts_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          id: string;
          name: string;
        };
        Insert: {
          avatar_url: string;
          id: string;
          name: string;
        };
        Update: {
          avatar_url?: string;
          id?: string;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_post_list: {
        Args: Record<PropertyKey, never>;
        Returns: {
          truncated_paper_data: string;
          created_at: string;
          id: string;
          name: string;
          avatar_url: string;
          likes_count: number;
        }[];
      };
      nanoid: {
        Args: {
          size?: number;
          alphabet?: string;
        };
        Returns: string;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
