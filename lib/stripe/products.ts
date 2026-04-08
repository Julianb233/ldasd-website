// Stripe Price IDs - created in Stripe Dashboard
// Each environment (test/production) has its own set of Price IDs

export const STRIPE_PRICES = {
  will: {
    individual: process.env.STRIPE_PRICE_WILL_INDIVIDUAL!,
    couples: process.env.STRIPE_PRICE_WILL_COUPLES!,
  },
  trust: {
    individual: process.env.STRIPE_PRICE_TRUST_INDIVIDUAL!,
    couples: process.env.STRIPE_PRICE_TRUST_COUPLES!,
  },
  poa: {
    individual: process.env.STRIPE_PRICE_POA!,
  },
  'healthcare-directive': {
    individual: process.env.STRIPE_PRICE_HEALTHCARE!,
  },
  'estate-plan': {
    individual: process.env.STRIPE_PRICE_ESTATE_INDIVIDUAL!,
    couples: process.env.STRIPE_PRICE_ESTATE_COUPLES!,
  },
} as const

// Product types supported
export type ProductType = keyof typeof STRIPE_PRICES

// Pricing tiers
export type PricingTier = 'individual' | 'couples'

// Display prices in cents - must match Stripe catalog
// Used for UI display before checkout (price of record is always Stripe)
//
// Pricing from requirements:
//   PRICE-01: Will $199 individual, $299 couples
//   PRICE-02: Trust $499 individual, $599 couples
//   PRICE-03: POA and Healthcare Directive $99 each
//   PRICE-04: Complete Estate Plan bundle pricing
export const DISPLAY_PRICES: Record<ProductType, Partial<Record<PricingTier, number>>> = {
  will: {
    individual: 19900, // $199.00
    couples: 29900,    // $299.00
  },
  trust: {
    individual: 49900, // $499.00
    couples: 59900,    // $599.00
  },
  poa: {
    individual: 9900,  // $99.00
  },
  'healthcare-directive': {
    individual: 9900,  // $99.00
  },
  // Complete Estate Plan bundle pricing:
  // Individual: Will ($199) + Trust ($499) + POA ($99) + Healthcare ($99) = $896
  //   Bundle price: $699 (22% discount, saves $197)
  // Couples: Will ($299) + Trust ($599) + POA ($99x2) + Healthcare ($99x2) = $1294
  //   Bundle price: $899 (30% discount, saves $395)
  'estate-plan': {
    individual: 69900, // $699.00 (bundle discount)
    couples: 89900,    // $899.00 (bundle discount)
  },
}

// Product display names
export const PRODUCT_NAMES: Record<ProductType, string> = {
  will: 'Last Will & Testament',
  trust: 'Living Trust',
  poa: 'Power of Attorney',
  'healthcare-directive': 'Healthcare Directive',
  'estate-plan': 'Complete Estate Plan',
}

// Helper to format price for display
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}

// Helper to get price for product/tier combination
export function getDisplayPrice(productType: ProductType, tier: PricingTier): number | null {
  const prices = DISPLAY_PRICES[productType]
  return prices?.[tier] ?? null
}

// Helper to check if product supports couples pricing
export function hasCouplesPricing(productType: ProductType): boolean {
  return 'couples' in STRIPE_PRICES[productType]
}
