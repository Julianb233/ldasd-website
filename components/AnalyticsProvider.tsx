"use client";

/**
 * AnalyticsProvider — Wraps the app to enable analytics tracking.
 *
 * Responsibilities:
 *   - Initializes analytics session on mount
 *   - Tracks page views across route changes
 *   - Registers active A/B test experiments
 *   - Provides GTM dataLayer initialization
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getSessionId } from "@/lib/analytics/session";
import { trackFunnelStep } from "@/lib/analytics/funnel";
import { registerExperiment } from "@/lib/analytics/ab-testing";
import type { ABTestExperiment } from "@/lib/analytics/types";

/**
 * Define active A/B test experiments here.
 * These are registered on app mount and evaluated when components call useABTest().
 */
const activeExperiments: ABTestExperiment[] = [
  {
    id: "pricing-cta-copy",
    name: "Pricing CTA Button Copy",
    description: "Test different CTA button text on pricing page",
    status: "draft", // Change to 'running' to activate
    trafficAllocation: 100,
    variants: [
      { id: "control", name: "Control - Create Your Plan", weight: 50, isControl: true },
      { id: "variant-b", name: "Variant B - Get Started Now", weight: 50, isControl: false },
    ],
  },
  {
    id: "book-form-layout",
    name: "Booking Form Layout",
    description: "Test single-page vs multi-step booking form",
    status: "draft", // Change to 'running' to activate
    trafficAllocation: 50,
    variants: [
      { id: "control", name: "Control - Single Page", weight: 50, isControl: true },
      { id: "variant-b", name: "Variant B - Multi-Step", weight: 50, isControl: false },
    ],
  },
];

/** Pages that should trigger funnel page_view tracking */
const FUNNEL_PAGES: Record<string, string | undefined> = {
  "/pricing": undefined,
  "/products": undefined,
  "/products/will": "will",
  "/products/trust": "trust",
  "/products/estate-plan": "estate-plan",
  "/products/guardianship": "guardianship",
  "/book": undefined,
};

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const initialized = useRef(false);
  const lastTrackedPath = useRef<string>("");

  // Initialize analytics on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Initialize session
    getSessionId();

    // Initialize GTM dataLayer
    if (typeof window !== "undefined") {
      (window as unknown as { dataLayer?: unknown[] }).dataLayer =
        (window as unknown as { dataLayer?: unknown[] }).dataLayer || [];
    }

    // Register A/B test experiments
    for (const experiment of activeExperiments) {
      registerExperiment(experiment);
    }
  }, []);

  // Track page views and funnel steps on route changes
  useEffect(() => {
    if (!pathname || pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    // Track funnel page view if this is a funnel page
    if (pathname in FUNNEL_PAGES) {
      const product = FUNNEL_PAGES[pathname];
      trackFunnelStep("page_view", { product });
    }

    // Push page view to dataLayer
    if (typeof window !== "undefined") {
      const dataLayer = (window as unknown as { dataLayer?: Record<string, unknown>[] }).dataLayer;
      if (dataLayer) {
        dataLayer.push({
          event: "page_view",
          page_path: pathname,
          page_title: document.title,
          session_id: getSessionId(),
        });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
