/**
 * A/B Testing Infrastructure (S-19)
 *
 * Client-side A/B test assignment, variant resolution, and conversion tracking.
 * Supports weighted traffic allocation, persistent assignments, and GTM integration.
 *
 * Usage:
 *   const variant = getVariant('pricing-cta-test');
 *   if (variant === 'variant-b') { ... }
 *
 *   // Track conversion
 *   trackABConversion('pricing-cta-test', 'purchase', { value: 599 });
 */

import type {
  ABTestExperiment,
  ABTestVariant,
  ABTestAssignment,
  ABTestConversion,
  ABTestResults,
} from './types';
import { getSessionId } from './session';

const ASSIGNMENTS_KEY = 'ldasd_ab_assignments';
const CONVERSIONS_KEY = 'ldasd_ab_conversions';

/**
 * Active experiments registry.
 * Add experiments here to activate them. Each experiment needs:
 *   - Unique id
 *   - Named variants with weights
 *   - Traffic allocation percentage
 */
const experiments: Map<string, ABTestExperiment> = new Map();

/**
 * Register a new A/B test experiment.
 */
export function registerExperiment(experiment: ABTestExperiment): void {
  experiments.set(experiment.id, experiment);
}

/**
 * Get all registered experiments.
 */
export function getExperiments(): ABTestExperiment[] {
  return Array.from(experiments.values());
}

/**
 * Get the assigned variant for an experiment.
 * If the user hasn't been assigned yet, assigns them based on traffic allocation and weights.
 * Returns the variant ID, or null if the user is not in the experiment.
 */
export function getVariant(experimentId: string, userId?: string): string | null {
  const experiment = experiments.get(experimentId);
  if (!experiment || experiment.status !== 'running') return null;

  const sessionId = getSessionId();

  // Check for existing assignment
  const assignments = getStoredAssignments();
  const existing = assignments.find(
    (a) => a.experimentId === experimentId && a.sessionId === sessionId
  );

  if (existing) return existing.variantId;

  // Check traffic allocation — deterministic based on session hash
  const hash = simpleHash(`${experimentId}-${sessionId}`);
  const trafficThreshold = experiment.trafficAllocation / 100;
  if ((hash % 100) / 100 >= trafficThreshold) {
    return null; // User is not in this experiment
  }

  // Assign variant based on weights
  const variant = assignVariant(experiment.variants, hash);
  if (!variant) return null;

  const assignment: ABTestAssignment = {
    experimentId,
    variantId: variant.id,
    sessionId,
    userId,
    assignedAt: Date.now(),
  };

  persistAssignment(assignment);
  dispatchAssignment(assignment, experiment, variant);

  return variant.id;
}

/**
 * Track a conversion for an A/B test.
 */
export function trackABConversion(
  experimentId: string,
  conversionType: string,
  options: { value?: number; userId?: string } = {}
): ABTestConversion | null {
  const sessionId = getSessionId();
  const assignments = getStoredAssignments();
  const assignment = assignments.find(
    (a) => a.experimentId === experimentId && a.sessionId === sessionId
  );

  if (!assignment) return null; // User not in this experiment

  const conversion: ABTestConversion = {
    experimentId,
    variantId: assignment.variantId,
    conversionType,
    value: options.value,
    sessionId,
    userId: options.userId,
    timestamp: Date.now(),
  };

  persistConversion(conversion);
  dispatchConversion(conversion);

  return conversion;
}

/**
 * Calculate results for an experiment from stored data.
 */
export function calculateResults(experimentId: string): ABTestResults | null {
  const experiment = experiments.get(experimentId);
  if (!experiment) return null;

  const assignments = getStoredAssignments().filter((a) => a.experimentId === experimentId);
  const conversions = getStoredConversions().filter((c) => c.experimentId === experimentId);

  const variantResults = experiment.variants.map((variant) => {
    const variantAssignments = assignments.filter((a) => a.variantId === variant.id);
    const variantConversions = conversions.filter((c) => c.variantId === variant.id);

    const impressions = variantAssignments.length;
    const conversionCount = variantConversions.length;
    const values = variantConversions.filter((c) => c.value != null).map((c) => c.value!);
    const averageValue = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : undefined;

    return {
      variantId: variant.id,
      variantName: variant.name,
      impressions,
      conversions: conversionCount,
      conversionRate: impressions > 0 ? conversionCount / impressions : 0,
      averageValue,
    };
  });

  // Determine winner and significance (simplified chi-square approximation)
  let winner: string | undefined;
  let isSignificant = false;

  if (variantResults.length >= 2) {
    const sorted = [...variantResults].sort((a, b) => b.conversionRate - a.conversionRate);
    const best = sorted[0];
    const control = variantResults.find(
      (v) => experiment.variants.find((ev) => ev.id === v.variantId)?.isControl
    ) || sorted[sorted.length - 1];

    if (best.impressions >= 30 && control.impressions >= 30) {
      // Simplified significance check (z-test for proportions)
      const p1 = best.conversionRate;
      const p2 = control.conversionRate;
      const n1 = best.impressions;
      const n2 = control.impressions;
      const pPool = (best.conversions + control.conversions) / (n1 + n2);
      const se = Math.sqrt(pPool * (1 - pPool) * (1 / n1 + 1 / n2));

      if (se > 0) {
        const zScore = Math.abs(p1 - p2) / se;
        isSignificant = zScore >= 1.96; // 95% confidence
      }

      if (isSignificant && best.variantId !== control.variantId) {
        winner = best.variantId;
      }
    }
  }

  return {
    experimentId,
    variants: variantResults,
    winner,
    isSignificant,
  };
}

// ─── Storage helpers ──────────────────────────────────────────────────────

function getStoredAssignments(): ABTestAssignment[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(ASSIGNMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function getStoredConversions(): ABTestConversion[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(CONVERSIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistAssignment(assignment: ABTestAssignment): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredAssignments();
    existing.push(assignment);
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(existing.slice(-500)));
  } catch {
    // Storage unavailable
  }
}

function persistConversion(conversion: ABTestConversion): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredConversions();
    existing.push(conversion);
    localStorage.setItem(CONVERSIONS_KEY, JSON.stringify(existing.slice(-500)));
  } catch {
    // Storage unavailable
  }
}

// ─── Variant assignment ───────────────────────────────────────────────────

function assignVariant(variants: ABTestVariant[], seed: number): ABTestVariant | null {
  if (variants.length === 0) return null;

  const totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
  if (totalWeight === 0) return variants[0];

  const threshold = (seed % 10000) / 10000;
  let cumulative = 0;

  for (const variant of variants) {
    cumulative += variant.weight / totalWeight;
    if (threshold < cumulative) return variant;
  }

  return variants[variants.length - 1];
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash);
}

// ─── Event dispatching ────────────────────────────────────────────────────

function dispatchAssignment(
  assignment: ABTestAssignment,
  experiment: ABTestExperiment,
  variant: ABTestVariant
): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('ldasd:ab_assignment', { detail: assignment })
  );

  const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (dataLayer) {
    dataLayer.push({
      event: 'ab_test_assignment',
      ab_experiment_id: experiment.id,
      ab_experiment_name: experiment.name,
      ab_variant_id: variant.id,
      ab_variant_name: variant.name,
      ab_session_id: assignment.sessionId,
    });
  }
}

function dispatchConversion(conversion: ABTestConversion): void {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('ldasd:ab_conversion', { detail: conversion })
  );

  const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
  if (dataLayer) {
    dataLayer.push({
      event: 'ab_test_conversion',
      ab_experiment_id: conversion.experimentId,
      ab_variant_id: conversion.variantId,
      ab_conversion_type: conversion.conversionType,
      ab_conversion_value: conversion.value,
    });
  }
}
