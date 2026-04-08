import 'server-only'
import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set — Stripe features require this environment variable')
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return _stripe
}

// Re-export for backwards compatibility — lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

// Subscription plan configuration (SUB-01 through SUB-04)
export const SUBSCRIPTION_PLANS = {
  will: {
    name: 'Will Plan',
    description: 'Last Will & Testament with ongoing updates',
    trialDays: 30,
    prices: {
      month: { amount: 299, label: '$2.99/mo' },
      year: { amount: 1900, label: '$19/yr' },
    },
    documentUpdates: 3,
    includes: ['will'],
  },
  trust: {
    name: 'Trust Plan',
    description: 'Living Trust with ongoing updates and amendments',
    trialDays: 30,
    prices: {
      month: { amount: 499, label: '$4.99/mo' },
      year: { amount: 3900, label: '$39/yr' },
    },
    documentUpdates: 6,
    includes: ['trust', 'will', 'poa'],
  },
  'estate-plan': {
    name: 'Complete Estate Plan',
    description: 'Full estate planning package with all documents',
    trialDays: 30,
    prices: {
      month: { amount: 799, label: '$7.99/mo' },
      year: { amount: 6900, label: '$69/yr' },
    },
    documentUpdates: 12,
    includes: ['trust', 'will', 'poa', 'healthcare-directive'],
  },
} as const

export type PlanType = keyof typeof SUBSCRIPTION_PLANS
export type BillingInterval = 'month' | 'year'

export function getPlanPrice(plan: PlanType, interval: BillingInterval) {
  return SUBSCRIPTION_PLANS[plan].prices[interval]
}

export function getTrialDays(plan: PlanType) {
  return SUBSCRIPTION_PLANS[plan].trialDays
}
