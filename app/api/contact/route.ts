import { NextRequest, NextResponse } from 'next/server';
import { isGHLConfigured, sendContactFormToGHL } from '@/lib/ghl';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, subject, message } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Log submission (visible in Vercel logs)
    console.log('Contact Form Submission:', {
      firstName,
      lastName,
      email,
      phone: phone || 'Not provided',
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // CRM-01: Send to Go High Level
    if (isGHLConfigured()) {
      const ghlContact = await sendContactFormToGHL({
        firstName,
        lastName,
        email,
        phone: phone || undefined,
        subject,
        message,
      });

      if (ghlContact) {
        console.log('[GHL] Contact form lead created:', ghlContact.id);
      } else {
        console.warn('[GHL] Failed to create contact form lead — form still submitted successfully');
      }
    } else {
      console.log('[GHL] Not configured — skipping CRM sync for contact form');
    }

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
