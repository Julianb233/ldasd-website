// WIZ-03: Auto-save storage layer — localStorage + optional server sync

import type { WizardSession } from './types'

const STORAGE_PREFIX = 'wizard_session_'

/** Get the localStorage key for a wizard */
function getKey(wizardId: string): string {
  return `${STORAGE_PREFIX}${wizardId}`
}

/** Save wizard session to localStorage */
export function saveSession(session: WizardSession): void {
  try {
    const data = JSON.stringify({
      ...session,
      lastSavedAt: new Date().toISOString(),
    })
    localStorage.setItem(getKey(session.wizardId), data)
  } catch {
    // localStorage full or unavailable — degrade gracefully
    console.warn('[Wizard] Failed to save session to localStorage')
  }
}

/** Load wizard session from localStorage */
export function loadSession(wizardId: string): WizardSession | null {
  try {
    const raw = localStorage.getItem(getKey(wizardId))
    if (!raw) return null
    return JSON.parse(raw) as WizardSession
  } catch {
    return null
  }
}

/** Delete a wizard session from localStorage */
export function clearSession(wizardId: string): void {
  try {
    localStorage.removeItem(getKey(wizardId))
  } catch {
    // ignore
  }
}

/** Save session to server via API */
export async function saveSessionToServer(session: WizardSession): Promise<boolean> {
  try {
    const res = await fetch('/api/wizard/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Load session from server */
export async function loadSessionFromServer(wizardId: string): Promise<WizardSession | null> {
  try {
    const res = await fetch(`/api/wizard/session?wizardId=${encodeURIComponent(wizardId)}`)
    if (!res.ok) return null
    return (await res.json()) as WizardSession
  } catch {
    return null
  }
}
