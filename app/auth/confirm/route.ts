import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { EmailOtpType } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Handle different verification types
      if (type === 'recovery') {
        // Password recovery - redirect to reset password page
        return NextResponse.redirect(`${origin}${next}`)
      }

      // Email verification - redirect to dashboard with verified flag
      return NextResponse.redirect(`${origin}/dashboard?verified=true`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=verification_failed`)
}
