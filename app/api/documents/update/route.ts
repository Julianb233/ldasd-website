import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { documentId, changesSummary } = await request.json()

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    // Verify document ownership
    const { data: document } = await supabase
      .from('documents')
      .select('*, orders!inner(user_id)')
      .eq('id', documentId)
      .eq('orders.user_id', user.id)
      .single()

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Check for active subscription with remaining updates
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('id, status, document_updates_remaining')
      .eq('user_id', user.id)
      .in('status', ['trialing', 'active'])
      .single()

    if (!subscription) {
      return NextResponse.json(
        { error: 'Active subscription required to update documents' },
        { status: 403 }
      )
    }

    if (subscription.document_updates_remaining <= 0) {
      return NextResponse.json(
        { error: 'No document updates remaining in your current billing period' },
        { status: 403 }
      )
    }

    // Create revision record
    const { data: latestRevision } = await supabase
      .from('document_revisions')
      .select('revision_number')
      .eq('document_id', documentId)
      .order('revision_number', { ascending: false })
      .limit(1)
      .single()

    const nextRevision = (latestRevision?.revision_number || 0) + 1

    const { error: revisionError } = await supabase
      .from('document_revisions')
      .insert({
        document_id: documentId,
        subscription_id: subscription.id,
        revision_number: nextRevision,
        changes_summary: changesSummary || null,
      })

    if (revisionError) {
      console.error('Revision insert error:', revisionError)
      return NextResponse.json({ error: 'Failed to create revision' }, { status: 500 })
    }

    // Update document version
    await supabase
      .from('documents')
      .update({ version: document.version + 1 })
      .eq('id', documentId)

    // Decrement remaining updates
    await supabase
      .from('subscriptions')
      .update({
        document_updates_remaining: subscription.document_updates_remaining - 1,
      })
      .eq('id', subscription.id)

    return NextResponse.json({
      success: true,
      newVersion: document.version + 1,
      updatesRemaining: subscription.document_updates_remaining - 1,
    })
  } catch (error) {
    console.error('Document update error:', error)
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
  }
}
