import 'server-only'
import { createClient } from '@supabase/supabase-js'

// Admin client with service role key — bypasses RLS
// Only use server-side for storage operations and document management
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
