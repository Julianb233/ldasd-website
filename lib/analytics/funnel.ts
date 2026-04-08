/**
 * Checkout Funnel Conversion Tracking (S-17)
 *
 * Tracks users through the checkout funnel:
 *   page_view → product_selected → form_started → form_completed →
 *   checkout_started → payment_completed → document_delivered
 *
 * Events are stored locally and dispatched to the analytics backend.
 */

import type { CheckoutFunnelStep, FunnelEvent, FunnelMetrics } from './types';
import { getSessionId } from './session';

const FUNNEL_STEPS: CheckoutFunnelStep[] = [
  'page_view',
  'product_selected',
  'form_started',
  'form_completed',
  'checkout_started',
  'payment_completed',
  'document_delivered',
];

const FUNNEL_STORAGE_KEY = 'ldasd_funnel_events';

/** In-memory queue for the current session */
let eventQueue: FunnelEvent[] = [];

/**
 * Track a funnel step event.
 */
export function trackFunnelStep(
  step: CheckoutFunnelStep,
  options: {
    product?: string;
    value?: number;
    metadata?: Record<string, string | number | boolean>;
    userId?: string;
  } = {}
): FunnelEvent {
  const event: FunnelEvent = {
    step,
    product: options.product,
    value: options.value,
    metadata: options.metadata,
    timestamp: Date.now(),
    sessionId: getSessionId(),
    userId: options.userId,
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  eventQueue.push(event);
  persistEvents();
  dispatchEvent(event);

  return event;
}

/**
 * Get the current funnel position for this session.
 */
export function getCurrentFunnelStep(): CheckoutFunnelStep | null {
  const sessionId = getSessionId();
  const sessionEvents = eventQueue.filter((e) => e.sessionId === sessionId);

  if (sessionEvents.length === 0) return null;

  // Return the most advanced step
  let maxIndex = -1;
  for (const event of sessionEvents) {
    const index = FUNNEL_STEPS.indexOf(event.step);
    if (index > maxIndex) maxIndex = index;
  }

  return maxIndex >= 0 ? FUNNEL_STEPS[maxIndex] : null;
}

/**
 * Calculate funnel metrics from stored events.
 */
export function calculateFunnelMetrics(events: FunnelEvent[]): FunnelMetrics {
  const sessions = new Set(events.map((e) => e.sessionId));
  const stepCounts: Record<string, number> = {};
  const stepTimestamps: Record<string, number[]> = {};

  // Initialize
  for (const step of FUNNEL_STEPS) {
    stepCounts[step] = 0;
    stepTimestamps[step] = [];
  }

  // Count unique sessions per step
  for (const step of FUNNEL_STEPS) {
    const sessionsAtStep = new Set(
      events.filter((e) => e.step === step).map((e) => e.sessionId)
    );
    stepCounts[step] = sessionsAtStep.size;
  }

  // Calculate time per step (average time between consecutive steps)
  const sessionGroups = new Map<string, FunnelEvent[]>();
  for (const event of events) {
    const existing = sessionGroups.get(event.sessionId) || [];
    existing.push(event);
    sessionGroups.set(event.sessionId, existing);
  }

  const averageTimePerStep: Record<string, number> = {};
  for (const step of FUNNEL_STEPS) {
    averageTimePerStep[step] = 0;
  }

  sessionGroups.forEach((sessionEvents: FunnelEvent[]) => {
    sessionEvents.sort((a: FunnelEvent, b: FunnelEvent) => a.timestamp - b.timestamp);
    for (let i = 1; i < sessionEvents.length; i++) {
      const step = sessionEvents[i].step;
      const duration = sessionEvents[i].timestamp - sessionEvents[i - 1].timestamp;
      stepTimestamps[step]?.push(duration);
    }
  });

  for (const step of FUNNEL_STEPS) {
    const times = stepTimestamps[step];
    if (times && times.length > 0) {
      averageTimePerStep[step] = times.reduce((a, b) => a + b, 0) / times.length;
    }
  }

  // Conversion and drop-off rates
  const conversionRates: Record<string, number> = {};
  const dropOffRates: Record<string, number> = {};

  for (let i = 0; i < FUNNEL_STEPS.length; i++) {
    const step = FUNNEL_STEPS[i];
    if (i === 0) {
      conversionRates[step] = 1;
      dropOffRates[step] = 0;
    } else {
      const prevStep = FUNNEL_STEPS[i - 1];
      const prevCount = stepCounts[prevStep] || 0;
      conversionRates[step] = prevCount > 0 ? stepCounts[step] / prevCount : 0;
      dropOffRates[step] = prevCount > 0 ? 1 - conversionRates[step] : 0;
    }
  }

  return {
    totalSessions: sessions.size,
    stepCounts: stepCounts as Record<CheckoutFunnelStep, number>,
    conversionRates: conversionRates as Record<CheckoutFunnelStep, number>,
    dropOffRates: dropOffRates as Record<CheckoutFunnelStep, number>,
    averageTimePerStep: averageTimePerStep as Record<CheckoutFunnelStep, number>,
  };
}

/**
 * Get all stored funnel events.
 */
export function getStoredFunnelEvents(): FunnelEvent[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(FUNNEL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────

function persistEvents(): void {
  if (typeof window === 'undefined') return;

  try {
    const existing = getStoredFunnelEvents();
    const merged = [...existing, ...eventQueue];

    // Keep last 1000 events max
    const trimmed = merged.slice(-1000);
    localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(trimmed));
    eventQueue = [];
  } catch {
    // Storage unavailable
  }
}

function dispatchEvent(event: FunnelEvent): void {
  // Dispatch a custom DOM event for external integrations (GTM, GA4, etc.)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ldasd:funnel', {
        detail: event,
      })
    );

    // Also push to dataLayer for Google Tag Manager integration
    const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
    if (dataLayer) {
      dataLayer.push({
        event: 'funnel_step',
        funnel_step: event.step,
        funnel_product: event.product,
        funnel_value: event.value,
        funnel_session_id: event.sessionId,
      });
    }
  }
}
