// WIZ-02: Wizard validation utilities

import type { WizardStepConfig, WizardField, WizardErrors } from './types'

/** Validate a single field value */
export function validateField(
  field: WizardField,
  value: unknown,
  allValues: Record<string, unknown>
): string | null {
  // Skip validation for conditionally hidden fields
  if (field.showWhen && !field.showWhen(allValues)) {
    return null
  }

  // Required check
  if (field.required) {
    if (value === undefined || value === null || value === '') {
      return `${field.label} is required`
    }
    if (field.type === 'checkbox' && value === false) {
      return `${field.label} is required`
    }
  }

  // Skip further validation if empty and not required
  if (value === undefined || value === null || value === '') {
    return null
  }

  // Type-specific validation
  if (field.type === 'email' && typeof value === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address'
    }
  }

  if (field.type === 'tel' && typeof value === 'string') {
    const phoneRegex = /^[+]?[\d\s()-]{7,}$/
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number'
    }
  }

  // Custom validator
  if (field.validate) {
    return field.validate(value, allValues)
  }

  return null
}

/** Validate all fields in a step, returns errors map (empty = valid) */
export function validateStep(
  step: WizardStepConfig,
  values: Record<string, unknown>
): WizardErrors {
  const errors: WizardErrors = {}

  // Field-level validation
  for (const field of step.fields) {
    const error = validateField(field, values[field.name], values)
    if (error) {
      errors[field.name] = error
    }
  }

  // Step-level validation
  if (step.validate) {
    const stepErrors = step.validate(values)
    if (stepErrors) {
      Object.assign(errors, stepErrors)
    }
  }

  return errors
}
