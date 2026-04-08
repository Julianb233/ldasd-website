// WIZ-01: Wizard types and configuration

/** Validation function that returns an error message or null if valid */
export type FieldValidator = (value: unknown, allValues: Record<string, unknown>) => string | null

/** Single field definition within a wizard step */
export type WizardField = {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'number'
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  validate?: FieldValidator
  helpText?: string
  /** Conditionally show field based on other field values */
  showWhen?: (values: Record<string, unknown>) => boolean
}

/** Single step in a wizard */
export type WizardStepConfig = {
  id: string
  title: string
  description?: string
  fields: WizardField[]
  /** Optional step-level validation that runs on "Next" */
  validate?: (values: Record<string, unknown>) => Record<string, string> | null
}

/** Full wizard configuration */
export type WizardConfig = {
  id: string
  title: string
  description?: string
  steps: WizardStepConfig[]
  /** Document type this wizard creates */
  documentType?: 'will' | 'trust' | 'poa' | 'healthcare-directive'
}

/** Persisted wizard session state */
export type WizardSession = {
  wizardId: string
  currentStepIndex: number
  values: Record<string, unknown>
  completedSteps: string[]
  lastSavedAt: string
  startedAt: string
}

/** Auto-save status indicator states */
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

/** Field-level error map */
export type WizardErrors = Record<string, string>

/** Return type of the useWizard hook */
export type UseWizardReturn = {
  // State
  config: WizardConfig
  currentStepIndex: number
  currentStep: WizardStepConfig
  values: Record<string, unknown>
  errors: WizardErrors
  saveStatus: SaveStatus
  isFirstStep: boolean
  isLastStep: boolean
  completedSteps: string[]
  totalSteps: number
  progress: number // 0–100

  // Actions
  setValue: (fieldName: string, value: unknown) => void
  setValues: (newValues: Record<string, unknown>) => void
  goToStep: (index: number) => void
  nextStep: () => boolean // returns false if validation fails
  prevStep: () => void
  reset: () => void
  getStepValues: (stepId: string) => Record<string, unknown>
}
