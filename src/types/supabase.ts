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
          restricted: boolean | null
          urgency: string | null
          user_id: string
          wash_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
          user_id?: string
          wash_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
          user_id?: string
          wash_type?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      find_matching_washings: {
        Args: {
          user_id_input: string
        }
        Returns: {
          id: number
          user_id: string
          wash_type: string
          restricted: boolean
          urgency: string
          match_user_id: string
        }[]
      }
      get_washinglist: {
        Args: {
          user_id_input: string
        }
        Returns: {
          id: number
          user_id: string
          wash_type: string
          restricted: boolean
          urgency: string
          other_user_id: string
          other_wash_type: string
          other_restricted: boolean
          other_urgency: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
