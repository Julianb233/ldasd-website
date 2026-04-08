'use client'

// WIZ-05: Auto-save status indicator

import type { SaveStatus } from '@/lib/wizard/types'

type SaveIndicatorProps = {
  status: SaveStatus
}

export default function SaveIndicator({ status }: SaveIndicatorProps) {
  if (status === 'idle') return null

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full
        transition-opacity duration-300
        ${status === 'saving' ? 'bg-yellow-50 text-yellow-700' : ''}
        ${status === 'saved' ? 'bg-green-50 text-green-700' : ''}
        ${status === 'error' ? 'bg-red-50 text-red-700' : ''}
      `}
      role="status"
      aria-live="polite"
    >
      {status === 'saving' && (
        <>
          <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Saving...
        </>
      )}
      {status === 'saved' && (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Saved
        </>
      )}
      {status === 'error' && (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          Save failed
        </>
      )}
    </div>
  )
}
