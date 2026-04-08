#!/usr/bin/env npx tsx
/**
 * Sets up Stripe subscription products and prices for LDASD Estate Planning.
 *
 * Requirements: SUB-01 through SUB-04
 * - Will Plan: $19/yr ($2.99/mo) with 30-day free trial
 * - Trust Plan: $39/yr ($4.99/mo) with 30-day free trial
 * - Estate Plan: $69/yr ($7.99/mo) with 30-day free trial
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... npx tsx scripts/setup-stripe-products.ts
 *
 * This script is idempotent — it checks for existing products before creating.
 */

import Stripe from 'stripe'

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
if (!STRIPE_SECRET_KEY) {
  console.error('Error: STRIPE_SECRET_KEY environment variable is required')
  process.exit(1)
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

const PLANS = [
  {
    id: 'will',
    name: 'Will Plan',
    description: 'Last Will & Testament with ongoing updates',
    monthlyAmountCents: 299,
    yearlyAmountCents: 1900,
    trialDays: 30,
    metadata: { plan_type: 'will', document_updates: '3' },
  },
  {
    id: 'trust',
    name: 'Trust Plan',
    description: 'Living Trust with ongoing updates and amendments',
    monthlyAmountCents: 499,
    yearlyAmountCents: 3900,
    trialDays: 30,
    metadata: { plan_type: 'trust', document_updates: '6' },
  },
  {
    id: 'estate-plan',
    name: 'Complete Estate Plan',
    description: 'Full estate planning package with all documents',
    monthlyAmountCents: 799,
    yearlyAmountCents: 6900,
    trialDays: 30,
    metadata: { plan_type: 'estate-plan', document_updates: '12' },
  },
]

async function findExistingProduct(name: string): Promise<Stripe.Product | null> {
  const products = await stripe.products.search({
    query: `name:"${name}"`,
  })
  return products.data[0] || null
}

async function setupProducts() {
  console.log('Setting up Stripe subscription products...\n')

  for (const plan of PLANS) {
    // Check for existing product
    const existing = await findExistingProduct(plan.name)
    let product: Stripe.Product

    if (existing) {
      console.log(`[skip] Product "${plan.name}" already exists (${existing.id})`)
      product = existing
    } else {
      product = await stripe.products.create({
        name: plan.name,
        description: plan.description,
        metadata: plan.metadata,
      })
      console.log(`[created] Product "${plan.name}" (${product.id})`)
    }

    // Check/create monthly price
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
    })

    const hasMonthly = existingPrices.data.some(
      (p) => p.recurring?.interval === 'month' && p.unit_amount === plan.monthlyAmountCents
    )
    const hasYearly = existingPrices.data.some(
      (p) => p.recurring?.interval === 'year' && p.unit_amount === plan.yearlyAmountCents
    )

    if (!hasMonthly) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.monthlyAmountCents,
        currency: 'usd',
        recurring: { interval: 'month', trial_period_days: plan.trialDays },
        metadata: plan.metadata,
      })
      console.log(`  [created] Monthly price: $${(plan.monthlyAmountCents / 100).toFixed(2)}/mo (${price.id})`)
    } else {
      console.log(`  [skip] Monthly price already exists`)
    }

    if (!hasYearly) {
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: plan.yearlyAmountCents,
        currency: 'usd',
        recurring: { interval: 'year', trial_period_days: plan.trialDays },
        metadata: plan.metadata,
      })
      console.log(`  [created] Yearly price: $${(plan.yearlyAmountCents / 100).toFixed(2)}/yr (${price.id})`)
    } else {
      console.log(`  [skip] Yearly price already exists`)
    }

    console.log()
  }

  console.log('Stripe products setup complete!')
  console.log('\nNext steps:')
  console.log('1. Add STRIPE_SECRET_KEY to your .env.local')
  console.log('2. Add STRIPE_WEBHOOK_SECRET to your .env.local')
  console.log('3. Set up webhook endpoint in Stripe dashboard:')
  console.log('   URL: https://your-domain.com/api/stripe/webhook')
  console.log('   Events: customer.subscription.created, customer.subscription.updated,')
  console.log('           customer.subscription.deleted, invoice.payment_succeeded,')
  console.log('           invoice.payment_failed, customer.subscription.trial_will_end')
}

setupProducts().catch((err) => {
  console.error('Setup failed:', err.message)
  process.exit(1)
})
