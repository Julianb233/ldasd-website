'use client'

import { useRouter } from 'next/navigation'
import { WizardShell } from '@/components/wizard'
import { willWizardConfig } from '@/lib/wizard/configs'

export default function NewDocumentPage() {
  const router = useRouter()

  const handleComplete = (values: Record<string, unknown>) => {
    // In production this would trigger PDF generation / order creation
    console.log('[Wizard] Completed with values:', values)
    // Navigate to dashboard with success state
    router.push('/dashboard?wizard_complete=true')
  }

  return (
    <div className="max-w-3xl mx-auto py-4">
      <WizardShell
        config={willWizardConfig}
        onComplete={handleComplete}
      />
    </div>
  )
}
