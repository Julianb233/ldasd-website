import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAndStoreDocument, type DocumentData } from '@/lib/pdf/generate'

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { orderId: string; documentType: string; formData: Record<string, unknown> }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { orderId, documentType, formData } = body

  if (!orderId || !documentType || !formData) {
    return NextResponse.json(
      { error: 'Missing required fields: orderId, documentType, formData' },
      { status: 400 },
    )
  }

  const validTypes = ['will', 'trust', 'poa', 'healthcare-directive']
  if (!validTypes.includes(documentType)) {
    return NextResponse.json(
      { error: `Invalid documentType. Must be one of: ${validTypes.join(', ')}` },
      { status: 400 },
    )
  }

  try {
    const input = {
      type: documentType,
      data: formData,
    } as unknown as DocumentData

    const result = await generateAndStoreDocument(orderId, user.id, input)

    return NextResponse.json({
      documentId: result.documentId,
      signedUrl: result.signedUrl,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'PDF generation failed'
    console.error('Document generation error:', message)

    if (message.includes('not found') || message.includes('unauthorized')) {
      return NextResponse.json({ error: message }, { status: 404 })
    }
    if (message.includes('must be completed')) {
      return NextResponse.json({ error: message }, { status: 400 })
    }

    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 })
  }
}
