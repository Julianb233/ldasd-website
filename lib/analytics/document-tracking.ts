/**
 * Document Completion Rate Tracking (S-18)
 *
 * Tracks how far users progress through document creation wizards,
 * identifies drop-off points, and measures completion rates per document type.
 */

import type { DocumentType, DocumentProgressEvent, DocumentCompletionMetrics } from './types';
import { getSessionId } from './session';

const DOC_PROGRESS_KEY = 'ldasd_doc_progress';

/** In-memory step timer tracking */
const stepTimers: Map<string, number> = new Map();

/**
 * Start tracking a document wizard step.
 * Call this when a user enters a wizard step.
 */
export function startStepTimer(documentType: DocumentType, step: number): void {
  const key = `${documentType}-${step}`;
  stepTimers.set(key, Date.now());
}

/**
 * Track progress on a document wizard.
 * Call this when a user completes a step or progresses in the wizard.
 */
export function trackDocumentProgress(
  documentType: DocumentType,
  options: {
    totalSteps: number;
    currentStep: number;
    fieldName?: string;
    userId?: string;
  }
): DocumentProgressEvent {
  const key = `${documentType}-${options.currentStep}`;
  const startTime = stepTimers.get(key);
  const timeSpent = startTime ? Date.now() - startTime : 0;

  const event: DocumentProgressEvent = {
    documentType,
    totalSteps: options.totalSteps,
    currentStep: options.currentStep,
    completionPercentage: Math.round((options.currentStep / options.totalSteps) * 100),
    fieldName: options.fieldName,
    timeSpentMs: timeSpent,
    sessionId: getSessionId(),
    userId: options.userId,
    timestamp: Date.now(),
  };

  persistProgressEvent(event);
  dispatchProgressEvent(event);

  // Start timer for next step
  if (options.currentStep < options.totalSteps) {
    startStepTimer(documentType, options.currentStep + 1);
  }

  return event;
}

/**
 * Track that a document wizard was started.
 */
export function trackDocumentStart(
  documentType: DocumentType,
  totalSteps: number,
  userId?: string
): DocumentProgressEvent {
  startStepTimer(documentType, 1);

  return trackDocumentProgress(documentType, {
    totalSteps,
    currentStep: 0,
    userId,
  });
}

/**
 * Track that a document wizard was completed.
 */
export function trackDocumentComplete(
  documentType: DocumentType,
  totalSteps: number,
  userId?: string
): DocumentProgressEvent {
  return trackDocumentProgress(documentType, {
    totalSteps,
    currentStep: totalSteps,
    userId,
  });
}

/**
 * Calculate completion metrics from stored events.
 */
export function calculateCompletionMetrics(
  events: DocumentProgressEvent[],
  documentType: DocumentType
): DocumentCompletionMetrics {
  const typeEvents = events.filter((e) => e.documentType === documentType);

  // Group by session to track unique starts and completions
  const sessionGroups = new Map<string, DocumentProgressEvent[]>();
  for (const event of typeEvents) {
    const existing = sessionGroups.get(event.sessionId) || [];
    existing.push(event);
    sessionGroups.set(event.sessionId, existing);
  }

  let startCount = 0;
  let completionCount = 0;
  let totalCompletionTime = 0;
  let totalStepsCompleted = 0;
  const dropOffByStep: Record<number, number> = {};

  sessionGroups.forEach((sessionEvents: DocumentProgressEvent[]) => {
    sessionEvents.sort((a: DocumentProgressEvent, b: DocumentProgressEvent) => a.timestamp - b.timestamp);

    const first = sessionEvents[0];
    const last = sessionEvents[sessionEvents.length - 1];

    startCount++;

    if (last.completionPercentage >= 100) {
      completionCount++;
      totalCompletionTime += last.timestamp - first.timestamp;
    } else {
      // This session dropped off
      const maxStep = Math.max(...sessionEvents.map((e: DocumentProgressEvent) => e.currentStep));
      dropOffByStep[maxStep] = (dropOffByStep[maxStep] || 0) + 1;
    }

    totalStepsCompleted += Math.max(...sessionEvents.map((e: DocumentProgressEvent) => e.currentStep));
  });

  return {
    documentType,
    startCount,
    completionCount,
    completionRate: startCount > 0 ? completionCount / startCount : 0,
    averageCompletionTimeMs: completionCount > 0 ? totalCompletionTime / completionCount : 0,
    dropOffByStep,
    averageStepsCompleted: startCount > 0 ? totalStepsCompleted / startCount : 0,
  };
}

/**
 * Get all stored document progress events.
 */
export function getStoredProgressEvents(): DocumentProgressEvent[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(DOC_PROGRESS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────

function persistProgressEvent(event: DocumentProgressEvent): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getStoredProgressEvents();
    existing.push(event);

    // Keep last 500 events max
    const trimmed = existing.slice(-500);
    localStorage.setItem(DOC_PROGRESS_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage unavailable
  }
}

function dispatchProgressEvent(event: DocumentProgressEvent): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ldasd:document_progress', {
        detail: event,
      })
    );

    // Push to dataLayer for GTM
    const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
    if (dataLayer) {
      dataLayer.push({
        event: 'document_progress',
        doc_type: event.documentType,
        doc_step: event.currentStep,
        doc_total_steps: event.totalSteps,
        doc_completion: event.completionPercentage,
        doc_session_id: event.sessionId,
      });
    }
  }
}
