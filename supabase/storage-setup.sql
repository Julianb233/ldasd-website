-- LDASD Estate Planning Platform — Storage Bucket Setup
-- Run this in Supabase SQL Editor after schema.sql

-- Create the documents storage bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- RLS: Allow authenticated users to read their own documents
CREATE POLICY "Users can read own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS: Allow service role to upload (handled by admin client, no user-facing upload policy needed)
-- The admin client uses the service_role key which bypasses RLS.

-- RLS: Deny direct user uploads (documents are generated server-side only)
-- No INSERT policy for authenticated users = blocked by default with RLS enabled.
