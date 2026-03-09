import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'

// Icon component
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Order details type for display
type OrderDetails = {
  orderId: string
  productName: string
  amountPaid: number
  purchaseDate: string
  isCouples: boolean
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  // No session ID - redirect to dashboard
  if (!sessionId) {
    redirect('/dashboard')
  }

  // Initialize order details with defaults
  let orderDetails: OrderDetails = {
    orderId: '',
    productName: 'Estate Planning Document',
    amountPaid: 0,
    purchaseDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    isCouples: false,
  }

  try {
    // Retrieve Stripe session to verify payment and get metadata
    const session = await getStripe().checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    })

    // If payment not complete, redirect to cancel page
    if (session.payment_status !== 'paid') {
      redirect('/checkout/cancel')
    }

    // Get product name from Stripe line items
    const lineItem = session.line_items?.data[0]
    if (lineItem?.price?.product && typeof lineItem.price.product === 'object') {
      orderDetails.productName = ('name' in lineItem.price.product ? lineItem.price.product.name : null) || orderDetails.productName
    }

    // Get order details from database using session metadata (PAY-03 requirement)
    const orderId = session.metadata?.order_id
    if (orderId) {
      const supabase = await createClient()
      const { data: order } = await supabase
        .from('orders')
        .select('id, amount_cents, created_at, is_couples, product_type')
        .eq('id', orderId)
        .single()

      if (order) {
        orderDetails = {
          orderId: order.id,
          productName: orderDetails.productName, // Keep Stripe product name
          amountPaid: order.amount_cents,
          purchaseDate: new Date(order.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          isCouples: order.is_couples,
        }
      }
    }
  } catch (error) {
    // Invalid session ID - redirect to dashboard
    console.error('Failed to retrieve session:', error)
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-sage flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-premium max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Payment Successful!
        </h1>

        {/* Order Confirmation Details (PAY-03) */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
          <h2 className="text-sm font-medium text-gray-500 mb-4 text-center">Order Confirmation</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Product</span>
              <span className="font-semibold text-foreground">
                {orderDetails.productName}
                {orderDetails.isCouples && <span className="text-sm font-normal text-gray-500 ml-1">(Couples)</span>}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-foreground">
                ${(orderDetails.amountPaid / 100).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-foreground">{orderDetails.purchaseDate}</span>
            </div>

            {orderDetails.orderId && (
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="font-mono text-sm text-foreground">{orderDetails.orderId.slice(0, 8)}...</span>
              </div>
            )}
          </div>
        </div>

        {/* Message */}
        <p className="text-foreground/70 mb-8">
          Thank you for your purchase! You&apos;ll receive a confirmation email shortly.
          Your documents are now available in your dashboard.
        </p>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/products"
            className="block w-full rounded-full bg-gray-100 px-6 py-3 text-foreground font-semibold hover:bg-gray-200 transition-colors"
          >
            Browse More Products
          </Link>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-gray-500">
          Questions?{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
