import Link from 'next/link'

// Icon components
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen bg-sage flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-premium max-w-md w-full text-center">
        {/* Cancel Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XIcon className="w-8 h-8 text-gray-500" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Payment Cancelled
        </h1>

        {/* Message */}
        <p className="text-foreground/70 mb-8">
          Your payment was not completed. No charges were made to your account.
          If you experienced any issues, please don&apos;t hesitate to reach out.
        </p>

        {/* Trust Badges */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <ShieldIcon className="w-5 h-5" />
            <span>Secure payment powered by Stripe</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="block w-full rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            View Pricing
          </Link>
          <Link
            href="/products"
            className="block w-full rounded-full bg-gray-100 px-6 py-3 text-foreground font-semibold hover:bg-gray-200 transition-colors"
          >
            Browse Products
          </Link>
          <Link
            href="/dashboard"
            className="block w-full text-gray-500 py-2 hover:text-foreground transition-colors"
          >
            Return to Dashboard
          </Link>
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
