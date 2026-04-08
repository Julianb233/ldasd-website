import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  // Verify user is authenticated
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch document with ownership check via order
  const { data: document, error: docError } = await supabase
    .from('documents')
    .select('*, orders!inner(user_id, product_type)')
    .eq('id', id)
    .eq('orders.user_id', user.id)
    .single()

  if (docError || !document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  if (!document.storage_path) {
    return NextResponse.json({ error: 'Document file not available' }, { status: 404 })
  }

  // Download from Supabase Storage
  const { data: fileData, error: storageError } = await supabase.storage
    .from('documents')
    .download(document.storage_path)

  if (storageError || !fileData) {
    return NextResponse.json({ error: 'Failed to retrieve document' }, { status: 500 })
  }

  const documentTypeLabels: Record<string, string> = {
    will: 'Last-Will-and-Testament',
    trust: 'Living-Trust',
    poa: 'Power-of-Attorney',
    'healthcare-directive': 'Healthcare-Directive',
  }

  const filename = `${documentTypeLabels[document.document_type] || document.document_type}-v${document.version}.pdf`

  return new NextResponse(fileData, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
