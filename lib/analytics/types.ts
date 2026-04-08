/**
 * Analytics Types
 * Core type definitions for conversion tracking, document completion, and A/B testing.
 * Requirements: S-17, S-18, S-19
 */

// ─── Funnel Tracking (S-17) ───────────────────────────────────────────────

export type CheckoutFunnelStep =
  | 'page_view'           // Landed on pricing/product page
  | 'product_selected'    // Selected a product (will, trust, estate-plan)
  | 'form_started'        // Started filling out the booking form
  | 'form_completed'      // Submitted the booking form
  | 'checkout_started'    // Redirected to Stripe checkout
  | 'payment_completed'   // Payment confirmed
  | 'document_delivered'; // Documents delivered to customer

export interface FunnelEvent {
  step: CheckoutFunnelStep;
  product?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp: number;
  sessionId: string;
  userId?: string;
  page: string;
}

export interface FunnelMetrics {
  totalSessions: number;
  stepCounts: Record<CheckoutFunnelStep, number>;
  conversionRates: Record<CheckoutFunnelStep, number>;
  dropOffRates: Record<CheckoutFunnelStep, number>;
  averageTimePerStep: Record<CheckoutFunnelStep, number>;
}

// ─── Document Completion Tracking (S-18) ──────────────────────────────────

export type DocumentType = 'will' | 'trust' | 'guardianship' | 'estate-plan' | 'poa' | 'healthcare-directive';

export interface DocumentProgressEvent {
  documentType: DocumentType;
  totalSteps: number;
  currentStep: number;
  completionPercentage: number;
  fieldName?: string;
  timeSpentMs: number;
  sessionId: string;
  userId?: string;
  timestamp: number;
}

export interface DocumentCompletionMetrics {
  documentType: DocumentType;
  startCount: number;
  completionCount: number;
  completionRate: number;
  averageCompletionTimeMs: number;
  dropOffByStep: Record<number, number>;
  averageStepsCompleted: number;
}

// ─── A/B Testing (S-19) ───────────────────────────────────────────────────

export interface ABTestExperiment {
  id: string;
  name: string;
  description: string;
  variants: ABTestVariant[];
  status: 'draft' | 'running' | 'paused' | 'completed';
  startDate?: number;
  endDate?: number;
  targetSampleSize?: number;
  /** Percentage of traffic to include (0-100) */
  trafficAllocation: number;
}

export interface ABTestVariant {
  id: string;
  name: string;
  /** Weight for traffic allocation (relative to other variants) */
  weight: number;
  /** Whether this is the control/default variant */
  isControl: boolean;
}

export interface ABTestAssignment {
  experimentId: string;
  variantId: string;
  sessionId: string;
  userId?: string;
  assignedAt: number;
}

export interface ABTestConversion {
  experimentId: string;
  variantId: string;
  conversionType: string;
  value?: number;
  sessionId: string;
  userId?: string;
  timestamp: number;
}

export interface ABTestResults {
  experimentId: string;
  variants: {
    variantId: string;
    variantName: string;
    impressions: number;
    conversions: number;
    conversionRate: number;
    averageValue?: number;
    /** Statistical significance (p-value) */
    significance?: number;
  }[];
  winner?: string;
  isSignificant: boolean;
}

// ─── Analytics Event Union ────────────────────────────────────────────────

export type AnalyticsEventType =
  | 'page_view'
  | 'funnel_step'
  | 'document_progress'
  | 'ab_test_assignment'
  | 'ab_test_conversion'
  | 'custom';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  name: string;
  properties: Record<string, string | number | boolean | undefined>;
  timestamp: number;
  sessionId: string;
  userId?: string;
  page: string;
}

// ─── Analytics Provider Interface ─────────────────────────────────────────

export interface AnalyticsProvider {
  /** Initialize the provider */
  init(): void;
  /** Track a generic event */
  track(event: AnalyticsEvent): void;
  /** Track a funnel step */
  trackFunnelStep(event: FunnelEvent): void;
  /** Track document progress */
  trackDocumentProgress(event: DocumentProgressEvent): void;
  /** Identify a user */
  identify(userId: string, traits?: Record<string, string | number | boolean>): void;
  /** Flush any queued events */
  flush(): Promise<void>;
}
