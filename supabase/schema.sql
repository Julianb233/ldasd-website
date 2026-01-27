-- LDASD Estate Planning Platform - Database Schema
-- Version: 1.0
-- Run this in Supabase SQL Editor: Dashboard -> SQL Editor -> New Query

-- =============================================================================
-- PROFILES TABLE
-- Extends auth.users with additional user metadata
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING ((SELECT auth.uid()) = id);

-- Note: INSERT handled by trigger, no user INSERT policy needed

-- =============================================================================
-- ORDERS TABLE
-- Tracks product purchases
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  product_type TEXT NOT NULL, -- 'will', 'trust', 'poa', 'healthcare-directive', 'estate-plan'
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'refunded')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  is_couples BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Orders RLS Policies
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

-- Note: UPDATE/DELETE handled by backend with service role, not user-facing

-- Index for RLS policy performance
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON public.orders(user_id);

-- =============================================================================
-- DOCUMENTS TABLE
-- Tracks generated PDF documents
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'will', 'trust', 'poa', 'healthcare-directive'
  storage_path TEXT, -- Supabase Storage path
  version INTEGER DEFAULT 1,
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Documents RLS Policies (via order ownership)
CREATE POLICY "Users can view documents from own orders"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = documents.order_id
      AND orders.user_id = (SELECT auth.uid())
    )
  );

-- Index for RLS policy performance
CREATE INDEX IF NOT EXISTS documents_order_id_idx ON public.documents(order_id);

-- =============================================================================
-- PROFILE TRIGGER
-- Automatically creates profile row when user signs up
-- =============================================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger on auth.users insert
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- UPDATED_AT TRIGGERS
-- Automatically update updated_at timestamp on row changes
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS orders_updated_at ON public.orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS documents_updated_at ON public.documents;
CREATE TRIGGER documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- VERIFICATION QUERIES (run after schema creation)
-- =============================================================================

-- Verify tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verify RLS is enabled
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Verify policies exist
-- SELECT * FROM pg_policies WHERE schemaname = 'public';
