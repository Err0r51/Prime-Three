export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      washinglist: {
        Row: {
          created_at: string | null
          id: number
          other_user_id: string | null
          restricted: boolean | null
          urgency: string | null
          user_id: string | null
          wash_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
          user_id?: string | null
          wash_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
          user_id?: string | null
          wash_type?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
