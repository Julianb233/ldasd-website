-- LDASD Estate Planning Platform - Couples & Shared Access Schema
-- Version: 1.0
-- Implements: COUP-01 (couples pricing), COUP-02 (two document sets),
--             COUP-03 (shared access), COUP-04 (mirror documents)
-- Run this AFTER schema.sql in Supabase SQL Editor

-- =============================================================================
-- COUPLE INVITATIONS TABLE
-- Tracks partner invitations for shared account access (COUP-03)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.couple_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  inviter_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  invitee_email TEXT NOT NULL,
  invitee_id UUID REFERENCES auth.users ON DELETE SET NULL, -- set when accepted
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'declined', 'expired')),
  token TEXT NOT NULL UNIQUE, -- secure token for invitation link
  permissions TEXT[] DEFAULT ARRAY['view_documents', 'view_orders']::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.couple_invitations ENABLE ROW LEVEL SECURITY;

-- Invitations RLS Policies
CREATE POLICY "Users can view invitations they sent"
  ON public.couple_invitations FOR SELECT
  USING ((SELECT auth.uid()) = inviter_id);

CREATE POLICY "Users can view invitations sent to them"
  ON public.couple_invitations FOR SELECT
  USING (invitee_email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid())));

CREATE POLICY "Users can create invitations"
  ON public.couple_invitations FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = inviter_id);

CREATE POLICY "Invitees can update invitation status"
  ON public.couple_invitations FOR UPDATE
  USING (
    invitee_email = (SELECT email FROM auth.users WHERE id = (SELECT auth.uid()))
    OR (SELECT auth.uid()) = inviter_id
  );

-- Index for lookup performance
CREATE INDEX IF NOT EXISTS couple_invitations_inviter_idx ON public.couple_invitations(inviter_id);
CREATE INDEX IF NOT EXISTS couple_invitations_token_idx ON public.couple_invitations(token);
CREATE INDEX IF NOT EXISTS couple_invitations_invitee_email_idx ON public.couple_invitations(invitee_email);

-- =============================================================================
-- SHARED ACCOUNTS TABLE
-- Links two users as a couple for shared document/order access (COUP-03)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.shared_accounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  partner_user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  invitation_id UUID REFERENCES public.couple_invitations ON DELETE SET NULL,
  permissions TEXT[] DEFAULT ARRAY['view_documents', 'view_orders']::TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(primary_user_id, partner_user_id)
);

-- Enable RLS
ALTER TABLE public.shared_accounts ENABLE ROW LEVEL SECURITY;

-- Shared Accounts RLS Policies
CREATE POLICY "Users can view their shared accounts"
  ON public.shared_accounts FOR SELECT
  USING (
    (SELECT auth.uid()) = primary_user_id
    OR (SELECT auth.uid()) = partner_user_id
  );

CREATE POLICY "Primary user can insert shared accounts"
  ON public.shared_accounts FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = primary_user_id);

CREATE POLICY "Either user can update shared account"
  ON public.shared_accounts FOR UPDATE
  USING (
    (SELECT auth.uid()) = primary_user_id
    OR (SELECT auth.uid()) = partner_user_id
  );

-- Index for performance
CREATE INDEX IF NOT EXISTS shared_accounts_primary_idx ON public.shared_accounts(primary_user_id);
CREATE INDEX IF NOT EXISTS shared_accounts_partner_idx ON public.shared_accounts(partner_user_id);

-- =============================================================================
-- ADD COUPLES FIELDS TO ORDERS TABLE
-- Support partner_id for tracking who owns each document set (COUP-02)
-- =============================================================================

-- Partner user_id for the second set of documents in a couples order
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES auth.users ON DELETE SET NULL;

-- =============================================================================
-- ADD OWNER LABEL TO DOCUMENTS TABLE
-- Track which partner a document belongs to (COUP-02, COUP-04)
-- =============================================================================

-- 'primary' or 'partner' to identify which set this document belongs to
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS owner_label TEXT DEFAULT 'primary' CHECK (owner_label IN ('primary', 'partner'));

-- Whether this is a mirror document (COUP-04)
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS is_mirror BOOLEAN DEFAULT FALSE;

-- =============================================================================
-- UPDATED_AT TRIGGERS FOR NEW TABLES
-- =============================================================================

DROP TRIGGER IF EXISTS couple_invitations_updated_at ON public.couple_invitations;
CREATE TRIGGER couple_invitations_updated_at
  BEFORE UPDATE ON public.couple_invitations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS shared_accounts_updated_at ON public.shared_accounts;
CREATE TRIGGER shared_accounts_updated_at
  BEFORE UPDATE ON public.shared_accounts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =============================================================================
-- UPDATE DOCUMENTS RLS TO SUPPORT SHARED ACCESS
-- Partners can view documents from shared orders
-- =============================================================================

-- Drop old policy and recreate with shared access support
DROP POLICY IF EXISTS "Users can view documents from own orders" ON public.documents;

CREATE POLICY "Users can view documents from own or shared orders"
  ON public.documents FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = documents.order_id
      AND (
        orders.user_id = (SELECT auth.uid())
        OR orders.partner_id = (SELECT auth.uid())
        OR EXISTS (
          SELECT 1 FROM public.shared_accounts
          WHERE shared_accounts.is_active = TRUE
          AND (
            (shared_accounts.primary_user_id = (SELECT auth.uid()) AND shared_accounts.partner_user_id = orders.user_id)
            OR (shared_accounts.partner_user_id = (SELECT auth.uid()) AND shared_accounts.primary_user_id = orders.user_id)
          )
          AND 'view_documents' = ANY(shared_accounts.permissions)
        )
      )
    )
  );

-- =============================================================================
-- VERIFICATION QUERIES
-- =============================================================================

-- Verify new tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Verify new columns on orders
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'orders' AND table_schema = 'public';

-- Verify new columns on documents
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'documents' AND table_schema = 'public';
