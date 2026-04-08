import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSignedDocumentUrl } from '@/lib/pdf/generate'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const signedUrl = await getSignedDocumentUrl(id, user.id)
    return NextResponse.json({ signedUrl })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to generate URL'

    if (message.includes('not found') || message.includes('unauthorized')) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }
    if (message.includes('not available')) {
      return NextResponse.json({ error: 'Document file not available' }, { status: 404 })
    }

    console.error('Signed URL error:', message)
    return NextResponse.json({ error: 'Failed to generate download URL' }, { status: 500 })
  }
}
