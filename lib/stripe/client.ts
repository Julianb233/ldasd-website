import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors when env vars aren't set
// The Stripe client is only needed at runtime for API routes
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
      typescript: true,
    })
  }
  return _stripe
}

// Keep backward-compatible default export for runtime usage
// This will throw at import time if STRIPE_SECRET_KEY is missing,
// so prefer getStripe() in API routes
export const stripe = (() => {
  if (process.env.STRIPE_SECRET_KEY) {
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
      typescript: true,
    })
  }
  // Return a proxy that throws on use rather than on import
  return new Proxy({} as Stripe, {
    get(_, prop) {
      if (prop === 'webhooks') {
        return {
          constructEvent: () => {
            throw new Error('STRIPE_SECRET_KEY is not set')
          },
        }
      }
      throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
    },
  })
})()
