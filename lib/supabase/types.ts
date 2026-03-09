// Database types for Supabase tables
// Generated to match supabase/schema.sql + couples-schema.sql

export type Profile = {
  id: string
  email: string | null
  full_name: string | null
  created_at: string
  updated_at: string
}

export type Order = {
  id: string
  user_id: string
  product_type: 'will' | 'trust' | 'poa' | 'healthcare-directive' | 'estate-plan'
  amount_cents: number
  status: 'pending' | 'completed' | 'refunded'
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  is_couples: boolean
  partner_id: string | null
  created_at: string
  updated_at: string
}

export type Document = {
  id: string
  order_id: string
  document_type: 'will' | 'trust' | 'poa' | 'healthcare-directive'
  storage_path: string | null
  version: number
  owner_label: 'primary' | 'partner'
  is_mirror: boolean
  generated_at: string
  updated_at: string
}

export type CoupleInvitation = {
  id: string
  inviter_id: string
  invitee_email: string
  invitee_id: string | null
  status: 'pending' | 'sent' | 'accepted' | 'declined' | 'expired'
  token: string
  permissions: string[]
  created_at: string
  accepted_at: string | null
  expires_at: string
  updated_at: string
}

export type SharedAccount = {
  id: string
  primary_user_id: string
  partner_user_id: string
  invitation_id: string | null
  permissions: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// Available permissions for shared accounts
export type SharedPermission = 'view_documents' | 'view_orders' | 'edit_documents' | 'manage_account'

// Insert types (omit auto-generated fields)
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>
export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  status?: Order['status']
  stripe_session_id?: string | null
  stripe_payment_intent_id?: string | null
  is_couples?: boolean
  partner_id?: string | null
}
export type DocumentInsert = Omit<Document, 'id' | 'generated_at' | 'updated_at'> & {
  id?: string
  storage_path?: string | null
  version?: number
  owner_label?: Document['owner_label']
  is_mirror?: boolean
}
export type CoupleInvitationInsert = Omit<CoupleInvitation, 'id' | 'created_at' | 'updated_at' | 'accepted_at' | 'expires_at'> & {
  id?: string
  invitee_id?: string | null
  accepted_at?: string | null
  expires_at?: string
}
export type SharedAccountInsert = Omit<SharedAccount, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  invitation_id?: string | null
  is_active?: boolean
}

// Update types (all fields optional except id)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>
export type OrderUpdate = Partial<Omit<Order, 'id' | 'user_id' | 'created_at'>>
export type DocumentUpdate = Partial<Omit<Document, 'id' | 'order_id'>>
export type CoupleInvitationUpdate = Partial<Omit<CoupleInvitation, 'id' | 'inviter_id' | 'created_at'>>
export type SharedAccountUpdate = Partial<Omit<SharedAccount, 'id' | 'primary_user_id' | 'partner_user_id' | 'created_at'>>

// Database schema type for Supabase client
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      orders: {
        Row: Order
        Insert: OrderInsert
        Update: OrderUpdate
      }
      documents: {
        Row: Document
        Insert: DocumentInsert
        Update: DocumentUpdate
      }
      couple_invitations: {
        Row: CoupleInvitation
        Insert: CoupleInvitationInsert
        Update: CoupleInvitationUpdate
      }
      shared_accounts: {
        Row: SharedAccount
        Insert: SharedAccountInsert
        Update: SharedAccountUpdate
      }
    }
  }
}
