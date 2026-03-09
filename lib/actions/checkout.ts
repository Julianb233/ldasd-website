'use server'

import { createClient } from '@/lib/supabase/server'
import { getStripe } from '@/lib/stripe/client'
import { STRIPE_PRICES, type ProductType, type PricingTier } from '@/lib/stripe/products'

export type CheckoutResult = {
  error?: string
  url?: string
}

export async function createCheckoutSession(
  productType: ProductType,
  pricingTier: PricingTier,
): Promise<CheckoutResult> {
  // Validate site URL is configured (required for success/cancel redirects)
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    console.error('NEXT_PUBLIC_SITE_URL is not configured')
    return { error: 'Site configuration error' }
  }

  const supabase = await createClient()

  // Get authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'Please log in to continue' }
  }

  // Get price ID from config
  const priceConfig = STRIPE_PRICES[productType]
  const priceId = pricingTier === 'couples' && 'couples' in priceConfig
    ? (priceConfig as { couples: string }).couples
    : priceConfig.individual

  if (!priceId) {
    return { error: 'Invalid product configuration' }
  }

  try {
    // Create pending order in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_type: productType,
        amount_cents: 0, // Will be updated by webhook with actual amount
        status: 'pending' as const,
        is_couples: pricingTier === 'couples',
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return { error: 'Failed to create order' }
    }

    // Create Stripe Checkout session
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        user_id: user.id,
        order_id: order.id,
        product_type: productType,
        is_couples: String(pricingTier === 'couples'),
      },
    })

    // Update order with session ID for tracking
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    if (!session.url) {
      return { error: 'Failed to create checkout session' }
    }

    // Return URL for client-side redirect
    // Note: We return the URL instead of using redirect() because:
    // 1. Stripe Checkout is an external URL (stripe.com domain)
    // 2. Client needs to handle the redirect for loading state UX
    // 3. Allows error handling before navigation
    return { url: session.url }
  } catch (err) {
    console.error('Checkout error:', err)
    return { error: 'Failed to create checkout session' }
  }
}
