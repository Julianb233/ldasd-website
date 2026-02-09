import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, phone, state, product, addSpouse } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !state || !product) {
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

    // Calculate price based on product and spouse option
    const productPrices: Record<string, number> = {
      'will': 199,
      'trust': 599,
      'estate-plan': 699,
    };
    const basePrice = productPrices[product] || 0;
    const totalPrice = addSpouse ? basePrice + 100 : basePrice;

    // TODO: Integration point for Go High Level
    console.log('Booking Submission:', {
      firstName,
      lastName,
      email,
      phone,
      state,
      product,
      addSpouse: addSpouse || false,
      estimatedPrice: `$${totalPrice}`,
      timestamp: new Date().toISOString(),
    });

    // Success response
    return NextResponse.json({
      success: true,
      message: 'Thank you! We will contact you to get started on your estate plan.',
      data: {
        product,
        estimatedPrice: totalPrice,
      },
    });
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
