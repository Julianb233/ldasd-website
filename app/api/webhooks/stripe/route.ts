import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getStripe } from '@/lib/stripe/client'
import { sendOrderReceipt } from '@/lib/email/receipt'
import { createClient } from '@supabase/supabase-js'
import type { ProductType } from '@/lib/stripe/products'

// Use service role client for webhook (no user session)
function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const orderId = session.metadata?.order_id
    const userId = session.metadata?.user_id
    const productType = session.metadata?.product_type as ProductType | undefined

    if (!orderId || !userId) {
      console.error('Missing metadata in checkout session:', session.id)
      return NextResponse.json({ received: true })
    }

    const supabase = createServiceClient()

    // Update order to completed
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        stripe_payment_intent_id: typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Failed to update order:', updateError)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    // Fetch order details for email
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    // Fetch user profile for name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', userId)
      .single()

    // Send receipt email
    const email = session.customer_email || profile?.email
    if (email && order && productType) {
      await sendOrderReceipt({
        to: email,
        customerName: profile?.full_name ?? null,
        productType,
        isCouples: order.is_couples ?? false,
        amountCents: order.amount_cents,
        orderId,
      })
    }
  }

  return NextResponse.json({ received: true })
}
