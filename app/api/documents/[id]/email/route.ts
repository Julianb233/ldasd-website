import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
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

  // Fetch document with ownership check
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

  // Download file from storage
  const { data: fileData, error: storageError } = await supabase.storage
    .from('documents')
    .download(document.storage_path)

  if (storageError || !fileData) {
    return NextResponse.json({ error: 'Failed to retrieve document' }, { status: 500 })
  }

  const documentTypeLabels: Record<string, string> = {
    will: 'Last Will and Testament',
    trust: 'Living Trust',
    poa: 'Power of Attorney',
    'healthcare-directive': 'Healthcare Directive',
  }

  const docLabel = documentTypeLabels[document.document_type] || document.document_type
  const filename = `${docLabel.replace(/\s+/g, '-')}-v${document.version}.pdf`

  // Convert Blob to Buffer for Resend attachment
  const buffer = Buffer.from(await fileData.arrayBuffer())

  const { error: emailError } = await resend.emails.send({
    from: 'LDASD Estate Planning <documents@ldasd.com>',
    to: user.email!,
    subject: `Your ${docLabel} Document`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="color: #1a365d; font-size: 24px; border-bottom: 2px solid #1a365d; padding-bottom: 16px;">
          Your ${docLabel}
        </h1>
        <p style="color: #2d3748; line-height: 1.6;">
          Your ${docLabel} document (Version ${document.version}) is attached to this email.
        </p>
        <h2 style="color: #1a365d; font-size: 18px; margin-top: 24px;">Important Next Steps</h2>
        <ol style="color: #2d3748; line-height: 1.8;">
          <li>Print the document on standard letter-size paper</li>
          <li>Read the entire document carefully before signing</li>
          <li>Sign in the presence of required witnesses</li>
          <li>Have the document notarized if required by your state</li>
          <li>Store the original in a secure location</li>
          <li>Provide copies to relevant parties (executor, trustee, etc.)</li>
        </ol>
        <div style="margin-top: 32px; padding: 16px; background: #f7fafc; border: 1px solid #cbd5e0; border-radius: 8px;">
          <p style="color: #4a5568; font-size: 13px; margin: 0;">
            <strong>Disclaimer:</strong> This document was prepared using LDASD Estate Planning services.
            It is not a substitute for legal advice. We recommend consulting with an attorney
            licensed in your state to review your documents.
          </p>
        </div>
        <p style="color: #a0aec0; font-size: 12px; margin-top: 24px; text-align: center;">
          LDASD Estate Planning &mdash; Protecting what matters most
        </p>
      </div>
    `,
    attachments: [
      {
        filename,
        content: buffer,
      },
    ],
  })

  if (emailError) {
    console.error('Resend email error:', emailError)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: `Document sent to ${user.email}` })
}
