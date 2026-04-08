/**
 * Analytics Module — Public API
 *
 * Unified entry point for all analytics functionality:
 *   S-17: Checkout funnel conversion tracking
 *   S-18: Document completion rate tracking
 *   S-19: A/B testing infrastructure
 */

// ─── Types ────────────────────────────────────────────────────────────────
export type {
  CheckoutFunnelStep,
  FunnelEvent,
  FunnelMetrics,
  DocumentType,
  DocumentProgressEvent,
  DocumentCompletionMetrics,
  ABTestExperiment,
  ABTestVariant,
  ABTestAssignment,
  ABTestConversion,
  ABTestResults,
  AnalyticsEvent,
  AnalyticsEventType,
  AnalyticsProvider,
} from './types';

// ─── Session ──────────────────────────────────────────────────────────────
export { getSessionId, resetSession } from './session';

// ─── Funnel Tracking (S-17) ───────────────────────────────────────────────
export {
  trackFunnelStep,
  getCurrentFunnelStep,
  calculateFunnelMetrics,
  getStoredFunnelEvents,
} from './funnel';

// ─── Document Tracking (S-18) ─────────────────────────────────────────────
export {
  trackDocumentProgress,
  trackDocumentStart,
  trackDocumentComplete,
  startStepTimer,
  calculateCompletionMetrics,
  getStoredProgressEvents,
} from './document-tracking';

// ─── A/B Testing (S-19) ──────────────────────────────────────────────────
export {
  registerExperiment,
  getExperiments,
  getVariant,
  trackABConversion,
  calculateResults,
} from './ab-testing';
