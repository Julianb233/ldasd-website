'use client'

// WIZ-04: Progress indicator with clickable step navigation

type ProgressBarProps = {
  steps: { id: string; title: string }[]
  currentStepIndex: number
  completedSteps: string[]
  onStepClick: (index: number) => void
}

export default function ProgressBar({
  steps,
  currentStepIndex,
  completedSteps,
  onStepClick,
}: ProgressBarProps) {
  return (
    <nav aria-label="Wizard progress" className="mb-8">
      {/* Mobile: simple text */}
      <div className="sm:hidden flex items-center justify-between px-1 mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
        <span className="text-sm text-gray-500">{steps[currentStepIndex].title}</span>
      </div>
      {/* Mobile progress bar */}
      <div className="sm:hidden h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Desktop: full stepper */}
      <ol className="hidden sm:flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = index === currentStepIndex
          const isClickable = isCompleted || index <= currentStepIndex

          return (
            <li key={step.id} className="flex-1 flex items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`
                  group flex flex-col items-center w-full relative
                  ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                `}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {/* Connector line */}
                {index > 0 && (
                  <div
                    className={`
                      absolute top-4 right-1/2 w-full h-0.5 -translate-y-1/2
                      ${isCompleted || isCurrent ? 'bg-primary' : 'bg-gray-200'}
                    `}
                  />
                )}

                {/* Circle */}
                <span
                  className={`
                    relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                    transition-colors duration-200
                    ${
                      isCompleted
                        ? 'bg-primary text-white'
                        : isCurrent
                          ? 'bg-primary text-white ring-4 ring-primary/20'
                          : 'bg-gray-200 text-gray-500'
                    }
                    ${isClickable && !isCurrent ? 'group-hover:ring-2 group-hover:ring-primary/30' : ''}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </span>

                {/* Label */}
                <span
                  className={`
                    mt-2 text-xs font-medium leading-tight text-center
                    ${isCurrent ? 'text-primary' : isCompleted ? 'text-gray-700' : 'text-gray-400'}
                  `}
                >
                  {step.title}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
