import { NextRequest, NextResponse } from 'next/server';
import { isGHLConfigured, sendAbandonedCartToGHL } from '@/lib/ghl';

/**
 * CRM-04: Abandoned cart recovery endpoint.
 *
 * Called by client-side beacon when a user:
 * - Fills in email on the booking form but doesn't submit
 * - Starts checkout but navigates away
 * - Closes the tab/browser mid-form
 *
 * Uses navigator.sendBeacon() on the client for reliable delivery
 * even during page unload.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { email, firstName, lastName, phone, product, estimatedPrice } = data;

    // Email is the minimum required field for abandoned cart tracking
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required for abandoned cart tracking' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log('Abandoned Cart Detected:', {
      email,
      firstName: firstName || 'Not provided',
      lastName: lastName || 'Not provided',
      product: product || 'Not selected',
      estimatedPrice: estimatedPrice ? `$${estimatedPrice}` : 'Unknown',
      timestamp: new Date().toISOString(),
    });

    // Send to GHL as abandoned cart lead
    if (isGHLConfigured()) {
      const contact = await sendAbandonedCartToGHL({
        firstName,
        lastName,
        email,
        phone,
        product,
        estimatedPrice,
      });

      if (contact) {
        console.log('[GHL] Abandoned cart lead created:', contact.id);
      } else {
        console.warn('[GHL] Failed to create abandoned cart lead');
      }
    } else {
      console.log('[GHL] Not configured — skipping abandoned cart CRM sync');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Abandoned cart tracking error:', error);
    // Return success to not block the user experience
    return NextResponse.json({ success: true });
  }
}
