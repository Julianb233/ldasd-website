import { NextRequest, NextResponse } from 'next/server';
import { getAttorneyInfo } from '@/lib/data/attorneys';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      state,
      preferredDate,
      preferredTime,
      consultationType,
      existingProduct,
      topics,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !state) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get state-specific attorney matching info
    const attorneyInfo = getAttorneyInfo(state);
    if (!attorneyInfo || !attorneyInfo.available) {
      return NextResponse.json(
        { error: 'Attorney consultation is not yet available in your state. Please contact us for alternatives.' },
        { status: 400 }
      );
    }

    // Log the consultation request
    console.log('Attorney Consultation Request:', {
      firstName,
      lastName,
      email,
      phone,
      state,
      preferredDate: preferredDate || 'Not specified',
      preferredTime: preferredTime || 'Not specified',
      consultationType: consultationType || attorneyInfo.consultationType,
      existingProduct: existingProduct || 'None (standalone)',
      topics: topics || [],
      matchedState: attorneyInfo.state,
      practiceAreas: attorneyInfo.practiceAreas,
      estimatedResponseTime: attorneyInfo.averageResponseTime,
      price: 299,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Thank you! We'll match you with a licensed attorney in ${attorneyInfo.state}. Expect to hear from us within ${attorneyInfo.averageResponseTime}.`,
      data: {
        state: attorneyInfo.state,
        consultationType: attorneyInfo.consultationType,
        practiceAreas: attorneyInfo.practiceAreas,
        responseTime: attorneyInfo.averageResponseTime,
        price: 299,
      },
    });
  } catch (error) {
    console.error('Attorney consultation error:', error);
    return NextResponse.json(
      { error: 'Failed to submit consultation request. Please try again.' },
      { status: 500 }
    );
  }
}
