import { NextRequest, NextResponse } from 'next/server';
import { isGHLConfigured, sendPurchaseConfirmationToGHL } from '@/lib/ghl';

/**
 * CRM-02: Purchase confirmation webhook.
 *
 * Called internally after a successful Stripe payment (from Stripe webhook handler)
 * or manually to sync a purchase to GHL.
 *
 * Updates the customer's GHL contact with purchase tags (CRM-03)
 * and marks them as a customer rather than a lead.
 *
 * This endpoint is secured by a shared webhook secret to prevent
 * unauthorized calls.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const webhookSecret = process.env.GHL_WEBHOOK_SECRET;
    if (webhookSecret) {
      const authHeader = request.headers.get('x-webhook-secret');
      if (authHeader !== webhookSecret) {
        console.warn('[GHL Webhook] Unauthorized purchase notification attempt');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const data = await request.json();
    const { email, firstName, lastName, product, amount, orderId, isCouple } = data;

    // Validate required fields
    if (!email || !product || !orderId) {
      return NextResponse.json(
        { error: 'Missing required fields: email, product, orderId' },
        { status: 400 }
      );
    }

    console.log('Purchase Confirmation:', {
      email,
      firstName,
      lastName,
      product,
      amount,
      orderId,
      isCouple: isCouple || false,
      timestamp: new Date().toISOString(),
    });

    // CRM-02 + CRM-03: Send purchase confirmation to GHL
    if (isGHLConfigured()) {
      await sendPurchaseConfirmationToGHL({
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        product,
        amount: amount || 0,
        orderId,
        isCouple: isCouple || false,
      });

      console.log('[GHL] Purchase confirmation sent for:', email, product);
    } else {
      console.log('[GHL] Not configured — skipping purchase CRM sync');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Purchase webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process purchase notification' },
      { status: 500 }
    );
  }
}
