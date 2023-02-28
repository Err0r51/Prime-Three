export interface User {
  id: string | null
  email: string | null
}

export interface SupaBaseUser {
  id: string | null
  aud: string | null
  role: string | null
  email: string | null
  email_confirmed_at: Date | null
  invited_at: Date | null
  phone: Number | null
  confirmation_sent_at: Date | null
  confirmed_at: Date | null
  recovery_sent_at: Date | null
  last_sign_in_at: Date | null
  created_at: Date | null
  updated_at: Date | null
}
