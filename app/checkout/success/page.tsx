import Link from 'next/link'
import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { PRODUCT_NAMES, formatPrice, type ProductType } from '@/lib/stripe/products'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

type Props = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    redirect('/pricing')
  }

  let productName = 'Your Estate Plan'
  let amount = ''
  let customerEmail = ''

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const productType = session.metadata?.product_type as ProductType | undefined
    const tier = session.metadata?.tier

    if (productType && PRODUCT_NAMES[productType]) {
      productName = PRODUCT_NAMES[productType]
      if (tier === 'couples') productName += ' (Couples)'
    }

    if (session.amount_total) {
      amount = formatPrice(session.amount_total)
    }

    customerEmail = session.customer_email ?? ''
  } catch {
    // Session retrieval failed — show generic success
  }

  return (
    <div className="min-h-screen bg-sage flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-premium max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-8 h-8 text-emerald-600" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Payment Successful!
        </h1>

        {/* Product & Amount */}
        <p className="text-lg font-semibold text-primary mb-1">{productName}</p>
        {amount && <p className="text-foreground/60 mb-4">{amount}</p>}

        {/* Message */}
        <p className="text-foreground/70 mb-8">
          Thank you for your purchase. {customerEmail && `A confirmation has been sent to ${customerEmail}. `}
          Head to your dashboard to begin the guided questionnaire.
        </p>

        {/* Trust Badges */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <ShieldIcon className="w-5 h-5" />
            <span>Secure payment processed by Stripe</span>
          </div>
        </div>

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

        {/* Next Steps */}
        <div className="mt-8 text-left bg-sky/50 rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
          <ol className="space-y-2 text-sm text-foreground/70">
            <li className="flex gap-2">
              <span className="font-semibold text-primary">1.</span>
              Complete the guided questionnaire
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">2.</span>
              Our team reviews your information
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">3.</span>
              Documents are prepared for download
            </li>
            <li className="flex gap-2">
              <span className="font-semibold text-primary">4.</span>
              Follow signing &amp; notarization instructions
            </li>
          </ol>
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-gray-500">
          Need help?{' '}
          <Link href="/contact" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  )
}
