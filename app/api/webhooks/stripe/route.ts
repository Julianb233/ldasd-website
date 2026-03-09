import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe/client'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import type Stripe from 'stripe'

// Lazy initialization to prevent build-time crashes when env vars aren't set
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function POST(req: NextRequest) {
  // CRITICAL: Use req.text() not req.json() for signature verification
  // req.json() parses body before we can verify signature, causing failures
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    console.error('Webhook error: Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle checkout completion - main fulfillment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const orderId = session.metadata?.order_id
    const userId = session.metadata?.user_id
    const productType = session.metadata?.product_type

    if (!orderId || !userId) {
      console.error('Webhook error: Missing metadata in session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    console.log(`Processing payment for order ${orderId}, user ${userId}`)

    // Update order status to completed
    const { error: updateError } = await getSupabaseAdmin()
      .from('orders')
      .update({
        status: 'completed',
        amount_cents: session.amount_total || 0,
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq('id', orderId)
      .eq('user_id', userId) // Extra safety check

    if (updateError) {
      console.error('Order update failed:', updateError)
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
    }

    console.log(`Order ${orderId} marked as completed`)

    // Send receipt email (async, don't block webhook response)
    sendReceiptEmail(session, orderId, productType || 'document').catch((err) => {
      console.error('Receipt email failed:', err)
    })
  }

  // Handle refunds
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    const paymentIntentId = charge.payment_intent as string

    if (paymentIntentId) {
      const { error } = await getSupabaseAdmin()
        .from('orders')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', paymentIntentId)

      if (error) {
        console.error('Refund status update failed:', error)
      } else {
        console.log(`Order with payment intent ${paymentIntentId} marked as refunded`)
      }
    }
  }

  // Always return 200 quickly to acknowledge receipt
  return NextResponse.json({ received: true })
}

// Product display names for email
const productNames: Record<string, string> = {
  will: 'Last Will & Testament',
  trust: 'Living Trust',
  poa: 'Power of Attorney',
  'healthcare-directive': 'Healthcare Directive',
  'estate-plan': 'Complete Estate Plan',
}

async function sendReceiptEmail(
  session: Stripe.Checkout.Session,
  orderId: string,
  productType: string,
) {
  const customerEmail = session.customer_details?.email || session.customer_email

  if (!customerEmail) {
    console.error('No customer email for receipt, order:', orderId)
    return
  }

  const productName = productNames[productType] || 'Estate Planning Document'
  const amount = session.amount_total || 0

  try {
    await getResend().emails.send({
      from: 'LDASD Estate Planning <noreply@ldasd.com>',
      to: customerEmail,
      subject: `Receipt: ${productName} Purchase`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .header h1 { color: #2d5016; margin: 0; }
    .card { background: #f9f9f9; border-radius: 8px; padding: 24px; margin: 24px 0; }
    .amount { font-size: 32px; font-weight: bold; color: #2d5016; }
    .details { margin: 16px 0; }
    .details p { margin: 8px 0; }
    .footer { text-align: center; margin-top: 40px; color: #666; font-size: 14px; }
    .button { display: inline-block; background: #2d5016; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>LDASD Estate Planning</h1>
      <p>Thank you for your purchase!</p>
    </div>

    <div class="card">
      <p style="margin: 0 0 8px 0; color: #666;">Order Total</p>
      <p class="amount">$${(amount / 100).toFixed(2)}</p>
    </div>

    <div class="details">
      <p><strong>Product:</strong> ${productName}</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}</p>
    </div>

    <p>Your estate planning documents are now available in your dashboard. Log in to access them and begin the guided questionnaire.</p>

    <div style="text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" class="button">Go to Dashboard</a>
    </div>

    <div class="footer">
      <p>Questions? Contact us at support@ldasd.com</p>
      <p>&copy; ${new Date().getFullYear()} LDASD Estate Planning. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
      `,
    })
    console.log(`Receipt email sent to ${customerEmail} for order ${orderId}`)
  } catch (error) {
    console.error('Failed to send receipt email:', error)
    throw error
  }
}
