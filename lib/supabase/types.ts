// Database types for Supabase tables
// Generated to match supabase/schema.sql

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
  created_at: string
  updated_at: string
}

export type Document = {
  id: string
  order_id: string
  document_type: 'will' | 'trust' | 'poa' | 'healthcare-directive'
  storage_path: string | null
  version: number
  generated_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  plan_type: 'will' | 'trust' | 'estate-plan'
  status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete'
  trial_start: string | null
  trial_end: string | null
  current_period_start: string | null
  current_period_end: string | null
  cancel_at_period_end: boolean
  canceled_at: string | null
  amount_cents: number
  interval: 'month' | 'year'
  document_updates_remaining: number
  created_at: string
  updated_at: string
}

export type DocumentRevision = {
  id: string
  document_id: string
  subscription_id: string | null
  revision_number: number
  changes_summary: string | null
  storage_path: string | null
  created_at: string
}

// Insert types (omit auto-generated fields)
export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>
export type OrderInsert = Omit<Order, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  status?: Order['status']
  stripe_session_id?: string | null
  stripe_payment_intent_id?: string | null
  is_couples?: boolean
}
export type DocumentInsert = Omit<Document, 'id' | 'generated_at' | 'updated_at'> & {
  id?: string
  storage_path?: string | null
  version?: number
}

export type SubscriptionInsert = Omit<Subscription, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
  status?: Subscription['status']
  cancel_at_period_end?: boolean
  document_updates_remaining?: number
}
export type DocumentRevisionInsert = Omit<DocumentRevision, 'id' | 'created_at'> & {
  id?: string
  revision_number?: number
}

// Update types (all fields optional except id)
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>
export type OrderUpdate = Partial<Omit<Order, 'id' | 'user_id' | 'created_at'>>
export type DocumentUpdate = Partial<Omit<Document, 'id' | 'order_id'>>
export type SubscriptionUpdate = Partial<Omit<Subscription, 'id' | 'user_id' | 'created_at'>>

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
      subscriptions: {
        Row: Subscription
        Insert: SubscriptionInsert
        Update: SubscriptionUpdate
      }
      document_revisions: {
        Row: DocumentRevision
        Insert: DocumentRevisionInsert
        Update: Partial<Omit<DocumentRevision, 'id'>>
      }
    }
  }
}
