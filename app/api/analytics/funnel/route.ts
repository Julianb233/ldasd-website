import { NextResponse } from "next/server";

/**
 * Funnel Metrics API
 *
 * GET /api/analytics/funnel
 *
 * Returns checkout funnel conversion metrics.
 * In production, this would query the analytics data warehouse.
 * Currently returns the metric structure for frontend dashboard integration.
 */

export async function GET() {
  // In production, query the data warehouse for funnel metrics.
  // For now, return the metric structure with placeholder data.
  // Client-side metrics are calculated in lib/analytics/funnel.ts

  const funnelSteps = [
    { step: "page_view", label: "Page View", description: "Visited pricing or product page" },
    { step: "product_selected", label: "Product Selected", description: "Chose a product (will, trust, estate-plan)" },
    { step: "form_started", label: "Form Started", description: "Started filling out booking form" },
    { step: "form_completed", label: "Form Completed", description: "Submitted booking form" },
    { step: "checkout_started", label: "Checkout Started", description: "Redirected to Stripe checkout" },
    { step: "payment_completed", label: "Payment Completed", description: "Payment confirmed via webhook" },
    { step: "document_delivered", label: "Document Delivered", description: "Documents emailed/available for download" },
  ];

  return NextResponse.json({
    steps: funnelSteps,
    description:
      "Funnel metrics are tracked client-side and dispatched via /api/analytics POST endpoint. " +
      "Use calculateFunnelMetrics() from lib/analytics/funnel.ts for client-side analysis, " +
      "or query the analytics pipeline for server-side aggregated metrics.",
    endpoints: {
      collect: "POST /api/analytics",
      funnel: "GET /api/analytics/funnel",
    },
  });
}
