"use client";

/**
 * React hooks for analytics integration.
 * Provides easy-to-use hooks for funnel tracking, document tracking, and A/B testing.
 */

import { useCallback, useEffect, useRef } from 'react';
import { trackFunnelStep } from './funnel';
import {
  trackDocumentProgress,
  trackDocumentStart,
  trackDocumentComplete,
  startStepTimer,
} from './document-tracking';
import { getVariant, trackABConversion } from './ab-testing';
import type { CheckoutFunnelStep, DocumentType } from './types';

/**
 * Hook for tracking checkout funnel steps.
 *
 * Usage:
 *   const { trackStep } = useFunnelTracking();
 *   trackStep('product_selected', { product: 'trust', value: 599 });
 */
export function useFunnelTracking() {
  const trackStep = useCallback(
    (
      step: CheckoutFunnelStep,
      options?: {
        product?: string;
        value?: number;
        metadata?: Record<string, string | number | boolean>;
        userId?: string;
      }
    ) => {
      return trackFunnelStep(step, options);
    },
    []
  );

  return { trackStep };
}

/**
 * Hook for tracking page views as funnel events.
 * Automatically fires on mount.
 *
 * Usage:
 *   usePageFunnelTracking('page_view', { product: 'trust' });
 */
export function usePageFunnelTracking(
  step: CheckoutFunnelStep,
  options?: {
    product?: string;
    value?: number;
    metadata?: Record<string, string | number | boolean>;
  }
) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackFunnelStep(step, options);
    }
  }, [step, options]);
}

/**
 * Hook for tracking document wizard progress.
 *
 * Usage:
 *   const { trackProgress, trackStart, trackComplete } = useDocumentTracking('trust');
 */
export function useDocumentTracking(documentType: DocumentType) {
  const trackStart = useCallback(
    (totalSteps: number, userId?: string) => {
      return trackDocumentStart(documentType, totalSteps, userId);
    },
    [documentType]
  );

  const trackProgress = useCallback(
    (options: { totalSteps: number; currentStep: number; fieldName?: string; userId?: string }) => {
      return trackDocumentProgress(documentType, options);
    },
    [documentType]
  );

  const trackComplete = useCallback(
    (totalSteps: number, userId?: string) => {
      return trackDocumentComplete(documentType, totalSteps, userId);
    },
    [documentType]
  );

  const startTimer = useCallback(
    (step: number) => {
      startStepTimer(documentType, step);
    },
    [documentType]
  );

  return { trackStart, trackProgress, trackComplete, startTimer };
}

/**
 * Hook for A/B testing.
 * Returns the assigned variant for an experiment.
 *
 * Usage:
 *   const variant = useABTest('pricing-cta-experiment');
 *   // variant is null (not in test), 'control', or 'variant-b'
 */
export function useABTest(experimentId: string, userId?: string): string | null {
  const variantRef = useRef<string | null>(null);
  const resolvedRef = useRef(false);

  if (!resolvedRef.current) {
    variantRef.current = getVariant(experimentId, userId);
    resolvedRef.current = true;
  }

  return variantRef.current;
}

/**
 * Hook for tracking A/B test conversions.
 *
 * Usage:
 *   const { trackConversion } = useABConversion('pricing-cta-experiment');
 *   trackConversion('purchase', { value: 599 });
 */
export function useABConversion(experimentId: string) {
  const trackConversion = useCallback(
    (conversionType: string, options?: { value?: number; userId?: string }) => {
      return trackABConversion(experimentId, conversionType, options);
    },
    [experimentId]
  );

  return { trackConversion };
}
