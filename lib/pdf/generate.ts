import 'server-only'
import React from 'react'
import { renderToBuffer, type DocumentProps } from '@react-pdf/renderer'
import { WillDocument, type WillData } from '@/lib/templates/will'
import { TrustDocument, type TrustData } from '@/lib/templates/trust'
import { GuardianshipDocument, type GuardianshipData } from '@/lib/templates/guardianship'
import { createAdminClient } from '@/lib/supabase/admin'
import type { DocumentInsert } from '@/lib/supabase/types'

export type DocumentType = 'will' | 'trust' | 'poa' | 'healthcare-directive'

export type DocumentData =
  | { type: 'will'; data: WillData }
  | { type: 'trust'; data: TrustData }
  | { type: 'poa'; data: GuardianshipData }
  | { type: 'healthcare-directive'; data: GuardianshipData }

function getDocumentElement(input: DocumentData): React.ReactElement<DocumentProps> {
  switch (input.type) {
    case 'will':
      return React.createElement(WillDocument, { data: input.data }) as React.ReactElement<DocumentProps>
    case 'trust':
      return React.createElement(TrustDocument, { data: input.data }) as React.ReactElement<DocumentProps>
    case 'poa':
    case 'healthcare-directive':
      return React.createElement(GuardianshipDocument, { data: input.data }) as React.ReactElement<DocumentProps>
  }
}

/**
 * Renders a PDF document from template data and returns the buffer.
 */
export async function generatePdfBuffer(input: DocumentData): Promise<Buffer> {
  const element = getDocumentElement(input)
  const buffer = await renderToBuffer(element)
  return Buffer.from(buffer)
}

/**
 * Generates a PDF, uploads it to Supabase Storage, creates a document record,
 * and returns the document ID and a signed download URL.
 */
export async function generateAndStoreDocument(
  orderId: string,
  userId: string,
  input: DocumentData,
): Promise<{ documentId: string; signedUrl: string }> {
  const admin = createAdminClient()

  // Check order ownership and status
  const { data: order, error: orderError } = await admin
    .from('orders')
    .select('id, user_id, status')
    .eq('id', orderId)
    .eq('user_id', userId)
    .single()

  if (orderError || !order) {
    throw new Error('Order not found or unauthorized')
  }

  if (order.status !== 'completed') {
    throw new Error('Order must be completed before generating documents')
  }

  // Check for existing document to determine version
  const { data: existing } = await admin
    .from('documents')
    .select('version')
    .eq('order_id', orderId)
    .eq('document_type', input.type)
    .order('version', { ascending: false })
    .limit(1)

  const version = existing && existing.length > 0 ? existing[0].version + 1 : 1

  // Generate PDF
  const pdfBuffer = await generatePdfBuffer(input)

  // Upload to Supabase Storage
  const storagePath = `${userId}/${orderId}/${input.type}-v${version}.pdf`

  const { error: uploadError } = await admin.storage
    .from('documents')
    .upload(storagePath, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: false,
    })

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`)
  }

  // Create document record
  const docInsert: DocumentInsert = {
    order_id: orderId,
    document_type: input.type,
    storage_path: storagePath,
    version,
  }

  const { data: document, error: docError } = await admin
    .from('documents')
    .insert(docInsert)
    .select('id')
    .single()

  if (docError || !document) {
    // Clean up uploaded file on DB insert failure
    await admin.storage.from('documents').remove([storagePath])
    throw new Error(`Document record creation failed: ${docError?.message}`)
  }

  // Generate signed URL (1 hour expiry)
  const { data: signedUrlData, error: urlError } = await admin.storage
    .from('documents')
    .createSignedUrl(storagePath, 3600)

  if (urlError || !signedUrlData) {
    throw new Error(`Signed URL generation failed: ${urlError?.message}`)
  }

  return {
    documentId: document.id,
    signedUrl: signedUrlData.signedUrl,
  }
}

/**
 * Generates a signed download URL for an existing document.
 * Validates user ownership via order relationship.
 */
export async function getSignedDocumentUrl(
  documentId: string,
  userId: string,
  expiresIn: number = 3600,
): Promise<string> {
  const admin = createAdminClient()

  const { data: document, error } = await admin
    .from('documents')
    .select('storage_path, orders!inner(user_id)')
    .eq('id', documentId)
    .eq('orders.user_id', userId)
    .single()

  if (error || !document) {
    throw new Error('Document not found or unauthorized')
  }

  if (!document.storage_path) {
    throw new Error('Document file not available')
  }

  const { data: signedUrlData, error: urlError } = await admin.storage
    .from('documents')
    .createSignedUrl(document.storage_path, expiresIn)

  if (urlError || !signedUrlData) {
    throw new Error(`Signed URL generation failed: ${urlError?.message}`)
  }

  return signedUrlData.signedUrl
}
