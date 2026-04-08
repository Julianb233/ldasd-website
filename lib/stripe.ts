import 'server-only'
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set — Stripe features will not work')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

// Subscription plan configuration
export const SUBSCRIPTION_PLANS = {
  individual: {
    name: 'Individual Plan',
    description: 'Estate planning documents for one person',
    trialDays: 14,
    prices: {
      month: { amount: 2999, label: '$29.99/mo' },
      year: { amount: 29900, label: '$299/yr' },
    },
    documentUpdates: 3,
  },
  couples: {
    name: 'Couples Plan',
    description: 'Estate planning documents for you and your spouse',
    trialDays: 14,
    prices: {
      month: { amount: 4999, label: '$49.99/mo' },
      year: { amount: 49900, label: '$499/yr' },
    },
    documentUpdates: 6,
  },
  family: {
    name: 'Family Plan',
    description: 'Complete estate planning for your entire family',
    trialDays: 14,
    prices: {
      month: { amount: 7999, label: '$79.99/mo' },
      year: { amount: 79900, label: '$799/yr' },
    },
    documentUpdates: 12,
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
