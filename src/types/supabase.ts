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
      washinglist: {
        Row: {
          created_at: string | null
          id: number
          restricted: boolean | null
          urgency: string | null
          wash_type: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
          wash_type?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          restricted?: boolean | null
          urgency?: string | null
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

export interface washinglist {
  created_at: string | null
  id?: string | null
  restricted: boolean | null
  urgency: string | null
  wash_type: string | null
}
