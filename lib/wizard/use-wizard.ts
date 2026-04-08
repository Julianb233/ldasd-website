'use client'

// WIZ-01 + WIZ-03: Core wizard hook with auto-save on field change and resume

import { useState, useCallback, useEffect, useRef } from 'react'
import type {
  WizardConfig,
  WizardSession,
  SaveStatus,
  WizardErrors,
  UseWizardReturn,
} from './types'
import { validateStep } from './validation'
import { saveSession, loadSession, clearSession, saveSessionToServer } from './storage'

const DEBOUNCE_MS = 500

export function useWizard(config: WizardConfig): UseWizardReturn {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [values, setValuesState] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<WizardErrors>({})
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [restored, setRestored] = useState(false)

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const valuesRef = useRef(values)
  valuesRef.current = values

  const currentStep = config.steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === config.steps.length - 1
  const totalSteps = config.steps.length
  const progress = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0

  // ─── Resume from saved state on mount ──────────────────────────────────
  useEffect(() => {
    const session = loadSession(config.id)
    if (session) {
      setValuesState(session.values)
      setCurrentStepIndex(session.currentStepIndex)
      setCompletedSteps(session.completedSteps)
      setSaveStatus('saved')
    }
    setRestored(true)
  }, [config.id])

  // ─── Debounced auto-save ───────────────────────────────────────────────
  const triggerSave = useCallback(() => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current)
    }

    saveTimerRef.current = setTimeout(() => {
      setSaveStatus('saving')

      const session: WizardSession = {
        wizardId: config.id,
        currentStepIndex,
        values: valuesRef.current,
        completedSteps,
        lastSavedAt: new Date().toISOString(),
        startedAt: loadSession(config.id)?.startedAt ?? new Date().toISOString(),
      }

      // Save to localStorage (sync)
      saveSession(session)

      // Fire-and-forget server save
      saveSessionToServer(session).catch(() => {
        // Server save is best-effort
      })

      setSaveStatus('saved')

      // Reset to idle after 2s so indicator fades
      setTimeout(() => setSaveStatus('idle'), 2000)
    }, DEBOUNCE_MS)
  }, [config.id, currentStepIndex, completedSteps])

  // ─── Actions ───────────────────────────────────────────────────────────

  const setValue = useCallback(
    (fieldName: string, value: unknown) => {
      setValuesState((prev) => {
        const next = { ...prev, [fieldName]: value }
        return next
      })
      // Clear field error on change
      setErrors((prev) => {
        if (!prev[fieldName]) return prev
        const next = { ...prev }
        delete next[fieldName]
        return next
      })
      triggerSave()
    },
    [triggerSave]
  )

  const setValuesBulk = useCallback(
    (newValues: Record<string, unknown>) => {
      setValuesState((prev) => ({ ...prev, ...newValues }))
      setErrors({})
      triggerSave()
    },
    [triggerSave]
  )

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < config.steps.length) {
        setCurrentStepIndex(index)
        setErrors({})
        triggerSave()
      }
    },
    [config.steps.length, triggerSave]
  )

  const nextStep = useCallback((): boolean => {
    const stepErrors = validateStep(currentStep, values)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return false
    }

    // Mark step completed
    setCompletedSteps((prev) => {
      if (prev.includes(currentStep.id)) return prev
      return [...prev, currentStep.id]
    })

    if (!isLastStep) {
      setCurrentStepIndex((i) => i + 1)
      setErrors({})
      triggerSave()
    }

    return true
  }, [currentStep, values, isLastStep, triggerSave])

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex((i) => i - 1)
      setErrors({})
    }
  }, [isFirstStep])

  const reset = useCallback(() => {
    setValuesState({})
    setCurrentStepIndex(0)
    setCompletedSteps([])
    setErrors({})
    setSaveStatus('idle')
    clearSession(config.id)
  }, [config.id])

  const getStepValues = useCallback(
    (stepId: string): Record<string, unknown> => {
      const step = config.steps.find((s) => s.id === stepId)
      if (!step) return {}
      const result: Record<string, unknown> = {}
      for (const field of step.fields) {
        if (values[field.name] !== undefined) {
          result[field.name] = values[field.name]
        }
      }
      return result
    },
    [config.steps, values]
  )

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    }
  }, [])

  return {
    config,
    currentStepIndex,
    currentStep,
    values: restored ? values : {},
    errors,
    saveStatus,
    isFirstStep,
    isLastStep,
    completedSteps,
    totalSteps,
    progress,
    setValue,
    setValues: setValuesBulk,
    goToStep,
    nextStep,
    prevStep,
    reset,
    getStepValues,
  }
}
