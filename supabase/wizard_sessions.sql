-- Wizard Sessions — server-side auto-save persistence
-- Run after schema.sql

CREATE TABLE IF NOT EXISTS public.wizard_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  wizard_id TEXT NOT NULL,
  current_step_index INTEGER DEFAULT 0,
  values JSONB DEFAULT '{}'::jsonb,
  completed_steps TEXT[] DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_saved_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  -- One active session per user per wizard type
  UNIQUE (user_id, wizard_id)
);

-- Enable RLS
ALTER TABLE public.wizard_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only access their own sessions
CREATE POLICY "Users can view own wizard sessions"
  ON public.wizard_sessions FOR SELECT
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own wizard sessions"
  ON public.wizard_sessions FOR INSERT
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own wizard sessions"
  ON public.wizard_sessions FOR UPDATE
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own wizard sessions"
  ON public.wizard_sessions FOR DELETE
  USING ((SELECT auth.uid()) = user_id);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS wizard_sessions_user_wizard_idx
  ON public.wizard_sessions(user_id, wizard_id);

-- Auto-update updated_at
DROP TRIGGER IF EXISTS wizard_sessions_updated_at ON public.wizard_sessions;
CREATE TRIGGER wizard_sessions_updated_at
  BEFORE UPDATE ON public.wizard_sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
