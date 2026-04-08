import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { stripe, SUBSCRIPTION_PLANS, type PlanType, type BillingInterval } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { planType, interval } = body as { planType: PlanType; interval: BillingInterval }

    if (!planType || !SUBSCRIPTION_PLANS[planType]) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 })
    }

    if (!interval || !['month', 'year'].includes(interval)) {
      return NextResponse.json({ error: 'Invalid billing interval' }, { status: 400 })
    }

    // Check for existing active subscription
    const { data: existingSub } = await supabase
      .from('subscriptions')
      .select('id, status')
      .eq('user_id', user.id)
      .in('status', ['trialing', 'active'])
      .limit(1)
      .single()

    if (existingSub) {
      return NextResponse.json(
        { error: 'You already have an active subscription' },
        { status: 409 }
      )
    }

    const plan = SUBSCRIPTION_PLANS[planType]
    const price = plan.prices[interval]
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // Create Stripe checkout session with trial
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email || undefined,
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: price.amount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: plan.trialDays,
        metadata: {
          user_id: user.id,
          plan_type: planType,
        },
      },
      metadata: {
        user_id: user.id,
        plan_type: planType,
      },
      success_url: `${siteUrl}/dashboard/subscription?success=true`,
      cancel_url: `${siteUrl}/dashboard/subscription?canceled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
