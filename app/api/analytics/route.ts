import { NextRequest, NextResponse } from "next/server";

/**
 * Analytics Event Collection API
 *
 * POST /api/analytics
 *
 * Receives analytics events from the client and logs them for processing.
 * In production, this would forward events to a data warehouse (BigQuery, Segment, etc.)
 * or analytics service. Currently logs to stdout for pipeline integration.
 *
 * Accepts batched events for efficiency.
 */

interface AnalyticsPayload {
  events: {
    type: string;
    name: string;
    properties: Record<string, unknown>;
    timestamp: number;
    sessionId: string;
    userId?: string;
    page: string;
  }[];
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyticsPayload = await request.json();

    if (!body.events || !Array.isArray(body.events)) {
      return NextResponse.json(
        { error: "Invalid payload: events array required" },
        { status: 400 }
      );
    }

    if (body.events.length > 100) {
      return NextResponse.json(
        { error: "Too many events in batch (max 100)" },
        { status: 400 }
      );
    }

    // Validate and sanitize events
    const validEvents = body.events.filter(
      (event) =>
        event.type &&
        event.name &&
        event.timestamp &&
        event.sessionId &&
        typeof event.type === "string" &&
        typeof event.sessionId === "string"
    );

    if (validEvents.length === 0) {
      return NextResponse.json(
        { error: "No valid events in payload" },
        { status: 400 }
      );
    }

    // Add server-side metadata
    const enrichedEvents = validEvents.map((event) => ({
      ...event,
      receivedAt: Date.now(),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      referer: request.headers.get("referer") || undefined,
    }));

    // Log events for pipeline processing (stdout → log aggregator → data warehouse)
    for (const event of enrichedEvents) {
      console.log(
        JSON.stringify({
          _analytics: true,
          ...event,
        })
      );
    }

    // TODO: In production, forward to analytics pipeline:
    // - Segment: analytics.track(event)
    // - BigQuery: insertRows(enrichedEvents)
    // - Supabase: insert into analytics_events table

    return NextResponse.json({
      success: true,
      accepted: enrichedEvents.length,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics
 *
 * Health check endpoint for monitoring.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "ldasd-analytics",
    timestamp: Date.now(),
  });
}
