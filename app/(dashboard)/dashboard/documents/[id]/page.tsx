import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getStateInstructions, getDocumentRequirements } from '@/lib/data/execution-instructions'
import type { Document } from '@/lib/supabase/types'
import { EmailButton } from '@/components/dashboard/DocumentActions'

function formatDocumentType(type: Document['document_type']) {
  const labels: Record<Document['document_type'], string> = {
    will: 'Last Will & Testament',
    trust: 'Living Trust',
    poa: 'Power of Attorney',
    'healthcare-directive': 'Healthcare Directive',
  }
  return labels[type] || type
}

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Fetch document with ownership check
  const { data: document, error } = await supabase
    .from('documents')
    .select('*, orders!inner(user_id, product_type)')
    .eq('id', id)
    .eq('orders.user_id', user!.id)
    .single()

  if (error || !document) {
    notFound()
  }

  // Try to detect state from storage path or default to California
  // In a full implementation, the user's state would be stored in their profile or the order
  const userState = 'California'
  const stateInfo = getStateInstructions(userState)
  const requirements = getDocumentRequirements(userState, document.document_type)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li>
            <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/dashboard/documents" className="hover:text-gray-700">Documents</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">{formatDocumentType(document.document_type)}</li>
        </ol>
      </nav>

      {/* Document Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {formatDocumentType(document.document_type)}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Version {document.version} &middot; Generated{' '}
              {new Date(document.generated_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`/api/documents/${document.id}/download`}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </a>
            <EmailButton documentId={document.id} />
          </div>
        </div>
      </div>

      {/* Execution Instructions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Execution Instructions &mdash; {stateInfo.state}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Follow these steps to properly execute your {formatDocumentType(document.document_type).toLowerCase()} in {stateInfo.state}.
        </p>

        {/* Requirements Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{requirements.witnesses}</p>
            <p className="text-xs text-gray-500 mt-1">Witnesses Required</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-blue-600 capitalize">{requirements.notarization}</p>
            <p className="text-xs text-gray-500 mt-1">Notarization</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm font-bold text-blue-600">{requirements.selfProving ? 'Yes' : 'No'}</p>
            <p className="text-xs text-gray-500 mt-1">Self-Proving</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{requirements.minAge}+</p>
            <p className="text-xs text-gray-500 mt-1">Minimum Age</p>
          </div>
        </div>

        {/* Step-by-step instructions */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Steps to Execute</h3>
          <ol className="space-y-3">
            {stateInfo.generalSteps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm text-gray-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Document-specific notes */}
        {requirements.additionalNotes.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-800 mb-2">
              Important Notes for {stateInfo.state}
            </h3>
            <ul className="space-y-1.5">
              {requirements.additionalNotes.map((note, index) => (
                <li key={index} className="text-sm text-amber-700 flex gap-2">
                  <span className="flex-shrink-0 mt-1">&#8226;</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500">
          <strong>Disclaimer:</strong> These execution instructions are provided for general informational
          purposes only and do not constitute legal advice. Requirements may vary by county and may change
          over time. We strongly recommend consulting with an attorney licensed in your state to ensure
          your documents are properly executed and comply with current state law.
        </p>
      </div>
    </div>
  )
}
