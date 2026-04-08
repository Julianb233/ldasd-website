import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'
import { STRIPE_PRICES, PRODUCT_NAMES, DISPLAY_PRICES, type ProductType, type PricingTier } from '@/lib/stripe/products'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const { productType, tier = 'individual' } = body as {
      productType: ProductType
      tier?: PricingTier
    }

    // Validate product type
    if (!STRIPE_PRICES[productType]) {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 })
    }

    // Validate tier exists for this product
    const priceId = (STRIPE_PRICES[productType] as Record<string, string>)[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid pricing tier for this product' }, { status: 400 })
    }

    const displayPrice = DISPLAY_PRICES[productType]?.[tier]
    const productName = PRODUCT_NAMES[productType]
    const isCouples = tier === 'couples'

    // Create order in pending state
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_type: productType,
        amount_cents: displayPrice ?? 0,
        status: 'pending',
        is_couples: isCouples,
      })
      .select('id')
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Create Stripe Checkout session
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email ?? undefined,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        order_id: order.id,
        user_id: user.id,
        product_type: productType,
        tier,
      },
      success_url: `${request.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout/cancel`,
    })

    // Update order with Stripe session ID
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
