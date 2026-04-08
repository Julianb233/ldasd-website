'use client'

// WIZ-01 through WIZ-06: Main wizard shell — progress, steps, navigation, auto-save

import type { WizardConfig } from '@/lib/wizard/types'
import { useWizard } from '@/lib/wizard/use-wizard'
import ProgressBar from './ProgressBar'
import SaveIndicator from './SaveIndicator'
import WizardFieldComponent from './WizardField'

type WizardShellProps = {
  config: WizardConfig
  onComplete: (values: Record<string, unknown>) => void
  /** Optional class for outer container */
  className?: string
}

export default function WizardShell({ config, onComplete, className }: WizardShellProps) {
  const wizard = useWizard(config)

  const handleNext = () => {
    if (wizard.isLastStep) {
      const valid = wizard.nextStep()
      if (valid) {
        onComplete(wizard.values)
      }
    } else {
      wizard.nextStep()
    }
  }

  // Filter fields based on conditional visibility
  const visibleFields = wizard.currentStep.fields.filter(
    (f) => !f.showWhen || f.showWhen(wizard.values)
  )

  return (
    <div className={className}>
      {/* Header with title + save indicator */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{config.title}</h1>
          {config.description && (
            <p className="mt-1 text-sm text-gray-500">{config.description}</p>
          )}
        </div>
        <SaveIndicator status={wizard.saveStatus} />
      </div>

      {/* Progress bar */}
      <ProgressBar
        steps={config.steps.map((s) => ({ id: s.id, title: s.title }))}
        currentStepIndex={wizard.currentStepIndex}
        completedSteps={wizard.completedSteps}
        onStepClick={wizard.goToStep}
      />

      {/* Current step */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{wizard.currentStep.title}</h2>
          {wizard.currentStep.description && (
            <p className="mt-1 text-sm text-gray-500">{wizard.currentStep.description}</p>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-5">
          {visibleFields.map((field) => (
            <WizardFieldComponent
              key={field.name}
              field={field}
              value={wizard.values[field.name]}
              error={wizard.errors[field.name]}
              onChange={wizard.setValue}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={wizard.prevStep}
            disabled={wizard.isFirstStep}
            className={`
              inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium
              transition-colors duration-150
              ${wizard.isFirstStep
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={wizard.reset}
              className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="
                inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium
                bg-primary text-white hover:bg-primary-dark
                transition-colors duration-150
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
              "
            >
              {wizard.isLastStep ? 'Complete' : 'Continue'}
              {!wizard.isLastStep && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Resume banner */}
      {wizard.completedSteps.length > 0 && wizard.currentStepIndex > 0 && (
        <p className="mt-3 text-center text-xs text-gray-400">
          Your progress is automatically saved. You can close this page and resume later.
        </p>
      )}
    </div>
  )
}
