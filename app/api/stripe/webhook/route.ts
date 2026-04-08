import { NextRequest, NextResponse } from 'next/server'
import { stripe, SUBSCRIPTION_PLANS, type PlanType } from '@/lib/stripe'
import { createServerClient } from '@supabase/ssr'

// Webhook event data types — use loose typing since Stripe SDK versions vary
type StripeSubscriptionData = {
  id: string
  customer: string | { id: string }
  status: string
  metadata: Record<string, string>
  trial_start: number | null
  trial_end: number | null
  items: { data: Array<{ price?: { unit_amount?: number | null; recurring?: { interval?: string } } }> }
  cancel_at_period_end: boolean
  canceled_at: number | null
  [key: string]: unknown
}

type StripeInvoiceData = {
  subscription: string | { id: string } | null
  billing_reason: string | null
  [key: string]: unknown
}

// Use service role for webhook - no user session available
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => [], setAll: () => {} } }
  )
}

function toTimestamp(sub: StripeSubscriptionData, field: string): string {
  const val = sub[field] as number | undefined
  return val ? new Date(val * 1000).toISOString() : new Date().toISOString()
}

function toTimestampOrNull(sub: StripeSubscriptionData, field: string): string | null {
  const val = sub[field] as number | null | undefined
  return val ? new Date(val * 1000).toISOString() : null
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object as unknown as StripeSubscriptionData
        const userId = subscription.metadata.user_id
        const planType = (subscription.metadata.plan_type || 'will') as PlanType

        if (!userId) {
          console.error('No user_id in subscription metadata')
          break
        }

        const plan = SUBSCRIPTION_PLANS[planType]

        await supabase.from('subscriptions').insert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          stripe_customer_id: typeof subscription.customer === 'string'
            ? subscription.customer
            : subscription.customer.id,
          plan_type: planType,
          status: subscription.status as 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete',
          trial_start: toTimestampOrNull(subscription, 'trial_start'),
          trial_end: toTimestampOrNull(subscription, 'trial_end'),
          current_period_start: toTimestamp(subscription, 'current_period_start'),
          current_period_end: toTimestamp(subscription, 'current_period_end'),
          amount_cents: subscription.items.data[0]?.price?.unit_amount || 0,
          interval: (subscription.items.data[0]?.price?.recurring?.interval || 'year') as 'month' | 'year',
          document_updates_remaining: plan.documentUpdates,
        })
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as unknown as StripeSubscriptionData

        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status as 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'incomplete',
            current_period_start: toTimestamp(subscription, 'current_period_start'),
            current_period_end: toTimestamp(subscription, 'current_period_end'),
            cancel_at_period_end: subscription.cancel_at_period_end,
            canceled_at: toTimestampOrNull(subscription, 'canceled_at'),
            trial_end: toTimestampOrNull(subscription, 'trial_end'),
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as unknown as StripeSubscriptionData

        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
            canceled_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as unknown as StripeInvoiceData
        if (invoice.billing_reason === 'subscription_cycle') {
          const subId = typeof invoice.subscription === 'string'
            ? invoice.subscription
            : invoice.subscription?.id

          if (subId) {
            const { data: sub } = await supabase
              .from('subscriptions')
              .select('plan_type')
              .eq('stripe_subscription_id', subId)
              .single()

            if (sub) {
              const plan = SUBSCRIPTION_PLANS[sub.plan_type as PlanType]
              await supabase
                .from('subscriptions')
                .update({
                  status: 'active',
                  document_updates_remaining: plan.documentUpdates,
                })
                .eq('stripe_subscription_id', subId)
            }
          }
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as unknown as StripeInvoiceData
        const subId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id

        if (subId) {
          await supabase
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', subId)
        }
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as unknown as StripeSubscriptionData
        console.log(`Trial ending soon for subscription ${subscription.id}`)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
